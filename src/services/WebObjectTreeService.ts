import { WebObject, WebObjectTree } from "../types"

export class WebObjectTreeService {
  private tree: WebObjectTree

  constructor(root: WebObject) {
    this.tree = {
      root,
      nodes: new Map(),
      parentMap: new Map(),
      childrenMap: new Map(),
    }
    this.buildTree(root)
  }

  private buildTree(node: WebObject, parentId?: string) {
    // Add node to the tree
    this.tree.nodes.set(node.id, node)

    // Set parent relationship
    if (parentId) {
      this.tree.parentMap.set(node.id, parentId)
    }

    // Set children relationship
    if (node.children && node.children.length > 0) {
      this.tree.childrenMap.set(
        node.id,
        node.children.map(child => child.id)
      )
      // Recursively build tree for children
      node.children.forEach(child => this.buildTree(child, node.id))
    } else {
      this.tree.childrenMap.set(node.id, [])
    }
  }

  getTree(): WebObjectTree {
    return this.tree
  }

  getNode(id: string): WebObject | undefined {
    return this.tree.nodes.get(id)
  }

  getParent(id: string): WebObject | undefined {
    const parentId = this.tree.parentMap.get(id)
    return parentId ? this.tree.nodes.get(parentId) : undefined
  }

  getChildren(id: string): WebObject[] {
    const childrenIds = this.tree.childrenMap.get(id) || []
    return childrenIds
      .map(childId => this.tree.nodes.get(childId)!)
      .filter(Boolean)
  }

  updateNode(id: string, updates: Partial<WebObject>): boolean {
    const node = this.tree.nodes.get(id)
    if (!node) return false

    // Update the node
    Object.assign(node, updates)

    // If children were updated, rebuild the tree structure
    if (updates.children) {
      this.rebuildChildren(id, updates.children)
    }

    return true
  }

  private rebuildChildren(parentId: string, children: WebObject[]) {
    // Remove old children from the tree
    const oldChildrenIds = this.tree.childrenMap.get(parentId) || []
    oldChildrenIds.forEach(childId => {
      this.tree.nodes.delete(childId)
      this.tree.parentMap.delete(childId)
      this.tree.childrenMap.delete(childId)
    })

    // Add new children
    this.tree.childrenMap.set(
      parentId,
      children.map(child => child.id)
    )
    children.forEach(child => this.buildTree(child, parentId))
  }

  addNode(parentId: string, node: WebObject): boolean {
    const parent = this.tree.nodes.get(parentId)
    if (!parent) return false

    // Add the new node to parent's children
    if (!parent.children) {
      parent.children = []
    }
    parent.children.push(node)

    // Update the tree structure
    this.buildTree(node, parentId)
    this.tree.childrenMap.set(
      parentId,
      parent.children.map(child => child.id)
    )

    return true
  }

  removeNode(id: string): boolean {
    const node = this.tree.nodes.get(id)
    if (!node) return false

    const parentId = this.tree.parentMap.get(id)
    if (parentId) {
      const parent = this.tree.nodes.get(parentId)
      if (parent && parent.children) {
        parent.children = parent.children.filter(child => child.id !== id)
        this.tree.childrenMap.set(
          parentId,
          parent.children.map(child => child.id)
        )
      }
    }

    // Remove the node and all its descendants
    this.removeNodeAndDescendants(id)

    return true
  }

  private removeNodeAndDescendants(id: string) {
    const childrenIds = this.tree.childrenMap.get(id) || []

    // Recursively remove children
    childrenIds.forEach(childId => this.removeNodeAndDescendants(childId))

    // Remove the node itself
    this.tree.nodes.delete(id)
    this.tree.parentMap.delete(id)
    this.tree.childrenMap.delete(id)
  }

  moveNode(id: string, newParentId: string): boolean {
    const node = this.tree.nodes.get(id)
    const newParent = this.tree.nodes.get(newParentId)

    if (!node || !newParent) return false

    // Check if moving would create a cycle
    if (this.wouldCreateCycle(id, newParentId)) return false

    // Remove from current parent
    const currentParentId = this.tree.parentMap.get(id)
    if (currentParentId) {
      const currentParent = this.tree.nodes.get(currentParentId)
      if (currentParent && currentParent.children) {
        currentParent.children = currentParent.children.filter(
          child => child.id !== id
        )
        this.tree.childrenMap.set(
          currentParentId,
          currentParent.children.map(child => child.id)
        )
      }
    }

    // Add to new parent
    if (!newParent.children) {
      newParent.children = []
    }
    newParent.children.push(node)
    this.tree.childrenMap.set(
      newParentId,
      newParent.children.map(child => child.id)
    )
    this.tree.parentMap.set(id, newParentId)

    return true
  }

  private wouldCreateCycle(id: string, newParentId: string): boolean {
    if (id === newParentId) return true

    const childrenIds = this.tree.childrenMap.get(newParentId) || []
    return childrenIds.some(childId => this.wouldCreateCycle(id, childId))
  }

  traverse(
    callback: (node: WebObject, depth: number) => void,
    startId?: string
  ) {
    const startNode = startId ? this.tree.nodes.get(startId) : this.tree.root
    if (!startNode) return

    const traverseNode = (node: WebObject, depth: number) => {
      callback(node, depth)
      const children = this.getChildren(node.id)
      children.forEach(child => traverseNode(child, depth + 1))
    }

    traverseNode(startNode, 0)
  }

  findNodes(predicate: (node: WebObject) => boolean): WebObject[] {
    const results: WebObject[] = []
    this.traverse(node => {
      if (predicate(node)) {
        results.push(node)
      }
    })
    return results
  }

  findNodeById(id: string): WebObject | undefined {
    return this.tree.nodes.get(id)
  }

  findNodesByType(type: string): WebObject[] {
    return this.findNodes(
      node =>
        Array.isArray(node.components) &&
        node.components.some(c => c.type === type)
    )
  }

  findNodesByTagName(tagName: string): WebObject[] {
    return this.findNodes(node => node.tagName === tagName)
  }
}

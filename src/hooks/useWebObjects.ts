import { useState, useCallback } from "react"
import { WebObject, WebObjectContext } from "../types"

export const useWebObjects = (context: WebObjectContext | null) => {
  const [selectedWebObjectId, setSelectedWebObjectId] = useState<string | null>(
    null
  )

  // Create a new WebObject
  const createWebObject = useCallback(
    (
      type: "element" | "component" | "container",
      options: {
        tagName?: string
        componentName?: string
        props?: Record<string, any>
        style?: Record<string, any>
        position?: { x: number; y: number; z?: number }
        size?: { width: number; height: number }
        metadata?: Record<string, any>
      } = {}
    ): WebObject => {
      const id = `webobject-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`

      return {
        id,
        type,
        tagName: options.tagName,
        componentName: options.componentName,
        props: options.props || {},
        style: options.style || {},
        position: options.position,
        size: options.size,
        children: [],
        metadata: options.metadata || {},
      }
    },
    []
  )

  // Add a WebObject to the tree
  const addWebObject = useCallback(
    (parentId: string, webObject: WebObject) => {
      if (context) {
        context.addWebObject(parentId, webObject)
      }
    },
    [context]
  )

  // Update a WebObject
  const updateWebObject = useCallback(
    (id: string, updates: Partial<WebObject>) => {
      if (context) {
        context.updateWebObject(id, updates)
      }
    },
    [context]
  )

  // Remove a WebObject
  const removeWebObject = useCallback(
    (id: string) => {
      if (context) {
        context.removeWebObject(id)
      }
    },
    [context]
  )

  // Move a WebObject to a new parent
  const moveWebObject = useCallback(
    (id: string, newParentId: string) => {
      if (context) {
        context.moveWebObject(id, newParentId)
      }
    },
    [context]
  )

  // Get a WebObject by ID
  const getWebObject = useCallback(
    (id: string): WebObject | undefined => {
      if (context) {
        return context.webObjectTree.nodes.get(id)
      }
      return undefined
    },
    [context]
  )

  // Get children of a WebObject
  const getChildren = useCallback(
    (id: string): WebObject[] => {
      if (context) {
        const childrenIds = context.webObjectTree.childrenMap.get(id) || []
        return childrenIds
          .map(childId => context.webObjectTree.nodes.get(childId)!)
          .filter(Boolean)
      }
      return []
    },
    [context]
  )

  // Get parent of a WebObject
  const getParent = useCallback(
    (id: string): WebObject | undefined => {
      if (context) {
        const parentId = context.webObjectTree.parentMap.get(id)
        return parentId ? context.webObjectTree.nodes.get(parentId) : undefined
      }
      return undefined
    },
    [context]
  )

  // Find WebObjects by type
  const findWebObjectsByType = useCallback(
    (type: string): WebObject[] => {
      if (context) {
        const results: WebObject[] = []
        context.webObjectTree.nodes.forEach(node => {
          if (node.type === type) {
            results.push(node)
          }
        })
        return results
      }
      return []
    },
    [context]
  )

  // Find WebObjects by tag name
  const findWebObjectsByTagName = useCallback(
    (tagName: string): WebObject[] => {
      if (context) {
        const results: WebObject[] = []
        context.webObjectTree.nodes.forEach(node => {
          if (node.tagName === tagName) {
            results.push(node)
          }
        })
        return results
      }
      return []
    },
    [context]
  )

  // Create common WebObject types
  const createHTMLElement = useCallback(
    (
      tagName: string,
      props: Record<string, any> = {},
      style: Record<string, any> = {}
    ): WebObject => {
      return createWebObject("element", {
        tagName,
        props,
        style,
      })
    },
    [createWebObject]
  )

  const createContainer = useCallback(
    (
      props: Record<string, any> = {},
      style: Record<string, any> = {}
    ): WebObject => {
      return createWebObject("container", {
        props,
        style,
      })
    },
    [createWebObject]
  )

  const createComponent = useCallback(
    (
      componentName: string,
      props: Record<string, any> = {},
      style: Record<string, any> = {}
    ): WebObject => {
      return createWebObject("component", {
        componentName,
        props,
        style,
      })
    },
    [createWebObject]
  )

  return {
    // State
    selectedWebObjectId,
    setSelectedWebObjectId,

    // Core operations
    createWebObject,
    addWebObject,
    updateWebObject,
    removeWebObject,
    moveWebObject,

    // Queries
    getWebObject,
    getChildren,
    getParent,
    findWebObjectsByType,
    findWebObjectsByTagName,

    // Convenience creators
    createHTMLElement,
    createContainer,
    createComponent,
  }
}

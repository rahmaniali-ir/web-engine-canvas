// Core types for the Web Engine Canvas system

export interface WebObject {
  id: string
  type: "element" | "component" | "container"
  tagName?: string // For HTML elements like 'h1', 'div', etc.
  componentName?: string // For custom components
  props?: Record<string, any>
  style?: Record<string, any>
  children?: WebObject[]
  position?: {
    x: number
    y: number
    z?: number
  }
  size?: {
    width: number
    height: number
  }
  metadata?: Record<string, any>
}

export interface WebObjectManifest {
  id: string
  name: string
  version: string
  root: WebObject
  metadata?: Record<string, any>
}

export interface CanvasManifest {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  root: WebObjectManifest
  settings?: {
    width: number
    height: number
    backgroundColor?: string
    responsive?: boolean
  }
  metadata?: Record<string, any>
}

export interface WebObjectContext {
  canvas: HTMLDivElement | null
  manifest: CanvasManifest
  webObjectTree: WebObjectTree
  updateWebObject: (id: string, updates: Partial<WebObject>) => void
  addWebObject: (parentId: string, webObject: WebObject) => void
  removeWebObject: (id: string) => void
  moveWebObject: (id: string, newParentId: string) => void
}

export interface WebObjectTree {
  root: WebObject
  nodes: Map<string, WebObject>
  parentMap: Map<string, string>
  childrenMap: Map<string, string[]>
}

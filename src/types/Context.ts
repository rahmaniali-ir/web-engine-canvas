import { WebObject } from "./WebObject"
import { CanvasManifest } from "./Manifest"

export interface WebObjectTree {
  root: WebObject
  nodes: Map<string, WebObject>
  parentMap: Map<string, string>
  childrenMap: Map<string, string[]>
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

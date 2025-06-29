import { WebObject } from "./WebObject"
import { Manifest } from "./Manifest"
import { RouterState } from "../services/RouterService"
import { AssetService } from "../services/AssetService"

export interface WebObjectTree {
  root: WebObject
  nodes: Map<string, WebObject>
  parentMap: Map<string, string>
  childrenMap: Map<string, string[]>
}

export interface WebObjectContext {
  canvas: HTMLDivElement | null
  manifest: Manifest
  webObjectTree: WebObjectTree
  routerState: RouterState
  assetService: AssetService | null
  navigate: (path: string) => void
  goBack: () => void
  goForward: () => void
  updateWebObject: (id: string, updates: Partial<WebObject>) => void
  addWebObject: (parentId: string, webObject: WebObject) => void
  removeWebObject: (id: string) => void
  moveWebObject: (id: string, newParentId: string) => void
}

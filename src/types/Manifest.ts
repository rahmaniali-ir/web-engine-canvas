import { WebObject } from "./WebObject"

export interface CanvasManifest {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  root: WebObject
}

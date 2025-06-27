import { WebObject } from "./WebObject"

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

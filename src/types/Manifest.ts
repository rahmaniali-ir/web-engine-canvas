import { WebObject } from "./WebObject"
import { Asset } from "./Asset"
import { Prefab } from "./Prefab"

export interface Scene {
  id: string
  name: string
  path: string
  root: WebObject
}

export interface Route {
  id: string
  path: string
  sceneId: string
  children?: Route[]
}

export interface Manifest {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  routes: Route[]
  scenes: Scene[]
  defaultRoute?: string
  assets: Map<string, Asset> // Simple map of assets by ID
  prefabs?: Prefab[] // Prefab definitions
  tags?: string[] // Global tags for the manifest
  settings?: {
    width?: number
    height?: number
    backgroundColor?: string
    responsive?: boolean
    assetPaths?: string[] // Additional asset search paths
  }
}

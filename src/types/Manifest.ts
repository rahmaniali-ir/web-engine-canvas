import { WebObject } from "./WebObject"

export interface Scene {
  id: string
  name: string
  path: string
  root: WebObject
  metadata?: Record<string, any>
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
}

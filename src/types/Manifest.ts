import { WebObject } from "./WebObject"

export interface Manifest {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  root: WebObject
}

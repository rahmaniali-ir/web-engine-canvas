// Prefab types for reusable WebObject templates

import { WebObject } from "./WebObject"
import { WebObjectComponent } from "./WebObjectComponent"
import { PrefabParameter } from "./Asset"

/**
 * Prefab interface - represents a reusable template for WebObjects
 * Similar to Unity3D's GameObject prefabs
 */
export interface Prefab {
  id: string
  name: string
  description?: string
  version: string
  author?: string
  tags?: string[]

  // The template WebObject structure
  template: WebObject

  // Default values for instantiation
  defaultValues?: Record<string, any>

  // Parameters that can be overridden during instantiation
  parameters?: PrefabParameter[]

  // Creation timestamp
  createdAt: Date
  updatedAt: Date
}

/**
 * Prefab instance - represents an instantiated prefab
 */
export interface PrefabInstance {
  id: string
  prefabId: string
  instance: WebObject
  parameters: Record<string, any>
  createdAt: Date
}

/**
 * Prefab manifest - for loading/saving prefabs
 */
export interface PrefabManifest {
  id: string
  name: string
  description?: string
  version: string
  author?: string
  tags?: string[]
  template: WebObject
  defaultValues?: Record<string, any>
  parameters?: PrefabParameter[]
  createdAt: string
  updatedAt: string
}

/**
 * Prefab registry - manages all available prefabs
 */
export interface PrefabRegistry {
  prefabs: Map<string, Prefab>
  categories: Map<string, string[]> // category -> prefab IDs
}

/**
 * Prefab instantiation options
 */
export interface PrefabInstantiationOptions {
  parentId?: string
  parameters?: Record<string, any>
  position?: { x: number; y: number; z?: number }
  scale?: { x: number; y: number; z?: number }
  rotation?: { x: number; y: number; z?: number }
  customId?: string
  overrideComponents?: WebObjectComponent[]
}

/**
 * Prefab search and filter options
 */
export interface PrefabSearchOptions {
  query?: string
  tags?: string[]
  category?: string
  author?: string
  limit?: number
  offset?: number
}

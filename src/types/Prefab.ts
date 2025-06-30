// Prefab types for reusable WebObject templates

import { WebObject } from "./WebObject"
import { WebObjectComponent } from "./WebObjectComponent"
import { PrefabParameter } from "./Asset"

/**
 * Prefab variant interface - represents a specific variation of a prefab
 */
export interface PrefabVariant {
  id: string
  name: string
  description?: string

  // The template WebObject structure for this variant
  template: WebObject

  // Default values specific to this variant
  defaultValues?: Record<string, any>

  // Parameters that can be overridden for this variant
  parameters?: PrefabParameter[]

  // Variant-specific metadata
  tags?: string[]
  category?: string
  isDefault?: boolean // Whether this is the default variant
}

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

  // The default template WebObject structure (for backward compatibility)
  template: WebObject

  // Default values for instantiation (for backward compatibility)
  defaultValues?: Record<string, any>

  // Parameters that can be overridden during instantiation (for backward compatibility)
  parameters?: PrefabParameter[]

  // Variants of this prefab
  variants?: PrefabVariant[]

  // Default variant ID (if not specified, uses the first variant or the main template)
  defaultVariantId?: string

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
  variantId?: string // Which variant was used
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
  variants?: PrefabVariant[]
  defaultVariantId?: string
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
  variantId?: string // Which variant to instantiate
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
  variantId?: string // Filter by specific variant
  limit?: number
  offset?: number
}

/**
 * Prefab variant selection options
 */
export interface PrefabVariantOptions {
  variantId?: string
  fallbackToDefault?: boolean // Whether to fallback to default variant if specified variant not found
  fallbackToMain?: boolean // Whether to fallback to main template if no variants exist
}

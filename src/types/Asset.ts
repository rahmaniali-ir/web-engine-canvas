// Asset system types for managing all library assets

import { WebObject } from "./WebObject"

/**
 * Base asset interface that all assets extend
 */
export interface BaseAsset {
  id: string
  name: string
  type: AssetType
  path: string // Folder structure path for asset management
  description?: string
  tags?: string[]
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

/**
 * All supported asset types
 */
export type AssetType =
  | "resource"
  | "prefab"
  | "component"
  | "stylePalette"
  | "animation"
  | "json"
  | "script"
  | "shader"
  | "audio"
  | "video"
  | "font"
  | "icon"

/**
 * Resource asset types
 */
export type ResourceType =
  | "image"
  | "link"
  | "text"
  | "svg"
  | "file"
  | "data"
  | "blob"

/**
 * Resource asset - for images, links, text, files, etc.
 */
export interface ResourceAsset extends BaseAsset {
  type: "resource"
  resourceType: ResourceType
  url?: string
  content?: string
  mimeType?: string
  size?: number
  dimensions?: {
    width: number
    height: number
  }
  encoding?: string
}

/**
 * Prefab asset - reusable WebObject templates
 */
export interface PrefabAsset extends BaseAsset {
  type: "prefab"
  template: WebObject
  parameters?: PrefabParameter[]
  defaultValues?: Record<string, any>
  version: string
  author?: string
}

/**
 * Component asset - reusable component definitions
 */
export interface ComponentAsset extends BaseAsset {
  type: "component"
  componentType: string
  config: Record<string, any>
  schema?: Record<string, any> // JSON schema for validation
  version: string
}

/**
 * Style palette asset - colors, gradients, fonts, etc.
 */
export interface StylePaletteAsset extends BaseAsset {
  type: "stylePalette"
  paletteType:
    | "color"
    | "gradient"
    | "font"
    | "spacing"
    | "border"
    | "shadow"
    | "animation"
  values: Record<string, any>
  theme?: string
  variant?: string
}

/**
 * Animation asset - keyframes, transitions, etc.
 */
export interface AnimationAsset extends BaseAsset {
  type: "animation"
  animationType: "keyframe" | "transition" | "easing" | "timeline"
  duration?: number
  easing?: string
  keyframes?: Record<string, any>
  properties?: string[]
}

/**
 * JSON asset - structured data
 */
export interface JsonAsset extends BaseAsset {
  type: "json"
  data: any
  schema?: Record<string, any>
  validation?: boolean
}

/**
 * Script asset - JavaScript/TypeScript code
 */
export interface ScriptAsset extends BaseAsset {
  type: "script"
  language: "javascript" | "typescript"
  code: string
  dependencies?: string[]
  exports?: string[]
}

/**
 * Shader asset - GLSL shaders
 */
export interface ShaderAsset extends BaseAsset {
  type: "shader"
  shaderType: "vertex" | "fragment" | "compute"
  code: string
  uniforms?: Record<string, any>
}

/**
 * Audio asset - sound files
 */
export interface AudioAsset extends BaseAsset {
  type: "audio"
  url: string
  duration?: number
  format: string
  bitrate?: number
}

/**
 * Video asset - video files
 */
export interface VideoAsset extends BaseAsset {
  type: "video"
  url: string
  duration?: number
  format: string
  dimensions?: {
    width: number
    height: number
  }
}

/**
 * Font asset - web fonts
 */
export interface FontAsset extends BaseAsset {
  type: "font"
  family: string
  url: string
  weight?: string
  style?: string
  formats?: string[]
}

/**
 * Icon asset - icon definitions
 */
export interface IconAsset extends BaseAsset {
  type: "icon"
  iconType: "svg" | "font" | "sprite"
  content: string
  viewBox?: string
  size?: number
}

/**
 * Union type for all assets
 */
export type Asset =
  | ResourceAsset
  | PrefabAsset
  | ComponentAsset
  | StylePaletteAsset
  | AnimationAsset
  | JsonAsset
  | ScriptAsset
  | ShaderAsset
  | AudioAsset
  | VideoAsset
  | FontAsset
  | IconAsset

/**
 * Asset reference - used to reference assets in components and other assets
 */
export interface AssetReference {
  assetId: string
  assetType: AssetType
  path?: string // Optional path override
  parameters?: Record<string, any> // For parameterized assets like prefabs
}

/**
 * Asset value - can be either a direct value or an asset reference
 */
export type AssetValue<T = any> = T | AssetReference

/**
 * Asset registry - manages all assets in the manifest
 */
export interface AssetRegistry {
  assets: Map<string, Asset>
  paths: Map<string, string[]> // path -> asset IDs
  types: Map<AssetType, string[]> // type -> asset IDs
  tags: Map<string, string[]> // tag -> asset IDs
}

/**
 * Asset manifest - for importing/exporting asset collections
 */
export interface AssetManifest {
  id: string
  name: string
  version: string
  description?: string
  assets: Asset[]
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

/**
 * Asset search and filter options
 */
export interface AssetSearchOptions {
  query?: string
  type?: AssetType
  tags?: string[]
  path?: string
  author?: string
  limit?: number
  offset?: number
}

/**
 * Asset creation options
 */
export interface AssetCreationOptions {
  id?: string
  path?: string
  tags?: string[]
  metadata?: Record<string, any>
  overwrite?: boolean
}

/**
 * Prefab parameter definition (moved from Prefab.ts)
 */
export interface PrefabParameter {
  name: string
  type: "string" | "number" | "boolean" | "object" | "array" | "asset"
  defaultValue?: any
  description?: string
  required?: boolean
  validation?: (value: any) => boolean | string
  assetType?: AssetType // For asset type parameters
}

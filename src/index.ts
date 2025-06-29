// Main library exports - Public API only

// Export WebEngineCanvas component (main public API)
export { default as WebEngineCanvas } from "./components/WebEngineCanvas"

// Export public types that developers need
export type { Manifest } from "./types/Manifest"
export type { WebObjectContext } from "./types/Context"

// Export WebObject types for manifest definition
export type { WebObject } from "./types/WebObject"
export type { WebObjectComponent } from "./types/WebObjectComponent"

// Export component types for manifest definition
export type {
  MeshComponent,
  MaterialComponent,
  MarginComponent,
  PaddingComponent,
  BorderComponent,
  BorderRadiusComponent,
  TypographyComponent,
  InteractionComponent,
  TransitionComponent,
  BoxShadowComponent,
  FilterComponent,
} from "./types/components"

// Export asset types for manifest definition
export type {
  Asset,
  AssetType,
  AssetReference,
  AssetValue,
  AssetRegistry,
  ResourceAsset,
  PrefabAsset,
  ComponentAsset,
  StylePaletteAsset,
  AnimationAsset,
  JsonAsset,
  ScriptAsset,
  ShaderAsset,
  AudioAsset,
  VideoAsset,
  FontAsset,
  IconAsset,
} from "./types/Asset"

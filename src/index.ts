// Main library exports - Public API only

// Export WebEngineCanvas component (main public API)
export { default as WebEngineCanvas } from "./components/WebEngineCanvas"

// Export public types that developers need
export type { Manifest, Scene, Route } from "./types/Manifest"
export type { WebObjectContext } from "./types/Context"

// Export WebObject types for manifest definition
export type {
  WebObject,
  DivWebObject,
  LinkWebObject,
  ButtonWebObject,
  InputWebObject,
  ImageWebObject,
  HeadingWebObject,
  ParagraphWebObject,
  SpanWebObject,
} from "./types/WebObject"

export type { WebObjectComponent } from "./types/WebObjectComponent"

// Export component types for manifest definition
export type {
  MaterialComponent,
  TypographyComponent,
  MeshComponent,
  PaddingComponent,
  MarginComponent,
  BorderRadiusComponent,
  BoxShadowComponent,
  FilterComponent,
  TransitionComponent,
  InteractionComponent,
} from "./types/components"

// Export asset types for manifest definition
export type {
  Asset,
  AssetType,
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
  AssetReference,
  AssetValue,
  AssetSearchOptions,
  AssetCreationOptions,
  PrefabParameter,
} from "./types/Asset"

export type {
  Prefab,
  PrefabInstance,
  PrefabManifest,
  PrefabRegistry,
  PrefabInstantiationOptions,
  PrefabSearchOptions,
} from "./types/Prefab"

// Export services
export { AssetService } from "./services/AssetService"
export { PrefabService } from "./services/PrefabService"
export { RouterService } from "./services/RouterService"
export { WebObjectComponentService } from "./services/WebObjectComponentService"
export { WebObjectTreeService } from "./services/WebObjectTreeService"

// Export components
export { default as PrefabBrowser } from "./components/PrefabBrowser"
export { default as PrefabComponent } from "./components/PrefabComponent"

// Export hooks
export { useAssets } from "./hooks/useAssets"
export { usePrefabs } from "./hooks/usePrefabs"
export { useWebObjects } from "./hooks/useWebObjects"

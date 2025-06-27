// Main library entry point
export { default as WebEngineCanvas } from "./components/WebEngineCanvas"
export type { WebEngineCanvasProps } from "./components/WebEngineCanvas"

// Export WebObject component
export { default as WebObject } from "./components/WebObject"

// Export hooks
export { useWebObjects } from "./hooks/useWebObjects"

// Export types
export type {
  WebObject as WebObjectType,
  WebObjectComponent,
  MeshComponent,
  MarginComponent,
  PaddingComponent,
  BorderComponent,
  BorderRadiusComponent,
  TypographyComponent,
  InteractionComponent,
  TransitionComponent,
  BoxShadowComponent,
  MaterialComponent,
  WebObjectManifest,
  CanvasManifest,
  WebObjectContext,
  WebObjectTree,
  FilterComponent,
} from "./types"

// Export services
export { WebObjectTreeService } from "./services/WebObjectTreeService"
export { WebObjectComponentService } from "./services/WebObjectComponentService"

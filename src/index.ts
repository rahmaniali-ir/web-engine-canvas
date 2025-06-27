// Main library entry point
export { default as WebEngineCanvas } from "./components/WebEngineCanvas"
export type { WebEngineCanvasProps } from "./components/WebEngineCanvas"

// Export WebObject component
export { default as WebObjectComponent } from "./components/WebObject"

// Export hooks
export { useWebObjects } from "./hooks/useWebObjects"

// Export types
export type {
  WebObject,
  WebObjectManifest,
  CanvasManifest,
  WebObjectContext,
  WebObjectTree,
} from "./types"

// Export services
export { WebObjectTreeService } from "./services/WebObjectTreeService"

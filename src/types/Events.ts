import { RouterState } from "../services/RouterService"
import { WebObjectContext } from "./Context"
import { WebObject } from "./WebObject"

// Base event interface
export interface BaseEvent {
  name: string
  timestamp: number
  source: string
  nativeEvent?: Event
  data?: any
}

// WebObject events
export interface WebObjectEvent extends BaseEvent {
  name: "webObject"
  type: string
  webObject: WebObject
  element?: HTMLElement
}

export interface WebObjectAddEvent extends WebObjectEvent {
  type: "add"
  parentId: string
}

export interface WebObjectRemoveEvent extends WebObjectEvent {
  type: "remove"
}

export interface WebObjectMoveEvent extends WebObjectEvent {
  type: "move"
  oldParentId?: string
  newParentId: string
}

// Router events
export interface RouterEvent extends BaseEvent {
  name: "router"
  routerState: RouterState
}

export interface RouteChangeEvent extends RouterEvent {
  type: "change"
  previousState?: RouterState
}

export interface RouteNavigateEvent extends RouterEvent {
  type: "navigate"
  path: string
}

export interface RouteBackEvent extends RouterEvent {
  type: "back"
}

export interface RouteForwardEvent extends RouterEvent {
  type: "forward"
}

// Service events
export interface ServiceEvent extends BaseEvent {
  name: "service"
  serviceName: string
}

export interface ServiceInitializeEvent extends ServiceEvent {
  type: "initialize"
  serviceName: "asset" | "animation" | "router" | "tree"
}

export interface ServiceErrorEvent extends ServiceEvent {
  type: "error"
  error: Error
}

// Canvas lifecycle events
export interface CanvasLifecycleEvent extends BaseEvent {
  name: "canvas"
}

export interface CanvasReadyEvent extends CanvasLifecycleEvent {
  type: "ready"
  context: WebObjectContext
}

export interface CanvasMountEvent extends CanvasLifecycleEvent {
  type: "mount"
}

export interface CanvasUnmountEvent extends CanvasLifecycleEvent {
  type: "unmount"
}

// Debug events
export interface DebugEvent extends BaseEvent {
  name: "debug"
  level: "log" | "warn" | "error" | "info"
  message: string
  details?: any
}

// Union type for all events
export type CanvasEventUnion =
  | WebObjectEvent
  | WebObjectAddEvent
  | WebObjectRemoveEvent
  | WebObjectMoveEvent
  | RouteChangeEvent
  | RouteNavigateEvent
  | RouteBackEvent
  | RouteForwardEvent
  | ServiceInitializeEvent
  | ServiceErrorEvent
  | CanvasReadyEvent
  | CanvasMountEvent
  | CanvasUnmountEvent
  | DebugEvent

// Event emitter interface
export interface EventEmitter {
  on(event: string, listener: (event: CanvasEventUnion) => void): void
  off(event: string, listener: (event: CanvasEventUnion) => void): void
  emit(event: CanvasEventUnion): void
  once(event: string, listener: (event: CanvasEventUnion) => void): void
}

// Debug configuration
export interface DebugConfig {
  enabled: boolean
  logLevel: "log" | "warn" | "error" | "info"
  logToConsole: boolean
  logToCustomHandler?: (event: DebugEvent) => void
  includeTimestamps: boolean
  includeStackTraces: boolean
  filterEvents?: string[]
}

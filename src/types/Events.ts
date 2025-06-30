import { WebObject } from "./WebObject"
import { RouterState } from "../services/RouterService"
import { WebObjectContext } from "./Context"

// Base event interface
export interface BaseEvent {
  type: string
  timestamp: number
  source: string
  data?: any
}

// WebObject events
export interface WebObjectEvent extends BaseEvent {
  type: "webObject"
  webObjectId: string
  webObject: WebObject
  element?: HTMLElement
}

export interface WebObjectReadyEvent extends WebObjectEvent {
  subtype: "ready"
}

export interface WebObjectUpdateEvent extends WebObjectEvent {
  subtype: "update"
}

export interface WebObjectAddEvent extends WebObjectEvent {
  subtype: "add"
  parentId: string
}

export interface WebObjectRemoveEvent extends WebObjectEvent {
  subtype: "remove"
}

export interface WebObjectMoveEvent extends WebObjectEvent {
  subtype: "move"
  oldParentId?: string
  newParentId: string
}

// Router events
export interface RouterEvent extends BaseEvent {
  type: "router"
  routerState: RouterState
}

export interface RouteChangeEvent extends RouterEvent {
  subtype: "change"
  previousState?: RouterState
}

export interface RouteNavigateEvent extends RouterEvent {
  subtype: "navigate"
  path: string
}

export interface RouteBackEvent extends RouterEvent {
  subtype: "back"
}

export interface RouteForwardEvent extends RouterEvent {
  subtype: "forward"
}

// Service events
export interface ServiceEvent extends BaseEvent {
  type: "service"
  serviceName: string
}

export interface ServiceInitializeEvent extends ServiceEvent {
  subtype: "initialize"
  serviceName: "asset" | "animation" | "router" | "tree"
}

export interface ServiceErrorEvent extends ServiceEvent {
  subtype: "error"
  error: Error
}

// Canvas lifecycle events
export interface CanvasLifecycleEvent extends BaseEvent {
  type: "canvas"
}

export interface CanvasReadyEvent extends CanvasLifecycleEvent {
  subtype: "ready"
  context: WebObjectContext
}

export interface CanvasMountEvent extends CanvasLifecycleEvent {
  subtype: "mount"
}

export interface CanvasUnmountEvent extends CanvasLifecycleEvent {
  subtype: "unmount"
}

// Debug events
export interface DebugEvent extends BaseEvent {
  type: "debug"
  level: "log" | "warn" | "error" | "info"
  message: string
  details?: any
}

// Union type for all events
export type CanvasEventUnion =
  | WebObjectReadyEvent
  | WebObjectUpdateEvent
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

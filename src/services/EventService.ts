import {
  CanvasEventUnion,
  EventEmitter,
  DebugConfig,
  DebugEvent,
  WebObjectReadyEvent,
  WebObjectUpdateEvent,
  WebObjectAddEvent,
  WebObjectRemoveEvent,
  WebObjectMoveEvent,
  RouteChangeEvent,
  RouteNavigateEvent,
  RouteBackEvent,
  RouteForwardEvent,
  ServiceInitializeEvent,
  ServiceErrorEvent,
  CanvasReadyEvent,
  CanvasMountEvent,
  CanvasUnmountEvent,
} from "../types/Events"

export class EventService implements EventEmitter {
  private listeners: Map<string, Set<(event: CanvasEventUnion) => void>> =
    new Map()
  private debugConfig: DebugConfig
  private lastLogTime: Map<string, number> = new Map()
  private readonly LOG_THROTTLE_MS = 1000 // Only log same event type once per second

  constructor(debugConfig: DebugConfig) {
    this.debugConfig = debugConfig
  }

  on(event: string, listener: (event: CanvasEventUnion) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(listener)
  }

  off(event: string, listener: (event: CanvasEventUnion) => void): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.delete(listener)
      if (eventListeners.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  emit(event: CanvasEventUnion): void {
    // Add timestamp if not present
    if (!event.timestamp) {
      event.timestamp = Date.now()
    }

    // Debug logging
    if (this.debugConfig.enabled) {
      this.logDebugEvent(event)
    }

    // Emit to specific event listeners
    const eventListeners = this.listeners.get(event.type)
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(event)
        } catch (error) {
          console.error(`Error in event listener for ${event.type}:`, error)
        }
      })
    }

    // Emit to wildcard listeners
    const wildcardListeners = this.listeners.get("*")
    if (wildcardListeners) {
      wildcardListeners.forEach(listener => {
        try {
          listener(event)
        } catch (error) {
          console.error(`Error in wildcard event listener:`, error)
        }
      })
    }
  }

  once(event: string, listener: (event: CanvasEventUnion) => void): void {
    const onceListener = (eventData: CanvasEventUnion) => {
      listener(eventData)
      this.off(event, onceListener)
    }
    this.on(event, onceListener)
  }

  // Helper methods for creating specific events
  emitWebObjectReady(
    webObjectId: string,
    webObject: any,
    element?: HTMLElement
  ): void {
    const event: WebObjectReadyEvent = {
      type: "webObject",
      subtype: "ready",
      timestamp: Date.now(),
      source: "WebObjectComponent",
      webObjectId,
      webObject,
      element,
    }
    this.emit(event)
  }

  emitWebObjectUpdate(
    webObjectId: string,
    webObject: any,
    element?: HTMLElement
  ): void {
    const event: WebObjectUpdateEvent = {
      type: "webObject",
      subtype: "update",
      timestamp: Date.now(),
      source: "WebObjectComponent",
      webObjectId,
      webObject,
      element,
    }
    this.emit(event)
  }

  emitWebObjectAdd(
    webObjectId: string,
    webObject: any,
    parentId: string
  ): void {
    const event: WebObjectAddEvent = {
      type: "webObject",
      subtype: "add",
      timestamp: Date.now(),
      source: "WebObjectTreeService",
      webObjectId,
      webObject,
      parentId,
    }
    this.emit(event)
  }

  emitWebObjectRemove(webObjectId: string, webObject: any): void {
    const event: WebObjectRemoveEvent = {
      type: "webObject",
      subtype: "remove",
      timestamp: Date.now(),
      source: "WebObjectTreeService",
      webObjectId,
      webObject,
    }
    this.emit(event)
  }

  emitWebObjectMove(
    webObjectId: string,
    webObject: any,
    oldParentId: string,
    newParentId: string
  ): void {
    const event: WebObjectMoveEvent = {
      type: "webObject",
      subtype: "move",
      timestamp: Date.now(),
      source: "WebObjectTreeService",
      webObjectId,
      webObject,
      oldParentId,
      newParentId,
    }
    this.emit(event)
  }

  emitRouteChange(routerState: any, previousState?: any): void {
    const event: RouteChangeEvent = {
      type: "router",
      subtype: "change",
      timestamp: Date.now(),
      source: "RouterService",
      routerState,
      previousState,
    }
    this.emit(event)
  }

  emitRouteNavigate(path: string, routerState: any): void {
    const event: RouteNavigateEvent = {
      type: "router",
      subtype: "navigate",
      timestamp: Date.now(),
      source: "RouterService",
      path,
      routerState,
    }
    this.emit(event)
  }

  emitRouteBack(routerState: any): void {
    const event: RouteBackEvent = {
      type: "router",
      subtype: "back",
      timestamp: Date.now(),
      source: "RouterService",
      routerState,
    }
    this.emit(event)
  }

  emitRouteForward(routerState: any): void {
    const event: RouteForwardEvent = {
      type: "router",
      subtype: "forward",
      timestamp: Date.now(),
      source: "RouterService",
      routerState,
    }
    this.emit(event)
  }

  emitServiceInitialize(
    serviceName: "asset" | "animation" | "router" | "tree"
  ): void {
    const event: ServiceInitializeEvent = {
      type: "service",
      subtype: "initialize",
      timestamp: Date.now(),
      source: "Canvas",
      serviceName,
    }
    this.emit(event)
  }

  emitServiceError(serviceName: string, error: Error): void {
    const event: ServiceErrorEvent = {
      type: "service",
      subtype: "error",
      timestamp: Date.now(),
      source: "Canvas",
      serviceName,
      error,
    }
    this.emit(event)
  }

  emitCanvasReady(context: any): void {
    const event: CanvasReadyEvent = {
      type: "canvas",
      subtype: "ready",
      timestamp: Date.now(),
      source: "WebEngineCanvas",
      context,
    }
    this.emit(event)
  }

  emitCanvasMount(): void {
    const event: CanvasMountEvent = {
      type: "canvas",
      subtype: "mount",
      timestamp: Date.now(),
      source: "WebEngineCanvas",
    }
    this.emit(event)
  }

  emitCanvasUnmount(): void {
    const event: CanvasUnmountEvent = {
      type: "canvas",
      subtype: "unmount",
      timestamp: Date.now(),
      source: "WebEngineCanvas",
    }
    this.emit(event)
  }

  // Debug logging
  private logDebugEvent(event: CanvasEventUnion): void {
    if (
      this.debugConfig.filterEvents &&
      !this.debugConfig.filterEvents.includes(event.type)
    ) {
      return
    }

    // Throttle logging to prevent excessive console output
    const eventKey = `${event.type}:${this.getEventSubtype(event)}`
    const now = Date.now()
    const lastLog = this.lastLogTime.get(eventKey) || 0

    if (now - lastLog < this.LOG_THROTTLE_MS) {
      return // Skip logging if too recent
    }

    this.lastLogTime.set(eventKey, now)

    const debugEvent: DebugEvent = {
      type: "debug",
      timestamp: Date.now(),
      source: "EventService",
      level: "log",
      message: `[${event.type}] ${event.source}`,
      details: event,
    }

    if (this.debugConfig.logToConsole) {
      const timestamp = this.debugConfig.includeTimestamps
        ? `[${new Date(event.timestamp).toISOString()}] `
        : ""

      const prefix = `${timestamp}[Canvas]`

      switch (event.type) {
        case "webObject":
          console.log(
            `${prefix} WebObject ${event.subtype}: ${event.webObjectId}`,
            event
          )
          break
        case "router":
          console.log(`${prefix} Router ${event.subtype}:`, event)
          break
        case "service":
          console.log(
            `${prefix} Service ${event.subtype}: ${event.serviceName}`,
            event
          )
          break
        case "canvas":
          console.log(`${prefix} Canvas ${event.subtype}:`, event)
          break
        default:
          console.log(`${prefix} Unknown event:`, event)
      }
    }

    if (this.debugConfig.logToCustomHandler) {
      this.debugConfig.logToCustomHandler(debugEvent)
    }
  }

  private getEventSubtype(event: CanvasEventUnion): string {
    // Check if the event has a subtype property
    if ("subtype" in event && event.subtype) {
      return event.subtype
    }

    // For events without subtype, use a default
    return "default"
  }

  // Update debug configuration
  updateDebugConfig(config: Partial<DebugConfig>): void {
    this.debugConfig = { ...this.debugConfig, ...config }
  }

  // Get current debug configuration
  getDebugConfig(): DebugConfig {
    return { ...this.debugConfig }
  }

  // Clear all listeners
  clear(): void {
    this.listeners.clear()
  }

  // Get listener count for debugging
  getListenerCount(event?: string): number {
    if (event) {
      return this.listeners.get(event)?.size || 0
    }
    return Array.from(this.listeners.values()).reduce(
      (total, listeners) => total + listeners.size,
      0
    )
  }
}

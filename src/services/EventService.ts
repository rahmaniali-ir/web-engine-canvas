import {
  CanvasEventUnion,
  CanvasMountEvent,
  CanvasReadyEvent,
  CanvasUnmountEvent,
  DebugConfig,
  DebugEvent,
  EventEmitter,
  RouteBackEvent,
  RouteChangeEvent,
  RouteForwardEvent,
  RouteNavigateEvent,
  ServiceErrorEvent,
  ServiceInitializeEvent,
  WebObjectAddEvent,
  WebObjectEvent,
  WebObjectMoveEvent,
  WebObjectRemoveEvent,
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
    const eventListeners = this.listeners.get(event.name)
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(event)
        } catch (error) {
          console.error(`Error in event listener for ${event.name}:`, error)
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
  emitWebObjectReady(webObject: any, element?: HTMLElement): void {
    const event: WebObjectEvent = {
      name: "webObject",
      type: "ready",
      timestamp: Date.now(),
      source: "WebObjectComponent",
      webObject,
      element,
    }
    this.emit(event)
  }

  emitWebObjectUpdate(webObject: any, element?: HTMLElement): void {
    const event: WebObjectEvent = {
      name: "webObject",
      type: "update",
      timestamp: Date.now(),
      source: "EventService",
      webObject,
      element,
    }
    this.emit(event)
  }

  emitWebObjectAdd(webObject: any, parentId: string): void {
    const event: WebObjectAddEvent = {
      name: "webObject",
      type: "add",
      timestamp: Date.now(),
      source: "WebObjectTreeService",
      webObject,
      parentId,
    }
    this.emit(event)
  }

  emitWebObjectRemove(_webObjectId: string, webObject: any): void {
    const event: WebObjectRemoveEvent = {
      name: "webObject",
      type: "remove",
      timestamp: Date.now(),
      source: "WebObjectTreeService",
      webObject,
    }
    this.emit(event)
  }

  emitWebObjectMove(
    _: string,
    webObject: any,
    oldParentId: string,
    newParentId: string
  ): void {
    const event: WebObjectMoveEvent = {
      name: "webObject",
      type: "move",
      timestamp: Date.now(),
      source: "WebObjectTreeService",
      webObject,
      oldParentId,
      newParentId,
    }
    this.emit(event)
  }

  emitWebObjectEvent(
    webObject: any,
    eventName: string,
    element?: HTMLElement,
    nativeEvent?: Event
  ): WebObjectEvent {
    const event: WebObjectEvent = {
      name: "webObject",
      type: eventName,
      timestamp: Date.now(),
      source: "EventService",
      webObject,
      element,
      nativeEvent,
    }

    this.emit(event)
    return event
  }

  emitRouteChange(routerState: any, previousState?: any): void {
    const event: RouteChangeEvent = {
      name: "router",
      type: "change",
      timestamp: Date.now(),
      source: "RouterService",
      routerState,
      previousState,
    }
    this.emit(event)
  }

  emitRouteNavigate(path: string, routerState: any): void {
    const event: RouteNavigateEvent = {
      name: "router",
      type: "navigate",
      timestamp: Date.now(),
      source: "RouterService",
      path,
      routerState,
    }
    this.emit(event)
  }

  emitRouteBack(routerState: any): void {
    const event: RouteBackEvent = {
      name: "router",
      type: "back",
      timestamp: Date.now(),
      source: "RouterService",
      routerState,
    }
    this.emit(event)
  }

  emitRouteForward(routerState: any): void {
    const event: RouteForwardEvent = {
      name: "router",
      type: "forward",
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
      name: "service",
      type: "initialize",
      timestamp: Date.now(),
      source: "Canvas",
      serviceName,
    }
    this.emit(event)
  }

  emitServiceError(serviceName: string, error: Error): void {
    const event: ServiceErrorEvent = {
      name: "service",
      type: "error",
      timestamp: Date.now(),
      source: "Canvas",
      serviceName,
      error,
    }
    this.emit(event)
  }

  emitCanvasReady(context: any): void {
    const event: CanvasReadyEvent = {
      name: "canvas",
      type: "ready",
      timestamp: Date.now(),
      source: "WebEngineCanvas",
      context,
    }
    this.emit(event)
  }

  emitCanvasMount(): void {
    const event: CanvasMountEvent = {
      name: "canvas",
      type: "mount",
      timestamp: Date.now(),
      source: "WebEngineCanvas",
    }
    this.emit(event)
  }

  emitCanvasUnmount(): void {
    const event: CanvasUnmountEvent = {
      name: "canvas",
      type: "unmount",
      timestamp: Date.now(),
      source: "WebEngineCanvas",
    }
    this.emit(event)
  }

  // Debug logging
  private logDebugEvent(event: CanvasEventUnion): void {
    if (
      this.debugConfig.filterEvents &&
      !this.debugConfig.filterEvents.includes(event.name)
    ) {
      return
    }

    // Throttle logging to prevent excessive console output
    const eventKey = `${event.name}:${this.getEventtype(event)}`
    const now = Date.now()
    const lastLog = this.lastLogTime.get(eventKey) || 0

    if (now - lastLog < this.LOG_THROTTLE_MS) {
      return // Skip logging if too recent
    }

    this.lastLogTime.set(eventKey, now)

    const debugEvent: DebugEvent = {
      name: "debug",
      timestamp: Date.now(),
      source: "EventService",
      level: "log",
      message: `[${event.name}] ${event.source}`,
      details: event,
    }

    if (this.debugConfig.logToConsole) {
    }

    if (this.debugConfig.logToCustomHandler) {
      this.debugConfig.logToCustomHandler(debugEvent)
    }
  }

  private getEventtype(event: CanvasEventUnion): string {
    // Check if the event has a type property
    if ("type" in event && event.type) {
      return event.type
    }

    // For events without type, use a default
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

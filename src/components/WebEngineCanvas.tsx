import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimationService } from "../services/AnimationService"
import { AssetService } from "../services/AssetService"
import { EventService } from "../services/EventService"
import { RouterService, RouterState } from "../services/RouterService"
import { WebObjectTreeService } from "../services/WebObjectTreeService"
import { WebObjectContext } from "../types/Context"
import { CanvasEventUnion, DebugConfig } from "../types/Events"
import { Manifest } from "../types/Manifest"
import { WebObject, WebObjectEventListener } from "../types/WebObject"
import WebObjectComponent from "./WebObject"

export interface WebEngineCanvasProps {
  manifest: Manifest
  className?: string
  style?: React.CSSProperties
  debug?: boolean | DebugConfig
  globalEvents?: WebObjectEventListener[]
  onCanvasReady?: (context: WebObjectContext) => void
  onWebObjectReady?: (element: HTMLElement, webObject: WebObject) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: WebObject) => void
  onRouteChange?: (state: RouterState) => void
  onEvent?: (event: CanvasEventUnion) => void
}

const WebEngineCanvas: React.FC<WebEngineCanvasProps> = ({
  manifest,
  className = "",
  style = {},
  debug = false,
  globalEvents = [],
  onCanvasReady,
  onRouteChange,
  onEvent,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [routerService, setRouterService] = useState<RouterService | null>(null)
  const [routerState, setRouterState] = useState<RouterState | null>(null)
  const [treeService, setTreeService] = useState<WebObjectTreeService | null>(
    null
  )
  const [assetService, setAssetService] = useState<AssetService | null>(null)
  const [animationService, setAnimationService] =
    useState<AnimationService | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const previousRouterStateRef = useRef<RouterState | null>(null)
  const lastDebugLogRef = useRef<Record<string, number>>({})

  // Initialize debug configuration
  const debugConfig = useMemo((): DebugConfig => {
    if (typeof debug === "boolean") {
      return {
        enabled: debug,
        logLevel: "log",
        logToConsole: debug,
        includeTimestamps: true,
        includeStackTraces: false,
      }
    }
    // If debug is an object, use it directly with defaults
    const config = debug as DebugConfig
    return {
      enabled: config.enabled ?? true,
      logLevel: config.logLevel ?? "log",
      logToConsole: config.logToConsole ?? true,
      includeTimestamps: config.includeTimestamps ?? true,
      includeStackTraces: config.includeStackTraces ?? false,
      logToCustomHandler: config.logToCustomHandler,
      filterEvents: config.filterEvents,
    }
  }, [debug])

  // Helper function to throttle debug logging
  const debugLog = useCallback(
    (key: string, _message: string, ..._args: any[]) => {
      if (!debugConfig.enabled) return

      const now = Date.now()
      const lastLog = lastDebugLogRef.current[key] || 0
      const throttleMs = 2000 // Only log same message once per 2 seconds

      if (now - lastLog < throttleMs) {
        return
      }

      lastDebugLogRef.current[key] = now
    },
    [debugConfig.enabled]
  )

  // Initialize event service
  const eventService = useMemo(
    () => new EventService(debugConfig),
    [debugConfig]
  )

  // Set up event listeners
  useEffect(() => {
    if (onEvent) {
      eventService.on("*", onEvent)
      return () => eventService.off("*", onEvent)
    }
  }, [eventService, onEvent])

  // Emit canvas mount event
  useEffect(() => {
    eventService.emitCanvasMount()
    return () => eventService.emitCanvasUnmount()
  }, [eventService])

  // Initialize the asset service when manifest changes
  useEffect(() => {
    if (manifest?.assets) {
      const assetService = new AssetService()

      // Initialize with assets from manifest
      const assets = Array.from(manifest.assets.values())
      debugLog(
        "assets_loading",
        "WebEngineCanvas: Loading assets:",
        assets.map(a => ({ id: a.id, type: a.type }))
      )

      assetService.initializeFromManifest(assets)
      setAssetService(assetService)
      eventService.emitServiceInitialize("asset")

      debugLog(
        "assets_ready",
        "WebEngineCanvas: AssetService initialized with",
        assets.length,
        "assets"
      )
    }
  }, [manifest?.assets, debugConfig.enabled, eventService, debugLog])

  // Initialize the router service when manifest changes
  useEffect(() => {
    debugLog("manifest_change", "WebEngineCanvas: Manifest changed", manifest)

    if (manifest) {
      const router = new RouterService(manifest)
      router.initialize()
      setRouterService(router)
      eventService.emitServiceInitialize("router")

      // Subscribe to router state changes
      const unsubscribe = router.subscribe(state => {
        debugLog(
          "router_state_change",
          "WebEngineCanvas: Router state changed",
          state
        )

        const previousState = previousRouterStateRef.current
        eventService.emitRouteChange(state, previousState)

        // Check if the scene has actually changed
        const currentSceneId = state.currentScene?.id
        const previousSceneId = previousState?.currentScene?.id
        const sceneChanged = currentSceneId !== previousSceneId

        if (state.currentScene?.root) {
          debugLog(
            "scene_loading",
            "WebEngineCanvas: Loading scene",
            state.currentScene.id,
            sceneChanged ? "(scene changed)" : "(same scene)"
          )

          // Only create new tree service if scene has changed
          if (sceneChanged) {
            debugLog(
              "tree_service_create",
              "WebEngineCanvas: Creating new tree service for scene:",
              state.currentScene.id
            )
            const newTreeService = new WebObjectTreeService(
              state.currentScene.root
            )
            setTreeService(newTreeService)
            eventService.emitServiceInitialize("tree")
          } else {
            debugLog(
              "tree_service_skip",
              "WebEngineCanvas: Skipping tree service creation - same scene:",
              state.currentScene.id
            )
          }

          // Update router state
          setRouterState(state)
          previousRouterStateRef.current = state
          setIsTransitioning(false)

          if (onRouteChange) {
            onRouteChange(state)
          }
        } else {
          // No scene found
          setTreeService(null)
          setRouterState(state)
          previousRouterStateRef.current = state
          setIsTransitioning(false)

          if (onRouteChange) {
            onRouteChange(state)
          }
        }
      })

      // Get initial state
      const initialState = router.getState()
      if (initialState.currentScene?.root) {
        const initialService = new WebObjectTreeService(
          initialState.currentScene.root
        )
        setTreeService(initialService)
        eventService.emitServiceInitialize("tree")
      }
      setRouterState(initialState)
      previousRouterStateRef.current = initialState

      return unsubscribe
    }
  }, [manifest, onRouteChange, debugConfig.enabled, eventService, debugLog])

  // Initialize the animation service when asset service changes
  useEffect(() => {
    if (assetService) {
      debugLog(
        "animation_service_init",
        "WebEngineCanvas: Initializing AnimationService with AssetService"
      )
      const animationService = new AnimationService(assetService)
      setAnimationService(animationService)
      eventService.emitServiceInitialize("animation")
      debugLog(
        "animation_service_ready",
        "WebEngineCanvas: AnimationService initialized"
      )
    } else {
      debugLog(
        "animation_service_no_asset",
        "WebEngineCanvas: No AssetService available for AnimationService"
      )
    }
  }, [assetService, debugConfig.enabled, eventService, debugLog])

  // Memoized context methods to prevent recreation
  const updateWebObject = useCallback(
    (id: string, updates: Partial<WebObject>) => {
      if (treeService) {
        const node = treeService.getNode(id)
        if (node) {
          treeService.updateNode(id, updates)
          eventService.emitWebObjectUpdate({ ...node, ...updates })
        }
      }
    },
    [treeService, eventService]
  )

  const addWebObject = useCallback(
    (parentId: string, webObject: WebObject) => {
      if (treeService) {
        const success = treeService.addNode(parentId, webObject)
        if (success) {
          eventService.emitWebObjectAdd(webObject, parentId)
        }
      }
    },
    [treeService, eventService]
  )

  const removeWebObject = useCallback(
    (id: string) => {
      if (treeService) {
        const node = treeService.getNode(id)
        if (node) {
          const success = treeService.removeNode(id)
          if (success) {
            eventService.emitWebObjectRemove(id, node)
          }
        }
      }
    },
    [treeService, eventService]
  )

  const moveWebObject = useCallback(
    (id: string, newParentId: string) => {
      if (treeService) {
        const node = treeService.getNode(id)
        const oldParentId = treeService.getParent(id)?.id
        if (node) {
          const success = treeService.moveNode(id, newParentId)
          if (success) {
            eventService.emitWebObjectMove(
              id,
              node,
              oldParentId || "",
              newParentId
            )
          }
        }
      }
    },
    [treeService, eventService]
  )

  // Navigation methods
  const navigate = useCallback(
    (path: string) => {
      if (routerService) {
        eventService.emitRouteNavigate(path, routerService.getState())
        routerService.navigate(path)
      }
    },
    [routerService, eventService]
  )

  const goBack = useCallback(() => {
    if (routerService) {
      eventService.emitRouteBack(routerService.getState())
      routerService.goBack()
    }
  }, [routerService, eventService])

  const goForward = useCallback(() => {
    if (routerService) {
      eventService.emitRouteForward(routerService.getState())
      routerService.goForward()
    }
  }, [routerService, eventService])

  // Memoized context object
  const webObjectContext = useMemo(() => {
    if (!treeService || !canvasRef.current || !routerState) return null

    const context = {
      canvas: canvasRef.current,
      manifest,
      webObjectTree: treeService.getTree(),
      routerState,
      assetService,
      animationService,
      navigate,
      goBack,
      goForward,
      updateWebObject,
      addWebObject,
      removeWebObject,
      moveWebObject,
      eventService, // Expose event service in context
    } as WebObjectContext

    return context
  }, [
    treeService,
    manifest,
    routerState,
    assetService,
    animationService,
    navigate,
    goBack,
    goForward,
    updateWebObject,
    addWebObject,
    removeWebObject,
    moveWebObject,
    eventService,
    debugConfig.enabled,
  ])

  // Notify when context is ready
  useEffect(() => {
    if (webObjectContext && onCanvasReady) {
      eventService.emitCanvasReady(webObjectContext)
      onCanvasReady(webObjectContext)
    }
  }, [webObjectContext, onCanvasReady, eventService])

  // Debug logging
  if (debugConfig.enabled && treeService && routerState?.currentScene) {
    debugLog(
      "render_tree",
      "WebEngineCanvas: Rendering WebObjectComponent with scene root",
      treeService.getTree().root
    )
  }

  return (
    <div
      ref={canvasRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "auto",
        ...style,
      }}
    >
      {treeService && routerState?.currentScene ? (
        <div
          key={routerState.currentScene.id}
          style={{
            opacity: isTransitioning ? 0.8 : 1,
            transition: "opacity 0.15s ease-in-out",
          }}
        >
          <WebObjectComponent
            webObject={treeService.getTree().root}
            context={webObjectContext || undefined}
            eventListeners={globalEvents}
            onEvent={onEvent}
          />
        </div>
      ) : (
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          No scene found for current route
        </div>
      )}
    </div>
  )
}

export default WebEngineCanvas

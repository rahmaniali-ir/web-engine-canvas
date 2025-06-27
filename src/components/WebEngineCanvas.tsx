import React, { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { Manifest, WebObject, WebObjectContext } from "../types"
import { WebObjectTreeService } from "../services/WebObjectTreeService"
import { RouterService, RouterState } from "../services/RouterService"
import WebObjectComponent from "./WebObject"

export interface WebEngineCanvasProps {
  manifest: Manifest
  className?: string
  style?: React.CSSProperties
  onCanvasReady?: (context: WebObjectContext) => void
  onWebObjectReady?: (element: HTMLElement, webObject: WebObject) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: WebObject) => void
  onRouteChange?: (routerState: RouterState) => void
}

const WebEngineCanvas: React.FC<WebEngineCanvasProps> = ({
  manifest,
  className = "",
  style = {},
  onCanvasReady,
  onWebObjectReady,
  onWebObjectUpdate,
  onRouteChange,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [routerService, setRouterService] = useState<RouterService | null>(null)
  const [treeService, setTreeService] = useState<WebObjectTreeService | null>(
    null
  )
  const [routerState, setRouterState] = useState<RouterState | null>(null)
  const [forceUpdate, setForceUpdate] = useState(0)

  // Initialize the router service when manifest changes
  useEffect(() => {
    console.log("WebEngineCanvas: Manifest changed", manifest)
    if (manifest) {
      const router = new RouterService(manifest)
      router.initialize()
      setRouterService(router)

      // Subscribe to router state changes
      const unsubscribe = router.subscribe(state => {
        console.log("WebEngineCanvas: Router state changed", state)
        setRouterState(state)

        if (onRouteChange) {
          onRouteChange(state)
        }
      })

      // Get initial state
      setRouterState(router.getState())

      return unsubscribe
    }
  }, [manifest, onRouteChange])

  // Initialize the tree service when current scene changes
  useEffect(() => {
    if (routerState?.currentScene?.root) {
      console.log(
        "WebEngineCanvas: Creating tree service with scene root",
        routerState.currentScene.root
      )
      const service = new WebObjectTreeService(routerState.currentScene.root)
      setTreeService(service)
      console.log("WebEngineCanvas: Tree service created", service.getTree())
    } else {
      console.log("WebEngineCanvas: No valid scene root found")
      setTreeService(null)
    }
  }, [routerState?.currentScene])

  // Memoized context methods to prevent recreation
  const updateWebObject = useCallback(
    (id: string, updates: Partial<WebObject>) => {
      if (treeService) {
        treeService.updateNode(id, updates)
        setForceUpdate(prev => prev + 1)
      }
    },
    [treeService]
  )

  const addWebObject = useCallback(
    (parentId: string, webObject: WebObject) => {
      if (treeService) {
        treeService.addNode(parentId, webObject)
        setForceUpdate(prev => prev + 1)
      }
    },
    [treeService]
  )

  const removeWebObject = useCallback(
    (id: string) => {
      if (treeService) {
        treeService.removeNode(id)
        setForceUpdate(prev => prev + 1)
      }
    },
    [treeService]
  )

  const moveWebObject = useCallback(
    (id: string, newParentId: string) => {
      if (treeService) {
        treeService.moveNode(id, newParentId)
        setForceUpdate(prev => prev + 1)
      }
    },
    [treeService]
  )

  // Navigation methods
  const navigate = useCallback(
    (path: string) => {
      if (routerService) {
        routerService.navigate(path)
      }
    },
    [routerService]
  )

  const goBack = useCallback(() => {
    if (routerService) {
      routerService.goBack()
    }
  }, [routerService])

  const goForward = useCallback(() => {
    if (routerService) {
      routerService.goForward()
    }
  }, [routerService])

  // Memoized context object
  const webObjectContext = useMemo(() => {
    if (!treeService || !canvasRef.current || !routerState) return null

    return {
      canvas: canvasRef.current,
      manifest,
      webObjectTree: treeService.getTree(),
      routerState,
      navigate,
      goBack,
      goForward,
      updateWebObject,
      addWebObject,
      removeWebObject,
      moveWebObject,
    } as WebObjectContext
  }, [
    treeService,
    manifest,
    routerState,
    navigate,
    goBack,
    goForward,
    updateWebObject,
    addWebObject,
    removeWebObject,
    moveWebObject,
    forceUpdate,
  ])

  // Notify when context is ready
  useEffect(() => {
    if (webObjectContext && onCanvasReady) {
      onCanvasReady(webObjectContext)
    }
  }, [webObjectContext, onCanvasReady])

  // Handle WebObject ready events
  const handleWebObjectReady = useCallback(
    (element: HTMLElement, webObject: WebObject) => {
      if (onWebObjectReady) {
        onWebObjectReady(element, webObject)
      }
    },
    [onWebObjectReady]
  )

  // Handle WebObject update events
  const handleWebObjectUpdate = useCallback(
    (element: HTMLElement, webObject: WebObject) => {
      if (onWebObjectUpdate) {
        onWebObjectUpdate(element, webObject)
      }
    },
    [onWebObjectUpdate]
  )

  // Debug logging
  if (treeService && routerState?.currentScene) {
    console.log(
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
        <WebObjectComponent
          key={`${routerState.currentScene.id}-${forceUpdate}`} // Force re-render when scene changes
          webObject={treeService.getTree().root}
          context={webObjectContext || undefined}
          onWebObjectReady={handleWebObjectReady}
          onWebObjectUpdate={handleWebObjectUpdate}
        />
      ) : (
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          {routerState?.currentScene
            ? "Loading scene..."
            : "No scene found for current route"}
        </div>
      )}
    </div>
  )
}

export default WebEngineCanvas

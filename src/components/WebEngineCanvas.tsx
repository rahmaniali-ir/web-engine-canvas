import React, { useRef, useState, useEffect, useCallback, useMemo } from "react"
import { WebObject } from "../types/WebObject"
import { WebObjectContext } from "../types/Context"
import { RouterService, RouterState } from "../services/RouterService"
import { WebObjectTreeService } from "../services/WebObjectTreeService"
import { AssetService } from "../services/AssetService"
import { Manifest } from "../types/Manifest"
import WebObjectComponent from "./WebObject"

export interface WebEngineCanvasProps {
  manifest: Manifest
  className?: string
  style?: React.CSSProperties
  onCanvasReady?: (context: WebObjectContext) => void
  onWebObjectReady?: (element: HTMLElement, webObject: WebObject) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: WebObject) => void
  onRouteChange?: (state: RouterState) => void
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
  const [routerState, setRouterState] = useState<RouterState | null>(null)
  const [treeService, setTreeService] = useState<WebObjectTreeService | null>(
    null
  )
  const [assetService, setAssetService] = useState<AssetService | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Initialize the asset service when manifest changes
  useEffect(() => {
    if (manifest?.assets) {
      const assetService = new AssetService()

      // Initialize with assets from manifest
      let assets: any[] = []
      if (manifest.assets.assets instanceof Map) {
        assets = Array.from(manifest.assets.assets.values())
      } else {
        // Handle plain object storage
        assets = Object.values(manifest.assets.assets)
      }

      assetService.initializeFromManifest(assets)
      setAssetService(assetService)
      console.log(
        "WebEngineCanvas: AssetService initialized with",
        assets.length,
        "assets"
      )
    }
  }, [manifest?.assets])

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

        if (state.currentScene?.root) {
          console.log("WebEngineCanvas: Loading scene", state.currentScene.id)

          // Create the tree service for the new scene
          const newTreeService = new WebObjectTreeService(
            state.currentScene.root
          )

          // If we have a current scene, start transition
          if (treeService) {
            setIsTransitioning(true)
            setTreeService(newTreeService)
            setRouterState(state)
            setIsTransitioning(false)

            if (onRouteChange) {
              onRouteChange(state)
            }
          } else {
            // Initial load, no transition needed
            setTreeService(newTreeService)
            setRouterState(state)

            if (onRouteChange) {
              onRouteChange(state)
            }
          }
        } else {
          // No scene found
          setTreeService(null)
          setRouterState(state)
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
      }
      setRouterState(initialState)

      return unsubscribe
    }
  }, [manifest, onRouteChange, treeService])

  // Memoized context methods to prevent recreation
  const updateWebObject = useCallback(
    (id: string, updates: Partial<WebObject>) => {
      if (treeService) {
        treeService.updateNode(id, updates)
      }
    },
    [treeService]
  )

  const addWebObject = useCallback(
    (parentId: string, webObject: WebObject) => {
      if (treeService) {
        treeService.addNode(parentId, webObject)
      }
    },
    [treeService]
  )

  const removeWebObject = useCallback(
    (id: string) => {
      if (treeService) {
        treeService.removeNode(id)
      }
    },
    [treeService]
  )

  const moveWebObject = useCallback(
    (id: string, newParentId: string) => {
      if (treeService) {
        treeService.moveNode(id, newParentId)
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
      assetService,
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
    assetService,
    navigate,
    goBack,
    goForward,
    updateWebObject,
    addWebObject,
    removeWebObject,
    moveWebObject,
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
            onWebObjectReady={handleWebObjectReady}
            onWebObjectUpdate={handleWebObjectUpdate}
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

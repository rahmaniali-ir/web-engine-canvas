import React, { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { CanvasManifest, WebObject, WebObjectContext } from "../types"
import { WebObjectTreeService } from "../services/WebObjectTreeService"
import WebObjectComponent from "./WebObject"

export interface WebEngineCanvasProps {
  manifest: CanvasManifest
  className?: string
  style?: React.CSSProperties
  onCanvasReady?: (context: WebObjectContext) => void
  onWebObjectReady?: (element: HTMLElement, webObject: WebObject) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: WebObject) => void
}

const WebEngineCanvas: React.FC<WebEngineCanvasProps> = ({
  manifest,
  className = "",
  style = {},
  onCanvasReady,
  onWebObjectReady,
  onWebObjectUpdate,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [treeService, setTreeService] = useState<WebObjectTreeService | null>(
    null
  )
  const [forceUpdate, setForceUpdate] = useState(0)

  // Initialize the tree service when manifest changes
  useEffect(() => {
    console.log("WebEngineCanvas: Manifest changed", manifest)
    if (manifest?.root?.root) {
      console.log(
        "WebEngineCanvas: Creating tree service with root",
        manifest.root.root
      )
      const service = new WebObjectTreeService(manifest.root.root)
      setTreeService(service)
      console.log("WebEngineCanvas: Tree service created", service.getTree())
    } else {
      console.log("WebEngineCanvas: No valid root found in manifest")
    }
  }, [manifest])

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

  // Memoized context object
  const webObjectContext = useMemo(() => {
    if (!treeService || !canvasRef.current) return null

    return {
      canvas: canvasRef.current,
      manifest,
      webObjectTree: treeService.getTree(),
      updateWebObject,
      addWebObject,
      removeWebObject,
      moveWebObject,
    } as WebObjectContext
  }, [
    treeService,
    manifest,
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

  // Get canvas settings
  const canvasSettings = manifest.settings || {
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
    responsive: false,
  }

  // Debug logging
  if (treeService) {
    console.log(
      "WebEngineCanvas: Rendering WebObjectComponent with root",
      treeService.getTree().root
    )
  }

  return (
    <div
      ref={canvasRef}
      className={className}
      style={{
        position: "relative",
        width: canvasSettings.width,
        height: canvasSettings.height,
        backgroundColor: canvasSettings.backgroundColor,
        border: "1px solid #ccc",
        overflow: "auto",
        ...style,
      }}
    >
      {treeService && (
        <WebObjectComponent
          key={forceUpdate} // Force re-render when tree changes
          webObject={treeService.getTree().root}
          onWebObjectReady={handleWebObjectReady}
          onWebObjectUpdate={handleWebObjectUpdate}
        />
      )}
    </div>
  )
}

export default WebEngineCanvas

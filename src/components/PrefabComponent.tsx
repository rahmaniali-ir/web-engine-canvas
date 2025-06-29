import React, { useMemo } from "react"
import { PrefabInstantiationOptions } from "../types/Prefab"
import { WebObject } from "../types/WebObject"
import { WebObjectContext } from "../types/Context"
import WebObjectComponent from "./WebObject"
import { usePrefabs } from "../hooks/usePrefabs"

export interface PrefabComponentProps {
  prefabId: string
  context?: WebObjectContext
  options?: PrefabInstantiationOptions
  onWebObjectReady?: (element: HTMLElement, webObject: WebObject) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: WebObject) => void
  onPrefabReady?: (webObject: WebObject) => void
  onPrefabError?: (error: string) => void
}

/**
 * PrefabComponent - Renders a prefab instance
 * Similar to Unity3D's prefab instantiation
 */
const PrefabComponent: React.FC<PrefabComponentProps> = ({
  prefabId,
  context,
  options = {},
  onWebObjectReady,
  onWebObjectUpdate,
  onPrefabReady,
  onPrefabError,
}) => {
  const { instantiatePrefab, getPrefab } = usePrefabs()

  // Instantiate the prefab
  const webObject = useMemo(() => {
    try {
      const instance = instantiatePrefab(prefabId, options)
      if (instance) {
        onPrefabReady?.(instance)
        return instance
      } else {
        onPrefabError?.(`Failed to instantiate prefab: ${prefabId}`)
        return null
      }
    } catch (error) {
      onPrefabError?.(`Error instantiating prefab: ${error}`)
      return null
    }
  }, [prefabId, options, instantiatePrefab, onPrefabReady, onPrefabError])

  // If instantiation failed, show error or fallback
  if (!webObject) {
    const prefab = getPrefab(prefabId)
    if (!prefab) {
      return (
        <div style={{ color: "red", padding: "8px" }}>
          Prefab not found: {prefabId}
        </div>
      )
    }
    return (
      <div style={{ color: "orange", padding: "8px" }}>
        Failed to instantiate prefab: {prefab.name}
      </div>
    )
  }

  // Render the instantiated WebObject
  return (
    <WebObjectComponent
      webObject={webObject}
      context={context}
      onWebObjectReady={onWebObjectReady}
      onWebObjectUpdate={onWebObjectUpdate}
    />
  )
}

export default PrefabComponent

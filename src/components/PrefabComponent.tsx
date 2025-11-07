import React, { useMemo } from "react"
import { usePrefabs } from "../hooks/usePrefabs"
import { WebObjectContext } from "../types/Context"
import { WebObjectEvent } from "../types/Events"
import { PrefabInstantiationOptions } from "../types/Prefab"
import WebObjectComponent from "./WebObject"

export interface PrefabComponentProps {
  prefabId: string
  context?: WebObjectContext
  options?: PrefabInstantiationOptions
  onEvent?: (event: WebObjectEvent) => void
}

/**
 * PrefabComponent - Renders a prefab instance
 * Similar to Unity3D's prefab instantiation
 */
const PrefabComponent: React.FC<PrefabComponentProps> = ({
  prefabId,
  context,
  options = {},
  onEvent,
}) => {
  const { instantiatePrefab, getPrefab } = usePrefabs()

  // Instantiate the prefab
  const webObject = useMemo(() => {
    try {
      const instance = instantiatePrefab(prefabId, options)
      if (instance) {
        onEvent?.({
          name: "webObject",
          type: "prefabReady",
          webObject: instance,
          timestamp: Date.now(),
          source: "prefab",
        })
        return instance
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }, [prefabId, options, instantiatePrefab])

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
      onEvent={onEvent}
    />
  )
}

export default PrefabComponent

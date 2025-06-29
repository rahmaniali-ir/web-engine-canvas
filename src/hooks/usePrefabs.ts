import { useState, useCallback } from "react"
import { PrefabService } from "../services/PrefabService"
import {
  Prefab,
  PrefabInstantiationOptions,
  PrefabSearchOptions,
} from "../types/Prefab"
import { PrefabParameter, WebObject } from "../types"

/**
 * React hook for managing prefabs
 * Provides easy access to prefab functionality
 */
export const usePrefabs = () => {
  const [prefabService] = useState(() => new PrefabService())
  const [selectedPrefabId, setSelectedPrefabId] = useState<string | null>(null)

  // Prefab registration
  const registerPrefab = useCallback(
    (prefab: Prefab) => {
      prefabService.registerPrefab(prefab)
    },
    [prefabService]
  )

  const unregisterPrefab = useCallback(
    (prefabId: string) => {
      return prefabService.unregisterPrefab(prefabId)
    },
    [prefabService]
  )

  // Prefab retrieval
  const getPrefab = useCallback(
    (prefabId: string) => {
      return prefabService.getPrefab(prefabId)
    },
    [prefabService]
  )

  const getAllPrefabs = useCallback(() => {
    return prefabService.getAllPrefabs()
  }, [prefabService])

  const searchPrefabs = useCallback(
    (options: PrefabSearchOptions) => {
      return prefabService.searchPrefabs(options)
    },
    [prefabService]
  )

  // Prefab instantiation
  const instantiatePrefab = useCallback(
    (prefabId: string, options: PrefabInstantiationOptions = {}) => {
      return prefabService.instantiatePrefab(prefabId, options)
    },
    [prefabService]
  )

  // Prefab instance management
  const getPrefabInstance = useCallback(
    (instanceId: string) => {
      return prefabService.getPrefabInstance(instanceId)
    },
    [prefabService]
  )

  const getPrefabInstances = useCallback(
    (prefabId: string) => {
      return prefabService.getPrefabInstances(prefabId)
    },
    [prefabService]
  )

  const updatePrefabInstance = useCallback(
    (instanceId: string, updates: Partial<WebObject>) => {
      return prefabService.updatePrefabInstance(instanceId, updates)
    },
    [prefabService]
  )

  const removePrefabInstance = useCallback(
    (instanceId: string) => {
      return prefabService.removePrefabInstance(instanceId)
    },
    [prefabService]
  )

  // Prefab creation
  const createPrefabFromWebObject = useCallback(
    (
      webObject: WebObject,
      name: string,
      description?: string,
      tags?: string[],
      parameters?: PrefabParameter[]
    ) => {
      return prefabService.createPrefabFromWebObject(
        webObject,
        name,
        description,
        tags,
        parameters
      )
    },
    [prefabService]
  )

  // Prefab import/export
  const exportPrefabToManifest = useCallback(
    (prefabId: string) => {
      return prefabService.exportPrefabToManifest(prefabId)
    },
    [prefabService]
  )

  const importPrefabFromManifest = useCallback(
    (manifest: any) => {
      return prefabService.importPrefabFromManifest(manifest)
    },
    [prefabService]
  )

  // Categories
  const getCategories = useCallback(() => {
    return prefabService.getCategories()
  }, [prefabService])

  const getPrefabsByCategory = useCallback(
    (category: string) => {
      return prefabService.getPrefabsByCategory(category)
    },
    [prefabService]
  )

  // Convenience methods for common prefab types
  const createButtonPrefab = useCallback(
    (
      name: string,
      text: string = "Button",
      onClick?: string,
      disabled: boolean = false
    ) => {
      const buttonWebObject: WebObject = {
        id: `button-${Date.now()}`,
        type: "button",
        content: text,
        disabled,
        onClick,
        components: [],
      }

      return createPrefabFromWebObject(
        buttonWebObject,
        name,
        `Button prefab: ${text}`,
        ["ui", "button"],
        [
          {
            name: "text",
            type: "string",
            defaultValue: text,
            description: "Button text content",
          },
          {
            name: "disabled",
            type: "boolean",
            defaultValue: disabled,
            description: "Whether the button is disabled",
          },
          {
            name: "onClick",
            type: "string",
            defaultValue: onClick,
            description: "Event handler name for click events",
          },
        ]
      )
    },
    [createPrefabFromWebObject]
  )

  const createInputPrefab = useCallback(
    (
      name: string,
      inputType:
        | "text"
        | "email"
        | "password"
        | "number"
        | "search"
        | "tel"
        | "url" = "text",
      placeholder: string = "",
      required: boolean = false
    ) => {
      const inputWebObject: WebObject = {
        id: `input-${Date.now()}`,
        type: "input",
        inputType,
        placeholder,
        required,
        components: [],
      }

      return createPrefabFromWebObject(
        inputWebObject,
        name,
        `Input prefab: ${inputType}`,
        ["ui", "input", "form"],
        [
          {
            name: "placeholder",
            type: "string",
            defaultValue: placeholder,
            description: "Input placeholder text",
          },
          {
            name: "required",
            type: "boolean",
            defaultValue: required,
            description: "Whether the input is required",
          },
          {
            name: "value",
            type: "string",
            description: "Input value",
          },
        ]
      )
    },
    [createPrefabFromWebObject]
  )

  const createCardPrefab = useCallback(
    (
      name: string,
      title: string = "Card Title",
      content: string = "Card content goes here"
    ) => {
      const cardWebObject: WebObject = {
        id: `card-${Date.now()}`,
        type: "div",
        components: [],
        children: [
          {
            id: `card-title-${Date.now()}`,
            type: "heading",
            level: 3,
            content: title,
            components: [],
          },
          {
            id: `card-content-${Date.now()}`,
            type: "paragraph",
            content,
            components: [],
          },
        ],
      }

      return createPrefabFromWebObject(
        cardWebObject,
        name,
        `Card prefab: ${title}`,
        ["ui", "card", "layout"],
        [
          {
            name: "title",
            type: "string",
            defaultValue: title,
            description: "Card title",
          },
          {
            name: "content",
            type: "string",
            defaultValue: content,
            description: "Card content",
          },
        ]
      )
    },
    [createPrefabFromWebObject]
  )

  return {
    // State
    selectedPrefabId,
    setSelectedPrefabId,

    // Prefab management
    registerPrefab,
    unregisterPrefab,
    getPrefab,
    getAllPrefabs,
    searchPrefabs,

    // Instantiation
    instantiatePrefab,
    getPrefabInstance,
    getPrefabInstances,
    updatePrefabInstance,
    removePrefabInstance,

    // Creation
    createPrefabFromWebObject,
    createButtonPrefab,
    createInputPrefab,
    createCardPrefab,

    // Import/Export
    exportPrefabToManifest,
    importPrefabFromManifest,

    // Categories
    getCategories,
    getPrefabsByCategory,

    // Service access
    prefabService,
  }
}

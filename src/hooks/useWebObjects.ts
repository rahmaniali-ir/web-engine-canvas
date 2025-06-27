import { useState, useCallback } from "react"
import {
  WebObject,
  WebObjectContext,
  MeshComponent,
  MaterialComponent,
  MarginComponent,
  PaddingComponent,
  BorderComponent,
  BorderRadiusComponent,
  TypographyComponent,
  InteractionComponent,
  TransitionComponent,
  BoxShadowComponent,
  FilterComponent,
} from "../types"
import { WebObjectComponentService } from "../services/WebObjectComponentService"

export const useWebObjects = (context: WebObjectContext | null) => {
  const [selectedWebObjectId, setSelectedWebObjectId] = useState<string | null>(
    null
  )

  const componentService = new WebObjectComponentService()

  const createHTMLElement = useCallback(
    (
      tagName: string,
      meshConfig?: MeshComponent["config"],
      materialConfig?: MaterialComponent["config"],
      marginConfig?: MarginComponent["config"],
      paddingConfig?: PaddingComponent["config"],
      borderConfig?: BorderComponent["config"],
      borderRadiusConfig?: BorderRadiusComponent["config"],
      typographyConfig?: TypographyComponent["config"],
      interactionConfig?: InteractionComponent["config"],
      transitionConfig?: TransitionComponent["config"],
      boxShadowConfig?: BoxShadowComponent["config"],
      filterConfig?: FilterComponent["config"]
    ): WebObject => {
      const components: any[] = []

      if (meshConfig) {
        components.push(componentService.createMeshComponent(meshConfig))
      }

      if (marginConfig) {
        components.push(componentService.createMarginComponent(marginConfig))
      }

      if (paddingConfig) {
        components.push(componentService.createPaddingComponent(paddingConfig))
      }

      if (borderConfig) {
        components.push(componentService.createBorderComponent(borderConfig))
      }

      if (borderRadiusConfig) {
        components.push(
          componentService.createBorderRadiusComponent(borderRadiusConfig)
        )
      }

      if (typographyConfig) {
        components.push(
          componentService.createTypographyComponent(typographyConfig)
        )
      }

      if (interactionConfig) {
        components.push(
          componentService.createInteractionComponent(interactionConfig)
        )
      }

      if (transitionConfig) {
        components.push(
          componentService.createTransitionComponent(transitionConfig)
        )
      }

      if (boxShadowConfig) {
        components.push(
          componentService.createBoxShadowComponent(boxShadowConfig)
        )
      }

      if (filterConfig) {
        components.push(componentService.createFilterComponent(filterConfig))
      }

      if (materialConfig) {
        components.push(
          componentService.createMaterialComponent(materialConfig)
        )
      }

      return {
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        tagName,
        components,
        children: [],
      }
    },
    []
  )

  const createContainer = useCallback(
    (
      meshConfig?: MeshComponent["config"],
      materialConfig?: MaterialComponent["config"],
      marginConfig?: MarginComponent["config"],
      paddingConfig?: PaddingComponent["config"],
      borderConfig?: BorderComponent["config"],
      borderRadiusConfig?: BorderRadiusComponent["config"],
      typographyConfig?: TypographyComponent["config"],
      interactionConfig?: InteractionComponent["config"],
      transitionConfig?: TransitionComponent["config"],
      boxShadowConfig?: BoxShadowComponent["config"],
      filterConfig?: FilterComponent["config"]
    ): WebObject => {
      const components: any[] = []

      if (meshConfig) {
        components.push(componentService.createMeshComponent(meshConfig))
      }

      if (marginConfig) {
        components.push(componentService.createMarginComponent(marginConfig))
      }

      if (paddingConfig) {
        components.push(componentService.createPaddingComponent(paddingConfig))
      }

      if (borderConfig) {
        components.push(componentService.createBorderComponent(borderConfig))
      }

      if (borderRadiusConfig) {
        components.push(
          componentService.createBorderRadiusComponent(borderRadiusConfig)
        )
      }

      if (typographyConfig) {
        components.push(
          componentService.createTypographyComponent(typographyConfig)
        )
      }

      if (interactionConfig) {
        components.push(
          componentService.createInteractionComponent(interactionConfig)
        )
      }

      if (transitionConfig) {
        components.push(
          componentService.createTransitionComponent(transitionConfig)
        )
      }

      if (boxShadowConfig) {
        components.push(
          componentService.createBoxShadowComponent(boxShadowConfig)
        )
      }

      if (filterConfig) {
        components.push(componentService.createFilterComponent(filterConfig))
      }

      if (materialConfig) {
        components.push(
          componentService.createMaterialComponent(materialConfig)
        )
      }

      return {
        id: `container-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        tagName: "div",
        components,
        children: [],
      }
    },
    []
  )

  const addWebObject = useCallback(
    (parentId: string, webObject: WebObject) => {
      if (context) {
        context.addWebObject(parentId, webObject)
      }
    },
    [context]
  )

  const removeWebObject = useCallback(
    (id: string) => {
      if (context) {
        context.removeWebObject(id)
      }
    },
    [context]
  )

  const updateWebObject = useCallback(
    (id: string, updates: Partial<WebObject>) => {
      if (context) {
        context.updateWebObject(id, updates)
      }
    },
    [context]
  )

  const moveWebObject = useCallback(
    (id: string, newParentId: string) => {
      if (context) {
        context.moveWebObject(id, newParentId)
      }
    },
    [context]
  )

  const getWebObject = useCallback(
    (id: string) => {
      if (context) {
        return context.webObjectTree.nodes.get(id)
      }
      return undefined
    },
    [context]
  )

  const getAllWebObjects = useCallback(() => {
    if (context) {
      return Array.from(context.webObjectTree.nodes.values())
    }
    return []
  }, [context])

  return {
    // State
    selectedWebObjectId,
    setSelectedWebObjectId,

    // Core operations
    createHTMLElement,
    createContainer,
    addWebObject,
    removeWebObject,
    updateWebObject,
    moveWebObject,

    // Queries
    getWebObject,
    getAllWebObjects,

    componentService,
  }
}

import React, { useRef, useEffect, useCallback, useMemo } from "react"
import { WebObject, WebObjectContext } from "../types"
import { WebObjectComponentService } from "../services/WebObjectComponentService"
import { AssetService } from "../services/AssetService"
import LinkWebObjectComponent from "./specialized/LinkWebObject"

export interface WebObjectProps {
  webObject: WebObject
  context?: WebObjectContext
  onWebObjectReady?: (element: HTMLElement, webObject: WebObject) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: WebObject) => void
}

const WebObjectComponent: React.FC<WebObjectProps> = ({
  webObject,
  context,
  onWebObjectReady,
  onWebObjectUpdate,
}) => {
  const elementRef = useRef<HTMLElement>(null)
  const componentService = useMemo(() => new WebObjectComponentService(), [])
  const assetService =
    context?.assetService || useMemo(() => new AssetService(), [])

  // Helper function to apply parameters to WebObject
  const applyParametersToWebObject = (
    webObj: WebObject,
    parameters: Record<string, any>
  ) => {
    // Apply to content
    if (webObj.content && typeof webObj.content === "string") {
      Object.entries(parameters).forEach(([key, value]) => {
        webObj.content = webObj.content?.replace(`\${${key}}`, String(value))
      })
    }

    // Apply to components
    if (webObj.components) {
      webObj.components.forEach(component => {
        Object.entries(parameters).forEach(([key, value]) => {
          if (component.config && typeof component.config === "object") {
            Object.entries(component.config).forEach(
              ([configKey, configValue]) => {
                if (typeof configValue === "string") {
                  component.config[configKey] = configValue.replace(
                    `\${${key}}`,
                    String(value)
                  )
                }
              }
            )
          }
        })
      })
    }

    // Recursively apply to children
    if (webObj.children) {
      webObj.children.forEach(child =>
        applyParametersToWebObject(child, parameters)
      )
    }
  }

  // Check if this WebObject is a prefab instance
  const prefabId = webObject.prefabId
  const prefabParameters = webObject.prefabParameters

  // Instantiate prefab if needed
  const instantiatedWebObject = useMemo(() => {
    if (!prefabId || !context?.manifest) return webObject

    try {
      // First try to find prefab in the prefabs array
      if (context.manifest.prefabs) {
        const prefab = context.manifest.prefabs.find(p => p.id === prefabId)
        if (prefab) {
          // Deep clone the template
          const instance = JSON.parse(JSON.stringify(prefab.template))

          // Apply default values
          if (prefab.defaultValues) {
            applyParametersToWebObject(instance, prefab.defaultValues)
          }

          // Apply provided parameters
          if (prefabParameters) {
            applyParametersToWebObject(instance, prefabParameters)
          }

          // Merge with original WebObject properties (like id, prefabId, prefabParameters, etc.)
          return {
            ...instance,
            id: webObject.id,
            prefabId: webObject.prefabId,
            prefabParameters: webObject.prefabParameters,
          }
        }
      }

      // Fallback: try to find prefab in assets (legacy support)
      const assets = context.manifest.assets.assets
      let prefabAsset

      if (assets instanceof Map) {
        prefabAsset = assets.get(prefabId)
      } else {
        // Handle plain object storage
        prefabAsset = assets[prefabId]
      }

      if (!prefabAsset || prefabAsset.type !== "prefab") {
        console.warn(`Prefab not found: ${prefabId}`)
        return webObject
      }

      // Deep clone the template
      const instance = JSON.parse(JSON.stringify(prefabAsset.template))

      // Apply default values
      if (prefabAsset.defaultValues) {
        applyParametersToWebObject(instance, prefabAsset.defaultValues)
      }

      // Apply provided parameters
      if (prefabParameters) {
        applyParametersToWebObject(instance, prefabParameters)
      }

      // Merge with original WebObject properties (like id, prefabId, prefabParameters, etc.)
      return {
        ...instance,
        id: webObject.id,
        prefabId: webObject.prefabId,
        prefabParameters: webObject.prefabParameters,
      }
    } catch (error) {
      console.error(`Error instantiating prefab ${prefabId}:`, error)
      return webObject
    }
  }, [prefabId, prefabParameters, webObject, context?.manifest])

  // Apply components to the element
  const applyComponents = useCallback(() => {
    if (!elementRef.current || !instantiatedWebObject.components) return

    const element = elementRef.current
    componentService.applyComponents(
      element,
      instantiatedWebObject,
      assetService
    )
  }, [instantiatedWebObject.components, componentService, assetService])

  // Apply components when they change
  useEffect(() => {
    applyComponents()
  }, [applyComponents])

  // Notify when element is ready
  useEffect(() => {
    if (elementRef.current && onWebObjectReady) {
      onWebObjectReady(elementRef.current, instantiatedWebObject)
    }
  }, [instantiatedWebObject, onWebObjectReady])

  // List of void elements in HTML
  const voidElements = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]

  // Helper function to render elements with components applied
  const renderElement = (ElementType: string, props: any = {}) => {
    const isVoid = voidElements.includes(ElementType)
    if (isVoid) {
      return React.createElement(ElementType, {
        ref: elementRef,
        ...props,
      })
    }
    return React.createElement(
      ElementType,
      {
        ref: elementRef,
        ...props,
      },
      instantiatedWebObject.content &&
        React.createElement("span", null, instantiatedWebObject.content),
      ...(instantiatedWebObject.children?.map((child: WebObject) =>
        React.createElement(WebObjectComponent, {
          key: child.id,
          webObject: child,
          context: context,
          onWebObjectReady: onWebObjectReady,
          onWebObjectUpdate: onWebObjectUpdate,
        })
      ) || [])
    )
  }

  // Handle specialized WebObject types
  if (instantiatedWebObject.type === "link") {
    if (!context) {
      console.warn("LinkWebObject requires context for navigation")
      return null
    }
    return (
      <LinkWebObjectComponent
        webObject={instantiatedWebObject}
        context={context}
        onWebObjectReady={onWebObjectReady}
        onWebObjectUpdate={onWebObjectUpdate}
      />
    )
  }

  // Handle other specialized types
  if (instantiatedWebObject.type === "button") {
    return renderElement("button", {
      disabled: instantiatedWebObject.disabled,
      onClick: (event: React.MouseEvent) => {
        if (instantiatedWebObject.onClick && context) {
          const handler = context[
            instantiatedWebObject.onClick as keyof WebObjectContext
          ] as Function
          if (handler) handler(event)
        }
      },
    })
  }

  if (instantiatedWebObject.type === "input") {
    return renderElement("input", {
      type: instantiatedWebObject.inputType,
      placeholder: instantiatedWebObject.placeholder,
      value: instantiatedWebObject.value,
      disabled: instantiatedWebObject.disabled,
      required: instantiatedWebObject.required,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (instantiatedWebObject.onChange && context) {
          const handler = context[
            instantiatedWebObject.onChange as keyof WebObjectContext
          ] as Function
          if (handler) handler(event)
        }
      },
    })
  }

  if (instantiatedWebObject.type === "image") {
    return renderElement("img", {
      src: instantiatedWebObject.src,
      alt: instantiatedWebObject.alt,
      width: instantiatedWebObject.width,
      height: instantiatedWebObject.height,
    })
  }

  if (instantiatedWebObject.type === "heading") {
    const headingLevel = instantiatedWebObject.level || 1
    const headingTag = `h${headingLevel}`
    return renderElement(headingTag)
  }

  if (instantiatedWebObject.type === "paragraph") {
    return renderElement("p")
  }

  if (instantiatedWebObject.type === "span") {
    return renderElement("span")
  }

  // Default div WebObject
  return renderElement("div")
}

export default WebObjectComponent

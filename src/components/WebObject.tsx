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

const WebObjectComponent: React.FC<WebObjectProps> = React.memo(
  ({ webObject, context, onWebObjectReady, onWebObjectUpdate }) => {
    const elementRef = useRef<HTMLElement>(null)
    const componentService = useMemo(() => new WebObjectComponentService(), [])
    const assetService =
      context?.assetService || useMemo(() => new AssetService(), [])

    // Helper function to apply parameters to WebObject recursively
    const applyParametersToWebObject = (
      webObj: WebObject,
      parameters: Record<string, any>
    ) => {
      Object.entries(parameters).forEach(([key, value]) => {
        if (key === "content") {
          webObj.content = value
        } else if (key === "id") {
          webObj.id = value
        } else {
          // Store in prefabParameters if it exists, otherwise create it
          if (!webObj.prefabParameters) {
            webObj.prefabParameters = {}
          }
          webObj.prefabParameters[key] = value
        }
      })

      // Apply to children recursively
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
        const assets = context.manifest.assets
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

    // Generate initial styles synchronously during render
    const getInitialStyles = useCallback(() => {
      if (!instantiatedWebObject.components) return {}

      const styles: Record<string, any> = {}

      instantiatedWebObject.components.forEach((component: any) => {
        if (component.type === "material") {
          Object.assign(styles, component.config)
        } else if (component.type === "mesh") {
          Object.assign(styles, component.config)
        } else if (component.type === "padding") {
          Object.assign(styles, component.config)
        } else if (component.type === "margin") {
          Object.assign(styles, component.config)
        } else if (component.type === "typography") {
          Object.assign(styles, component.config)
        } else if (component.type === "borderRadius") {
          Object.assign(styles, component.config)
        } else if (component.type === "boxShadow") {
          Object.assign(styles, component.config)
        }
      })

      return styles
    }, [instantiatedWebObject.components])

    // Apply components to the element (for advanced styling and interactions)
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
      const initialStyles = getInitialStyles()

      if (isVoid) {
        return React.createElement(ElementType, {
          ref: elementRef,
          ...props,
          style: { ...props.style, ...initialStyles },
        })
      }
      return React.createElement(
        ElementType,
        {
          ref: elementRef,
          ...props,
          style: { ...props.style, ...initialStyles },
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
      const HeadingTag = `h${instantiatedWebObject.level}` as
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
      return renderElement(HeadingTag, {})
    }

    if (instantiatedWebObject.type === "paragraph") {
      return renderElement("p", {})
    }

    if (instantiatedWebObject.type === "span") {
      return renderElement("span", {})
    }

    // Default div WebObject
    return renderElement("div")
  }
)

export default WebObjectComponent

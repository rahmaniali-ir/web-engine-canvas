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
    const prefabVariantId = webObject.prefabVariantId
    const prefabParameters = webObject.prefabParameters

    // Helper function to get the correct prefab variant
    const getPrefabVariant = useCallback((prefab: any, variantId?: string) => {
      // If no variants exist, return the main template
      if (!prefab.variants || prefab.variants.length === 0) {
        return {
          template: prefab.template,
          defaultValues: prefab.defaultValues,
          parameters: prefab.parameters,
        }
      }

      // If variantId is specified, try to find it
      if (variantId) {
        const variant = prefab.variants.find((v: any) => v.id === variantId)
        if (variant) {
          return {
            template: variant.template,
            defaultValues: variant.defaultValues,
            parameters: variant.parameters,
          }
        }
      }

      // Try to find default variant
      const defaultVariant =
        prefab.variants.find((v: any) => v.isDefault) ||
        prefab.variants.find((v: any) => v.id === prefab.defaultVariantId) ||
        prefab.variants[0]

      if (defaultVariant) {
        return {
          template: defaultVariant.template,
          defaultValues: defaultVariant.defaultValues,
          parameters: defaultVariant.parameters,
        }
      }

      // Fallback to main template
      return {
        template: prefab.template,
        defaultValues: prefab.defaultValues,
        parameters: prefab.parameters,
      }
    }, [])

    // Instantiate prefab if needed
    const instantiatedWebObject = useMemo(() => {
      if (!prefabId || !context?.manifest) return webObject

      console.log(
        "WebObject: Instantiating prefab",
        prefabId,
        "variant:",
        prefabVariantId || "default",
        "for",
        webObject.id
      )

      try {
        // First try to find prefab in the prefabs array
        if (context.manifest.prefabs) {
          const prefab = context.manifest.prefabs.find(p => p.id === prefabId)
          if (prefab) {
            console.log(
              "WebObject: Found prefab",
              prefabId,
              "with variants:",
              prefab.variants?.length || 0
            )

            // Get the correct variant
            const variant = getPrefabVariant(prefab, prefabVariantId)

            // Deep clone the template
            const instance = JSON.parse(JSON.stringify(variant.template))

            // Apply default values
            if (variant.defaultValues) {
              applyParametersToWebObject(instance, variant.defaultValues)
            }

            // Apply provided parameters
            if (prefabParameters) {
              applyParametersToWebObject(instance, prefabParameters)
            }

            // Merge with original WebObject properties (like id, prefabId, prefabParameters, etc.)
            // AND merge components from both the prefab template and the original WebObject
            const result = {
              ...instance,
              id: webObject.id,
              prefabId: webObject.prefabId,
              prefabVariantId: webObject.prefabVariantId,
              prefabParameters: webObject.prefabParameters,
              // Merge components: prefab components first, then scene components
              components: [
                ...(instance.components || []),
                ...(webObject.components || []),
              ],
            }
            console.log(
              "WebObject: Instantiated prefab result:",
              result.id,
              "with components:",
              result.components?.length || 0,
              "prefab components:",
              instance.components?.length || 0,
              "scene components:",
              webObject.components?.length || 0
            )
            return result
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

        // Get the correct variant for legacy prefabs
        const variant = getPrefabVariant(prefabAsset, prefabVariantId)

        // Deep clone the template
        const instance = JSON.parse(JSON.stringify(variant.template))

        // Apply default values
        if (variant.defaultValues) {
          applyParametersToWebObject(instance, variant.defaultValues)
        }

        // Apply provided parameters
        if (prefabParameters) {
          applyParametersToWebObject(instance, prefabParameters)
        }

        // Merge with original WebObject properties (like id, prefabId, prefabParameters, etc.)
        // AND merge components from both the prefab template and the original WebObject
        return {
          ...instance,
          id: webObject.id,
          prefabId: webObject.prefabId,
          prefabVariantId: webObject.prefabVariantId,
          prefabParameters: webObject.prefabParameters,
          // Merge components: prefab components first, then scene components
          components: [
            ...(instance.components || []),
            ...(webObject.components || []),
          ],
        }
      } catch (error) {
        console.error(`Error instantiating prefab ${prefabId}:`, error)
        return webObject
      }
    }, [
      prefabId,
      prefabVariantId,
      prefabParameters,
      webObject,
      context?.manifest,
      getPrefabVariant,
    ])

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

      // Handle animations
      if (elementRef.current && context?.animationService) {
        console.log(
          "WebObject: Checking for animations in",
          instantiatedWebObject.id,
          "with components:",
          instantiatedWebObject.components?.length || 0
        )

        if (instantiatedWebObject.components) {
          instantiatedWebObject.components.forEach(
            (component: any, index: number) => {
              console.log(
                "WebObject: Checking component",
                index,
                "type:",
                component.type,
                "config:",
                component.config
              )

              if (component.type === "animation") {
                console.log(
                  "WebObject: Found animation component:",
                  component.config
                )

                if (component.config.autoPlay) {
                  const animationId = component.config.animationId
                  console.log(
                    "WebObject: Animation ID:",
                    animationId,
                    "type:",
                    typeof animationId
                  )

                  if (
                    typeof animationId === "string" &&
                    context.animationService
                  ) {
                    // Get duration from prefabParameters if available, otherwise use default
                    const duration =
                      instantiatedWebObject.prefabParameters?.duration ||
                      component.config.duration ||
                      4000

                    console.log(
                      "WebObject: Starting animation",
                      animationId,
                      "for",
                      instantiatedWebObject.id,
                      "with duration:",
                      duration,
                      "element:",
                      elementRef.current
                    )

                    try {
                      context.animationService.playAnimation(
                        elementRef.current!,
                        animationId,
                        {
                          loop: component.config.loop,
                          loopCount: component.config.loopCount,
                          direction: component.config.direction,
                          duration: duration,
                        }
                      )
                      console.log("WebObject: Animation started successfully")
                    } catch (error) {
                      console.error(
                        "WebObject: Error starting animation:",
                        error
                      )
                    }
                  } else {
                    console.warn(
                      "WebObject: Invalid animation ID or no animation service:",
                      animationId,
                      "service:",
                      !!context.animationService
                    )
                  }
                } else {
                  console.log("WebObject: Animation not set to autoPlay")
                }
              }
            }
          )
        } else {
          console.log(
            "WebObject: No components found for",
            instantiatedWebObject.id
          )
        }
      } else {
        console.log(
          "WebObject: No element ref or animation service for",
          instantiatedWebObject.id,
          "element:",
          !!elementRef.current,
          "service:",
          !!context?.animationService
        )
      }

      // Cleanup animations on unmount
      return () => {
        if (elementRef.current && context?.animationService) {
          context.animationService.cleanupElement(elementRef.current)
        }
      }
    }, [
      applyComponents,
      instantiatedWebObject.components,
      context?.animationService,
    ])

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

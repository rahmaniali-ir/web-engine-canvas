import React, { useRef, useEffect, useCallback } from "react"
import { WebObject as WebObjectType } from "../types"
import { WebObjectComponentService } from "../services/WebObjectComponentService"

interface WebObjectProps {
  webObject: WebObjectType
  onWebObjectReady?: (element: HTMLElement, webObject: WebObjectType) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: WebObjectType) => void
}

const WebObjectComponent: React.FC<WebObjectProps> = ({
  webObject,
  onWebObjectReady,
  onWebObjectUpdate,
}) => {
  const elementRef = useRef<HTMLElement>(null)
  const componentService = useRef(new WebObjectComponentService())

  // Add debug logging
  console.log("Rendering WebObject:", webObject.id, webObject)

  useEffect(() => {
    const element = elementRef.current
    if (element && onWebObjectReady) {
      onWebObjectReady(element, webObject)
    }
  }, [webObject.id, onWebObjectReady])

  useEffect(() => {
    const element = elementRef.current
    if (element && onWebObjectUpdate) {
      onWebObjectUpdate(element, webObject)
    }
  }, [webObject, onWebObjectUpdate])

  // Apply components to the element
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Apply all components
    componentService.current.applyComponents(element, webObject)
  }, [webObject.components])

  // Memoized children rendering
  const renderChildren = useCallback(() => {
    console.log(
      "Rendering children for:",
      webObject.id,
      webObject.children?.length || 0
    )
    if (!webObject.children || webObject.children.length === 0) {
      console.log("No children to render for:", webObject.id)
      return null
    }
    const renderedChildren = webObject.children.map(child => (
      <WebObjectComponent
        key={child.id}
        webObject={child}
        onWebObjectReady={onWebObjectReady}
        onWebObjectUpdate={onWebObjectUpdate}
      />
    ))
    console.log("Rendered children for:", webObject.id, renderedChildren.length)
    return renderedChildren
  }, [webObject.children, onWebObjectReady, onWebObjectUpdate])

  // Render based on WebObject tagName
  const renderWebObject = () => {
    const tagName = webObject.tagName || "div"

    console.log("Rendering HTML element:", tagName)

    // Create element props
    const elementProps: any = {
      ref: elementRef,
    }

    // Handle content property
    if (webObject.content) {
      elementProps.children = webObject.content
    } else {
      // Only add children from renderChildren() if there are actual WebObject children
      const children = renderChildren()
      if (children && webObject.children && webObject.children.length > 0) {
        elementProps.children = children
      }
    }

    console.log("Final element props:", elementProps)

    // Use React.createElement directly instead of forwardRef
    return React.createElement(tagName, elementProps)
  }

  return renderWebObject()
}

WebObjectComponent.displayName = "WebObjectComponent"

export default WebObjectComponent

import React, { useRef, useEffect, forwardRef, useCallback, memo } from "react"
import { WebObject as WebObjectType } from "../types"

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

  // Add debug logging
  console.log("Rendering WebObject:", webObject.id, webObject.type, webObject)

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

  // Apply styles and positioning
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Apply custom styles
    if (webObject.style) {
      Object.assign(element.style, webObject.style)
    }

    // Apply positioning
    if (webObject.position) {
      element.style.position = "absolute"
      element.style.left = `${webObject.position.x}px`
      element.style.top = `${webObject.position.y}px`
      if (webObject.position.z !== undefined) {
        element.style.zIndex = webObject.position.z.toString()
      }
    }

    // Apply sizing
    if (webObject.size) {
      element.style.width = `${webObject.size.width}px`
      element.style.height = `${webObject.size.height}px`
    }
  }, [webObject.style, webObject.position, webObject.size])

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

  // Render based on WebObject type
  const renderWebObject = () => {
    switch (webObject.type) {
      case "element":
        return renderHTMLElement()
      case "component":
        return renderCustomComponent()
      case "container":
        return renderContainer()
      default:
        return <div>Unknown WebObject type: {webObject.type}</div>
    }
  }

  const renderHTMLElement = () => {
    const tagName = webObject.tagName || "div"
    const props = webObject.props || {}

    console.log("Rendering HTML element:", tagName, props)

    // Create element props without children first
    const elementProps: any = {
      ...props,
      ref: elementRef,
    }

    // Only add children from renderChildren() if there are actual WebObject children
    // and if props.children is not already set
    const children = renderChildren()
    if (
      children &&
      (!props.children || (webObject.children && webObject.children.length > 0))
    ) {
      elementProps.children = children
    }

    console.log("Final element props:", elementProps)

    // Use React.createElement directly instead of forwardRef
    return React.createElement(tagName, elementProps)
  }

  const renderCustomComponent = () => {
    // For custom components, you would typically have a registry
    // For now, we'll render as a div with component name
    return (
      <div
        ref={elementRef as React.Ref<HTMLDivElement>}
        data-component={webObject.componentName}
        {...webObject.props}
      >
        {renderChildren()}
      </div>
    )
  }

  const renderContainer = () => {
    return (
      <div
        ref={elementRef as React.Ref<HTMLDivElement>}
        data-container-id={webObject.id}
        {...webObject.props}
      >
        {renderChildren()}
      </div>
    )
  }

  return renderWebObject()
}

WebObjectComponent.displayName = "WebObjectComponent"

export default WebObjectComponent

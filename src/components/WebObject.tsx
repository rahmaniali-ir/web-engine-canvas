import React, { useRef, useEffect, useCallback, useMemo } from "react"
import { WebObject, WebObjectContext } from "../types"
import { WebObjectComponentService } from "../services/WebObjectComponentService"
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

  // Apply components to the element
  const applyComponents = useCallback(() => {
    if (!elementRef.current || !webObject.components) return

    const element = elementRef.current
    const computedStyles = componentService.computeStyles(webObject.components)

    // Apply computed styles
    Object.assign(element.style, computedStyles)
  }, [webObject.components, componentService])

  // Apply components when they change
  useEffect(() => {
    applyComponents()
  }, [applyComponents])

  // Notify when element is ready
  useEffect(() => {
    if (elementRef.current && onWebObjectReady) {
      onWebObjectReady(elementRef.current, webObject)
    }
  }, [webObject, onWebObjectReady])

  // Handle specialized WebObject types
  if (webObject.type === "link") {
    if (!context) {
      console.warn("LinkWebObject requires context for navigation")
      return null
    }
    return (
      <LinkWebObjectComponent
        webObject={webObject}
        context={context}
        onWebObjectReady={onWebObjectReady}
        onWebObjectUpdate={onWebObjectUpdate}
      />
    )
  }

  // Handle other specialized types
  if (webObject.type === "button") {
    return (
      <button
        ref={elementRef as React.RefObject<HTMLButtonElement>}
        disabled={webObject.disabled}
        onClick={event => {
          if (webObject.onClick && context) {
            const handler = context[
              webObject.onClick as keyof WebObjectContext
            ] as Function
            if (handler) handler(event)
          }
        }}
      >
        {webObject.content && <span>{webObject.content}</span>}
        {webObject.children?.map(child => (
          <WebObjectComponent
            key={child.id}
            webObject={child}
            context={context}
            onWebObjectReady={onWebObjectReady}
            onWebObjectUpdate={onWebObjectUpdate}
          />
        ))}
      </button>
    )
  }

  if (webObject.type === "input") {
    return (
      <input
        ref={elementRef as React.RefObject<HTMLInputElement>}
        type={webObject.inputType}
        placeholder={webObject.placeholder}
        value={webObject.value}
        disabled={webObject.disabled}
        required={webObject.required}
        onChange={event => {
          if (webObject.onChange && context) {
            const handler = context[
              webObject.onChange as keyof WebObjectContext
            ] as Function
            if (handler) handler(event)
          }
        }}
      />
    )
  }

  if (webObject.type === "image") {
    return (
      <img
        ref={elementRef as React.RefObject<HTMLImageElement>}
        src={webObject.src}
        alt={webObject.alt}
        width={webObject.width}
        height={webObject.height}
      />
    )
  }

  if (webObject.type === "heading") {
    return (
      <div ref={elementRef as React.RefObject<HTMLDivElement>}>
        {webObject.content && <span>{webObject.content}</span>}
        {webObject.children?.map(child => (
          <WebObjectComponent
            key={child.id}
            webObject={child}
            context={context}
            onWebObjectReady={onWebObjectReady}
            onWebObjectUpdate={onWebObjectUpdate}
          />
        ))}
      </div>
    )
  }

  if (webObject.type === "paragraph") {
    return (
      <p ref={elementRef as React.RefObject<HTMLParagraphElement>}>
        {webObject.content && <span>{webObject.content}</span>}
        {webObject.children?.map(child => (
          <WebObjectComponent
            key={child.id}
            webObject={child}
            context={context}
            onWebObjectReady={onWebObjectReady}
            onWebObjectUpdate={onWebObjectUpdate}
          />
        ))}
      </p>
    )
  }

  if (webObject.type === "span") {
    return (
      <span ref={elementRef as React.RefObject<HTMLSpanElement>}>
        {webObject.content && <span>{webObject.content}</span>}
        {webObject.children?.map(child => (
          <WebObjectComponent
            key={child.id}
            webObject={child}
            context={context}
            onWebObjectReady={onWebObjectReady}
            onWebObjectUpdate={onWebObjectUpdate}
          />
        ))}
      </span>
    )
  }

  // Default div WebObject
  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>}>
      {webObject.content && <span>{webObject.content}</span>}
      {webObject.children?.map(child => (
        <WebObjectComponent
          key={child.id}
          webObject={child}
          context={context}
          onWebObjectReady={onWebObjectReady}
          onWebObjectUpdate={onWebObjectUpdate}
        />
      ))}
    </div>
  )
}

export default WebObjectComponent

import React, { useCallback, useRef, useEffect, useMemo } from "react"
import { LinkWebObject, WebObjectContext } from "../../types"
import { WebObjectComponentService } from "../../services/WebObjectComponentService"
import { AssetService } from "../../services/AssetService"
import WebObjectComponent from "../WebObject"

interface LinkWebObjectProps {
  webObject: LinkWebObject
  context: WebObjectContext
  onWebObjectReady?: (element: HTMLElement, webObject: LinkWebObject) => void
  onWebObjectUpdate?: (element: HTMLElement, webObject: LinkWebObject) => void
}

const LinkWebObjectComponent: React.FC<LinkWebObjectProps> = ({
  webObject,
  context,
  onWebObjectReady,
  onWebObjectUpdate,
}) => {
  const elementRef = useRef<HTMLAnchorElement>(null)
  const componentService = useMemo(() => new WebObjectComponentService(), [])
  const assetService =
    context?.assetService || useMemo(() => new AssetService(), [])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (webObject.routerLink) {
        event.preventDefault()
        context.navigate(webObject.routerLink)
      }

      // Call any custom onClick handler if defined
      if (
        webObject.onClick &&
        context[webObject.onClick as keyof WebObjectContext]
      ) {
        const handler = context[
          webObject.onClick as keyof WebObjectContext
        ] as Function
        handler(event)
      }
    },
    [webObject, context]
  )

  // Apply components to the element
  const applyComponents = useCallback(() => {
    if (!elementRef.current || !webObject.components) return

    const element = elementRef.current
    componentService.applyComponents(element, webObject, assetService)
  }, [webObject.components, componentService, assetService])

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

  const handleWebObjectReady = useCallback(
    (element: HTMLElement) => {
      if (onWebObjectReady) {
        onWebObjectReady(element, webObject)
      }
    },
    [onWebObjectReady, webObject]
  )

  const handleWebObjectUpdate = useCallback(
    (element: HTMLElement) => {
      if (onWebObjectUpdate) {
        onWebObjectUpdate(element, webObject)
      }
    },
    [onWebObjectUpdate, webObject]
  )

  return (
    <a
      ref={elementRef}
      href={webObject.href || webObject.routerLink || "#"}
      target={webObject.target}
      onClick={handleClick}
      style={{ textDecoration: "none" }}
    >
      {webObject.content && <span>{webObject.content}</span>}
      {webObject.children?.map(child => (
        <WebObjectComponent
          key={child.id}
          webObject={child}
          context={context}
          onWebObjectReady={handleWebObjectReady}
          onWebObjectUpdate={handleWebObjectUpdate}
        />
      ))}
    </a>
  )
}

export default LinkWebObjectComponent

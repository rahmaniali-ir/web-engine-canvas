import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { AssetService } from "../../services/AssetService"
import { WebObjectComponentService } from "../../services/WebObjectComponentService"
import {
  LinkWebObject,
  WebObjectContext,
  WebObjectEvent,
  WebObjectEventListener,
} from "../../types"
import WebObjectComponent from "../WebObject"

interface LinkWebObjectProps {
  webObject: LinkWebObject
  context: WebObjectContext
  eventListeners?: WebObjectEventListener[]
  onEvent?: (event: WebObjectEvent) => void
}

const LinkWebObjectComponent: React.FC<LinkWebObjectProps> = React.memo(
  ({ webObject, context, eventListeners, onEvent }) => {
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
      if (elementRef.current) {
        onEvent?.({
          element: elementRef.current,
          webObject,
          name: "webObject",
          type: "ready",
          timestamp: Date.now(),
          source: "LinkWebObject",
        })
      }
    }, [webObject, onEvent])

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
            eventListeners={eventListeners}
            onEvent={onEvent}
          />
        ))}
      </a>
    )
  }
)

export default LinkWebObjectComponent

import React, { useCallback } from "react"
import { LinkWebObject, WebObjectContext } from "../../types"
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
          onWebObjectReady={handleWebObjectReady}
          onWebObjectUpdate={handleWebObjectUpdate}
        />
      ))}
    </a>
  )
}

export default LinkWebObjectComponent

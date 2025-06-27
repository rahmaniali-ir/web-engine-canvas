// Core WebObject types

import { WebObjectComponent } from "./WebObjectComponent"

export interface BaseWebObject {
  id: string
  components?: WebObjectComponent[]
  children?: WebObject[]
  content?: string
}

export interface DivWebObject extends BaseWebObject {
  type: "div"
}

export interface LinkWebObject extends BaseWebObject {
  type: "link"
  href?: string
  routerLink?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
  onClick?: string // Event handler name
}

export interface ButtonWebObject extends BaseWebObject {
  type: "button"
  disabled?: boolean
  onClick?: string // Event handler name
}

export interface InputWebObject extends BaseWebObject {
  type: "input"
  inputType: "text" | "email" | "password" | "number" | "search" | "tel" | "url"
  placeholder?: string
  value?: string
  disabled?: boolean
  required?: boolean
  onChange?: string // Event handler name
}

export interface ImageWebObject extends BaseWebObject {
  type: "image"
  src: string
  alt?: string
  width?: number | string
  height?: number | string
}

export interface HeadingWebObject extends BaseWebObject {
  type: "heading"
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export interface ParagraphWebObject extends BaseWebObject {
  type: "paragraph"
}

export interface SpanWebObject extends BaseWebObject {
  type: "span"
}

export type WebObject =
  | DivWebObject
  | LinkWebObject
  | ButtonWebObject
  | InputWebObject
  | ImageWebObject
  | HeadingWebObject
  | ParagraphWebObject
  | SpanWebObject

// Core WebObject types

export interface WebObject {
  id: string
  tagName?: string // For HTML elements like 'h1', 'div', etc.
  children?: WebObject[]
  components?: WebObjectComponent[]
  content?: string // Text content for the element
}

export interface WebObjectComponent {
  id: string
  type: string
  config: Record<string, any>
}

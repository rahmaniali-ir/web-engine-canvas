# Web Engine Canvas

A React library for creating and managing dynamic web content using a WebObject system with CanvasManifest.

## Installation

```bash
npm install web-engine-canvas
```

or

```bash
yarn add web-engine-canvas
```

## Usage

### Basic WebObject Canvas

```tsx
import React from "react"
import { WebEngineCanvas, CanvasManifest } from "web-engine-canvas"

const manifest: CanvasManifest = {
  id: "my-canvas",
  name: "My Web Canvas",
  version: "1.0.0",
  settings: {
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
  },
  root: {
    id: "root-manifest",
    name: "Root",
    version: "1.0.0",
    root: {
      id: "root-container",
      type: "container",
      children: [
        {
          id: "header",
          type: "element",
          tagName: "h1",
          props: { children: "Hello World!" },
          style: { color: "#333", textAlign: "center" },
        },
      ],
    },
  },
}

function App() {
  const handleCanvasReady = context => {
    console.log("Canvas ready:", context)
  }

  return (
    <WebEngineCanvas manifest={manifest} onCanvasReady={handleCanvasReady} />
  )
}
```

### Using the useWebObjects Hook

```tsx
import React, { useState } from "react"
import {
  WebEngineCanvas,
  useWebObjects,
  CanvasManifest,
} from "web-engine-canvas"

function CanvasApp() {
  const [context, setContext] = useState(null)
  const webObjects = useWebObjects(context)

  const handleCanvasReady = canvasContext => {
    setContext(canvasContext)
  }

  const addNewElement = () => {
    const newElement = webObjects.createHTMLElement(
      "div",
      {
        children: "New Element",
      },
      {
        backgroundColor: "lightblue",
        padding: "10px",
        margin: "10px",
      }
    )

    webObjects.addWebObject("root-container", newElement)
  }

  return (
    <div>
      <WebEngineCanvas manifest={manifest} onCanvasReady={handleCanvasReady} />
      <button onClick={addNewElement}>Add Element</button>
    </div>
  )
}
```

## API Reference

### WebEngineCanvas Component

The main canvas component that renders WebObjects based on a CanvasManifest.

#### Props

- `manifest: CanvasManifest` - The canvas manifest defining the structure
- `className?: string` - CSS class name
- `style?: React.CSSProperties` - Inline styles
- `onCanvasReady?: (context: WebObjectContext) => void` - Callback when canvas is ready
- `onWebObjectReady?: (element: HTMLElement, webObject: WebObject) => void` - Callback when a WebObject is ready
- `onWebObjectUpdate?: (element: HTMLElement, webObject: WebObject) => void` - Callback when a WebObject is updated

### useWebObjects Hook

A custom hook that provides utilities for managing WebObjects.

#### Returns

- `selectedWebObjectId: string | null` - Currently selected WebObject ID
- `setSelectedWebObjectId: (id: string | null) => void` - Set selected WebObject
- `createWebObject: (type, options) => WebObject` - Create a new WebObject
- `addWebObject: (parentId, webObject) => void` - Add WebObject to tree
- `updateWebObject: (id, updates) => void` - Update a WebObject
- `removeWebObject: (id) => void` - Remove a WebObject
- `moveWebObject: (id, newParentId) => void` - Move WebObject to new parent
- `getWebObject: (id) => WebObject | undefined` - Get WebObject by ID
- `getChildren: (id) => WebObject[]` - Get children of a WebObject
- `getParent: (id) => WebObject | undefined` - Get parent of a WebObject
- `findWebObjectsByType: (type) => WebObject[]` - Find WebObjects by type
- `findWebObjectsByTagName: (tagName) => WebObject[]` - Find WebObjects by tag name
- `createHTMLElement: (tagName, props, style) => WebObject` - Create HTML element WebObject
- `createContainer: (props, style) => WebObject` - Create container WebObject
- `createComponent: (componentName, props, style) => WebObject` - Create component WebObject

### Types

#### CanvasManifest

```typescript
interface CanvasManifest {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  root: WebObjectManifest
  settings?: {
    width: number
    height: number
    backgroundColor?: string
    responsive?: boolean
  }
  metadata?: Record<string, any>
}
```

#### WebObject

```typescript
interface WebObject {
  id: string
  type: "element" | "component" | "container"
  tagName?: string // For HTML elements
  componentName?: string // For custom components
  props?: Record<string, any>
  style?: Record<string, any>
  children?: WebObject[]
  position?: {
    x: number
    y: number
    z?: number
  }
  size?: {
    width: number
    height: number
  }
  metadata?: Record<string, any>
}
```

#### WebObjectContext

```typescript
interface WebObjectContext {
  canvas: HTMLDivElement | null
  manifest: CanvasManifest
  webObjectTree: WebObjectTree
  updateWebObject: (id: string, updates: Partial<WebObject>) => void
  addWebObject: (parentId: string, webObject: WebObject) => void
  removeWebObject: (id: string) => void
  moveWebObject: (id: string, newParentId: string) => void
}
```

### WebObject Types

#### Element WebObjects

HTML elements that can be rendered:

```typescript
{
  id: 'my-heading',
  type: 'element',
  tagName: 'h1',
  props: { children: 'My Heading' },
  style: { color: '#333', fontSize: '24px' }
}
```

#### Container WebObjects

Containers that can hold other WebObjects:

```typescript
{
  id: 'my-container',
  type: 'container',
  style: { display: 'flex', gap: '10px' },
  children: [/* other WebObjects */]
}
```

#### Component WebObjects

Custom components (requires component registry):

```typescript
{
  id: 'my-component',
  type: 'component',
  componentName: 'MyCustomComponent',
  props: { title: 'Hello' },
  style: { backgroundColor: 'lightblue' }
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Lint the code
npm run lint
```

## License

MIT

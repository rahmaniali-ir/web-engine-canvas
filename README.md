# WebEngineCanvas

A powerful React-based web engine for creating interactive web applications with a component-driven architecture, prefab system, and comprehensive asset management.

## Features

- **Component-Driven Architecture**: Build web applications using reusable WebObject components
- **Prefab System**: Create and manage reusable WebObject templates (similar to Unity3D prefabs)
- **Asset System**: Comprehensive asset management for resources, components, styles, and more
- **Asset References**: Reference assets in components for dynamic content and styling
- **Routing**: Built-in routing system for multi-page applications
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **React Integration**: Seamless integration with React applications

## Installation

```bash
npm install web-engine-canvas
# or
yarn add web-engine-canvas
# or
pnpm add web-engine-canvas
```

## Quick Start

```tsx
import React from "react"
import { WebEngineCanvas, type Manifest } from "web-engine-canvas"

const manifest: Manifest = {
  id: "my-app",
  name: "My Application",
  version: "1.0.0",
  routes: [
    {
      id: "main",
      path: "/",
      sceneId: "main-scene",
    },
  ],
  scenes: [
    {
      id: "main-scene",
      name: "Main Scene",
      path: "/",
      root: {
        id: "root",
        type: "div",
        components: [
          {
            id: "material",
            type: "material",
            config: {
              backgroundColor: "#f8f9fa",
              padding: "20px",
            },
          },
        ],
        children: [
          {
            id: "heading",
            type: "heading",
            level: 1,
            content: "Welcome to WebEngineCanvas",
            components: [
              {
                id: "typography",
                type: "typography",
                config: {
                  fontFamily: "Arial, sans-serif",
                  fontSize: "32px",
                  color: "#333333",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "button",
            type: "button",
            content: "Click Me",
            onClick: "handleClick",
            components: [
              {
                id: "material",
                type: "material",
                config: {
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: "none",
                },
              },
              {
                id: "interaction",
                type: "interaction",
                config: {
                  cursor: "pointer",
                },
              },
            ],
          },
        ],
      },
    },
  ],
  defaultRoute: "main",
  assets: {
    assets: new Map(),
    paths: new Map(),
    types: new Map(),
    tags: new Map(),
  },
}

function App() {
  return (
    <WebEngineCanvas
      manifest={manifest}
      style={{ width: "100%", height: "100vh" }}
      onCanvasReady={context => {
        console.log("Canvas ready:", context)
      }}
    />
  )
}

export default App
```

## Asset System

The WebEngineCanvas includes a comprehensive asset system that allows you to manage and reference various types of assets throughout your application. Assets are defined in the manifest and handled internally by the canvas.

### Asset Types

The system supports multiple asset types:

- **Resource Assets**: Images, links, text, SVG, files, data blobs
- **Prefab Assets**: Reusable WebObject templates
- **Component Assets**: Reusable component configurations
- **Style Palette Assets**: Colors, gradients, fonts, spacing, borders, shadows, animations
- **Animation Assets**: Keyframes, transitions, easing functions
- **JSON Assets**: Structured data
- **Script Assets**: JavaScript/TypeScript code
- **Shader Assets**: GLSL shaders
- **Audio Assets**: Sound files
- **Video Assets**: Video files
- **Font Assets**: Web fonts
- **Icon Assets**: Icon definitions

### Asset References in Components

Components can reference assets defined in the manifest for dynamic content and styling:

```tsx
// In your manifest, define assets
const manifest: Manifest = {
  // ... other manifest properties
  assets: {
    assets: new Map([
      [
        "primary-colors",
        {
          id: "primary-colors",
          name: "Primary Colors",
          type: "stylePalette",
          path: "assets/styles",
          paletteType: "color",
          values: {
            primary: "#007bff",
            secondary: "#6c757d",
            success: "#28a745",
          },
          // ... other asset properties
        },
      ],
    ]),
    // ... other registry properties
  },
  scenes: [
    {
      id: "main-scene",
      root: {
        id: "root",
        type: "div",
        components: [
          {
            id: "material",
            type: "material",
            config: {
              backgroundColor: {
                assetId: "primary-colors",
                assetType: "stylePalette",
                parameters: { key: "primary" },
              },
              color: "#ffffff",
            },
          },
        ],
        children: [],
      },
    },
  ],
}
```

### Asset Management in Manifest

Assets are defined in the manifest and organized by type, path, and tags:

```tsx
const manifest: Manifest = {
  // ... other properties
  assets: {
    assets: new Map([
      // Define your assets here
      [
        "logo",
        {
          id: "logo",
          name: "Company Logo",
          type: "resource",
          resourceType: "image",
          path: "assets/images",
          url: "https://example.com/logo.png",
          // ... other properties
        },
      ],
      [
        "brand-colors",
        {
          id: "brand-colors",
          name: "Brand Colors",
          type: "stylePalette",
          paletteType: "color",
          path: "assets/styles",
          values: {
            primary: "#007bff",
            secondary: "#6c757d",
          },
          // ... other properties
        },
      ],
      [
        "button-prefab",
        {
          id: "button-prefab",
          name: "Button Prefab",
          type: "prefab",
          path: "assets/prefabs",
          template: {
            id: "button-template",
            type: "button",
            content: "Button",
            components: [
              {
                id: "material",
                type: "material",
                config: {
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "6px",
                },
              },
            ],
          },
          parameters: [
            {
              name: "text",
              type: "string",
              defaultValue: "Button",
              description: "Button text content",
            },
          ],
          // ... other properties
        },
      ],
    ]),
    paths: new Map([
      ["assets/images", ["logo"]],
      ["assets/styles", ["brand-colors"]],
      ["assets/prefabs", ["button-prefab"]],
    ]),
    types: new Map([
      ["resource", ["logo"]],
      ["stylePalette", ["brand-colors"]],
      ["prefab", ["button-prefab"]],
    ]),
    tags: new Map([
      ["logo", ["logo"]],
      ["brand", ["logo", "brand-colors"]],
      ["ui", ["button-prefab"]],
    ]),
  },
}
```

## WebObjects

WebObjects are the building blocks of your application. They represent HTML elements with additional metadata and components.

### WebObject Types

```tsx
import type { WebObject } from "web-engine-canvas"

// Div WebObject
const divWebObject: WebObject = {
  id: "container",
  type: "div",
  components: [],
  children: [],
}

// Button WebObject
const buttonWebObject: WebObject = {
  id: "submit-button",
  type: "button",
  content: "Submit",
  disabled: false,
  onClick: "handleSubmit",
  components: [],
}

// Input WebObject
const inputWebObject: WebObject = {
  id: "email-input",
  type: "input",
  inputType: "email",
  placeholder: "Enter email",
  required: true,
  components: [],
}

// Image WebObject
const imageWebObject: WebObject = {
  id: "hero-image",
  type: "image",
  src: "https://example.com/image.jpg",
  alt: "Hero image",
  width: 800,
  height: 400,
  components: [],
}
```

### Components

Add components to WebObjects for styling and behavior:

```tsx
const webObject: WebObject = {
  id: "styled-button",
  type: "button",
  content: "Click Me",
  components: [
    {
      id: "material",
      type: "material",
      config: {
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "6px",
      },
    },
    {
      id: "typography",
      type: "typography",
      config: {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    {
      id: "interaction",
      type: "interaction",
      config: {
        cursor: "pointer",
      },
    },
  ],
}
```

## Manifest Structure

The manifest defines your entire application structure:

```tsx
import type { Manifest } from "web-engine-canvas"

const manifest: Manifest = {
  id: "my-app",
  name: "My Application",
  version: "1.0.0",
  description: "A web application built with WebEngineCanvas",

  // Routes define navigation
  routes: [
    {
      id: "main",
      path: "/",
      sceneId: "main-scene",
    },
    {
      id: "about",
      path: "/about",
      sceneId: "about-scene",
    },
  ],

  // Scenes define the content for each route
  scenes: [
    {
      id: "main-scene",
      name: "Main Scene",
      path: "/",
      root: {
        // WebObject tree for this scene
        id: "root",
        type: "div",
        components: [],
        children: [],
      },
    },
  ],

  // Default route to navigate to
  defaultRoute: "main",

  // Asset registry for all assets
  assets: {
    assets: new Map(),
    paths: new Map(),
    types: new Map(),
    tags: new Map(),
  },

  // Optional settings
  settings: {
    width: 1200,
    height: 800,
    backgroundColor: "#ffffff",
    responsive: true,
    assetPaths: ["assets/", "public/assets/"],
  },

  // Optional metadata
  metadata: {
    author: "Developer",
    category: "web-app",
    tags: ["react", "canvas"],
  },
}
```

## Examples

### Basic Example

```tsx
import React from "react"
import { WebEngineCanvas, type Manifest } from "web-engine-canvas"

const manifest: Manifest = {
  id: "basic-example",
  name: "Basic Example",
  version: "1.0.0",
  routes: [
    {
      id: "main",
      path: "/",
      sceneId: "main-scene",
    },
  ],
  scenes: [
    {
      id: "main-scene",
      name: "Main Scene",
      path: "/",
      root: {
        id: "root",
        type: "div",
        components: [
          {
            id: "material",
            type: "material",
            config: {
              backgroundColor: "#f8f9fa",
              padding: "20px",
            },
          },
        ],
        children: [
          {
            id: "heading",
            type: "heading",
            level: 1,
            content: "Welcome to WebEngineCanvas",
            components: [
              {
                id: "typography",
                type: "typography",
                config: {
                  fontFamily: "Arial, sans-serif",
                  fontSize: "32px",
                  color: "#333333",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "button",
            type: "button",
            content: "Click Me",
            onClick: "handleClick",
            components: [
              {
                id: "material",
                type: "material",
                config: {
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: "none",
                },
              },
              {
                id: "interaction",
                type: "interaction",
                config: {
                  cursor: "pointer",
                },
              },
            ],
          },
        ],
      },
    },
  ],
  defaultRoute: "main",
  assets: {
    assets: new Map(),
    paths: new Map(),
    types: new Map(),
    tags: new Map(),
  },
}

function App() {
  return (
    <WebEngineCanvas
      manifest={manifest}
      style={{ width: "100%", height: "100vh" }}
      onCanvasReady={context => {
        console.log("Canvas ready:", context)
      }}
    />
  )
}

export default App
```

### Asset System Example

See `dev/asset-example.tsx` for a comprehensive example of the asset system in action.

## API Reference

### WebEngineCanvas Props

| Prop            | Type                                  | Description                                          |
| --------------- | ------------------------------------- | ---------------------------------------------------- |
| `manifest`      | `Manifest`                            | Application manifest with routes, scenes, and assets |
| `style`         | `CSSProperties`                       | CSS styles for the canvas container                  |
| `onCanvasReady` | `(context: WebObjectContext) => void` | Callback when canvas is ready                        |
| `className`     | `string`                              | CSS class name for the canvas container              |

### Manifest Types

| Type               | Description                                       |
| ------------------ | ------------------------------------------------- |
| `Manifest`         | Main application manifest                         |
| `Route`            | Route definition                                  |
| `Scene`            | Scene definition with WebObject tree              |
| `WebObjectContext` | Canvas context with navigation and update methods |

### WebObject Types

| Type                 | Description                 |
| -------------------- | --------------------------- |
| `WebObject`          | Base WebObject interface    |
| `DivWebObject`       | Div element WebObject       |
| `ButtonWebObject`    | Button element WebObject    |
| `InputWebObject`     | Input element WebObject     |
| `ImageWebObject`     | Image element WebObject     |
| `LinkWebObject`      | Link element WebObject      |
| `HeadingWebObject`   | Heading element WebObject   |
| `ParagraphWebObject` | Paragraph element WebObject |
| `SpanWebObject`      | Span element WebObject      |

### Component Types

| Type                    | Description                 |
| ----------------------- | --------------------------- |
| `MeshComponent`         | Layout and positioning      |
| `MaterialComponent`     | Background, colors, effects |
| `MarginComponent`       | Margin spacing              |
| `PaddingComponent`      | Padding spacing             |
| `BorderComponent`       | Border styling              |
| `BorderRadiusComponent` | Border radius               |
| `TypographyComponent`   | Text styling                |
| `InteractionComponent`  | Cursor and pointer events   |
| `TransitionComponent`   | CSS transitions             |
| `BoxShadowComponent`    | Box shadows                 |
| `FilterComponent`       | CSS filters                 |

### Asset Types

| Type                | Description                       |
| ------------------- | --------------------------------- |
| `Asset`             | Base asset interface              |
| `AssetType`         | All supported asset types         |
| `AssetReference`    | Asset reference for components    |
| `AssetValue`        | Direct value or asset reference   |
| `AssetRegistry`     | Asset management registry         |
| `ResourceAsset`     | Images, links, text, files, etc.  |
| `PrefabAsset`       | Reusable WebObject templates      |
| `ComponentAsset`    | Reusable component configurations |
| `StylePaletteAsset` | Colors, gradients, fonts, etc.    |
| `AnimationAsset`    | Keyframes, transitions, etc.      |
| `JsonAsset`         | Structured data                   |
| `ScriptAsset`       | JavaScript/TypeScript code        |
| `ShaderAsset`       | GLSL shaders                      |
| `AudioAsset`        | Sound files                       |
| `VideoAsset`        | Video files                       |
| `FontAsset`         | Web fonts                         |
| `IconAsset`         | Icon definitions                  |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

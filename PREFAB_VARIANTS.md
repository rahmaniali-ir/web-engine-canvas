# Prefab Variants System

The WebEngine Canvas prefab system now supports variants, allowing you to create multiple versions of the same prefab with different layouts, styles, and configurations. This is particularly useful for components like blog posts that need different presentations based on context.

## Overview

Prefab variants provide:

- **Multiple layouts** for the same component type
- **Consistent structure** with different visual presentations
- **Flexible styling** options for different use cases
- **Easy switching** between variants at runtime
- **Type-safe** variant selection and management

## Blog Post Example

The sample manifest includes a comprehensive blog post prefab with four variants:

### 1. Featured Post (`featured`)

- **Layout**: Large, prominent display
- **Image**: Full-width hero image (300px height)
- **Typography**: Large, bold title (2rem)
- **Use case**: Hero sections, featured content
- **Properties**: `{ layout: "featured", imageSize: "large", typography: "prominent" }`

### 2. Compact Post (`compact`)

- **Layout**: Horizontal layout with thumbnail
- **Image**: Small thumbnail (120x80px)
- **Typography**: Condensed, smaller text
- **Use case**: List views, search results
- **Properties**: `{ layout: "compact", imageSize: "small", typography: "condensed" }`

### 3. Minimal Post (`minimal`)

- **Layout**: Text-focused, no image
- **Image**: None
- **Typography**: Clean, readable text
- **Use case**: Text-heavy content, accessibility
- **Properties**: `{ layout: "minimal", imageSize: "none", typography: "clean" }`

### 4. Card Post (`card`)

- **Layout**: Card-style with hover effects
- **Image**: Medium-sized image (200px height)
- **Typography**: Modern, balanced design
- **Use case**: Grid layouts, portfolios
- **Properties**: `{ layout: "card", imageSize: "medium", typography: "modern" }`

## Usage

### Basic Variant Selection

```typescript
// Instantiate a featured blog post
const featuredPost = {
  prefabId: "blog-post",
  prefabVariantId: "featured",
  parameters: {
    title: "Building Modern Web Applications",
    excerpt: "Discover how WebEngine Canvas revolutionizes web development...",
    category: "Technology",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    imageUrl: "https://example.com/image.jpg",
  },
}

// Instantiate a compact blog post for list view
const compactPost = {
  prefabId: "blog-post",
  prefabVariantId: "compact",
  parameters: {
    title: "Quick Development Tips",
    excerpt: "Essential tips for faster development...",
    category: "Tips",
    date: "March 14, 2024",
  },
}

// Use default variant (featured)
const defaultPost = {
  prefabId: "blog-post",
  parameters: {
    title: "Default Blog Post",
    excerpt: "This uses the default variant",
    category: "General",
  },
}
```

### Variant Selection Logic

The WebObject component automatically selects the appropriate variant:

1. **Explicit variant**: If `prefabVariantId` is provided, use that variant
2. **Default variant**: If no variant specified, use the prefab's `defaultVariantId`
3. **Fallback**: If default variant doesn't exist, use the main template

```typescript
// The WebObject component handles this logic:
const selectedVariant = prefabVariantId
  ? prefab.variants?.find(v => v.id === prefabVariantId)
  : prefab.variants?.find(v => v.id === prefab.defaultVariantId)

const template = selectedVariant?.template || prefab.template
```

## PrefabService API

The `PrefabService` provides comprehensive variant management:

### Getting Variants

```typescript
import { PrefabService } from "./services/PrefabService"

const prefabService = new PrefabService(prefabs)

// Get all variants of a prefab
const blogPostPrefab = prefabService.getPrefab("blog-post")
const variants = blogPostPrefab?.variants || []

// Get specific variant
const featuredVariant = prefabService.getVariant("blog-post", "featured")
const compactVariant = prefabService.getVariant("blog-post", "compact")
```

### Searching Variants

```typescript
// Find variants by properties
const largeImageVariants = prefabService.searchVariantsByProperties(
  "blog-post",
  {
    imageSize: "large",
  }
)
// Returns: [featured variant]

const compactLayoutVariants = prefabService.searchVariantsByProperties(
  "blog-post",
  {
    layout: "compact",
  }
)
// Returns: [compact variant]

const noImageVariants = prefabService.searchVariantsByProperties("blog-post", {
  imageSize: "none",
})
// Returns: [minimal variant]
```

### Managing Variants

```typescript
// Create new variant
const newVariant = prefabService.createVariant("blog-post", {
  id: "grid",
  name: "Grid Post",
  description: "Grid-style blog post for masonry layouts",
  properties: {
    layout: "grid",
    imageSize: "medium",
    typography: "compact",
  },
  template: {
    // ... template definition
  },
})

// Update variant
const updatedVariant = prefabService.updateVariant("blog-post", "grid", {
  name: "Updated Grid Post",
  properties: {
    layout: "grid",
    imageSize: "medium",
    typography: "compact",
    updated: true,
  },
})

// Set default variant
prefabService.setDefaultVariant("blog-post", "card")

// Delete variant
const deletedVariant = prefabService.deleteVariant("blog-post", "grid")
```

### Utility Methods

```typescript
// Get all prefabs that have variants
const prefabsWithVariants = prefabService.getAllPrefabsWithVariants()

// Check if prefab has variants
const hasVariants = prefabService.hasVariants("blog-post") // true

// Get variant count
const variantCount = prefabService.getVariantCount("blog-post") // 4
```

## Type Definitions

### PrefabVariant Interface

```typescript
interface PrefabVariant {
  id: string
  name: string
  description: string
  template: WebObjectTemplate
  properties: Record<string, any>
  createdAt: Date
  updatedAt: Date
}
```

### Updated Prefab Interface

```typescript
interface Prefab {
  id: string
  name: string
  description: string
  version: string
  template: WebObjectTemplate
  defaultVariantId?: string
  variants?: PrefabVariant[]
  parameters: PrefabParameter[]
  createdAt: Date
  updatedAt: Date
}
```

### PrefabInstantiationOptions

```typescript
interface PrefabInstantiationOptions {
  prefabId: string
  prefabVariantId?: string
  parameters?: Record<string, any>
  parentId?: string
  position?: { x: number; y: number }
}
```

## Best Practices

### 1. Variant Naming

- Use descriptive, semantic names: `featured`, `compact`, `minimal`, `card`
- Avoid generic names like `variant1`, `variant2`
- Consider the use case in the name

### 2. Property Organization

- Group related properties together
- Use consistent property names across variants
- Document property meanings and valid values

### 3. Template Structure

- Keep consistent component IDs across variants
- Use semantic HTML elements (`article`, `section`, etc.)
- Maintain accessibility across all variants

### 4. Default Variant Selection

- Choose the most commonly used variant as default
- Consider the most accessible variant as default
- Document why a particular variant is the default

### 5. Parameter Handling

- Ensure all variants can handle the same parameters
- Provide sensible defaults for optional parameters
- Validate parameters before instantiation

## Example: Blog Post Variants in Action

```typescript
// Different contexts for the same blog post content
const blogPostData = {
  title: "WebEngine Canvas: A New Era of Web Development",
  excerpt: "Discover how component-based architecture is changing the web...",
  category: "Technology",
  date: "March 15, 2024",
  author: "Sarah Johnson",
  imageUrl: "https://example.com/webengine-canvas.jpg",
}

// Featured post for homepage hero
const featuredPost = {
  prefabId: "blog-post",
  prefabVariantId: "featured",
  parameters: blogPostData,
}

// Compact post for blog listing
const compactPost = {
  prefabId: "blog-post",
  prefabVariantId: "compact",
  parameters: blogPostData,
}

// Card post for related articles grid
const cardPost = {
  prefabId: "blog-post",
  prefabVariantId: "card",
  parameters: blogPostData,
}

// Minimal post for RSS feeds or text-only contexts
const minimalPost = {
  prefabId: "blog-post",
  prefabVariantId: "minimal",
  parameters: blogPostData,
}
```

## Migration from Single Template

If you have existing prefabs without variants:

1. **Add defaultVariantId**: Set to the main template
2. **Create variants array**: Move the main template to a default variant
3. **Update references**: Change `prefabId` to include `prefabVariantId` where needed
4. **Test thoroughly**: Ensure all variants work correctly

```typescript
// Before (single template)
const oldPrefab = {
  id: "blog-post",
  template: {
    /* template */
  },
}

// After (with variants)
const newPrefab = {
  id: "blog-post",
  defaultVariantId: "default",
  variants: [
    {
      id: "default",
      name: "Default",
      template: {
        /* same template */
      },
    },
  ],
}
```

The prefab variants system provides a powerful way to create flexible, reusable components that can adapt to different contexts while maintaining consistency and type safety.

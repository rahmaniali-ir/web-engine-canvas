import {
  WebObject,
  MeshComponent,
  MaterialComponent,
  MarginComponent,
  PaddingComponent,
  BorderComponent,
  BorderRadiusComponent,
  TypographyComponent,
  InteractionComponent,
  TransitionComponent,
  BoxShadowComponent,
  FilterComponent,
} from "../types"
import { WebObjectComponent } from "../types/WebObjectComponent"

export class WebObjectComponentService {
  private componentRegistry: Map<
    string,
    (element: HTMLElement, config: any) => void
  > = new Map()

  constructor() {
    this.registerDefaultComponents()
  }

  private registerDefaultComponents() {
    // Register Mesh component
    this.componentRegistry.set(
      "mesh",
      (element: HTMLElement, config: MeshComponent["config"]) => {
        if (config.display) element.style.display = config.display
        if (config.position) element.style.position = config.position
        if (config.top !== undefined)
          element.style.top = this.formatValue(config.top)
        if (config.right !== undefined)
          element.style.right = this.formatValue(config.right)
        if (config.bottom !== undefined)
          element.style.bottom = this.formatValue(config.bottom)
        if (config.left !== undefined)
          element.style.left = this.formatValue(config.left)
        if (config.width !== undefined)
          element.style.width = this.formatValue(config.width)
        if (config.height !== undefined)
          element.style.height = this.formatValue(config.height)
        if (config.maxWidth !== undefined)
          element.style.maxWidth = this.formatValue(config.maxWidth)
        if (config.zIndex !== undefined)
          element.style.zIndex = config.zIndex.toString()
        if (config.flexDirection)
          element.style.flexDirection = config.flexDirection
        if (config.justifyContent)
          element.style.justifyContent = config.justifyContent
        if (config.alignItems) element.style.alignItems = config.alignItems
        if (config.gap !== undefined)
          element.style.gap = this.formatValue(config.gap)
        if (config.gridTemplateColumns)
          element.style.gridTemplateColumns = config.gridTemplateColumns
      }
    )

    // Register Margin component
    this.componentRegistry.set(
      "margin",
      (element: HTMLElement, config: MarginComponent["config"]) => {
        if (config.margin) element.style.margin = config.margin
        if (config.marginTop !== undefined)
          element.style.marginTop = this.formatValue(config.marginTop)
        if (config.marginRight !== undefined)
          element.style.marginRight = this.formatValue(config.marginRight)
        if (config.marginBottom !== undefined)
          element.style.marginBottom = this.formatValue(config.marginBottom)
        if (config.marginLeft !== undefined)
          element.style.marginLeft = this.formatValue(config.marginLeft)
      }
    )

    // Register Padding component
    this.componentRegistry.set(
      "padding",
      (element: HTMLElement, config: PaddingComponent["config"]) => {
        if (config.padding) element.style.padding = config.padding
        if (config.paddingTop !== undefined)
          element.style.paddingTop = this.formatValue(config.paddingTop)
        if (config.paddingRight !== undefined)
          element.style.paddingRight = this.formatValue(config.paddingRight)
        if (config.paddingBottom !== undefined)
          element.style.paddingBottom = this.formatValue(config.paddingBottom)
        if (config.paddingLeft !== undefined)
          element.style.paddingLeft = this.formatValue(config.paddingLeft)
      }
    )

    // Register Border component
    this.componentRegistry.set(
      "border",
      (element: HTMLElement, config: BorderComponent["config"]) => {
        if (config.border) element.style.border = config.border
        if (config.borderTop) element.style.borderTop = config.borderTop
        if (config.borderRight) element.style.borderRight = config.borderRight
        if (config.borderBottom)
          element.style.borderBottom = config.borderBottom
        if (config.borderLeft) element.style.borderLeft = config.borderLeft
      }
    )

    // Register BorderRadius component
    this.componentRegistry.set(
      "borderRadius",
      (element: HTMLElement, config: BorderRadiusComponent["config"]) => {
        if (config.borderRadius)
          element.style.borderRadius = config.borderRadius
        if (config.borderTopLeftRadius)
          element.style.borderTopLeftRadius = config.borderTopLeftRadius
        if (config.borderTopRightRadius)
          element.style.borderTopRightRadius = config.borderTopRightRadius
        if (config.borderBottomRightRadius)
          element.style.borderBottomRightRadius = config.borderBottomRightRadius
        if (config.borderBottomLeftRadius)
          element.style.borderBottomLeftRadius = config.borderBottomLeftRadius
      }
    )

    // Register Typography component
    this.componentRegistry.set(
      "typography",
      (element: HTMLElement, config: TypographyComponent["config"]) => {
        if (config.fontSize) element.style.fontSize = config.fontSize
        if (config.fontWeight)
          element.style.fontWeight = config.fontWeight.toString()
        if (config.fontFamily) element.style.fontFamily = config.fontFamily
        if (config.textAlign) element.style.textAlign = config.textAlign
        if (config.textDecoration)
          element.style.textDecoration = config.textDecoration
      }
    )

    // Register Interaction component
    this.componentRegistry.set(
      "interaction",
      (element: HTMLElement, config: InteractionComponent["config"]) => {
        if (config.cursor) element.style.cursor = config.cursor
      }
    )

    // Register Transition component
    this.componentRegistry.set(
      "transition",
      (element: HTMLElement, config: TransitionComponent["config"]) => {
        if (config.transition) element.style.transition = config.transition
        if (config.transitionProperty)
          element.style.transitionProperty = config.transitionProperty
        if (config.transitionDuration)
          element.style.transitionDuration = config.transitionDuration
        if (config.transitionTimingFunction)
          element.style.transitionTimingFunction =
            config.transitionTimingFunction
        if (config.transitionDelay)
          element.style.transitionDelay = config.transitionDelay
      }
    )

    // Register BoxShadow component
    this.componentRegistry.set(
      "boxShadow",
      (element: HTMLElement, config: BoxShadowComponent["config"]) => {
        if (config.boxShadow) element.style.boxShadow = config.boxShadow
      }
    )

    // Register Filter component
    this.componentRegistry.set(
      "filter",
      (element: HTMLElement, config: FilterComponent["config"]) => {
        if (config.filter) element.style.filter = config.filter
        if (config.backdropFilter)
          element.style.backdropFilter = config.backdropFilter
      }
    )

    // Register Material component
    this.componentRegistry.set(
      "material",
      (element: HTMLElement, config: MaterialComponent["config"]) => {
        if (config.color) element.style.color = config.color
        if (config.backgroundColor)
          element.style.backgroundColor = config.backgroundColor
        if (config.opacity !== undefined)
          element.style.opacity = config.opacity.toString()
      }
    )
  }

  private formatValue(value: string | number): string {
    if (typeof value === "number") {
      return `${value}px`
    }
    return value
  }

  applyComponents(element: HTMLElement, webObject: WebObject) {
    if (!webObject.components) return

    webObject.components.forEach(component => {
      const handler = this.componentRegistry.get(component.type)
      if (handler) {
        handler(element, component.config)
      }
    })
  }

  computeStyles(components: WebObjectComponent[]): React.CSSProperties {
    const styles: React.CSSProperties = {}

    components.forEach(component => {
      const handler = this.componentRegistry.get(component.type)
      if (handler) {
        // Create a temporary element to apply styles
        const tempElement = document.createElement("div")
        handler(tempElement, component.config)

        // Copy computed styles to our styles object manually
        for (let i = 0; i < tempElement.style.length; i++) {
          const property = tempElement.style[i]
          const value = tempElement.style.getPropertyValue(property)
          if (value) {
            ;(styles as any)[property] = value
          }
        }
      }
    })

    return styles
  }

  registerComponent(
    type: string,
    handler: (element: HTMLElement, config: any) => void
  ) {
    this.componentRegistry.set(type, handler)
  }

  getComponentHandler(type: string) {
    return this.componentRegistry.get(type)
  }

  // Helper methods to create components
  createMeshComponent(config: MeshComponent["config"]): MeshComponent {
    return {
      id: `mesh-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "mesh",
      config,
    }
  }

  createMarginComponent(config: MarginComponent["config"]): MarginComponent {
    return {
      id: `margin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "margin",
      config,
    }
  }

  createPaddingComponent(config: PaddingComponent["config"]): PaddingComponent {
    return {
      id: `padding-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "padding",
      config,
    }
  }

  createBorderComponent(config: BorderComponent["config"]): BorderComponent {
    return {
      id: `border-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "border",
      config,
    }
  }

  createBorderRadiusComponent(
    config: BorderRadiusComponent["config"]
  ): BorderRadiusComponent {
    return {
      id: `borderRadius-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      type: "borderRadius",
      config,
    }
  }

  createTypographyComponent(
    config: TypographyComponent["config"]
  ): TypographyComponent {
    return {
      id: `typography-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "typography",
      config,
    }
  }

  createInteractionComponent(
    config: InteractionComponent["config"]
  ): InteractionComponent {
    return {
      id: `interaction-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      type: "interaction",
      config,
    }
  }

  createTransitionComponent(
    config: TransitionComponent["config"]
  ): TransitionComponent {
    return {
      id: `transition-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "transition",
      config,
    }
  }

  createBoxShadowComponent(
    config: BoxShadowComponent["config"]
  ): BoxShadowComponent {
    return {
      id: `boxShadow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "boxShadow",
      config,
    }
  }

  createFilterComponent(config: FilterComponent["config"]): FilterComponent {
    return {
      id: `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "filter",
      config,
    }
  }

  createMaterialComponent(
    config: MaterialComponent["config"]
  ): MaterialComponent {
    return {
      id: `material-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "material",
      config,
    }
  }
}

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
  CssComponent,
} from "../types"
import { WebObjectComponent } from "../types/WebObjectComponent"
import { AssetService } from "./AssetService"

export class WebObjectComponentService {
  private componentRegistry: Map<
    string,
    (element: HTMLElement, config: any, assetService?: AssetService) => void
  > = new Map()

  constructor() {
    this.registerDefaultComponents()
  }

  private registerDefaultComponents() {
    // Register mesh component handler
    this.componentRegistry.set("mesh", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      // Layout properties
      if (resolvedConfig.display !== undefined) {
        element.style.display = resolvedConfig.display
      }
      if (resolvedConfig.flexDirection !== undefined) {
        element.style.flexDirection = resolvedConfig.flexDirection
      }
      if (resolvedConfig.justifyContent !== undefined) {
        element.style.justifyContent = resolvedConfig.justifyContent
      }
      if (resolvedConfig.alignItems !== undefined) {
        element.style.alignItems = resolvedConfig.alignItems
      }
      if (resolvedConfig.gap !== undefined) {
        element.style.gap = resolvedConfig.gap
      }
      if (resolvedConfig.flexWrap !== undefined) {
        element.style.flexWrap = resolvedConfig.flexWrap
      }
      if (resolvedConfig.gridTemplateColumns !== undefined) {
        element.style.gridTemplateColumns = resolvedConfig.gridTemplateColumns
      }
      if (resolvedConfig.gridTemplateRows !== undefined) {
        element.style.gridTemplateRows = resolvedConfig.gridTemplateRows
      }
      if (resolvedConfig.gridGap !== undefined) {
        element.style.gridGap = resolvedConfig.gridGap
      }

      // Sizing properties
      if (resolvedConfig.width !== undefined) {
        element.style.width =
          typeof resolvedConfig.width === "number"
            ? `${resolvedConfig.width}px`
            : resolvedConfig.width
      }
      if (resolvedConfig.height !== undefined) {
        element.style.height =
          typeof resolvedConfig.height === "number"
            ? `${resolvedConfig.height}px`
            : resolvedConfig.height
      }
      if (resolvedConfig.minWidth !== undefined) {
        element.style.minWidth =
          typeof resolvedConfig.minWidth === "number"
            ? `${resolvedConfig.minWidth}px`
            : resolvedConfig.minWidth
      }
      if (resolvedConfig.minHeight !== undefined) {
        element.style.minHeight =
          typeof resolvedConfig.minHeight === "number"
            ? `${resolvedConfig.minHeight}px`
            : resolvedConfig.minHeight
      }
      if (resolvedConfig.maxWidth !== undefined) {
        element.style.maxWidth =
          typeof resolvedConfig.maxWidth === "number"
            ? `${resolvedConfig.maxWidth}px`
            : resolvedConfig.maxWidth
      }
      if (resolvedConfig.maxHeight !== undefined) {
        element.style.maxHeight =
          typeof resolvedConfig.maxHeight === "number"
            ? `${resolvedConfig.maxHeight}px`
            : resolvedConfig.maxHeight
      }

      // Position properties
      if (resolvedConfig.position !== undefined) {
        element.style.position = resolvedConfig.position
      }
      if (resolvedConfig.top !== undefined) {
        element.style.top =
          typeof resolvedConfig.top === "number"
            ? `${resolvedConfig.top}px`
            : resolvedConfig.top
      }
      if (resolvedConfig.left !== undefined) {
        element.style.left =
          typeof resolvedConfig.left === "number"
            ? `${resolvedConfig.left}px`
            : resolvedConfig.left
      }
      if (resolvedConfig.right !== undefined) {
        element.style.right =
          typeof resolvedConfig.right === "number"
            ? `${resolvedConfig.right}px`
            : resolvedConfig.right
      }
      if (resolvedConfig.bottom !== undefined) {
        element.style.bottom =
          typeof resolvedConfig.bottom === "number"
            ? `${resolvedConfig.bottom}px`
            : resolvedConfig.bottom
      }
      if (resolvedConfig.zIndex !== undefined) {
        element.style.zIndex = resolvedConfig.zIndex.toString()
      }

      // Flex properties
      if (resolvedConfig.flexGrow !== undefined) {
        element.style.flexGrow = resolvedConfig.flexGrow.toString()
      }
      if (resolvedConfig.flexShrink !== undefined) {
        element.style.flexShrink = resolvedConfig.flexShrink.toString()
      }
      if (resolvedConfig.flexBasis !== undefined) {
        element.style.flexBasis = resolvedConfig.flexBasis
      }
      if (resolvedConfig.order !== undefined) {
        element.style.order = resolvedConfig.order.toString()
      }
    })

    // Register material component handler
    this.componentRegistry.set("material", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      if (resolvedConfig.backgroundColor !== undefined) {
        element.style.backgroundColor = resolvedConfig.backgroundColor
      }
      if (resolvedConfig.color !== undefined) {
        element.style.color = resolvedConfig.color
      }
      if (resolvedConfig.opacity !== undefined) {
        element.style.opacity = resolvedConfig.opacity.toString()
      }
      if (resolvedConfig.backgroundImage !== undefined) {
        // Wrap URLs in url() for CSS compatibility
        const bgImage = resolvedConfig.backgroundImage
        if (
          typeof bgImage === "string" &&
          (bgImage.startsWith("http") || bgImage.startsWith("/"))
        ) {
          element.style.backgroundImage = `url(${bgImage})`
        } else {
          element.style.backgroundImage = bgImage
        }
      }
      if (resolvedConfig.backgroundSize !== undefined) {
        element.style.backgroundSize = resolvedConfig.backgroundSize
      }
      if (resolvedConfig.backgroundPosition !== undefined) {
        element.style.backgroundPosition = resolvedConfig.backgroundPosition
      }
      if (resolvedConfig.backgroundRepeat !== undefined) {
        element.style.backgroundRepeat = resolvedConfig.backgroundRepeat
      }
      if (resolvedConfig.backgroundAttachment !== undefined) {
        element.style.backgroundAttachment = resolvedConfig.backgroundAttachment
      }
      if (resolvedConfig.backdropFilter !== undefined) {
        element.style.backdropFilter = resolvedConfig.backdropFilter
      }
      if (resolvedConfig.mixBlendMode !== undefined) {
        element.style.mixBlendMode = resolvedConfig.mixBlendMode
      }
      if (resolvedConfig.background !== undefined) {
        element.style.background = resolvedConfig.background
      }
    })

    // Register margin component handler
    this.componentRegistry.set("margin", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      if (resolvedConfig.margin !== undefined) {
        element.style.margin = resolvedConfig.margin
      }
      if (resolvedConfig.marginTop !== undefined) {
        element.style.marginTop =
          typeof resolvedConfig.marginTop === "number"
            ? `${resolvedConfig.marginTop}px`
            : resolvedConfig.marginTop
      }
      if (resolvedConfig.marginRight !== undefined) {
        element.style.marginRight =
          typeof resolvedConfig.marginRight === "number"
            ? `${resolvedConfig.marginRight}px`
            : resolvedConfig.marginRight
      }
      if (resolvedConfig.marginBottom !== undefined) {
        element.style.marginBottom =
          typeof resolvedConfig.marginBottom === "number"
            ? `${resolvedConfig.marginBottom}px`
            : resolvedConfig.marginBottom
      }
      if (resolvedConfig.marginLeft !== undefined) {
        element.style.marginLeft =
          typeof resolvedConfig.marginLeft === "number"
            ? `${resolvedConfig.marginLeft}px`
            : resolvedConfig.marginLeft
      }
    })

    // Register padding component handler
    this.componentRegistry.set("padding", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      if (resolvedConfig.padding !== undefined) {
        element.style.padding = resolvedConfig.padding
      }
      if (resolvedConfig.paddingTop !== undefined) {
        element.style.paddingTop =
          typeof resolvedConfig.paddingTop === "number"
            ? `${resolvedConfig.paddingTop}px`
            : resolvedConfig.paddingTop
      }
      if (resolvedConfig.paddingRight !== undefined) {
        element.style.paddingRight =
          typeof resolvedConfig.paddingRight === "number"
            ? `${resolvedConfig.paddingRight}px`
            : resolvedConfig.paddingRight
      }
      if (resolvedConfig.paddingBottom !== undefined) {
        element.style.paddingBottom =
          typeof resolvedConfig.paddingBottom === "number"
            ? `${resolvedConfig.paddingBottom}px`
            : resolvedConfig.paddingBottom
      }
      if (resolvedConfig.paddingLeft !== undefined) {
        element.style.paddingLeft =
          typeof resolvedConfig.paddingLeft === "number"
            ? `${resolvedConfig.paddingLeft}px`
            : resolvedConfig.paddingLeft
      }
    })

    // Register border component handler
    this.componentRegistry.set("border", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      if (resolvedConfig.border !== undefined) {
        element.style.border = resolvedConfig.border
      }
      if (resolvedConfig.borderTop !== undefined) {
        element.style.borderTop = resolvedConfig.borderTop
      }
      if (resolvedConfig.borderRight !== undefined) {
        element.style.borderRight = resolvedConfig.borderRight
      }
      if (resolvedConfig.borderBottom !== undefined) {
        element.style.borderBottom = resolvedConfig.borderBottom
      }
      if (resolvedConfig.borderLeft !== undefined) {
        element.style.borderLeft = resolvedConfig.borderLeft
      }
      if (resolvedConfig.borderWidth !== undefined) {
        element.style.borderWidth =
          typeof resolvedConfig.borderWidth === "number"
            ? `${resolvedConfig.borderWidth}px`
            : resolvedConfig.borderWidth
      }
      if (resolvedConfig.borderStyle !== undefined) {
        element.style.borderStyle = resolvedConfig.borderStyle
      }
      if (resolvedConfig.borderColor !== undefined) {
        element.style.borderColor = resolvedConfig.borderColor
      }
    })

    // Register border radius component handler
    this.componentRegistry.set(
      "borderRadius",
      (element, config, assetService) => {
        const resolvedConfig = this.resolveComponentConfig(config, assetService)

        if (resolvedConfig.borderRadius !== undefined) {
          element.style.borderRadius = resolvedConfig.borderRadius
        }
        if (resolvedConfig.borderTopLeftRadius !== undefined) {
          element.style.borderTopLeftRadius =
            typeof resolvedConfig.borderTopLeftRadius === "number"
              ? `${resolvedConfig.borderTopLeftRadius}px`
              : resolvedConfig.borderTopLeftRadius
        }
        if (resolvedConfig.borderTopRightRadius !== undefined) {
          element.style.borderTopRightRadius =
            typeof resolvedConfig.borderTopRightRadius === "number"
              ? `${resolvedConfig.borderTopRightRadius}px`
              : resolvedConfig.borderTopRightRadius
        }
        if (resolvedConfig.borderBottomRightRadius !== undefined) {
          element.style.borderBottomRightRadius =
            typeof resolvedConfig.borderBottomRightRadius === "number"
              ? `${resolvedConfig.borderBottomRightRadius}px`
              : resolvedConfig.borderBottomRightRadius
        }
        if (resolvedConfig.borderBottomLeftRadius !== undefined) {
          element.style.borderBottomLeftRadius =
            typeof resolvedConfig.borderBottomLeftRadius === "number"
              ? `${resolvedConfig.borderBottomLeftRadius}px`
              : resolvedConfig.borderBottomLeftRadius
        }
      }
    )

    // Register typography component handler
    this.componentRegistry.set(
      "typography",
      (element, config, assetService) => {
        const resolvedConfig = this.resolveComponentConfig(config, assetService)

        if (resolvedConfig.fontFamily !== undefined) {
          element.style.fontFamily = resolvedConfig.fontFamily
        }
        if (resolvedConfig.fontSize !== undefined) {
          element.style.fontSize =
            typeof resolvedConfig.fontSize === "number"
              ? `${resolvedConfig.fontSize}px`
              : resolvedConfig.fontSize
        }
        if (resolvedConfig.fontWeight !== undefined) {
          element.style.fontWeight = resolvedConfig.fontWeight.toString()
        }
        if (resolvedConfig.fontStyle !== undefined) {
          element.style.fontStyle = resolvedConfig.fontStyle
        }
        if (resolvedConfig.textAlign !== undefined) {
          element.style.textAlign = resolvedConfig.textAlign
        }
        if (resolvedConfig.lineHeight !== undefined) {
          element.style.lineHeight = resolvedConfig.lineHeight.toString()
        }
        if (resolvedConfig.letterSpacing !== undefined) {
          element.style.letterSpacing =
            typeof resolvedConfig.letterSpacing === "number"
              ? `${resolvedConfig.letterSpacing}px`
              : resolvedConfig.letterSpacing
        }
        if (resolvedConfig.textDecoration !== undefined) {
          element.style.textDecoration = resolvedConfig.textDecoration
        }
        if (resolvedConfig.textTransform !== undefined) {
          element.style.textTransform = resolvedConfig.textTransform
        }
        if (resolvedConfig.color !== undefined) {
          element.style.color = resolvedConfig.color
        }
        if (resolvedConfig.textShadow !== undefined) {
          element.style.textShadow = resolvedConfig.textShadow
        }
        if (resolvedConfig.whiteSpace !== undefined) {
          element.style.whiteSpace = resolvedConfig.whiteSpace
        }
        if (resolvedConfig.overflow !== undefined) {
          element.style.overflow = resolvedConfig.overflow
        }
        if (resolvedConfig.textOverflow !== undefined) {
          element.style.textOverflow = resolvedConfig.textOverflow
        }
      }
    )

    // Register interaction component handler
    this.componentRegistry.set(
      "interaction",
      (element, config, assetService) => {
        const resolvedConfig = this.resolveComponentConfig(config, assetService)

        if (resolvedConfig.cursor !== undefined) {
          element.style.cursor = resolvedConfig.cursor
        }
        if (resolvedConfig.pointerEvents !== undefined) {
          element.style.pointerEvents = resolvedConfig.pointerEvents
        }
        if (resolvedConfig.userSelect !== undefined) {
          element.style.userSelect = resolvedConfig.userSelect
        }
      }
    )

    // Register transition component handler
    this.componentRegistry.set(
      "transition",
      (element, config, assetService) => {
        const resolvedConfig = this.resolveComponentConfig(config, assetService)

        if (resolvedConfig.transition !== undefined) {
          element.style.transition = resolvedConfig.transition
        }
        if (resolvedConfig.transitionProperty !== undefined) {
          element.style.transitionProperty = resolvedConfig.transitionProperty
        }
        if (resolvedConfig.transitionDuration !== undefined) {
          element.style.transitionDuration =
            typeof resolvedConfig.transitionDuration === "number"
              ? `${resolvedConfig.transitionDuration}ms`
              : resolvedConfig.transitionDuration
        }
        if (resolvedConfig.transitionTimingFunction !== undefined) {
          element.style.transitionTimingFunction =
            resolvedConfig.transitionTimingFunction
        }
        if (resolvedConfig.transitionDelay !== undefined) {
          element.style.transitionDelay =
            typeof resolvedConfig.transitionDelay === "number"
              ? `${resolvedConfig.transitionDelay}ms`
              : resolvedConfig.transitionDelay
        }
      }
    )

    // Register box shadow component handler
    this.componentRegistry.set("boxShadow", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      if (resolvedConfig.boxShadow !== undefined) {
        element.style.boxShadow = resolvedConfig.boxShadow
      }
    })

    // Register filter component handler
    this.componentRegistry.set("filter", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      if (resolvedConfig.filter !== undefined) {
        element.style.filter = resolvedConfig.filter
      }
      if (resolvedConfig.backdropFilter !== undefined) {
        element.style.backdropFilter = resolvedConfig.backdropFilter
      }
    })

    // Register CSS component handler for custom CSS properties
    this.componentRegistry.set("css", (element, config, assetService) => {
      const resolvedConfig = this.resolveComponentConfig(config, assetService)

      // Apply any custom CSS property
      Object.entries(resolvedConfig).forEach(([property, value]) => {
        if (value !== undefined && value !== null) {
          element.style.setProperty(property, value.toString())
        }
      })
    })
  }

  /**
   * Resolve component configuration by resolving any asset references
   */
  private resolveComponentConfig(
    config: Record<string, any>,
    assetService?: AssetService
  ): Record<string, any> {
    if (!assetService) return config

    const resolvedConfig: Record<string, any> = {}

    Object.entries(config).forEach(([key, value]) => {
      resolvedConfig[key] = assetService.resolveAssetValue(value)
    })

    return resolvedConfig
  }

  computeStyles(
    components: WebObjectComponent[],
    assetService?: AssetService
  ): Record<string, string> {
    const styles: Record<string, string> = {}

    components.forEach(component => {
      const handler = this.componentRegistry.get(component.type)
      if (handler) {
        // Create a temporary element to apply styles
        const tempElement = document.createElement("div")
        handler(tempElement, component.config, assetService)

        // Extract computed styles
        const computedStyles = window.getComputedStyle(tempElement)
        for (let i = 0; i < computedStyles.length; i++) {
          const property = computedStyles[i]
          const value = computedStyles.getPropertyValue(property)
          if (value && value !== "initial" && value !== "normal") {
            styles[property] = value
          }
        }
      }
    })

    return styles
  }

  applyComponents(
    element: HTMLElement,
    webObject: WebObject,
    assetService?: AssetService
  ) {
    if (!webObject.components) return

    webObject.components.forEach(component => {
      const handler = this.componentRegistry.get(component.type)
      if (handler) {
        handler(element, component.config, assetService)
      }
    })
  }

  // Helper methods to create components with asset support

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

  createCssComponent(config: CssComponent["config"]): CssComponent {
    return {
      id: `css-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "css",
      config,
    }
  }
}

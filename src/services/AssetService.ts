import {
  Asset,
  AssetType,
  AssetReference,
  AssetValue,
  AssetSearchOptions,
  AssetCreationOptions,
  PrefabParameter,
  ResourceAsset,
  PrefabAsset,
  ComponentAsset,
  StylePaletteAsset,
} from "../types/Asset"
import { WebObject } from "../types/WebObject"

/**
 * AssetService - Manages all assets in the WebEngineCanvas
 * Provides creation, retrieval, search, and resolution of assets
 */
export class AssetService {
  private assets: Map<string, Asset>

  constructor() {
    this.assets = new Map()
  }

  /**
   * Initialize asset registry from manifest
   */
  initializeFromManifest(assets: Asset[]): void {
    this.assets.clear()
    assets.forEach(asset => this.addAsset(asset))
  }

  /**
   * Add an asset to the registry
   */
  addAsset(asset: Asset): void {
    this.assets.set(asset.id, asset)
  }

  /**
   * Remove an asset from the registry
   */
  removeAsset(assetId: string): boolean {
    return this.assets.delete(assetId)
  }

  /**
   * Get an asset by ID
   */
  getAsset(assetId: string): Asset | undefined {
    return this.assets.get(assetId)
  }

  /**
   * Get an asset by ID with type safety
   */
  getAssetByType<T extends Asset>(
    assetId: string,
    type: AssetType
  ): T | undefined {
    const asset = this.assets.get(assetId)
    return asset && asset.type === type ? (asset as T) : undefined
  }

  /**
   * Get all assets
   */
  getAllAssets(): Asset[] {
    return Array.from(this.assets.values())
  }

  /**
   * Get assets by type
   */
  getAssetsByType(type: AssetType): Asset[] {
    return Array.from(this.assets.values()).filter(asset => asset.type === type)
  }

  /**
   * Get assets by path
   */
  getAssetsByPath(path: string): Asset[] {
    return Array.from(this.assets.values()).filter(asset =>
      asset.path.startsWith(path)
    )
  }

  /**
   * Get assets by tag
   */
  getAssetsByTag(tag: string): Asset[] {
    return Array.from(this.assets.values()).filter(asset =>
      asset.tags?.includes(tag)
    )
  }

  /**
   * Search assets with filters
   */
  searchAssets(options: AssetSearchOptions): Asset[] {
    let results = this.getAllAssets()

    // Filter by query
    if (options.query) {
      const query = options.query.toLowerCase()
      results = results.filter(
        asset =>
          asset.name.toLowerCase().includes(query) ||
          asset.description?.toLowerCase().includes(query) ||
          asset.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by type
    if (options.type) {
      results = results.filter(asset => asset.type === options.type)
    }

    // Filter by tags
    if (options.tags && options.tags.length > 0) {
      results = results.filter(asset =>
        asset.tags?.some(tag => options.tags!.includes(tag))
      )
    }

    // Filter by path
    if (options.path) {
      results = results.filter(asset => asset.path.startsWith(options.path!))
    }

    // Apply limit and offset
    if (options.offset) {
      results = results.slice(options.offset)
    }

    if (options.limit) {
      results = results.slice(0, options.limit)
    }

    return results
  }

  /**
   * Resolve an asset to its actual value
   */
  resolveAsset<T = any>(asset: Asset): T | null {
    switch (asset.type) {
      case "prefab":
        return this.resolvePrefabAsset(asset as PrefabAsset) as T
      case "resource":
        return this.resolveResourceAsset(asset as ResourceAsset) as T
      case "component":
        return this.resolveComponentAsset(asset as ComponentAsset) as T
      case "stylePalette":
        return this.resolveStylePaletteAsset(asset as StylePaletteAsset) as T
      default:
        console.warn(`Unknown asset type: ${(asset as any).type}`)
        return null
    }
  }

  /**
   * Resolve an asset reference
   */
  resolveAssetReference<T = any>(reference: AssetReference): T | null {
    const asset = this.getAsset(reference.assetId)
    if (!asset) return null

    switch (asset.type) {
      case "prefab":
        return this.resolvePrefabAsset(asset as PrefabAsset) as T
      case "resource":
        return this.resolveResourceAsset(asset as ResourceAsset) as T
      case "component":
        return this.resolveComponentAsset(asset as ComponentAsset) as T
      case "stylePalette":
        return this.resolveStylePaletteAsset(asset as StylePaletteAsset) as T
      default:
        return null
    }
  }

  /**
   * Resolve an asset value (can be direct value or asset reference)
   */
  resolveAssetValue<T = any>(value: AssetValue<T>): T | null {
    // Handle asset references
    if (this.isAssetReference(value)) {
      return this.resolveAssetReference(value)
    }

    // Handle simple string references (treat as asset ID)
    if (typeof value === "string" && this.assets.has(value)) {
      const asset = this.assets.get(value)
      if (asset) {
        const resolved = this.resolveAsset(asset)

        // Special handling for style palette assets (colors, gradients, etc.)
        if (
          asset.type === "stylePalette" &&
          typeof resolved === "object" &&
          resolved !== null
        ) {
          // If the asset ID matches a key in the values, return that specific value
          if (value in resolved) {
            return resolved[value] as T
          }
          // Otherwise return the entire values object
          return resolved as T
        }

        return resolved as T
      }
    }

    // Return the value as-is if it's not an asset reference
    return value as T
  }

  /**
   * Check if a value is an asset reference
   */
  isAssetReference(value: any): value is AssetReference {
    return (
      typeof value === "object" &&
      value !== null &&
      typeof value.assetId === "string" &&
      typeof value.assetType === "string"
    )
  }

  // Asset creation methods

  /**
   * Create a resource asset
   */
  createResourceAsset(
    name: string,
    resourceType: ResourceAsset["resourceType"],
    options: {
      url?: string
      content?: string
      mimeType?: string
      size?: number
      dimensions?: { width: number; height: number }
      encoding?: string
    } = {},
    creationOptions: AssetCreationOptions = {}
  ): ResourceAsset {
    const asset: ResourceAsset = {
      id: creationOptions.id || this.generateAssetId(name),
      name,
      type: "resource",
      resourceType,
      path: creationOptions.path || "resources",
      tags: creationOptions.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...options,
    }

    this.addAsset(asset)
    return asset
  }

  /**
   * Create a prefab asset
   */
  createPrefabAsset(
    name: string,
    template: WebObject,
    options: {
      parameters?: PrefabParameter[]
      defaultValues?: Record<string, any>
      version?: string
      author?: string
    } = {},
    creationOptions: AssetCreationOptions = {}
  ): PrefabAsset {
    const asset: PrefabAsset = {
      id: creationOptions.id || this.generateAssetId(name),
      name,
      type: "prefab",
      template,
      path: creationOptions.path || "prefabs",
      tags: creationOptions.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      parameters: options.parameters || [],
      defaultValues: options.defaultValues || {},
      version: options.version || "1.0.0",
      author: options.author,
    }

    this.addAsset(asset)
    return asset
  }

  /**
   * Create a component asset
   */
  createComponentAsset(
    name: string,
    componentType: string,
    config: Record<string, any>,
    options: {
      schema?: Record<string, any>
      version?: string
    } = {},
    creationOptions: AssetCreationOptions = {}
  ): ComponentAsset {
    const asset: ComponentAsset = {
      id: creationOptions.id || this.generateAssetId(name),
      name,
      type: "component",
      componentType,
      config,
      path: creationOptions.path || "components",
      tags: creationOptions.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      schema: options.schema,
      version: options.version || "1.0.0",
    }

    this.addAsset(asset)
    return asset
  }

  /**
   * Create a style palette asset
   */
  createStylePaletteAsset(
    name: string,
    paletteType: StylePaletteAsset["paletteType"],
    values: Record<string, any>,
    options: {
      theme?: string
      variant?: string
    } = {},
    creationOptions: AssetCreationOptions = {}
  ): StylePaletteAsset {
    const asset: StylePaletteAsset = {
      id: creationOptions.id || this.generateAssetId(name),
      name,
      type: "stylePalette",
      paletteType,
      values,
      path: creationOptions.path || "styles",
      tags: creationOptions.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      theme: options.theme,
      variant: options.variant,
    }

    this.addAsset(asset)
    return asset
  }

  // Asset resolution methods

  private resolvePrefabAsset(prefab: PrefabAsset): WebObject | null {
    // Deep clone the template
    const instance = JSON.parse(JSON.stringify(prefab.template))

    // Apply default values
    if (prefab.defaultValues) {
      this.applyParametersToWebObject(instance, prefab.defaultValues)
    }

    return instance
  }

  private resolveResourceAsset(resource: ResourceAsset): string | null {
    return resource.url || resource.content || null
  }

  private resolveComponentAsset(
    component: ComponentAsset
  ): Record<string, any> {
    return component.config
  }

  private resolveStylePaletteAsset(
    palette: StylePaletteAsset
  ): Record<string, any> {
    return palette.values
  }

  // Helper methods

  private applyParametersToWebObject(
    webObject: WebObject,
    parameters: Record<string, any>
  ): void {
    Object.entries(parameters).forEach(([key, value]) => {
      if (key === "content") {
        webObject.content = value
      } else if (key === "id") {
        webObject.id = value
      } else {
        // Store in prefabParameters if it exists, otherwise create it
        if (!webObject.prefabParameters) {
          webObject.prefabParameters = {}
        }
        webObject.prefabParameters[key] = value
      }

      // Apply to children recursively
      if (webObject.children) {
        webObject.children.forEach(child =>
          this.applyParametersToWebObject(child, parameters)
        )
      }
    })
  }

  private generateAssetId(name: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    return `${name.toLowerCase().replace(/\s+/g, "-")}-${timestamp}-${random}`
  }
}

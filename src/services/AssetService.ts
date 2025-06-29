import {
  Asset,
  AssetType,
  AssetRegistry,
  AssetReference,
  AssetValue,
  AssetSearchOptions,
  AssetCreationOptions,
  AssetManifest,
  PrefabAsset,
  ResourceAsset,
  ComponentAsset,
  StylePaletteAsset,
  AnimationAsset,
  JsonAsset,
  ScriptAsset,
  ShaderAsset,
  AudioAsset,
  VideoAsset,
  FontAsset,
  IconAsset,
  PrefabParameter,
} from "../types/Asset"
import { WebObject } from "../types/WebObject"

/**
 * AssetService - Manages all assets in the WebEngineCanvas
 * Provides creation, retrieval, search, and resolution of assets
 */
export class AssetService {
  private registry: AssetRegistry

  constructor() {
    this.registry = {
      assets: new Map(),
      paths: new Map(),
      types: new Map(),
      tags: new Map(),
    }
  }

  /**
   * Initialize asset registry from manifest
   */
  initializeFromManifest(assets: Asset[]): void {
    this.registry.assets.clear()
    this.registry.paths.clear()
    this.registry.types.clear()
    this.registry.tags.clear()

    assets.forEach(asset => this.addAsset(asset))
  }

  /**
   * Add an asset to the registry
   */
  addAsset(asset: Asset): void {
    // Add to main registry
    this.registry.assets.set(asset.id, asset)

    // Add to path index
    if (!this.registry.paths.has(asset.path)) {
      this.registry.paths.set(asset.path, [])
    }
    this.registry.paths.get(asset.path)!.push(asset.id)

    // Add to type index
    if (!this.registry.types.has(asset.type)) {
      this.registry.types.set(asset.type, [])
    }
    this.registry.types.get(asset.type)!.push(asset.id)

    // Add to tag index
    if (asset.tags) {
      asset.tags.forEach(tag => {
        if (!this.registry.tags.has(tag)) {
          this.registry.tags.set(tag, [])
        }
        this.registry.tags.get(tag)!.push(asset.id)
      })
    }
  }

  /**
   * Remove an asset from the registry
   */
  removeAsset(assetId: string): boolean {
    const asset = this.registry.assets.get(assetId)
    if (!asset) return false

    // Remove from main registry
    this.registry.assets.delete(assetId)

    // Remove from path index
    const pathAssets = this.registry.paths.get(asset.path)
    if (pathAssets) {
      const index = pathAssets.indexOf(assetId)
      if (index > -1) {
        pathAssets.splice(index, 1)
        if (pathAssets.length === 0) {
          this.registry.paths.delete(asset.path)
        }
      }
    }

    // Remove from type index
    const typeAssets = this.registry.types.get(asset.type)
    if (typeAssets) {
      const index = typeAssets.indexOf(assetId)
      if (index > -1) {
        typeAssets.splice(index, 1)
        if (typeAssets.length === 0) {
          this.registry.types.delete(asset.type)
        }
      }
    }

    // Remove from tag index
    if (asset.tags) {
      asset.tags.forEach(tag => {
        const tagAssets = this.registry.tags.get(tag)
        if (tagAssets) {
          const index = tagAssets.indexOf(assetId)
          if (index > -1) {
            tagAssets.splice(index, 1)
            if (tagAssets.length === 0) {
              this.registry.tags.delete(tag)
            }
          }
        }
      })
    }

    return true
  }

  /**
   * Get an asset by ID
   */
  getAsset(assetId: string): Asset | undefined {
    return this.registry.assets.get(assetId)
  }

  /**
   * Get an asset by ID with type safety
   */
  getAssetByType<T extends Asset>(
    assetId: string,
    type: AssetType
  ): T | undefined {
    const asset = this.registry.assets.get(assetId)
    return asset && asset.type === type ? (asset as T) : undefined
  }

  /**
   * Get all assets
   */
  getAllAssets(): Asset[] {
    return Array.from(this.registry.assets.values())
  }

  /**
   * Get assets by type
   */
  getAssetsByType(type: AssetType): Asset[] {
    const assetIds = this.registry.types.get(type) || []
    return assetIds
      .map(id => this.registry.assets.get(id))
      .filter(Boolean) as Asset[]
  }

  /**
   * Get assets by path
   */
  getAssetsByPath(path: string): Asset[] {
    const assetIds = this.registry.paths.get(path) || []
    return assetIds
      .map(id => this.registry.assets.get(id))
      .filter(Boolean) as Asset[]
  }

  /**
   * Get assets by tag
   */
  getAssetsByTag(tag: string): Asset[] {
    const assetIds = this.registry.tags.get(tag) || []
    return assetIds
      .map(id => this.registry.assets.get(id))
      .filter(Boolean) as Asset[]
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

    // Filter by author
    if (options.author) {
      results = results.filter(
        asset => (asset as any).author === options.author
      )
    }

    // Apply pagination
    if (options.offset) {
      results = results.slice(options.offset)
    }
    if (options.limit) {
      results = results.slice(0, options.limit)
    }

    return results
  }

  /**
   * Resolve an asset to its final value
   */
  resolveAsset<T = any>(asset: Asset): T | null {
    switch (asset.type) {
      case "prefab":
        return this.resolvePrefabAsset(asset) as T
      case "resource":
        return this.resolveResourceAsset(asset) as T
      case "component":
        return this.resolveComponentAsset(asset) as T
      case "stylePalette":
        return this.resolveStylePaletteAsset(asset) as T
      case "animation":
        return this.resolveAnimationAsset(asset) as T
      case "json":
        return this.resolveJsonAsset(asset) as T
      case "script":
        return this.resolveScriptAsset(asset) as T
      case "shader":
        return this.resolveShaderAsset(asset) as T
      case "audio":
        return this.resolveAudioAsset(asset) as T
      case "video":
        return this.resolveVideoAsset(asset) as T
      case "font":
        return this.resolveFontAsset(asset) as T
      case "icon":
        return this.resolveIconAsset(asset) as T
      default:
        console.warn(`Unknown asset type: ${(asset as any).type}`)
        return null
    }
  }

  /**
   * Resolve an asset reference to its final value
   */
  resolveAssetReference<T = any>(reference: AssetReference): T | null {
    const asset = this.getAsset(reference.assetId)
    if (!asset || asset.type !== reference.assetType) {
      return null
    }

    // Handle different asset types
    switch (asset.type) {
      case "prefab":
        return this.resolvePrefabAsset(
          asset as PrefabAsset,
          reference.parameters
        ) as T
      case "resource":
        return this.resolveResourceAsset(asset as ResourceAsset) as T
      case "component":
        return this.resolveComponentAsset(asset as ComponentAsset) as T
      case "stylePalette":
        return this.resolveStylePaletteAsset(asset as StylePaletteAsset) as T
      case "animation":
        return this.resolveAnimationAsset(asset as AnimationAsset) as T
      case "json":
        return this.resolveJsonAsset(asset as JsonAsset) as T
      case "script":
        return this.resolveScriptAsset(asset as ScriptAsset) as T
      case "shader":
        return this.resolveShaderAsset(asset as ShaderAsset) as T
      case "audio":
        return this.resolveAudioAsset(asset as AudioAsset) as T
      case "video":
        return this.resolveVideoAsset(asset as VideoAsset) as T
      case "font":
        return this.resolveFontAsset(asset as FontAsset) as T
      case "icon":
        return this.resolveIconAsset(asset as IconAsset) as T
      default:
        return null
    }
  }

  /**
   * Resolve an asset value (direct value or asset reference)
   */
  resolveAssetValue<T = any>(value: AssetValue<T>): T | null {
    if (this.isAssetReference(value)) {
      return this.resolveAssetReference(value)
    }

    // Handle simple string references (treat as asset ID)
    if (typeof value === "string" && this.registry.assets.has(value)) {
      const asset = this.registry.assets.get(value)
      if (asset) {
        const resolved = this.resolveAsset(asset)

        // For style palette assets, extract the actual value
        if (
          asset.type === "stylePalette" &&
          resolved &&
          typeof resolved === "object"
        ) {
          // If the resolved value is an object with the same key as the asset ID, extract it
          if (resolved[asset.id]) {
            return resolved[asset.id] as T
          }
          // Otherwise return the first value in the palette
          const firstValue = Object.values(resolved)[0]
          if (firstValue) {
            return firstValue as T
          }
        }

        return resolved as T
      }
    }

    return value
  }

  /**
   * Check if a value is an asset reference
   */
  isAssetReference(value: any): value is AssetReference {
    return (
      value &&
      typeof value === "object" &&
      "assetId" in value &&
      "assetType" in value
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
      description: creationOptions.description,
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
      description: creationOptions.description,
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
      description: creationOptions.description,
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
      description: creationOptions.description,
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

  private resolvePrefabAsset(
    prefab: PrefabAsset,
    parameters?: Record<string, any>
  ): WebObject | null {
    // Deep clone the template
    const instance = JSON.parse(JSON.stringify(prefab.template))

    // Apply default values
    if (prefab.defaultValues) {
      this.applyParametersToWebObject(instance, prefab.defaultValues)
    }

    // Apply provided parameters
    if (parameters) {
      this.applyParametersToWebObject(instance, parameters)
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

  private resolveAnimationAsset(
    animation: AnimationAsset
  ): Record<string, any> {
    return {
      type: animation.animationType,
      duration: animation.duration,
      easing: animation.easing,
      keyframes: animation.keyframes,
      properties: animation.properties,
    }
  }

  private resolveJsonAsset(json: JsonAsset): any {
    return json.data
  }

  private resolveScriptAsset(script: ScriptAsset): string {
    return script.code
  }

  private resolveShaderAsset(shader: ShaderAsset): Record<string, any> {
    return {
      type: shader.shaderType,
      code: shader.code,
      uniforms: shader.uniforms,
    }
  }

  private resolveAudioAsset(audio: AudioAsset): string {
    return audio.url
  }

  private resolveVideoAsset(video: VideoAsset): string {
    return video.url
  }

  private resolveFontAsset(font: FontAsset): Record<string, any> {
    return {
      family: font.family,
      url: font.url,
      weight: font.weight,
      style: font.style,
      formats: font.formats,
    }
  }

  private resolveIconAsset(icon: IconAsset): string {
    return icon.content
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

  /**
   * Export assets to manifest
   */
  exportAssetManifest(): AssetManifest {
    return {
      id: "asset-manifest",
      name: "Asset Manifest",
      version: "1.0.0",
      assets: this.getAllAssets(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  /**
   * Import assets from manifest
   */
  importAssetManifest(manifest: AssetManifest): void {
    manifest.assets.forEach(asset => {
      // Convert string dates back to Date objects
      asset.createdAt = new Date(asset.createdAt)
      asset.updatedAt = new Date(asset.updatedAt)
      this.addAsset(asset)
    })
  }

  /**
   * Get the asset registry
   */
  getRegistry(): AssetRegistry {
    return this.registry
  }
}

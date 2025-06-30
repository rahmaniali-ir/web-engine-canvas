import {
  Prefab,
  PrefabInstance,
  PrefabManifest,
  PrefabRegistry,
  PrefabInstantiationOptions,
  PrefabSearchOptions,
  PrefabVariant,
  PrefabVariantOptions,
} from "../types/Prefab"
import { WebObject } from "../types/WebObject"
import { WebObjectComponent } from "../types/WebObjectComponent"
import { PrefabParameter } from "../types/Asset"
import { Manifest } from "../types/Manifest"

/**
 * PrefabService - Manages prefab registration, instantiation, and lifecycle
 * Similar to Unity3D's prefab system
 */
export class PrefabService {
  private prefabRegistry: PrefabRegistry
  private instances: Map<string, PrefabInstance>
  private manifest: Manifest

  constructor(manifest: Manifest) {
    this.prefabRegistry = {
      prefabs: new Map(),
      categories: new Map(),
    }
    this.instances = new Map()
    this.manifest = manifest
  }

  /**
   * Register a new prefab
   */
  registerPrefab(prefab: Prefab): void {
    // Validate prefab
    this.validatePrefab(prefab)

    // Add to registry
    this.prefabRegistry.prefabs.set(prefab.id, prefab)

    // Add to categories
    if (prefab.tags) {
      prefab.tags.forEach(tag => {
        if (!this.prefabRegistry.categories.has(tag)) {
          this.prefabRegistry.categories.set(tag, [])
        }
        this.prefabRegistry.categories.get(tag)!.push(prefab.id)
      })
    }

    console.log(`Prefab "${prefab.name}" registered with ID: ${prefab.id}`)
  }

  /**
   * Unregister a prefab
   */
  unregisterPrefab(prefabId: string): boolean {
    const prefab = this.prefabRegistry.prefabs.get(prefabId)
    if (!prefab) return false

    // Remove from registry
    this.prefabRegistry.prefabs.delete(prefabId)

    // Remove from categories
    if (prefab.tags) {
      prefab.tags.forEach(tag => {
        const categoryPrefabs = this.prefabRegistry.categories.get(tag)
        if (categoryPrefabs) {
          const index = categoryPrefabs.indexOf(prefabId)
          if (index > -1) {
            categoryPrefabs.splice(index, 1)
          }
          if (categoryPrefabs.length === 0) {
            this.prefabRegistry.categories.delete(tag)
          }
        }
      })
    }

    console.log(`Prefab "${prefab.name}" unregistered`)
    return true
  }

  /**
   * Get a prefab by ID
   */
  getPrefab(prefabId: string): Prefab | undefined {
    return this.prefabRegistry.prefabs.get(prefabId)
  }

  /**
   * Get all prefabs
   */
  getAllPrefabs(): Prefab[] {
    return Array.from(this.prefabRegistry.prefabs.values())
  }

  /**
   * Search prefabs with filters
   */
  searchPrefabs(options: PrefabSearchOptions): Prefab[] {
    let results = this.getAllPrefabs()

    // Filter by query
    if (options.query) {
      const query = options.query.toLowerCase()
      results = results.filter(
        prefab =>
          prefab.name.toLowerCase().includes(query) ||
          prefab.description?.toLowerCase().includes(query) ||
          prefab.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by tags
    if (options.tags && options.tags.length > 0) {
      results = results.filter(prefab =>
        prefab.tags?.some(tag => options.tags!.includes(tag))
      )
    }

    // Filter by category
    if (options.category) {
      const categoryPrefabIds =
        this.prefabRegistry.categories.get(options.category) || []
      results = results.filter(prefab => categoryPrefabIds.includes(prefab.id))
    }

    // Filter by author
    if (options.author) {
      results = results.filter(prefab => prefab.author === options.author)
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
   * Get a specific variant of a prefab
   */
  getPrefabVariant(prefabId: string, variantId?: string): PrefabVariant | null {
    const prefab = this.getPrefab(prefabId)
    if (!prefab) return null

    // If no variants exist, return null (use main template)
    if (!prefab.variants || prefab.variants.length === 0) {
      return null
    }

    // If variantId is specified, try to find it
    if (variantId) {
      const variant = prefab.variants.find(v => v.id === variantId)
      if (variant) return variant
    }

    // Try to find default variant
    const defaultVariant =
      prefab.variants.find(v => v.isDefault) ||
      prefab.variants.find(v => v.id === prefab.defaultVariantId) ||
      prefab.variants[0]

    return defaultVariant || null
  }

  /**
   * Get all variants of a prefab
   */
  getPrefabVariants(prefabId: string): PrefabVariant[] {
    const prefab = this.getPrefab(prefabId)
    return prefab?.variants || []
  }

  /**
   * Get the default variant of a prefab
   */
  getDefaultVariant(prefabId: string): PrefabVariant | null {
    const prefab = this.getPrefab(prefabId)
    if (!prefab) return null

    if (!prefab.variants || prefab.variants.length === 0) {
      return null
    }

    return (
      prefab.variants.find(v => v.isDefault) ||
      prefab.variants.find(v => v.id === prefab.defaultVariantId) ||
      prefab.variants[0] ||
      null
    )
  }

  /**
   * Instantiate a prefab with variant support
   */
  instantiatePrefab(
    prefabId: string,
    options: PrefabInstantiationOptions = {}
  ): WebObject | null {
    const prefab = this.getPrefab(prefabId)
    if (!prefab) return null

    const { variantId, parameters = {}, customId } = options

    // Get the correct variant
    const variant = this.getPrefabVariant(prefabId, variantId)

    // Use variant template if available, otherwise use main template
    const template = variant?.template || prefab.template

    // Deep clone the template
    const instance = JSON.parse(JSON.stringify(template))

    // Apply default values (variant first, then main prefab)
    if (variant?.defaultValues) {
      this.applyParametersToWebObject(instance, variant.defaultValues)
    }
    if (prefab.defaultValues) {
      this.applyParametersToWebObject(instance, prefab.defaultValues)
    }

    // Apply provided parameters
    if (parameters) {
      this.applyParametersToWebObject(instance, parameters)
    }

    // Set prefab metadata
    instance.prefabId = prefabId
    if (variant) {
      instance.prefabVariantId = variant.id
    }
    instance.prefabParameters = parameters

    // Set custom ID if provided
    if (customId) {
      instance.id = customId
    }

    return instance
  }

  /**
   * Get prefab instance by ID
   */
  getPrefabInstance(instanceId: string): PrefabInstance | undefined {
    return this.instances.get(instanceId)
  }

  /**
   * Get all instances of a prefab
   */
  getPrefabInstances(prefabId: string): PrefabInstance[] {
    return Array.from(this.instances.values()).filter(
      instance => instance.prefabId === prefabId
    )
  }

  /**
   * Update a prefab instance
   */
  updatePrefabInstance(
    instanceId: string,
    updates: Partial<WebObject>
  ): boolean {
    const instance = this.instances.get(instanceId)
    if (!instance) return false

    Object.assign(instance.instance, updates)
    return true
  }

  /**
   * Remove a prefab instance
   */
  removePrefabInstance(instanceId: string): boolean {
    return this.instances.delete(instanceId)
  }

  /**
   * Create a prefab from an existing WebObject
   */
  createPrefabFromWebObject(
    webObject: WebObject,
    name: string,
    description?: string,
    tags?: string[],
    parameters?: PrefabParameter[]
  ): Prefab {
    const prefab: Prefab = {
      id: this.generateUniqueId(`prefab-${name}`),
      name,
      description,
      version: "1.0.0",
      tags,
      template: this.deepCloneWebObject(webObject),
      parameters,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.registerPrefab(prefab)
    return prefab
  }

  /**
   * Export prefab to manifest
   */
  exportPrefabToManifest(prefabId: string): PrefabManifest | null {
    const prefab = this.getPrefab(prefabId)
    if (!prefab) return null

    return {
      id: prefab.id,
      name: prefab.name,
      description: prefab.description,
      version: prefab.version,
      author: prefab.author,
      tags: prefab.tags,
      template: prefab.template,
      defaultValues: prefab.defaultValues,
      parameters: prefab.parameters,
      createdAt: prefab.createdAt.toISOString(),
      updatedAt: prefab.updatedAt.toISOString(),
    }
  }

  /**
   * Import prefab from manifest
   */
  importPrefabFromManifest(manifest: PrefabManifest): Prefab {
    const prefab: Prefab = {
      id: manifest.id,
      name: manifest.name,
      description: manifest.description,
      version: manifest.version,
      author: manifest.author,
      tags: manifest.tags,
      template: manifest.template,
      defaultValues: manifest.defaultValues,
      parameters: manifest.parameters,
      createdAt: new Date(manifest.createdAt),
      updatedAt: new Date(manifest.updatedAt),
    }

    this.registerPrefab(prefab)
    return prefab
  }

  /**
   * Get prefab categories
   */
  getCategories(): string[] {
    return Array.from(this.prefabRegistry.categories.keys())
  }

  /**
   * Get prefabs by category
   */
  getPrefabsByCategory(category: string): Prefab[] {
    const prefabIds = this.prefabRegistry.categories.get(category) || []
    return prefabIds
      .map(id => this.prefabRegistry.prefabs.get(id))
      .filter(Boolean) as Prefab[]
  }

  /**
   * Create a new variant for a prefab
   */
  createVariant(
    prefabId: string,
    variant: Omit<PrefabVariant, "id">
  ): PrefabVariant | null {
    const prefab = this.getPrefab(prefabId)
    if (!prefab) return null

    const newVariant: PrefabVariant = {
      ...variant,
      id: this.generateVariantId(prefabId, variant.name),
    }

    // Add to prefab variants
    if (!prefab.variants) {
      prefab.variants = []
    }
    prefab.variants.push(newVariant)

    return newVariant
  }

  /**
   * Update an existing variant
   */
  updateVariant(
    prefabId: string,
    variantId: string,
    updates: Partial<PrefabVariant>
  ): boolean {
    const prefab = this.getPrefab(prefabId)
    if (!prefab?.variants) return false

    const variantIndex = prefab.variants.findIndex(v => v.id === variantId)
    if (variantIndex === -1) return false

    prefab.variants[variantIndex] = {
      ...prefab.variants[variantIndex],
      ...updates,
    }

    return true
  }

  /**
   * Delete a variant
   */
  deleteVariant(prefabId: string, variantId: string): boolean {
    const prefab = this.getPrefab(prefabId)
    if (!prefab?.variants) return false

    const variantIndex = prefab.variants.findIndex(v => v.id === variantId)
    if (variantIndex === -1) return false

    prefab.variants.splice(variantIndex, 1)
    return true
  }

  /**
   * Set a variant as default
   */
  setDefaultVariant(prefabId: string, variantId: string): boolean {
    const prefab = this.getPrefab(prefabId)
    if (!prefab?.variants) return false

    // Check if variant exists
    const variant = prefab.variants.find(v => v.id === variantId)
    if (!variant) return false

    // Clear existing default flags
    prefab.variants.forEach(v => (v.isDefault = false))

    // Set new default
    variant.isDefault = true
    prefab.defaultVariantId = variantId

    return true
  }

  /**
   * Search prefabs by variant properties
   */
  searchPrefabsByVariant(options: {
    query?: string
    tags?: string[]
    category?: string
    variantTags?: string[]
    variantCategory?: string
  }): Prefab[] {
    const { query, tags, category, variantTags, variantCategory } = options

    return (
      this.manifest.prefabs?.filter(prefab => {
        // Filter by main prefab properties
        if (
          query &&
          !prefab.name.toLowerCase().includes(query.toLowerCase()) &&
          !prefab.description?.toLowerCase().includes(query.toLowerCase())
        ) {
          return false
        }

        if (tags && !tags.some(tag => prefab.tags?.includes(tag))) {
          return false
        }

        if (category && prefab.tags?.includes(category)) {
          return false
        }

        // Filter by variant properties
        if (variantTags || variantCategory) {
          const hasMatchingVariant = prefab.variants?.some(variant => {
            if (
              variantTags &&
              !variantTags.some(tag => variant.tags?.includes(tag))
            ) {
              return false
            }
            if (variantCategory && variant.category !== variantCategory) {
              return false
            }
            return true
          })

          if (!hasMatchingVariant) {
            return false
          }
        }

        return true
      }) || []
    )
  }

  // Private helper methods

  private validatePrefab(prefab: Prefab): void {
    if (!prefab.id || !prefab.name || !prefab.template) {
      throw new Error("Prefab must have id, name, and template")
    }

    if (this.prefabRegistry.prefabs.has(prefab.id)) {
      throw new Error(`Prefab with ID "${prefab.id}" already exists`)
    }

    // Validate parameters
    if (prefab.parameters) {
      prefab.parameters.forEach(param => {
        if (!param.name || !param.type) {
          throw new Error("Prefab parameters must have name and type")
        }
      })
    }
  }

  private deepCloneWebObject(webObject: WebObject): WebObject {
    const clone = JSON.parse(JSON.stringify(webObject))

    // Ensure children are also cloned
    if (clone.children) {
      clone.children = clone.children.map((child: WebObject) =>
        this.deepCloneWebObject(child)
      )
    }

    return clone
  }

  private generateUniqueId(baseId: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    return `${baseId}-${timestamp}-${random}`
  }

  private applyParametersToWebObject(
    webObj: WebObject,
    parameters: Record<string, any>
  ): void {
    Object.entries(parameters).forEach(([key, value]) => {
      if (key === "content") {
        webObj.content = value
      } else if (key === "id") {
        webObj.id = value
      } else {
        // Store in prefabParameters if it exists, otherwise create it
        if (!webObj.prefabParameters) {
          webObj.prefabParameters = {}
        }
        webObj.prefabParameters[key] = value
      }
    })

    // Apply to children recursively
    if (webObj.children) {
      webObj.children.forEach(child =>
        this.applyParametersToWebObject(child, parameters)
      )
    }
  }

  private generateVariantId(prefabId: string, variantName: string): string {
    const timestamp = Date.now()
    const sanitizedName = variantName.toLowerCase().replace(/[^a-z0-9]/g, "-")
    return `${prefabId}-${sanitizedName}-${timestamp}`
  }
}

import {
  Prefab,
  PrefabInstance,
  PrefabManifest,
  PrefabRegistry,
  PrefabInstantiationOptions,
  PrefabSearchOptions,
} from "../types/Prefab"
import { WebObject } from "../types/WebObject"
import { WebObjectComponent } from "../types/WebObjectComponent"
import { PrefabParameter } from "../types/Asset"

/**
 * PrefabService - Manages prefab registration, instantiation, and lifecycle
 * Similar to Unity3D's prefab system
 */
export class PrefabService {
  private prefabRegistry: PrefabRegistry
  private instances: Map<string, PrefabInstance>

  constructor() {
    this.prefabRegistry = {
      prefabs: new Map(),
      categories: new Map(),
    }
    this.instances = new Map()
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
   * Instantiate a prefab
   */
  instantiatePrefab(
    prefabId: string,
    options: PrefabInstantiationOptions = {}
  ): WebObject | null {
    const prefab = this.getPrefab(prefabId)
    if (!prefab) {
      console.error(`Prefab with ID "${prefabId}" not found`)
      return null
    }

    try {
      // Deep clone the template
      const instance = this.deepCloneWebObject(prefab.template)

      // Generate unique ID
      const instanceId = options.customId || this.generateUniqueId(instance.id)
      instance.id = instanceId

      // Apply parameters
      if (options.parameters) {
        this.applyParameters(instance, prefab, options.parameters)
      }

      // Apply default values
      if (prefab.defaultValues) {
        this.applyDefaultValues(instance, prefab.defaultValues)
      }

      // Apply position, scale, rotation
      this.applyTransform(instance, options)

      // Override components if specified
      if (options.overrideComponents) {
        instance.components = options.overrideComponents
      }

      // Track instance
      const prefabInstance: PrefabInstance = {
        id: instanceId,
        prefabId,
        instance,
        parameters: options.parameters || {},
        createdAt: new Date(),
      }
      this.instances.set(instanceId, prefabInstance)

      console.log(`Prefab "${prefab.name}" instantiated with ID: ${instanceId}`)
      return instance
    } catch (error) {
      console.error(`Failed to instantiate prefab "${prefab.name}":`, error)
      return null
    }
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

  private applyParameters(
    instance: WebObject,
    prefab: Prefab,
    parameters: Record<string, any>
  ): void {
    if (!prefab.parameters) return

    prefab.parameters.forEach(param => {
      if (parameters.hasOwnProperty(param.name)) {
        const value = parameters[param.name]

        // Validate parameter
        if (param.validation) {
          const validationResult = param.validation(value)
          if (validationResult !== true) {
            console.warn(
              `Parameter validation failed for "${param.name}": ${validationResult}`
            )
            return
          }
        }

        // Apply parameter to template
        this.applyParameterToWebObject(instance, param.name, value)
      }
    })
  }

  private applyParameterToWebObject(
    webObject: WebObject,
    paramName: string,
    value: any
  ): void {
    // Apply to current object
    if (paramName === "content") {
      webObject.content = value
    } else if (paramName === "id") {
      webObject.id = value
    } else {
      // Store in prefabParameters if it exists, otherwise create it
      if (!webObject.prefabParameters) {
        webObject.prefabParameters = {}
      }
      webObject.prefabParameters[paramName] = value
    }

    // Apply to children recursively
    if (webObject.children) {
      webObject.children.forEach(child =>
        this.applyParameterToWebObject(child, paramName, value)
      )
    }
  }

  private applyDefaultValues(
    instance: WebObject,
    defaultValues: Record<string, any>
  ): void {
    Object.entries(defaultValues).forEach(([key, value]) => {
      this.applyParameterToWebObject(instance, key, value)
    })
  }

  private applyTransform(
    instance: WebObject,
    options: PrefabInstantiationOptions
  ): void {
    // Apply position, scale, rotation through components
    const transformComponents: WebObjectComponent[] = []

    if (options.position) {
      // Add position component if needed
      // This would depend on your component system
    }

    if (options.scale) {
      // Add scale component if needed
    }

    if (options.rotation) {
      // Add rotation component if needed
    }

    if (transformComponents.length > 0) {
      if (!instance.components) {
        instance.components = []
      }
      instance.components.push(...transformComponents)
    }
  }
}

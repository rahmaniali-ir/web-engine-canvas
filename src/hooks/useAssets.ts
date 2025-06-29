import { useState, useCallback } from "react"
import { AssetService } from "../services/AssetService"
import {
  Asset,
  AssetType,
  AssetReference,
  AssetValue,
  AssetSearchOptions,
  AssetCreationOptions,
  AssetManifest,
  ResourceAsset,
  StylePaletteAsset,
  PrefabParameter,
} from "../types/Asset"
import { WebObject } from "../types"

/**
 * React hook for managing assets
 * Provides easy access to asset functionality
 */
export const useAssets = () => {
  const [assetService] = useState(() => new AssetService())
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)

  // Asset management
  const addAsset = useCallback(
    (asset: Asset) => {
      assetService.addAsset(asset)
    },
    [assetService]
  )

  const removeAsset = useCallback(
    (assetId: string) => {
      return assetService.removeAsset(assetId)
    },
    [assetService]
  )

  const getAsset = useCallback(
    (assetId: string) => {
      return assetService.getAsset(assetId)
    },
    [assetService]
  )

  const getAssetByType = useCallback(
    <T extends Asset>(assetId: string, type: AssetType) => {
      return assetService.getAssetByType<T>(assetId, type)
    },
    [assetService]
  )

  const getAllAssets = useCallback(() => {
    return assetService.getAllAssets()
  }, [assetService])

  const getAssetsByType = useCallback(
    (type: AssetType) => {
      return assetService.getAssetsByType(type)
    },
    [assetService]
  )

  const getAssetsByPath = useCallback(
    (path: string) => {
      return assetService.getAssetsByPath(path)
    },
    [assetService]
  )

  const getAssetsByTag = useCallback(
    (tag: string) => {
      return assetService.getAssetsByTag(tag)
    },
    [assetService]
  )

  const searchAssets = useCallback(
    (options: AssetSearchOptions) => {
      return assetService.searchAssets(options)
    },
    [assetService]
  )

  // Asset resolution
  const resolveAssetReference = useCallback(
    <T = any>(reference: AssetReference) => {
      return assetService.resolveAssetReference<T>(reference)
    },
    [assetService]
  )

  const resolveAssetValue = useCallback(
    <T = any>(value: AssetValue<T>) => {
      return assetService.resolveAssetValue<T>(value)
    },
    [assetService]
  )

  const isAssetReference = useCallback(
    (value: any) => {
      return assetService.isAssetReference(value)
    },
    [assetService]
  )

  // Asset creation methods
  const createResourceAsset = useCallback(
    (
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
    ) => {
      return assetService.createResourceAsset(
        name,
        resourceType,
        options,
        creationOptions
      )
    },
    [assetService]
  )

  const createPrefabAsset = useCallback(
    (
      name: string,
      template: WebObject,
      options: {
        parameters?: PrefabParameter[]
        defaultValues?: Record<string, any>
        version?: string
        author?: string
      } = {},
      creationOptions: AssetCreationOptions = {}
    ) => {
      return assetService.createPrefabAsset(
        name,
        template,
        options,
        creationOptions
      )
    },
    [assetService]
  )

  const createStylePaletteAsset = useCallback(
    (
      name: string,
      paletteType: StylePaletteAsset["paletteType"],
      values: Record<string, any>,
      options: {
        theme?: string
        variant?: string
      } = {},
      creationOptions: AssetCreationOptions = {}
    ) => {
      return assetService.createStylePaletteAsset(
        name,
        paletteType,
        values,
        options,
        creationOptions
      )
    },
    [assetService]
  )

  // Convenience methods for common assets
  const createImageAsset = useCallback(
    (
      name: string,
      url: string,
      dimensions?: { width: number; height: number },
      creationOptions: AssetCreationOptions = {}
    ) => {
      return createResourceAsset(
        name,
        "image",
        {
          url,
          mimeType: "image/*",
          dimensions,
        },
        { ...creationOptions, path: creationOptions.path || "resources/images" }
      )
    },
    [createResourceAsset]
  )

  const createColorPaletteAsset = useCallback(
    (
      name: string,
      colors: Record<string, string>,
      theme?: string,
      creationOptions: AssetCreationOptions = {}
    ) => {
      return createStylePaletteAsset(
        name,
        "color",
        colors,
        { theme },
        { ...creationOptions, path: creationOptions.path || "styles/colors" }
      )
    },
    [createStylePaletteAsset]
  )

  const createFontPaletteAsset = useCallback(
    (
      name: string,
      fonts: Record<string, string>,
      theme?: string,
      creationOptions: AssetCreationOptions = {}
    ) => {
      return createStylePaletteAsset(
        name,
        "font",
        fonts,
        { theme },
        { ...creationOptions, path: creationOptions.path || "styles/fonts" }
      )
    },
    [createStylePaletteAsset]
  )

  // Import/Export
  const exportAssetManifest = useCallback(() => {
    // TODO: Implement asset manifest export
    console.warn("exportAssetManifest not implemented")
    return null
  }, [])

  const importAssetManifest = useCallback((_manifest: AssetManifest) => {
    // TODO: Implement asset manifest import
    console.warn("importAssetManifest not implemented")
  }, [])

  // Registry access
  const getRegistry = useCallback(() => {
    // TODO: Implement registry access
    console.warn("getRegistry not implemented")
    return new Map()
  }, [])

  // Initialize from manifest
  const initializeFromManifest = useCallback(
    (assets: Asset[]) => {
      assetService.initializeFromManifest(assets)
    },
    [assetService]
  )

  return {
    // State
    selectedAssetId,
    setSelectedAssetId,

    // Asset management
    addAsset,
    removeAsset,
    getAsset,
    getAssetByType,
    getAllAssets,
    getAssetsByType,
    getAssetsByPath,
    getAssetsByTag,
    searchAssets,

    // Asset resolution
    resolveAssetReference,
    resolveAssetValue,
    isAssetReference,

    // Asset creation
    createResourceAsset,
    createPrefabAsset,
    createStylePaletteAsset,

    // Convenience methods
    createImageAsset,
    createColorPaletteAsset,
    createFontPaletteAsset,

    // Import/Export
    exportAssetManifest,
    importAssetManifest,

    // Registry
    getRegistry,
    initializeFromManifest,

    // Service access
    assetService,
  }
}

import React, { useState, useCallback, useMemo } from "react"
import { Prefab, PrefabSearchOptions } from "../types/Prefab"
import { usePrefabs } from "../hooks/usePrefabs"

export interface PrefabBrowserProps {
  onPrefabSelect?: (prefab: Prefab) => void
  onPrefabInstantiate?: (prefab: Prefab, options?: any) => void
  className?: string
  style?: React.CSSProperties
}

/**
 * PrefabBrowser - UI for browsing and selecting prefabs
 * Similar to Unity3D's prefab browser
 */
const PrefabBrowser: React.FC<PrefabBrowserProps> = ({
  onPrefabSelect,
  onPrefabInstantiate,
  className = "",
  style = {},
}) => {
  const {
    getAllPrefabs,
    searchPrefabs,
    getCategories,
    getPrefabsByCategory,
    selectedPrefabId,
    setSelectedPrefabId,
  } = usePrefabs()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get all prefabs and categories
  const allPrefabs = useMemo(() => getAllPrefabs(), [getAllPrefabs])
  const categories = useMemo(() => getCategories(), [getCategories])

  // Filter prefabs based on search and category
  const filteredPrefabs = useMemo(() => {
    const searchOptions: PrefabSearchOptions = {
      query: searchQuery || undefined,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    }
    return searchPrefabs(searchOptions)
  }, [searchQuery, selectedCategory, searchPrefabs])

  // Handle prefab selection
  const handlePrefabSelect = useCallback(
    (prefab: Prefab) => {
      setSelectedPrefabId(prefab.id)
      onPrefabSelect?.(prefab)
    },
    [setSelectedPrefabId, onPrefabSelect]
  )

  // Handle prefab instantiation
  const handlePrefabInstantiate = useCallback(
    (prefab: Prefab) => {
      onPrefabInstantiate?.(prefab)
    },
    [onPrefabInstantiate]
  )

  // Handle category change
  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category)
      setSelectedPrefabId(null)
    },
    [setSelectedPrefabId]
  )

  return (
    <div
      className={`prefab-browser ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
          Prefab Browser
        </h3>

        {/* Search */}
        <input
          type='text'
          placeholder='Search prefabs...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "6px 8px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Categories */}
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleCategoryChange("all")}
            style={{
              padding: "4px 8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              backgroundColor: selectedCategory === "all" ? "#007bff" : "#fff",
              color: selectedCategory === "all" ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            All ({allPrefabs.length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                backgroundColor:
                  selectedCategory === category ? "#007bff" : "#fff",
                color: selectedCategory === category ? "#fff" : "#333",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {category} ({getPrefabsByCategory(category).length})
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setViewMode("grid")}
            style={{
              padding: "4px 8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              backgroundColor: viewMode === "grid" ? "#007bff" : "#fff",
              color: viewMode === "grid" ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            style={{
              padding: "4px 8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              backgroundColor: viewMode === "list" ? "#007bff" : "#fff",
              color: viewMode === "list" ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            List
          </button>
        </div>
      </div>

      {/* Prefab List */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "12px",
        }}
      >
        {filteredPrefabs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#666",
              padding: "20px",
            }}
          >
            No prefabs found
          </div>
        ) : viewMode === "grid" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "12px",
            }}
          >
            {filteredPrefabs.map(prefab => (
              <PrefabCard
                key={prefab.id}
                prefab={prefab}
                isSelected={selectedPrefabId === prefab.id}
                onSelect={handlePrefabSelect}
                onInstantiate={handlePrefabInstantiate}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filteredPrefabs.map(prefab => (
              <PrefabListItem
                key={prefab.id}
                prefab={prefab}
                isSelected={selectedPrefabId === prefab.id}
                onSelect={handlePrefabSelect}
                onInstantiate={handlePrefabInstantiate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Prefab Card Component
interface PrefabCardProps {
  prefab: Prefab
  isSelected: boolean
  onSelect: (prefab: Prefab) => void
  onInstantiate: (prefab: Prefab) => void
}

const PrefabCard: React.FC<PrefabCardProps> = ({
  prefab,
  isSelected,
  onSelect,
  onInstantiate,
}) => {
  return (
    <div
      style={{
        border: `2px solid ${isSelected ? "#007bff" : "#ddd"}`,
        borderRadius: "6px",
        padding: "12px",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={() => onSelect(prefab)}
    >
      {/* Preview */}
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        {prefab.template.type}
      </div>

      {/* Info */}
      <div style={{ marginBottom: "8px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "4px",
          }}
        >
          {prefab.name}
        </div>
        {prefab.description && (
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              lineHeight: "1.3",
            }}
          >
            {prefab.description}
          </div>
        )}
      </div>

      {/* Tags */}
      {prefab.tags && prefab.tags.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
            marginBottom: "8px",
          }}
        >
          {prefab.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              style={{
                fontSize: "10px",
                padding: "2px 4px",
                backgroundColor: "#e9ecef",
                borderRadius: "2px",
                color: "#495057",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "4px" }}>
        <button
          onClick={e => {
            e.stopPropagation()
            onInstantiate(prefab)
          }}
          style={{
            flex: 1,
            padding: "4px 8px",
            border: "1px solid #007bff",
            borderRadius: "3px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Use
        </button>
      </div>
    </div>
  )
}

// Prefab List Item Component
interface PrefabListItemProps {
  prefab: Prefab
  isSelected: boolean
  onSelect: (prefab: Prefab) => void
  onInstantiate: (prefab: Prefab) => void
}

const PrefabListItem: React.FC<PrefabListItemProps> = ({
  prefab,
  isSelected,
  onSelect,
  onInstantiate,
}) => {
  return (
    <div
      style={{
        border: `1px solid ${isSelected ? "#007bff" : "#ddd"}`,
        borderRadius: "4px",
        padding: "12px",
        backgroundColor: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
      onClick={() => onSelect(prefab)}
    >
      {/* Preview */}
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "#666",
          flexShrink: 0,
        }}
      >
        {prefab.template.type}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "4px",
          }}
        >
          {prefab.name}
        </div>
        {prefab.description && (
          <div
            style={{
              fontSize: "12px",
              color: "#666",
            }}
          >
            {prefab.description}
          </div>
        )}
        {prefab.tags && prefab.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginTop: "4px",
            }}
          >
            {prefab.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  padding: "2px 4px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "2px",
                  color: "#495057",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <button
        onClick={e => {
          e.stopPropagation()
          onInstantiate(prefab)
        }}
        style={{
          padding: "6px 12px",
          border: "1px solid #007bff",
          borderRadius: "3px",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        Use
      </button>
    </div>
  )
}

export default PrefabBrowser

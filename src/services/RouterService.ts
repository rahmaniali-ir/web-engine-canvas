import { Route, Scene, Manifest } from "../types/Manifest"

export interface RouterState {
  currentPath: string
  currentRoute: Route | null
  currentScene: Scene | null
  params: Record<string, string>
  query: Record<string, string>
}

export class RouterService {
  private manifest: Manifest
  private state: RouterState
  private listeners: Set<(state: RouterState) => void> = new Set()

  constructor(manifest: Manifest) {
    this.manifest = manifest
    this.state = this.initializeState()
  }

  private initializeState(): RouterState {
    const path = window.location.pathname
    const route = this.findRouteByPath(path)
    const scene = route ? this.findSceneById(route.sceneId) : null
    const params = this.extractParams(path, route)
    const query = this.extractQueryParams()

    return {
      currentPath: path,
      currentRoute: route,
      currentScene: scene,
      params,
      query,
    }
  }

  private hasStateChanged(newState: RouterState): boolean {
    return (
      this.state.currentPath !== newState.currentPath ||
      this.state.currentRoute?.path !== newState.currentRoute?.path ||
      this.state.currentScene?.id !== newState.currentScene?.id ||
      JSON.stringify(this.state.params) !== JSON.stringify(newState.params) ||
      JSON.stringify(this.state.query) !== JSON.stringify(newState.query)
    )
  }

  private findRouteByPath(path: string): Route | null {
    const findRoute = (routes: Route[]): Route | null => {
      for (const route of routes) {
        if (this.matchPath(path, route.path)) {
          return route
        }
        if (route.children) {
          const childRoute = findRoute(route.children)
          if (childRoute) return childRoute
        }
      }
      return null
    }

    return findRoute(this.manifest.routes)
  }

  private matchPath(path: string, routePath: string): boolean {
    // Simple path matching - can be enhanced with regex patterns
    if (routePath === path) return true

    // Handle dynamic segments like /user/:id
    const routeSegments = routePath.split("/")
    const pathSegments = path.split("/")

    if (routeSegments.length !== pathSegments.length) return false

    for (let i = 0; i < routeSegments.length; i++) {
      if (routeSegments[i].startsWith(":")) continue
      if (routeSegments[i] !== pathSegments[i]) return false
    }

    return true
  }

  private extractParams(
    path: string,
    route: Route | null
  ): Record<string, string> {
    if (!route) return {}

    const params: Record<string, string> = {}
    const routeSegments = route.path.split("/")
    const pathSegments = path.split("/")

    for (let i = 0; i < routeSegments.length; i++) {
      if (routeSegments[i].startsWith(":")) {
        const paramName = routeSegments[i].slice(1)
        params[paramName] = pathSegments[i] || ""
      }
    }

    return params
  }

  private extractQueryParams(): Record<string, string> {
    const query: Record<string, string> = {}
    const urlParams = new URLSearchParams(window.location.search)

    for (const [key, value] of urlParams.entries()) {
      query[key] = value
    }

    return query
  }

  private findSceneById(sceneId: string): Scene | null {
    return this.manifest.scenes.find(scene => scene.id === sceneId) || null
  }

  public getState(): RouterState {
    return { ...this.state }
  }

  public navigate(path: string): void {
    const route = this.findRouteByPath(path)
    const scene = route ? this.findSceneById(route.sceneId) : null
    const params = this.extractParams(path, route)
    const query = this.extractQueryParams()

    const newState = {
      currentPath: path,
      currentRoute: route,
      currentScene: scene,
      params,
      query,
    }

    if (this.hasStateChanged(newState)) {
      this.state = newState

      // Update browser history
      window.history.pushState({}, "", path)

      // Notify listeners
      this.notifyListeners()
    }
  }

  public goBack(): void {
    window.history.back()
  }

  public goForward(): void {
    window.history.forward()
  }

  public subscribe(listener: (state: RouterState) => void): () => void {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state))
  }

  public initialize(): void {
    // Listen for browser navigation events
    window.addEventListener("popstate", () => {
      const path = window.location.pathname
      const route = this.findRouteByPath(path)
      const scene = route ? this.findSceneById(route.sceneId) : null
      const params = this.extractParams(path, route)
      const query = this.extractQueryParams()

      const newState = {
        currentPath: path,
        currentRoute: route,
        currentScene: scene,
        params,
        query,
      }

      if (this.hasStateChanged(newState)) {
        this.state = newState
        this.notifyListeners()
      }
    })

    // Navigate to default route if no route is matched
    if (!this.state.currentScene && this.manifest.defaultRoute) {
      this.navigate(this.manifest.defaultRoute)
    }
  }
}

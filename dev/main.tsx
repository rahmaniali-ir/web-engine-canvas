import React, { useCallback } from "react"
import ReactDOM from "react-dom/client"
import { WebEngineCanvas } from "../src"
import { sampleManifest } from "./sampleManifest"

function App() {
  const handleWebObjectReady = useCallback((element, webObject) => {
    console.log("WebObject ready:", webObject.id, element)
  }, [])

  const handleWebObjectUpdate = useCallback((element, webObject) => {
    console.log("WebObject updated:", webObject.id, element)
  }, [])

  const handleRouteChange = useCallback(routerState => {
    console.log(
      "Route changed:",
      routerState.currentPath,
      routerState.currentScene?.name
    )
  }, [])

  return (
    <WebEngineCanvas
      manifest={sampleManifest as any}
      onWebObjectReady={handleWebObjectReady}
      onWebObjectUpdate={handleWebObjectUpdate}
      onRouteChange={handleRouteChange}
      style={{ height: "100vh", width: "100vw" }}
    />
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

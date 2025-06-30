import React, { useCallback } from "react"
import ReactDOM from "react-dom/client"
import { WebEngineCanvas } from "../src"
import { CanvasEventUnion } from "../src/types/Events"
import sampleManifest from "./sampleManifest"

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

  // Handle all canvas events
  const handleEvent = useCallback((event: CanvasEventUnion) => {
    console.log("Canvas event:", event.type, event)
  }, [])

  return (
    <WebEngineCanvas
      manifest={sampleManifest as any}
      debug={{
        enabled: true,
        logLevel: "log",
        logToConsole: true,
        includeTimestamps: true,
        includeStackTraces: false,
        filterEvents: ["webObject", "router", "service", "canvas"], // Log all event types
      }}
      onEvent={handleEvent}
      onWebObjectReady={handleWebObjectReady}
      onWebObjectUpdate={handleWebObjectUpdate}
      onRouteChange={handleRouteChange}
      onCanvasReady={context => {
        console.log(
          "Canvas is ready! Event service available at context.eventService"
        )

        // Example: Listen to specific events using the event service
        context.eventService.on("webObject", event => {
          if (event.type === "webObject") {
            console.log(
              "WebObject event from context:",
              event.webObjectId,
              event.subtype
            )
          }
        })

        context.eventService.on("router", event => {
          if (event.type === "router") {
            console.log(
              "Router event from context:",
              event.subtype,
              event.routerState.currentPath
            )
          }
        })
      }}
      style={{ height: "100vh", width: "100vw" }}
    />
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

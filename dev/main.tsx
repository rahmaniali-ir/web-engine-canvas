import React from "react"
import ReactDOM from "react-dom/client"
import { WebEngineCanvas } from "../src"
import sampleManifest from "./sampleManifest"

function App() {
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
      globalEvents={[
        { name: "click", stopPropagation: true, preventDefault: true },
        { name: "mouseenter", stopPropagation: true },
        { name: "mouseleave", stopPropagation: true },
      ]}
      onEvent={event => {
        console.log("Global event:", event)
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

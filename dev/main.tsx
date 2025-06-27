import React, { useState, useCallback } from "react"
import { createRoot } from "react-dom/client"
import {
  WebEngineCanvas,
  useWebObjects,
  CanvasManifest,
  WebObject,
} from "../src/index"

// Create a simple test manifest to debug rendering
const sampleManifest: CanvasManifest = {
  id: "landing-canvas",
  name: "Landing Page Canvas",
  version: "1.0.0",
  description: "A modern landing page demo for the WebObject system.",
  author: "Demo Author",
  settings: {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#f8fafc",
    responsive: true,
  },
  root: {
    id: "root-manifest",
    name: "Landing Root",
    version: "1.0.0",
    root: {
      id: "main-container",
      type: "container",
      style: {
        minHeight: "100vh",
        width: "100%",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        backgroundColor: "#f8fafc",
        color: "#222",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: 0,
      },
      children: [
        // Navigation Bar
        {
          id: "navbar",
          type: "element",
          tagName: "nav",
          style: {
            width: "100%",
            backgroundColor: "#fff",
            borderBottom: "1px solid #e5e7eb",
            padding: "24px 0 16px 0",
            display: "flex",
            justifyContent: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          },
          children: [
            {
              id: "nav-content",
              type: "container",
              style: {
                width: "90%",
                maxWidth: "1100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              children: [
                {
                  id: "nav-logo",
                  type: "element",
                  tagName: "span",
                  props: { children: "WebEngine" },
                  style: {
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#2563eb",
                  },
                },
                {
                  id: "nav-links",
                  type: "container",
                  style: {
                    display: "flex",
                    gap: "32px",
                  },
                  children: [
                    {
                      id: "nav-link-features",
                      type: "element",
                      tagName: "a",
                      props: { href: "#features", children: "Features" },
                      style: {
                        textDecoration: "none",
                        color: "#222",
                        fontWeight: 500,
                      },
                    },
                    {
                      id: "nav-link-about",
                      type: "element",
                      tagName: "a",
                      props: { href: "#about", children: "About" },
                      style: {
                        textDecoration: "none",
                        color: "#222",
                        fontWeight: 500,
                      },
                    },
                    {
                      id: "nav-link-contact",
                      type: "element",
                      tagName: "a",
                      props: { href: "#contact", children: "Contact" },
                      style: {
                        textDecoration: "none",
                        color: "#222",
                        fontWeight: 500,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Hero Section
        {
          id: "hero-section",
          type: "container",
          style: {
            width: "100%",
            background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
            color: "#fff",
            padding: "80px 0 60px 0",
            display: "flex",
            justifyContent: "center",
          },
          children: [
            {
              id: "hero-content",
              type: "container",
              style: {
                width: "90%",
                maxWidth: "1100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              },
              children: [
                {
                  id: "hero-title",
                  type: "element",
                  tagName: "h1",
                  props: {
                    children:
                      "Build Dynamic Web Experiences with WebEngineCanvas",
                  },
                  style: {
                    fontSize: "2.8rem",
                    fontWeight: 700,
                    marginBottom: "20px",
                  },
                },
                {
                  id: "hero-desc",
                  type: "element",
                  tagName: "p",
                  props: {
                    children:
                      "A React library for rendering and managing complex UI trees with ease.",
                  },
                  style: {
                    fontSize: "1.3rem",
                    marginBottom: "32px",
                    color: "#e0e7ef",
                  },
                },
                {
                  id: "hero-cta",
                  type: "element",
                  tagName: "a",
                  props: { href: "#features", children: "Get Started" },
                  style: {
                    display: "inline-block",
                    backgroundColor: "#fff",
                    color: "#2563eb",
                    fontWeight: 600,
                    padding: "14px 36px",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "background 0.2s, color 0.2s",
                  },
                },
              ],
            },
          ],
        },
        // Features Section
        {
          id: "features-section",
          type: "container",
          style: {
            width: "100%",
            backgroundColor: "#f1f5f9",
            padding: "80px 0 60px 0",
            display: "flex",
            justifyContent: "center",
          },
          props: { id: "features" },
          children: [
            {
              id: "features-content",
              type: "container",
              style: {
                width: "90%",
                maxWidth: "1100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
              children: [
                {
                  id: "features-title",
                  type: "element",
                  tagName: "h2",
                  props: { children: "Features" },
                  style: {
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    marginBottom: "40px",
                  },
                },
                {
                  id: "features-list",
                  type: "container",
                  style: {
                    display: "flex",
                    gap: "32px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  },
                  children: [
                    {
                      id: "feature-1",
                      type: "container",
                      style: {
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        padding: "32px 28px",
                        minWidth: "260px",
                        maxWidth: "320px",
                        textAlign: "center",
                        marginBottom: "24px",
                      },
                      children: [
                        {
                          id: "feature-1-title",
                          type: "element",
                          tagName: "h3",
                          props: { children: "Declarative UI Trees" },
                          style: {
                            fontSize: "1.3rem",
                            fontWeight: 600,
                            marginBottom: "12px",
                          },
                        },
                        {
                          id: "feature-1-desc",
                          type: "element",
                          tagName: "p",
                          props: {
                            children:
                              "Describe your UI as a tree of objects and let WebEngineCanvas handle the rendering.",
                          },
                          style: { color: "#555", fontSize: "1rem" },
                        },
                      ],
                    },
                    {
                      id: "feature-2",
                      type: "container",
                      style: {
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        padding: "32px 28px",
                        minWidth: "260px",
                        maxWidth: "320px",
                        textAlign: "center",
                        marginBottom: "24px",
                      },
                      children: [
                        {
                          id: "feature-2-title",
                          type: "element",
                          tagName: "h3",
                          props: { children: "Dynamic Updates" },
                          style: {
                            fontSize: "1.3rem",
                            fontWeight: 600,
                            marginBottom: "12px",
                          },
                        },
                        {
                          id: "feature-2-desc",
                          type: "element",
                          tagName: "p",
                          props: {
                            children:
                              "Easily update, add, or remove objects in real time with full reactivity.",
                          },
                          style: { color: "#555", fontSize: "1rem" },
                        },
                      ],
                    },
                    {
                      id: "feature-3",
                      type: "container",
                      style: {
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        padding: "32px 28px",
                        minWidth: "260px",
                        maxWidth: "320px",
                        textAlign: "center",
                        marginBottom: "24px",
                      },
                      children: [
                        {
                          id: "feature-3-title",
                          type: "element",
                          tagName: "h3",
                          props: { children: "Composable & Extensible" },
                          style: {
                            fontSize: "1.3rem",
                            fontWeight: 600,
                            marginBottom: "12px",
                          },
                        },
                        {
                          id: "feature-3-desc",
                          type: "element",
                          tagName: "p",
                          props: {
                            children:
                              "Compose complex layouts and extend with your own components.",
                          },
                          style: { color: "#555", fontSize: "1rem" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // About Section
        {
          id: "about-section",
          type: "container",
          style: {
            width: "100%",
            backgroundColor: "#fff",
            padding: "80px 0 60px 0",
            display: "flex",
            justifyContent: "center",
          },
          props: { id: "about" },
          children: [
            {
              id: "about-content",
              type: "container",
              style: {
                width: "90%",
                maxWidth: "900px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              },
              children: [
                {
                  id: "about-title",
                  type: "element",
                  tagName: "h2",
                  props: { children: "About WebEngineCanvas" },
                  style: {
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    marginBottom: "32px",
                  },
                },
                {
                  id: "about-desc",
                  type: "element",
                  tagName: "p",
                  props: {
                    children:
                      "WebEngineCanvas is designed to help you build, manage, and update complex UI trees in React with a simple manifest-driven approach. Perfect for dashboards, editors, and dynamic web apps.",
                  },
                  style: {
                    fontSize: "1.1rem",
                    color: "#444",
                    marginBottom: "24px",
                  },
                },
                {
                  id: "about-learn-more",
                  type: "element",
                  tagName: "a",
                  props: { href: "#", children: "Learn More" },
                  style: {
                    display: "inline-block",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    fontWeight: 600,
                    padding: "12px 32px",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    textDecoration: "none",
                    marginTop: "12px",
                  },
                },
              ],
            },
          ],
        },
        // Contact Section
        {
          id: "contact-section",
          type: "container",
          style: {
            width: "100%",
            backgroundColor: "#f1f5f9",
            padding: "80px 0 60px 0",
            display: "flex",
            justifyContent: "center",
          },
          props: { id: "contact" },
          children: [
            {
              id: "contact-content",
              type: "container",
              style: {
                width: "90%",
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              },
              children: [
                {
                  id: "contact-title",
                  type: "element",
                  tagName: "h2",
                  props: { children: "Contact Us" },
                  style: {
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    marginBottom: "32px",
                  },
                },
                {
                  id: "contact-desc",
                  type: "element",
                  tagName: "p",
                  props: {
                    children:
                      "Have questions or want to get in touch? Fill out the form below or email us at demo@example.com.",
                  },
                  style: {
                    fontSize: "1.1rem",
                    color: "#444",
                    marginBottom: "24px",
                  },
                },
                {
                  id: "contact-form",
                  type: "container",
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "100%",
                    maxWidth: "400px",
                    margin: "0 auto",
                  },
                  children: [
                    {
                      id: "contact-input-name",
                      type: "element",
                      tagName: "input",
                      props: { type: "text", placeholder: "Your Name" },
                      style: {
                        padding: "12px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                      },
                    },
                    {
                      id: "contact-input-email",
                      type: "element",
                      tagName: "input",
                      props: { type: "email", placeholder: "Your Email" },
                      style: {
                        padding: "12px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                      },
                    },
                    {
                      id: "contact-input-message",
                      type: "element",
                      tagName: "textarea",
                      props: { placeholder: "Your Message", rows: 4 },
                      style: {
                        padding: "12px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                        resize: "vertical",
                      },
                    },
                    {
                      id: "contact-submit-btn",
                      type: "element",
                      tagName: "button",
                      props: { children: "Send Message" },
                      style: {
                        backgroundColor: "#2563eb",
                        color: "#fff",
                        fontWeight: 600,
                        padding: "12px 0",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        border: "none",
                        cursor: "pointer",
                        marginTop: "8px",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Footer
        {
          id: "footer",
          type: "element",
          tagName: "footer",
          style: {
            width: "100%",
            backgroundColor: "#1e293b",
            color: "#fff",
            padding: "32px 0 24px 0",
            textAlign: "center",
            marginTop: "40px",
          },
          children: [
            {
              id: "footer-text",
              type: "element",
              tagName: "span",
              props: {
                children: "© 2024 WebEngineCanvas. All rights reserved.",
              },
              style: { fontSize: "1rem", color: "#cbd5e1" },
            },
          ],
        },
      ],
    },
  },
}

function DevApp() {
  const [context, setContext] = useState<any>(null)
  const [manifest, setManifest] = useState<CanvasManifest>(sampleManifest)
  const webObjects = useWebObjects(context)

  const handleCanvasReady = useCallback((canvasContext: any) => {
    setContext(canvasContext)
    console.log("Canvas ready:", canvasContext)
  }, [])

  const handleAddText = useCallback(() => {
    if (!webObjects) return

    const newText = webObjects.createHTMLElement(
      "p",
      {
        children: `New text element ${Date.now()}`,
      },
      {
        backgroundColor: "#e9ecef",
        padding: "10px",
        borderRadius: "4px",
        marginTop: "10px",
      }
    )
    webObjects.addWebObject("content-container", newText)
  }, [webObjects])

  const handleAddContainer = useCallback(() => {
    if (!webObjects) return

    const newContainer = webObjects.createContainer(
      {
        "data-type": "dynamic-container",
      },
      {
        backgroundColor: "#fff3cd",
        border: "1px solid #ffeaa7",
        borderRadius: "8px",
        padding: "15px",
        marginTop: "10px",
      }
    )

    // Add a child element to the container
    const childText = webObjects.createHTMLElement(
      "span",
      {
        children: "Dynamic container content",
      },
      {
        color: "#856404",
      }
    )

    newContainer.children = [childText]
    webObjects.addWebObject("content-container", newContainer)
  }, [webObjects])

  const handleWebObjectReady = useCallback(
    (element: HTMLElement, webObject: WebObject) => {
      console.log("WebObject ready:", webObject.id, element)

      // Add click handlers for buttons only once
      if (webObject.id === "add-text-btn") {
        // Remove existing listener to prevent duplicates
        element.removeEventListener("click", handleAddText)
        element.addEventListener("click", handleAddText)
      }

      if (webObject.id === "add-container-btn") {
        // Remove existing listener to prevent duplicates
        element.removeEventListener("click", handleAddContainer)
        element.addEventListener("click", handleAddContainer)
      }
    },
    [handleAddText, handleAddContainer]
  )

  const handleWebObjectUpdate = useCallback(
    (element: HTMLElement, webObject: WebObject) => {
      console.log("WebObject updated:", webObject.id, webObject)
    },
    []
  )

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
      <WebEngineCanvas
        manifest={manifest}
        style={{ width: "100%", height: "100vh" }}
        onCanvasReady={handleCanvasReady}
        onWebObjectReady={handleWebObjectReady}
        onWebObjectUpdate={handleWebObjectUpdate}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          background: "rgba(255,255,255,0.9)",
          padding: "8px 16px",
          fontSize: 12,
          zIndex: 1000,
          borderTopLeftRadius: 8,
          boxShadow: "0 0 8px rgba(0,0,0,0.05)",
        }}
      >
        <b>Debug Info:</b> Context: {context ? "Yes" : "No"} | WebObjects:{" "}
        {context?.webObjectTree?.nodes?.size || 0}
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById("root")!)
root.render(<DevApp />)

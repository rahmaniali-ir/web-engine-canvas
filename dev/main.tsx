import React, { useCallback } from "react"
import ReactDOM from "react-dom/client"
import { WebEngineCanvas } from "../src"

const sampleManifest = {
  id: "webengine-landing",
  name: "WebEngine Landing Page",
  version: "1.0.0",
  description: "Modern landing page showcasing WebEngine Canvas",
  author: "WebEngine Team",
  root: {
    id: "root",
    tagName: "div",
    components: [
      {
        id: "root-mesh",
        type: "mesh",
        config: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
        },
      },
      {
        id: "root-material",
        type: "material",
        config: {
          backgroundColor: "#ffffff",
        },
      },
    ],
    children: [
      // Header
      {
        id: "header",
        tagName: "header",
        components: [
          {
            id: "header-mesh",
            type: "mesh",
            config: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            },
          },
          {
            id: "header-padding",
            type: "padding",
            config: {
              padding: "1rem 2rem",
            },
          },
          {
            id: "header-material",
            type: "material",
            config: {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
            },
          },
          {
            id: "header-boxShadow",
            type: "boxShadow",
            config: {
              boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        children: [
          {
            id: "logo",
            tagName: "div",
            components: [
              {
                id: "logo-typography",
                type: "typography",
                config: {
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                },
              },
            ],
            children: [],
            content: "WebEngine",
          },
          {
            id: "nav",
            tagName: "nav",
            components: [
              {
                id: "nav-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  gap: "2rem",
                },
              },
            ],
            children: [
              {
                id: "nav-link-1",
                tagName: "a",
                components: [
                  {
                    id: "nav-link-1-typography",
                    type: "typography",
                    config: {
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 500,
                    },
                  },
                ],
                children: [],
                content: "Home",
              },
              {
                id: "nav-link-2",
                tagName: "a",
                components: [
                  {
                    id: "nav-link-2-typography",
                    type: "typography",
                    config: {
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 500,
                    },
                  },
                ],
                children: [],
                content: "Features",
              },
            ],
          },
        ],
      },

      // Hero Section
      {
        id: "hero",
        tagName: "section",
        components: [
          {
            id: "hero-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            },
          },
          {
            id: "hero-typography",
            type: "typography",
            config: {
              textAlign: "center",
            },
          },
          {
            id: "hero-padding",
            type: "padding",
            config: {
              padding: "8rem 2rem",
            },
          },
          {
            id: "hero-material",
            type: "material",
            config: {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            },
          },
        ],
        children: [
          {
            id: "hero-title",
            tagName: "h1",
            components: [
              {
                id: "hero-title-typography",
                type: "typography",
                config: {
                  fontSize: "4rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "1.5rem",
                },
              },
            ],
            children: [],
            content: "Build Amazing Web Experiences",
          },
          {
            id: "hero-subtitle",
            tagName: "p",
            components: [
              {
                id: "hero-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.3rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  maxWidth: "600px",
                  marginBottom: "3rem",
                },
              },
            ],
            children: [],
            content:
              "WebEngine Canvas is a powerful React library for creating dynamic, component-based web interfaces.",
          },
          {
            id: "hero-button",
            tagName: "button",
            components: [
              {
                id: "hero-button-borderRadius",
                type: "borderRadius",
                config: {
                  borderRadius: "50px",
                },
              },
              {
                id: "hero-button-padding",
                type: "padding",
                config: {
                  padding: "1rem 2.5rem",
                },
              },
              {
                id: "hero-button-material",
                type: "material",
                config: {
                  backgroundColor: "white",
                  color: "#667eea",
                },
              },
              {
                id: "hero-button-typography",
                type: "typography",
                config: {
                  fontSize: "1.1rem",
                  fontWeight: 600,
                },
              },
            ],
            children: [],
            content: "Get Started",
          },
        ],
      },

      // Features Section
      {
        id: "features",
        tagName: "section",
        components: [
          {
            id: "features-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          },
          {
            id: "features-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem",
            },
          },
          {
            id: "features-material",
            type: "material",
            config: {
              backgroundColor: "#f8fafc",
            },
          },
        ],
        children: [
          {
            id: "features-title",
            tagName: "h2",
            components: [
              {
                id: "features-title-typography",
                type: "typography",
                config: {
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  textAlign: "center",
                  marginBottom: "4rem",
                },
              },
            ],
            children: [],
            content: "Why Choose WebEngine?",
          },
          {
            id: "features-grid",
            tagName: "div",
            components: [
              {
                id: "features-grid-mesh",
                type: "mesh",
                config: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2rem",
                  maxWidth: "1000px",
                  width: "100%",
                },
              },
            ],
            children: [
              {
                id: "feature-1",
                tagName: "div",
                components: [
                  {
                    id: "feature-1-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "15px",
                    },
                  },
                  {
                    id: "feature-1-typography",
                    type: "typography",
                    config: {
                      textAlign: "center",
                    },
                  },
                  {
                    id: "feature-1-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "feature-1-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "feature-1-boxShadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    },
                  },
                ],
                children: [
                  {
                    id: "feature-1-title",
                    tagName: "h3",
                    components: [
                      {
                        id: "feature-1-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                    children: [],
                    content: "Component-Based",
                  },
                  {
                    id: "feature-1-desc",
                    tagName: "p",
                    components: [
                      {
                        id: "feature-1-desc-typography",
                        type: "typography",
                        config: {
                          color: "#666",
                          lineHeight: "1.6",
                        },
                      },
                    ],
                    children: [],
                    content:
                      "Build complex UIs with simple, reusable components.",
                  },
                ],
              },
              {
                id: "feature-2",
                tagName: "div",
                components: [
                  {
                    id: "feature-2-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "15px",
                    },
                  },
                  {
                    id: "feature-2-typography",
                    type: "typography",
                    config: {
                      textAlign: "center",
                    },
                  },
                  {
                    id: "feature-2-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "feature-2-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "feature-2-boxShadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    },
                  },
                ],
                children: [
                  {
                    id: "feature-2-title",
                    tagName: "h3",
                    components: [
                      {
                        id: "feature-2-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                    children: [],
                    content: "TypeScript First",
                  },
                  {
                    id: "feature-2-desc",
                    tagName: "p",
                    components: [
                      {
                        id: "feature-2-desc-typography",
                        type: "typography",
                        config: {
                          color: "#666",
                          lineHeight: "1.6",
                        },
                      },
                    ],
                    children: [],
                    content:
                      "Full TypeScript support with excellent developer experience.",
                  },
                ],
              },
              {
                id: "feature-3",
                tagName: "div",
                components: [
                  {
                    id: "feature-3-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "15px",
                    },
                  },
                  {
                    id: "feature-3-typography",
                    type: "typography",
                    config: {
                      textAlign: "center",
                    },
                  },
                  {
                    id: "feature-3-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "feature-3-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "feature-3-boxShadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    },
                  },
                ],
                children: [
                  {
                    id: "feature-3-title",
                    tagName: "h3",
                    components: [
                      {
                        id: "feature-3-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                    children: [],
                    content: "High Performance",
                  },
                  {
                    id: "feature-3-desc",
                    tagName: "p",
                    components: [
                      {
                        id: "feature-3-desc-typography",
                        type: "typography",
                        config: {
                          color: "#666",
                          lineHeight: "1.6",
                        },
                      },
                    ],
                    children: [],
                    content:
                      "Optimized rendering with minimal re-renders for speed.",
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
        tagName: "footer",
        components: [
          {
            id: "footer-typography",
            type: "typography",
            config: {
              textAlign: "center",
            },
          },
          {
            id: "footer-padding",
            type: "padding",
            config: {
              padding: "3rem 2rem",
            },
          },
          {
            id: "footer-material",
            type: "material",
            config: {
              backgroundColor: "#1a1a1a",
              color: "white",
            },
          },
        ],
        children: [
          {
            id: "footer-content",
            tagName: "div",
            components: [
              {
                id: "footer-content-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                },
              },
            ],
            children: [
              {
                id: "footer-logo",
                tagName: "div",
                components: [
                  {
                    id: "footer-logo-typography",
                    type: "typography",
                    config: {
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "white",
                    },
                  },
                ],
                children: [],
                content: "WebEngine",
              },
              {
                id: "footer-text",
                tagName: "p",
                components: [
                  {
                    id: "footer-text-typography",
                    type: "typography",
                    config: {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                  },
                ],
                children: [],
                content:
                  "© 2024 WebEngine. Building the future of web development.",
              },
            ],
          },
        ],
      },
    ],
  },
}

function App() {
  const handleWebObjectReady = useCallback(
    (element: HTMLElement, webObject: any) => {
      console.log("WebObject ready:", webObject.id, element)
    },
    []
  )

  const handleWebObjectUpdate = useCallback(
    (element: HTMLElement, webObject: any) => {
      console.log("WebObject updated:", webObject.id, element)
    },
    []
  )

  return (
    <WebEngineCanvas
      manifest={sampleManifest}
      onWebObjectReady={handleWebObjectReady}
      onWebObjectUpdate={handleWebObjectUpdate}
      style={{ height: "100vh", width: "100vw" }}
    />
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

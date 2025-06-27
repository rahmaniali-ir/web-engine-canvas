import React, { useCallback } from "react"
import ReactDOM from "react-dom/client"
import { WebEngineCanvas } from "../src"

const sampleManifest = {
  id: "webengine-app",
  name: "WebEngine Multi-Page App",
  version: "1.0.0",
  description: "Multi-page application showcasing WebEngine Canvas routing",
  author: "WebEngine Team",
  defaultRoute: "/",
  routes: [
    {
      id: "home",
      path: "/",
      sceneId: "home-scene",
    },
    {
      id: "about",
      path: "/about",
      sceneId: "about-scene",
    },
    {
      id: "contact",
      path: "/contact",
      sceneId: "contact-scene",
    },
  ],
  scenes: [
    {
      id: "home-scene",
      name: "Home Page",
      path: "/",
      root: {
        id: "home-root",
        type: "div",
        components: [
          {
            id: "home-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minHeight: "100vh",
            },
          },
          {
            id: "home-material",
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
            type: "div",
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
                type: "div",
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
                type: "div",
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
                    id: "nav-home",
                    type: "link",
                    routerLink: "/",
                    components: [
                      {
                        id: "nav-home-typography",
                        type: "typography",
                        config: {
                          color: "#667eea",
                          textDecoration: "none",
                          fontWeight: 600,
                        },
                      },
                    ],
                    children: [],
                    content: "Home",
                  },
                  {
                    id: "nav-about",
                    type: "link",
                    routerLink: "/about",
                    components: [
                      {
                        id: "nav-about-typography",
                        type: "typography",
                        config: {
                          color: "#666",
                          textDecoration: "none",
                          fontWeight: 500,
                        },
                      },
                    ],
                    children: [],
                    content: "About",
                  },
                  {
                    id: "nav-contact",
                    type: "link",
                    routerLink: "/contact",
                    components: [
                      {
                        id: "nav-contact-typography",
                        type: "typography",
                        config: {
                          color: "#666",
                          textDecoration: "none",
                          fontWeight: 500,
                        },
                      },
                    ],
                    children: [],
                    content: "Contact",
                  },
                ],
              },
            ],
          },

          // Hero Section
          {
            id: "hero",
            type: "div",
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
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
              },
            ],
            children: [
              {
                id: "hero-title",
                type: "heading",
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
                content: "Welcome to WebEngine",
              },
              {
                id: "hero-subtitle",
                type: "paragraph",
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
                  "A powerful React library for creating dynamic, component-based web interfaces with built-in routing.",
              },
              {
                id: "hero-button",
                type: "button",
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
        ],
      },
    },
    {
      id: "about-scene",
      name: "About Page",
      path: "/about",
      root: {
        id: "about-root",
        type: "div",
        components: [
          {
            id: "about-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minHeight: "100vh",
            },
          },
          {
            id: "about-material",
            type: "material",
            config: {
              backgroundColor: "#f8fafc",
            },
          },
        ],
        children: [
          // Header (same as home)
          {
            id: "header",
            type: "div",
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
                type: "div",
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
                type: "div",
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
                    id: "nav-home",
                    type: "link",
                    routerLink: "/",
                    components: [
                      {
                        id: "nav-home-typography",
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
                    id: "nav-about",
                    type: "link",
                    routerLink: "/about",
                    components: [
                      {
                        id: "nav-about-typography",
                        type: "typography",
                        config: {
                          color: "#667eea",
                          textDecoration: "none",
                          fontWeight: 600,
                        },
                      },
                    ],
                    children: [],
                    content: "About",
                  },
                  {
                    id: "nav-contact",
                    type: "link",
                    routerLink: "/contact",
                    components: [
                      {
                        id: "nav-contact-typography",
                        type: "typography",
                        config: {
                          color: "#666",
                          textDecoration: "none",
                          fontWeight: 500,
                        },
                      },
                    ],
                    children: [],
                    content: "Contact",
                  },
                ],
              },
            ],
          },

          // About Content
          {
            id: "about-content",
            type: "div",
            components: [
              {
                id: "about-content-mesh",
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
                id: "about-content-padding",
                type: "padding",
                config: {
                  padding: "8rem 2rem",
                },
              },
            ],
            children: [
              {
                id: "about-title",
                type: "heading",
                components: [
                  {
                    id: "about-title-typography",
                    type: "typography",
                    config: {
                      fontSize: "3rem",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      textAlign: "center",
                      marginBottom: "2rem",
                    },
                  },
                ],
                children: [],
                content: "About WebEngine",
              },
              {
                id: "about-description",
                type: "paragraph",
                components: [
                  {
                    id: "about-description-typography",
                    type: "typography",
                    config: {
                      fontSize: "1.2rem",
                      color: "#666",
                      textAlign: "center",
                      maxWidth: "800px",
                      lineHeight: "1.6",
                    },
                  },
                ],
                children: [],
                content:
                  "WebEngine Canvas is a revolutionary React library that combines the power of component-based architecture with the flexibility of canvas-based rendering. Built with TypeScript and modern web standards, it provides developers with a powerful toolkit for creating dynamic, interactive web applications.",
              },
            ],
          },
        ],
      },
    },
    {
      id: "contact-scene",
      name: "Contact Page",
      path: "/contact",
      root: {
        id: "contact-root",
        type: "div",
        components: [
          {
            id: "contact-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minHeight: "100vh",
            },
          },
          {
            id: "contact-material",
            type: "material",
            config: {
              backgroundColor: "#ffffff",
            },
          },
        ],
        children: [
          // Header (same as home)
          {
            id: "header",
            type: "div",
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
                type: "div",
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
                type: "div",
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
                    id: "nav-home",
                    type: "link",
                    routerLink: "/",
                    components: [
                      {
                        id: "nav-home-typography",
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
                    id: "nav-about",
                    type: "link",
                    routerLink: "/about",
                    components: [
                      {
                        id: "nav-about-typography",
                        type: "typography",
                        config: {
                          color: "#666",
                          textDecoration: "none",
                          fontWeight: 500,
                        },
                      },
                    ],
                    children: [],
                    content: "About",
                  },
                  {
                    id: "nav-contact",
                    type: "link",
                    routerLink: "/contact",
                    components: [
                      {
                        id: "nav-contact-typography",
                        type: "typography",
                        config: {
                          color: "#667eea",
                          textDecoration: "none",
                          fontWeight: 600,
                        },
                      },
                    ],
                    children: [],
                    content: "Contact",
                  },
                ],
              },
            ],
          },

          // Contact Content
          {
            id: "contact-content",
            type: "div",
            components: [
              {
                id: "contact-content-mesh",
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
                id: "contact-content-padding",
                type: "padding",
                config: {
                  padding: "8rem 2rem",
                },
              },
            ],
            children: [
              {
                id: "contact-title",
                type: "heading",
                components: [
                  {
                    id: "contact-title-typography",
                    type: "typography",
                    config: {
                      fontSize: "3rem",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      textAlign: "center",
                      marginBottom: "2rem",
                    },
                  },
                ],
                children: [],
                content: "Contact Us",
              },
              {
                id: "contact-description",
                type: "paragraph",
                components: [
                  {
                    id: "contact-description-typography",
                    type: "typography",
                    config: {
                      fontSize: "1.2rem",
                      color: "#666",
                      textAlign: "center",
                      maxWidth: "600px",
                      lineHeight: "1.6",
                    },
                  },
                ],
                children: [],
                content:
                  "Get in touch with our team to learn more about WebEngine Canvas and how it can transform your web development workflow.",
              },
            ],
          },
        ],
      },
    },
  ],
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

  const handleRouteChange = useCallback((routerState: any) => {
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

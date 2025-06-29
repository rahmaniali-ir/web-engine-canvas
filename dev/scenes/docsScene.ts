import { Scene } from "../../src/types"

const docsScene: Scene = {
  id: "docs",
  name: "Documentation",
  path: "/docs",
  root: {
    id: "docs-root",
    type: "div",
    components: [
      {
        id: "docs-root-mesh",
        type: "mesh",
        config: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      },
      {
        id: "docs-root-material",
        type: "material",
        config: {
          backgroundColor: "gray-50",
        },
      },
    ],
    children: [
      {
        id: "navbar",
        type: "div",
        metadata: {
          prefabId: "navbar",
        },
      },
      {
        id: "docs-header-section",
        type: "div",
        components: [
          {
            id: "docs-header-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            },
          },
          {
            id: "docs-header-padding",
            type: "padding",
            config: {
              padding: "8rem 2rem 6rem 2rem",
            },
          },
          {
            id: "docs-header-material",
            type: "material",
            config: {
              background: "primary-gradient",
            },
          },
          {
            id: "docs-header-typography",
            type: "typography",
            config: {
              color: "white",
              textAlign: "center",
            },
          },
        ],
        children: [
          {
            id: "docs-title",
            type: "heading",
            level: 1,
            content: "Documentation",
            components: [
              {
                id: "docs-title-typography",
                type: "typography",
                config: {
                  fontSize: "3rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "white",
                },
              },
            ],
          },
          {
            id: "docs-subtitle",
            type: "paragraph",
            content:
              "Everything you need to know to build amazing web applications with WebEngine Canvas.",
            components: [
              {
                id: "docs-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.25rem",
                  opacity: "0.95",
                  marginBottom: "2.5rem",
                  color: "white",
                  maxWidth: "600px",
                },
              },
            ],
          },
        ],
      },
      {
        id: "docs-content-section",
        type: "div",
        components: [
          {
            id: "docs-content-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "docs-content-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
        ],
        children: [
          {
            id: "docs-content-title",
            type: "heading",
            level: 2,
            content: "Getting Started",
            components: [
              {
                id: "docs-content-title-typography",
                type: "typography",
                config: {
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "gray-800",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "docs-content-subtitle",
            type: "paragraph",
            content:
              "Learn the basics and start building your first application",
            components: [
              {
                id: "docs-content-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.125rem",
                  color: "gray-600",
                  marginBottom: "4rem",
                  textAlign: "center",
                  maxWidth: "600px",
                },
              },
            ],
          },
          {
            id: "docs-tutorials",
            type: "div",
            components: [
              {
                id: "docs-tutorials-mesh",
                type: "mesh",
                config: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "2rem",
                  width: "100%",
                  maxWidth: "1200px",
                },
              },
            ],
            children: [
              {
                id: "tutorial-1",
                type: "div",
                components: [
                  {
                    id: "tutorial-1-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                  {
                    id: "tutorial-1-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
                    },
                  },
                  {
                    id: "tutorial-1-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "tutorial-1-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "tutorial-1-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "tutorial-1-title",
                    type: "heading",
                    level: 3,
                    content: "Quick Start Guide",
                    components: [
                      {
                        id: "tutorial-1-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          marginBottom: "1rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "tutorial-1-desc",
                    type: "paragraph",
                    content:
                      "Get up and running with WebEngine Canvas in just a few minutes. Learn the basic concepts and create your first component.",
                    components: [
                      {
                        id: "tutorial-1-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          marginBottom: "1.5rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "tutorial-1-link",
                    type: "link",
                    content: "Read More →",
                    href: "#quick-start",
                    components: [
                      {
                        id: "tutorial-1-link-typography",
                        type: "typography",
                        config: {
                          color: "primary",
                          fontWeight: "600",
                        },
                      },
                      {
                        id: "tutorial-1-link-interaction",
                        type: "interaction",
                        config: {
                          cursor: "pointer",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "tutorial-2",
                type: "div",
                components: [
                  {
                    id: "tutorial-2-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                  {
                    id: "tutorial-2-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
                    },
                  },
                  {
                    id: "tutorial-2-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "tutorial-2-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "tutorial-2-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "tutorial-2-title",
                    type: "heading",
                    level: 3,
                    content: "Component System",
                    components: [
                      {
                        id: "tutorial-2-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          marginBottom: "1rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "tutorial-2-desc",
                    type: "paragraph",
                    content:
                      "Learn how to create and use components to build reusable UI elements. Master the component lifecycle and state management.",
                    components: [
                      {
                        id: "tutorial-2-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          marginBottom: "1.5rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "tutorial-2-link",
                    type: "link",
                    content: "Read More →",
                    href: "#components",
                    components: [
                      {
                        id: "tutorial-2-link-typography",
                        type: "typography",
                        config: {
                          color: "primary",
                          fontWeight: "600",
                        },
                      },
                      {
                        id: "tutorial-2-link-interaction",
                        type: "interaction",
                        config: {
                          cursor: "pointer",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "tutorial-3",
                type: "div",
                components: [
                  {
                    id: "tutorial-3-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                  {
                    id: "tutorial-3-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
                    },
                  },
                  {
                    id: "tutorial-3-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "tutorial-3-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "tutorial-3-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "tutorial-3-title",
                    type: "heading",
                    level: 3,
                    content: "Styling & Layout",
                    components: [
                      {
                        id: "tutorial-3-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          marginBottom: "1rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "tutorial-3-desc",
                    type: "paragraph",
                    content:
                      "Master the styling system and layout components. Learn how to create responsive designs and beautiful user interfaces.",
                    components: [
                      {
                        id: "tutorial-3-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          marginBottom: "1.5rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "tutorial-3-link",
                    type: "link",
                    content: "Read More →",
                    href: "#styling",
                    components: [
                      {
                        id: "tutorial-3-link-typography",
                        type: "typography",
                        config: {
                          color: "primary",
                          fontWeight: "600",
                        },
                      },
                      {
                        id: "tutorial-3-link-interaction",
                        type: "interaction",
                        config: {
                          cursor: "pointer",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "docs-api-section",
        type: "div",
        components: [
          {
            id: "docs-api-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "docs-api-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
          {
            id: "docs-api-material",
            type: "material",
            config: {
              backgroundColor: "white",
            },
          },
        ],
        children: [
          {
            id: "docs-api-title",
            type: "heading",
            level: 2,
            content: "API Reference",
            components: [
              {
                id: "docs-api-title-typography",
                type: "typography",
                config: {
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "gray-800",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "docs-api-subtitle",
            type: "paragraph",
            content:
              "Complete API documentation for all components and services",
            components: [
              {
                id: "docs-api-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.125rem",
                  color: "gray-600",
                  marginBottom: "4rem",
                  textAlign: "center",
                  maxWidth: "600px",
                },
              },
            ],
          },
          {
            id: "api-categories",
            type: "div",
            components: [
              {
                id: "api-categories-mesh",
                type: "mesh",
                config: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem",
                  width: "100%",
                  maxWidth: "1000px",
                },
              },
            ],
            children: [
              {
                id: "api-core",
                type: "div",
                components: [
                  {
                    id: "api-core-mesh",
                    type: "mesh",
                    config: {
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    },
                  },
                  {
                    id: "api-core-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "api-core-material",
                    type: "material",
                    config: {
                      backgroundColor: "gray-50",
                    },
                  },
                  {
                    id: "api-core-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "api-core-title",
                    type: "heading",
                    level: 3,
                    content: "Core API",
                    components: [
                      {
                        id: "api-core-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "api-core-desc",
                    type: "paragraph",
                    content: "Core classes and utilities",
                    components: [
                      {
                        id: "api-core-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "0.9rem",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "api-components",
                type: "div",
                components: [
                  {
                    id: "api-components-mesh",
                    type: "mesh",
                    config: {
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    },
                  },
                  {
                    id: "api-components-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "api-components-material",
                    type: "material",
                    config: {
                      backgroundColor: "gray-50",
                    },
                  },
                  {
                    id: "api-components-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "api-components-title",
                    type: "heading",
                    level: 3,
                    content: "Components",
                    components: [
                      {
                        id: "api-components-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "api-components-desc",
                    type: "paragraph",
                    content: "Built-in UI components",
                    components: [
                      {
                        id: "api-components-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "0.9rem",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "api-services",
                type: "div",
                components: [
                  {
                    id: "api-services-mesh",
                    type: "mesh",
                    config: {
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    },
                  },
                  {
                    id: "api-services-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "api-services-material",
                    type: "material",
                    config: {
                      backgroundColor: "gray-50",
                    },
                  },
                  {
                    id: "api-services-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "api-services-title",
                    type: "heading",
                    level: 3,
                    content: "Services",
                    components: [
                      {
                        id: "api-services-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "api-services-desc",
                    type: "paragraph",
                    content: "Core services and utilities",
                    components: [
                      {
                        id: "api-services-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "0.9rem",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export default docsScene

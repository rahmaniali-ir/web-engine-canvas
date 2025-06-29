import { Scene } from "../../src/types"

const mainScene: Scene = {
  id: "main",
  name: "Main",
  path: "/",
  root: {
    id: "main-root",
    type: "div",
    components: [
      {
        id: "main-root-mesh",
        type: "mesh",
        config: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      },
      {
        id: "main-root-material",
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
        prefabId: "navbar",
      },
      {
        id: "hero-section",
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
              gap: "1.5rem",
            },
          },
          {
            id: "hero-padding",
            type: "padding",
            config: {
              padding: "8rem 2rem 6rem 2rem",
            },
          },
          {
            id: "hero-material",
            type: "material",
            config: {
              backgroundImage: "hero-bg",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            },
          },
          {
            id: "hero-typography",
            type: "typography",
            config: {
              color: "white",
              textAlign: "center",
            },
          },
        ],
        children: [
          {
            id: "hero-title",
            type: "heading",
            level: 1,
            content: "Build Beautiful Web Experiences",
            components: [
              {
                id: "hero-title-typography",
                type: "typography",
                config: {
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "white",
                },
              },
            ],
          },
          {
            id: "hero-subtitle",
            type: "paragraph",
            content:
              "Create stunning, responsive web applications with our powerful component-based engine.",
            components: [
              {
                id: "hero-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.25rem",
                  opacity: "0.95",
                  marginBottom: "3rem",
                  color: "white",
                  maxWidth: "600px",
                },
              },
            ],
          },
          {
            id: "hero-cta",
            type: "button",
            content: "Get Started",
            components: [
              {
                id: "hero-cta-padding",
                type: "padding",
                config: {
                  padding: "1rem 2.5rem",
                },
              },
              {
                id: "hero-cta-material",
                type: "material",
                config: {
                  backgroundColor: "white",
                },
              },
              {
                id: "hero-cta-typography",
                type: "typography",
                config: {
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "primary",
                },
              },
              {
                id: "hero-cta-borderRadius",
                type: "borderRadius",
                config: {
                  borderRadius: "0.75rem",
                },
              },
              {
                id: "hero-cta-shadow",
                type: "boxShadow",
                config: {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
              },
              {
                id: "hero-cta-interaction",
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
        id: "features-section",
        type: "div",
        components: [
          {
            id: "features-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "features-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
        ],
        children: [
          {
            id: "features-title",
            type: "heading",
            level: 2,
            content: "Why Choose WebEngine Canvas?",
            components: [
              {
                id: "features-title-typography",
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
            id: "features-subtitle",
            type: "paragraph",
            content: "Powerful features that make web development effortless",
            components: [
              {
                id: "features-subtitle-typography",
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
            id: "features-list",
            type: "div",
            components: [
              {
                id: "features-list-mesh",
                type: "mesh",
                config: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2rem",
                  width: "100%",
                  maxWidth: "1200px",
                },
              },
            ],
            children: [
              {
                id: "feature-1",
                type: "div",
                components: [
                  {
                    id: "feature-1-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "1rem",
                    },
                  },
                  {
                    id: "feature-1-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
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
                    id: "feature-1-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "feature-1-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "feature-1-title",
                    type: "heading",
                    level: 3,
                    content: "Lightning Fast",
                    components: [
                      {
                        id: "feature-1-title-typography",
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
                    id: "feature-1-desc",
                    type: "paragraph",
                    content:
                      "Optimized rendering and minimal overhead for top performance.",
                    components: [
                      {
                        id: "feature-1-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                          lineHeight: "1.6",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "feature-2",
                type: "div",
                components: [
                  {
                    id: "feature-2-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "1rem",
                    },
                  },
                  {
                    id: "feature-2-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
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
                    id: "feature-2-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "feature-2-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "feature-2-title",
                    type: "heading",
                    level: 3,
                    content: "Component-Based",
                    components: [
                      {
                        id: "feature-2-title-typography",
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
                    id: "feature-2-desc",
                    type: "paragraph",
                    content:
                      "Build reusable components and create complex layouts with ease.",
                    components: [
                      {
                        id: "feature-2-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                          lineHeight: "1.6",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "feature-3",
                type: "div",
                components: [
                  {
                    id: "feature-3-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "1rem",
                    },
                  },
                  {
                    id: "feature-3-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
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
                    id: "feature-3-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "feature-3-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "feature-3-title",
                    type: "heading",
                    level: 3,
                    content: "Developer Friendly",
                    components: [
                      {
                        id: "feature-3-title-typography",
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
                    id: "feature-3-desc",
                    type: "paragraph",
                    content:
                      "Intuitive API and comprehensive documentation for smooth development.",
                    components: [
                      {
                        id: "feature-3-desc-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                          lineHeight: "1.6",
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
        id: "cta-section",
        type: "div",
        components: [
          {
            id: "cta-mesh",
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
            id: "cta-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
          {
            id: "cta-material",
            type: "material",
            config: {
              background: "cta-gradient",
            },
          },
          {
            id: "cta-typography",
            type: "typography",
            config: {
              color: "white",
              textAlign: "center",
            },
          },
        ],
        children: [
          {
            id: "cta-title",
            type: "heading",
            level: 2,
            content: "Ready to Get Started?",
            components: [
              {
                id: "cta-title-typography",
                type: "typography",
                config: {
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "white",
                },
              },
            ],
          },
          {
            id: "cta-subtitle",
            type: "paragraph",
            content:
              "Join thousands of developers building amazing web experiences",
            components: [
              {
                id: "cta-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.125rem",
                  opacity: "0.95",
                  marginBottom: "2.5rem",
                  color: "white",
                  maxWidth: "500px",
                },
              },
            ],
          },
          {
            id: "cta-button",
            type: "button",
            content: "Start Building Now",
            components: [
              {
                id: "cta-button-padding",
                type: "padding",
                config: {
                  padding: "1rem 2.5rem",
                },
              },
              {
                id: "cta-button-material",
                type: "material",
                config: {
                  backgroundColor: "white",
                },
              },
              {
                id: "cta-button-typography",
                type: "typography",
                config: {
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "primary",
                },
              },
              {
                id: "cta-button-borderRadius",
                type: "borderRadius",
                config: {
                  borderRadius: "0.75rem",
                },
              },
              {
                id: "cta-button-shadow",
                type: "boxShadow",
                config: {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
              },
              {
                id: "cta-button-interaction",
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
}

export default mainScene

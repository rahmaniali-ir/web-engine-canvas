import { Scene } from "../../src/types"

const aboutScene: Scene = {
  id: "about",
  name: "About",
  path: "/about",
  root: {
    id: "about-root",
    type: "div",
    components: [
      {
        id: "about-root-mesh",
        type: "mesh",
        config: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      },
      {
        id: "about-root-material",
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
        id: "about-header-section",
        type: "div",
        components: [
          {
            id: "about-header-mesh",
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
            id: "about-header-padding",
            type: "padding",
            config: {
              padding: "8rem 2rem 6rem 2rem",
            },
          },
          {
            id: "about-header-material",
            type: "material",
            config: {
              background: "primary-gradient",
            },
          },
          {
            id: "about-header-typography",
            type: "typography",
            config: {
              color: "white",
              textAlign: "center",
            },
          },
        ],
        children: [
          {
            id: "about-title",
            type: "heading",
            level: 1,
            content: "About WebEngine Canvas",
            components: [
              {
                id: "about-title-typography",
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
            id: "about-subtitle",
            type: "paragraph",
            content: "We're building the future of web development.",
            components: [
              {
                id: "about-subtitle-typography",
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
        id: "team-section",
        type: "div",
        components: [
          {
            id: "team-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "team-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
        ],
        children: [
          {
            id: "team-title",
            type: "heading",
            level: 2,
            content: "Meet Our Team",
            components: [
              {
                id: "team-title-typography",
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
            id: "team-subtitle",
            type: "paragraph",
            content: "The passionate developers behind WebEngine Canvas",
            components: [
              {
                id: "team-subtitle-typography",
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
            id: "team-list",
            type: "div",
            components: [
              {
                id: "team-list-mesh",
                type: "mesh",
                config: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "2rem",
                  width: "100%",
                  maxWidth: "1200px",
                },
              },
            ],
            children: [
              {
                id: "team-member-1",
                type: "div",
                components: [
                  {
                    id: "team-member-1-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "0.5rem",
                    },
                  },
                  {
                    id: "team-member-1-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
                    },
                  },
                  {
                    id: "team-member-1-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "team-member-1-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "team-member-1-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "member-1-name",
                    type: "heading",
                    level: 3,
                    content: "Jane Doe",
                    components: [
                      {
                        id: "member-1-name-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "member-1-role",
                    type: "paragraph",
                    content: "Lead Developer",
                    components: [
                      {
                        id: "member-1-role-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "team-member-2",
                type: "div",
                components: [
                  {
                    id: "team-member-2-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "0.5rem",
                    },
                  },
                  {
                    id: "team-member-2-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
                    },
                  },
                  {
                    id: "team-member-2-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "team-member-2-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "team-member-2-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "member-2-name",
                    type: "heading",
                    level: 3,
                    content: "John Smith",
                    components: [
                      {
                        id: "member-2-name-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "member-2-role",
                    type: "paragraph",
                    content: "UI/UX Designer",
                    components: [
                      {
                        id: "member-2-role-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "team-member-3",
                type: "div",
                components: [
                  {
                    id: "team-member-3-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "0.5rem",
                    },
                  },
                  {
                    id: "team-member-3-padding",
                    type: "padding",
                    config: {
                      padding: "2.5rem",
                    },
                  },
                  {
                    id: "team-member-3-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "team-member-3-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "team-member-3-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                ],
                children: [
                  {
                    id: "member-3-name",
                    type: "heading",
                    level: 3,
                    content: "Sarah Johnson",
                    components: [
                      {
                        id: "member-3-name-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "gray-800",
                        },
                      },
                    ],
                  },
                  {
                    id: "member-3-role",
                    type: "paragraph",
                    content: "Product Manager",
                    components: [
                      {
                        id: "member-3-role-typography",
                        type: "typography",
                        config: {
                          color: "gray-600",
                          fontSize: "1rem",
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
        id: "mission-section",
        type: "div",
        components: [
          {
            id: "mission-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "mission-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
          {
            id: "mission-material",
            type: "material",
            config: {
              backgroundColor: "white",
            },
          },
        ],
        children: [
          {
            id: "mission-title",
            type: "heading",
            level: 2,
            content: "Our Mission",
            components: [
              {
                id: "mission-title-typography",
                type: "typography",
                config: {
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "gray-800",
                  textAlign: "center",
                },
              },
            ],
          },
          {
            id: "mission-content",
            type: "div",
            components: [
              {
                id: "mission-content-mesh",
                type: "mesh",
                config: {
                  maxWidth: "800px",
                  textAlign: "center",
                },
              },
            ],
            children: [
              {
                id: "mission-text",
                type: "paragraph",
                content:
                  "We believe that web development should be accessible, efficient, and enjoyable. Our mission is to provide developers with the tools they need to create beautiful, performant web applications without the complexity of traditional frameworks.",
                components: [
                  {
                    id: "mission-text-typography",
                    type: "typography",
                    config: {
                      fontSize: "1.125rem",
                      color: "gray-600",
                      lineHeight: "1.7",
                      marginBottom: "2rem",
                    },
                  },
                ],
              },
              {
                id: "mission-stats",
                type: "div",
                components: [
                  {
                    id: "mission-stats-mesh",
                    type: "mesh",
                    config: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "2rem",
                      marginTop: "3rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "stat-1",
                    type: "div",
                    components: [
                      {
                        id: "stat-1-mesh",
                        type: "mesh",
                        config: {
                          textAlign: "center",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "stat-1-number",
                        type: "heading",
                        level: 3,
                        content: "10K+",
                        components: [
                          {
                            id: "stat-1-number-typography",
                            type: "typography",
                            config: {
                              fontSize: "2.5rem",
                              fontWeight: "bold",
                              color: "primary",
                              marginBottom: "0.5rem",
                            },
                          },
                        ],
                      },
                      {
                        id: "stat-1-label",
                        type: "paragraph",
                        content: "Active Developers",
                        components: [
                          {
                            id: "stat-1-label-typography",
                            type: "typography",
                            config: {
                              color: "gray-600",
                              fontSize: "1rem",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "stat-2",
                    type: "div",
                    components: [
                      {
                        id: "stat-2-mesh",
                        type: "mesh",
                        config: {
                          textAlign: "center",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "stat-2-number",
                        type: "heading",
                        level: 3,
                        content: "50K+",
                        components: [
                          {
                            id: "stat-2-number-typography",
                            type: "typography",
                            config: {
                              fontSize: "2.5rem",
                              fontWeight: "bold",
                              color: "primary",
                              marginBottom: "0.5rem",
                            },
                          },
                        ],
                      },
                      {
                        id: "stat-2-label",
                        type: "paragraph",
                        content: "Projects Built",
                        components: [
                          {
                            id: "stat-2-label-typography",
                            type: "typography",
                            config: {
                              color: "gray-600",
                              fontSize: "1rem",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "stat-3",
                    type: "div",
                    components: [
                      {
                        id: "stat-3-mesh",
                        type: "mesh",
                        config: {
                          textAlign: "center",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "stat-3-number",
                        type: "heading",
                        level: 3,
                        content: "99.9%",
                        components: [
                          {
                            id: "stat-3-number-typography",
                            type: "typography",
                            config: {
                              fontSize: "2.5rem",
                              fontWeight: "bold",
                              color: "primary",
                              marginBottom: "0.5rem",
                            },
                          },
                        ],
                      },
                      {
                        id: "stat-3-label",
                        type: "paragraph",
                        content: "Uptime",
                        components: [
                          {
                            id: "stat-3-label-typography",
                            type: "typography",
                            config: {
                              color: "gray-600",
                              fontSize: "1rem",
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
    ],
  },
}

export default aboutScene

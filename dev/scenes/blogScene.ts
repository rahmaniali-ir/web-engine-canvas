import { Scene } from "../../src/types"

const blogScene: Scene = {
  id: "blog",
  name: "Blog",
  path: "/blog",
  root: {
    id: "blog-root",
    type: "div",
    components: [
      {
        id: "blog-root-mesh",
        type: "mesh",
        config: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      },
      {
        id: "blog-root-material",
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
        id: "blog-header-section",
        type: "div",
        components: [
          {
            id: "blog-header-mesh",
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
            id: "blog-header-padding",
            type: "padding",
            config: {
              padding: "8rem 2rem 6rem 2rem",
            },
          },
          {
            id: "blog-header-material",
            type: "material",
            config: {
              backgroundImage: "blog-bg",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            },
          },
          {
            id: "blog-header-typography",
            type: "typography",
            config: {
              color: "white",
              textAlign: "center",
            },
          },
        ],
        children: [
          {
            id: "blog-title",
            type: "heading",
            level: 1,
            content: "Blog",
            components: [
              {
                id: "blog-title-typography",
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
            id: "blog-subtitle",
            type: "paragraph",
            content:
              "Latest insights, tutorials, and updates from the WebEngine Canvas team.",
            components: [
              {
                id: "blog-subtitle-typography",
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
        id: "blog-posts-section",
        type: "div",
        components: [
          {
            id: "blog-posts-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "blog-posts-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
        ],
        children: [
          {
            id: "blog-posts-title",
            type: "heading",
            level: 2,
            content: "Latest Posts",
            components: [
              {
                id: "blog-posts-title-typography",
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
            id: "blog-posts-subtitle",
            type: "paragraph",
            content:
              "Discover tips, tricks, and insights from our development team",
            components: [
              {
                id: "blog-posts-subtitle-typography",
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
            id: "blog-posts-grid",
            type: "div",
            components: [
              {
                id: "blog-posts-grid-mesh",
                type: "mesh",
                config: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "2rem",
                  width: "100%",
                  maxWidth: "1200px",
                },
              },
            ],
            children: [
              {
                id: "blog-post-1",
                type: "div",
                components: [
                  {
                    id: "blog-post-1-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  },
                  {
                    id: "blog-post-1-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "blog-post-1-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "blog-post-1-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                  {
                    id: "blog-post-1-overflow",
                    type: "css",
                    config: {
                      overflow: "hidden",
                    },
                  },
                ],
                children: [
                  {
                    id: "blog-post-1-image",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-1-image-mesh",
                        type: "mesh",
                        config: {
                          height: "200px",
                          width: "100%",
                        },
                      },
                      {
                        id: "blog-post-1-image-material",
                        type: "material",
                        config: {
                          background: "primary-gradient",
                        },
                      },
                    ],
                  },
                  {
                    id: "blog-post-1-content",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-1-content-padding",
                        type: "padding",
                        config: {
                          padding: "2rem",
                        },
                      },
                      {
                        id: "blog-post-1-content-mesh",
                        type: "mesh",
                        config: {
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "blog-post-1-date",
                        type: "paragraph",
                        content: "December 15, 2024",
                        components: [
                          {
                            id: "blog-post-1-date-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.875rem",
                              color: "gray-500",
                              marginBottom: "0.5rem",
                            },
                          },
                        ],
                      },
                      {
                        id: "blog-post-1-title",
                        type: "heading",
                        level: 3,
                        content: "Introducing WebEngine Canvas 2.0",
                        components: [
                          {
                            id: "blog-post-1-title-typography",
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
                        id: "blog-post-1-excerpt",
                        type: "paragraph",
                        content:
                          "We're excited to announce the release of WebEngine Canvas 2.0, featuring improved performance, new components, and enhanced developer experience.",
                        components: [
                          {
                            id: "blog-post-1-excerpt-typography",
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
                        id: "blog-post-1-link",
                        type: "link",
                        content: "Read More →",
                        href: "#post-1",
                        components: [
                          {
                            id: "blog-post-1-link-typography",
                            type: "typography",
                            config: {
                              color: "primary",
                              fontWeight: "600",
                            },
                          },
                          {
                            id: "blog-post-1-link-interaction",
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
              {
                id: "blog-post-2",
                type: "div",
                components: [
                  {
                    id: "blog-post-2-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  },
                  {
                    id: "blog-post-2-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "blog-post-2-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                  {
                    id: "blog-post-2-shadow",
                    type: "boxShadow",
                    config: {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  },
                  {
                    id: "blog-post-2-overflow",
                    type: "css",
                    config: {
                      overflow: "hidden",
                    },
                  },
                ],
                children: [
                  {
                    id: "blog-post-2-image",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-2-image-mesh",
                        type: "mesh",
                        config: {
                          height: "200px",
                          width: "100%",
                        },
                      },
                      {
                        id: "blog-post-2-image-material",
                        type: "material",
                        config: {
                          background: "cta-gradient",
                        },
                      },
                    ],
                  },
                  {
                    id: "blog-post-2-content",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-2-content-padding",
                        type: "padding",
                        config: {
                          padding: "2rem",
                        },
                      },
                      {
                        id: "blog-post-2-content-mesh",
                        type: "mesh",
                        config: {
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "blog-post-2-date",
                        type: "paragraph",
                        content: "December 10, 2024",
                        components: [
                          {
                            id: "blog-post-2-date-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.875rem",
                              color: "gray-500",
                              marginBottom: "0.5rem",
                            },
                          },
                        ],
                      },
                      {
                        id: "blog-post-2-title",
                        type: "heading",
                        level: 3,
                        content: "Building Responsive Layouts",
                        components: [
                          {
                            id: "blog-post-2-title-typography",
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
                        id: "blog-post-2-excerpt",
                        type: "paragraph",
                        content:
                          "Learn how to create beautiful, responsive layouts using WebEngine Canvas components and CSS Grid. Tips and best practices for modern web design.",
                        components: [
                          {
                            id: "blog-post-2-excerpt-typography",
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
                        id: "blog-post-2-link",
                        type: "link",
                        content: "Read More →",
                        href: "#post-2",
                        components: [
                          {
                            id: "blog-post-2-link-typography",
                            type: "typography",
                            config: {
                              color: "primary",
                              fontWeight: "600",
                            },
                          },
                          {
                            id: "blog-post-2-link-interaction",
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
              {
                id: "blog-post-3",
                type: "div",
                prefabId: "blog-post",
                prefabVariantId: "compact",
                prefabParameters: {
                  title: "Performance Optimization Tips",
                  excerpt:
                    "Discover techniques to optimize your WebEngine Canvas applications for better performance and user experience. From lazy loading to code splitting.",
                  category: "Performance",
                  date: "December 5, 2024",
                  author: "Mike Chen",
                  imageUrl:
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                },
              },
            ],
          },
        ],
      },
      {
        id: "blog-variants-demo-section",
        type: "div",
        components: [
          {
            id: "blog-variants-demo-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "blog-variants-demo-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
          {
            id: "blog-variants-demo-material",
            type: "material",
            config: {
              backgroundColor: "white",
            },
          },
        ],
        children: [
          {
            id: "blog-variants-demo-title",
            type: "heading",
            level: 2,
            content: "Blog Post Variants Demo",
            components: [
              {
                id: "blog-variants-demo-title-typography",
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
            id: "blog-variants-demo-subtitle",
            type: "paragraph",
            content:
              "See how the same blog post content can be displayed in different layouts using prefab variants",
            components: [
              {
                id: "blog-variants-demo-subtitle-typography",
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
            id: "blog-variants-container",
            type: "div",
            components: [
              {
                id: "blog-variants-container-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "3rem",
                  width: "100%",
                  maxWidth: "1200px",
                },
              },
            ],
            children: [
              {
                id: "featured-variant-demo",
                type: "div",
                components: [
                  {
                    id: "featured-variant-demo-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "featured-variant-label",
                    type: "heading",
                    level: 3,
                    content: "Featured Variant",
                    components: [
                      {
                        id: "featured-variant-label-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          color: "gray-700",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "featured-blog-post",
                    type: "div",
                    prefabId: "blog-post",
                    prefabVariantId: "featured",
                    prefabParameters: {
                      title: "WebEngine Canvas: A New Era of Web Development",
                      excerpt:
                        "Discover how component-based architecture is changing the web development landscape. Learn about the latest features, best practices, and real-world applications that make WebEngine Canvas the go-to solution for modern web applications.",
                      category: "Technology",
                      date: "March 15, 2024",
                      author: "Sarah Johnson",
                      imageUrl:
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    },
                  },
                ],
              },
              {
                id: "compact-variant-demo",
                type: "div",
                components: [
                  {
                    id: "compact-variant-demo-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "compact-variant-label",
                    type: "heading",
                    level: 3,
                    content: "Compact Variant",
                    components: [
                      {
                        id: "compact-variant-label-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          color: "gray-700",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "compact-blog-post",
                    type: "div",
                    prefabId: "blog-post",
                    prefabVariantId: "compact",
                    prefabParameters: {
                      title: "WebEngine Canvas: A New Era of Web Development",
                      excerpt:
                        "Discover how component-based architecture is changing the web development landscape. Learn about the latest features, best practices, and real-world applications.",
                      category: "Technology",
                      date: "March 15, 2024",
                      author: "Sarah Johnson",
                      imageUrl:
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                    },
                  },
                ],
              },
              {
                id: "minimal-variant-demo",
                type: "div",
                components: [
                  {
                    id: "minimal-variant-demo-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "minimal-variant-label",
                    type: "heading",
                    level: 3,
                    content: "Minimal Variant",
                    components: [
                      {
                        id: "minimal-variant-label-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          color: "gray-700",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "minimal-blog-post",
                    type: "div",
                    prefabId: "blog-post",
                    prefabVariantId: "minimal",
                    prefabParameters: {
                      title: "WebEngine Canvas: A New Era of Web Development",
                      excerpt:
                        "Discover how component-based architecture is changing the web development landscape. Learn about the latest features, best practices, and real-world applications that make WebEngine Canvas the go-to solution for modern web applications.",
                      category: "Technology",
                      date: "March 15, 2024",
                      author: "Sarah Johnson",
                    },
                  },
                ],
              },
              {
                id: "card-variant-demo",
                type: "div",
                components: [
                  {
                    id: "card-variant-demo-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "card-variant-label",
                    type: "heading",
                    level: 3,
                    content: "Card Variant",
                    components: [
                      {
                        id: "card-variant-label-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          color: "gray-700",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "card-blog-post",
                    type: "div",
                    prefabId: "blog-post",
                    prefabVariantId: "card",
                    prefabParameters: {
                      title: "WebEngine Canvas: A New Era of Web Development",
                      excerpt:
                        "Discover how component-based architecture is changing the web development landscape. Learn about the latest features, best practices, and real-world applications.",
                      category: "Technology",
                      date: "March 15, 2024",
                      author: "Sarah Johnson",
                      imageUrl:
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "blog-newsletter-section",
        type: "div",
        components: [
          {
            id: "blog-newsletter-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            },
          },
          {
            id: "blog-newsletter-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
          {
            id: "blog-newsletter-material",
            type: "material",
            config: {
              background: "cta-gradient",
            },
          },
          {
            id: "blog-newsletter-typography",
            type: "typography",
            config: {
              color: "white",
              textAlign: "center",
            },
          },
        ],
        children: [
          {
            id: "blog-newsletter-title",
            type: "heading",
            level: 2,
            content: "Stay Updated",
            components: [
              {
                id: "blog-newsletter-title-typography",
                type: "typography",
                config: {
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "white",
                },
              },
            ],
          },
          {
            id: "blog-newsletter-subtitle",
            type: "paragraph",
            content:
              "Subscribe to our newsletter for the latest updates and insights",
            components: [
              {
                id: "blog-newsletter-subtitle-typography",
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
            id: "newsletter-form",
            type: "div",
            components: [
              {
                id: "newsletter-form-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  gap: "1rem",
                  width: "100%",
                  maxWidth: "500px",
                },
              },
            ],
            children: [
              {
                id: "newsletter-email",
                type: "input",
                inputType: "email",
                placeholder: "Enter your email",
                components: [
                  {
                    id: "newsletter-email-mesh",
                    type: "mesh",
                    config: {
                      flex: "1",
                    },
                  },
                  {
                    id: "newsletter-email-padding",
                    type: "padding",
                    config: {
                      padding: "1rem",
                    },
                  },
                  {
                    id: "newsletter-email-border",
                    type: "border",
                    config: {
                      border: "none",
                    },
                  },
                  {
                    id: "newsletter-email-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "0.5rem",
                    },
                  },
                  {
                    id: "newsletter-email-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                    },
                  },
                ],
              },
              {
                id: "newsletter-subscribe",
                type: "button",
                content: "Subscribe",
                components: [
                  {
                    id: "newsletter-subscribe-padding",
                    type: "padding",
                    config: {
                      padding: "1rem 2rem",
                    },
                  },
                  {
                    id: "newsletter-subscribe-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "newsletter-subscribe-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "primary",
                    },
                  },
                  {
                    id: "newsletter-subscribe-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "0.5rem",
                    },
                  },
                  {
                    id: "newsletter-subscribe-interaction",
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
}

export default blogScene

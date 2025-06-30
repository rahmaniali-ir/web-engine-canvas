import { Manifest } from "../src/types"
import mainScene from "./scenes/mainScene"
import aboutScene from "./scenes/aboutScene"
import contactScene from "./scenes/contactScene"
import docsScene from "./scenes/docsScene"
import blogScene from "./scenes/blogScene"

export const sampleManifest: Manifest = {
  id: "webengine-landing",
  name: "WebEngine Canvas Landing Page",
  version: "1.0.0",
  description:
    "A comprehensive landing page showcasing WebEngine Canvas capabilities",
  tags: ["landing-page", "web-engine", "canvas", "components"],

  assets: new Map([
    [
      "primary",
      {
        id: "primary",
        name: "Primary Color",
        type: "stylePalette",
        path: "colors/primary",
        paletteType: "color",
        values: { primary: "#3B82F6" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "white",
      {
        id: "white",
        name: "White Color",
        type: "stylePalette",
        path: "colors/white",
        paletteType: "color",
        values: { white: "#FFFFFF" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "gray-50",
      {
        id: "gray-50",
        name: "Gray 50",
        type: "stylePalette",
        path: "colors/gray",
        paletteType: "color",
        values: { "gray-50": "#F9FAFB" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "gray-600",
      {
        id: "gray-600",
        name: "Gray 600",
        type: "stylePalette",
        path: "colors/gray",
        paletteType: "color",
        values: { "gray-600": "#4B5563" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "gray-700",
      {
        id: "gray-700",
        name: "Gray 700",
        type: "stylePalette",
        path: "colors/gray",
        paletteType: "color",
        values: { "gray-700": "#374151" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "gray-800",
      {
        id: "gray-800",
        name: "Gray 800",
        type: "stylePalette",
        path: "colors/gray",
        paletteType: "color",
        values: { "gray-800": "#1F2937" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "gray-500",
      {
        id: "gray-500",
        name: "Gray 500",
        type: "stylePalette",
        path: "colors/gray",
        paletteType: "color",
        values: { "gray-500": "#6B7280" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "gray-300",
      {
        id: "gray-300",
        name: "Gray 300",
        type: "stylePalette",
        path: "colors/gray",
        paletteType: "color",
        values: { "gray-300": "#D1D5DB" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "primary-gradient",
      {
        id: "primary-gradient",
        name: "Primary Gradient",
        type: "stylePalette",
        path: "gradients",
        paletteType: "gradient",
        values: {
          "primary-gradient":
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "cta-gradient",
      {
        id: "cta-gradient",
        name: "CTA Gradient",
        type: "stylePalette",
        path: "gradients",
        paletteType: "gradient",
        values: {
          "cta-gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    // Background Images for Scene Headers
    [
      "hero-bg",
      {
        id: "hero-bg",
        name: "Hero Background",
        type: "resource",
        resourceType: "image",
        path: "images/backgrounds",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        mimeType: "image/jpeg",
        description: "Abstract technology background for main hero section",
        tags: ["background", "hero", "technology", "abstract"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "about-bg",
      {
        id: "about-bg",
        name: "About Background",
        type: "resource",
        resourceType: "image",
        path: "images/backgrounds",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
        mimeType: "image/jpeg",
        description: "Team collaboration background for about section",
        tags: ["background", "about", "team", "collaboration"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "contact-bg",
      {
        id: "contact-bg",
        name: "Contact Background",
        type: "resource",
        resourceType: "image",
        path: "images/backgrounds",
        url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        mimeType: "image/jpeg",
        description: "Modern office workspace background for contact section",
        tags: ["background", "contact", "office", "workspace"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "docs-bg",
      {
        id: "docs-bg",
        name: "Documentation Background",
        type: "resource",
        resourceType: "image",
        path: "images/backgrounds",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        mimeType: "image/jpeg",
        description: "Code and documentation background for docs section",
        tags: ["background", "docs", "code", "documentation"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "blog-bg",
      {
        id: "blog-bg",
        name: "Blog Background",
        type: "resource",
        resourceType: "image",
        path: "images/backgrounds",
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        mimeType: "image/jpeg",
        description: "Creative writing and blog background for blog section",
        tags: ["background", "blog", "writing", "creative"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    [
      "star-svg",
      {
        id: "star-svg",
        name: "Simple Star SVG",
        type: "resource",
        resourceType: "image",
        path: "images/icons",
        url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><polygon points='16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12'/></svg>",
        mimeType: "image/svg+xml",
        description: "Simple gold star SVG",
        tags: ["icon", "star", "svg"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    // Star Animation Assets
    [
      "star-twinkle",
      {
        id: "star-twinkle",
        name: "Star Twinkle Animation",
        type: "animation" as const,
        path: "animations/stars",
        description: "Twinkling animation for stars",
        tags: ["animation", "star", "twinkle", "effect"],
        animationType: "keyframe" as const,
        duration: 4000,
        easing: "ease-in-out",
        loop: true,
        loopCount: -1,
        direction: "alternate" as const,
        keyframeAnimations: {
          opacity: {
            from: 0.0,
            to: 0.7,
            duration: 4000,
            easing: "ease-in-out",
          },
          scale: {
            from: 0.8,
            to: 1.2,
            duration: 4000,
            easing: "ease-in-out",
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any,
    ],
  ]),

  prefabs: [
    {
      id: "navbar",
      name: "Navigation Bar",
      description: "Main navigation bar with logo and links",
      version: "1.0.0",
      template: {
        id: "navbar",
        type: "div",
        components: [
          {
            id: "navbar-mesh",
            type: "mesh",
            config: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: "0",
              zIndex: "1000",
            },
          },
          {
            id: "navbar-padding",
            type: "padding",
            config: {
              padding: "1rem 2rem",
            },
          },
          {
            id: "navbar-material",
            type: "material",
            config: {
              backgroundColor: "white",
            },
          },
          {
            id: "navbar-shadow",
            type: "boxShadow",
            config: {
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            },
          },
        ],
        children: [
          {
            id: "navbar-logo",
            type: "link",
            routerLink: "/",
            content: "WebEngine Canvas",
            components: [
              {
                id: "navbar-logo-typography",
                type: "typography",
                config: {
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                },
              },
            ],
          },
          {
            id: "navbar-links",
            type: "div",
            components: [
              {
                id: "navbar-links-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  gap: "2rem",
                  alignItems: "center",
                },
              },
            ],
            children: [
              {
                id: "nav-home",
                type: "link",
                routerLink: "/",
                content: "Home",
                components: [
                  {
                    id: "nav-home-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      color: "gray-700",
                      fontWeight: "500",
                    },
                  },
                ],
              },
              {
                id: "nav-about",
                type: "link",
                routerLink: "/about",
                content: "About",
                components: [
                  {
                    id: "nav-about-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      color: "gray-700",
                      fontWeight: "500",
                    },
                  },
                ],
              },
              {
                id: "nav-contact",
                type: "link",
                routerLink: "/contact",
                content: "Contact",
                components: [
                  {
                    id: "nav-contact-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      color: "gray-700",
                      fontWeight: "500",
                    },
                  },
                ],
              },
              {
                id: "nav-docs",
                type: "link",
                routerLink: "/docs",
                content: "Docs",
                components: [
                  {
                    id: "nav-docs-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      color: "gray-700",
                      fontWeight: "500",
                    },
                  },
                ],
              },
              {
                id: "nav-blog",
                type: "link",
                routerLink: "/blog",
                content: "Blog",
                components: [
                  {
                    id: "nav-blog-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      color: "gray-700",
                      fontWeight: "500",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      parameters: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "blog-post",
      name: "Blog Post",
      description: "Blog post component with multiple layout variants",
      version: "1.0.0",
      defaultVariantId: "featured",
      variants: [
        {
          id: "featured",
          name: "Featured Post",
          description:
            "Large featured blog post with prominent image and typography",
          template: {
            id: "blog-post-featured",
            type: "article",
            components: [
              {
                id: "blog-post-featured-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "800px",
                  margin: "0 auto",
                },
              },
              {
                id: "blog-post-featured-padding",
                type: "padding",
                config: {
                  padding: "2rem",
                },
              },
              {
                id: "blog-post-featured-material",
                type: "material",
                config: {
                  backgroundColor: "white",
                },
              },
              {
                id: "blog-post-featured-border-radius",
                type: "borderRadius",
                config: {
                  borderRadius: "12px",
                },
              },
              {
                id: "blog-post-featured-shadow",
                type: "boxShadow",
                config: {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
              },
            ],
            children: [
              {
                id: "blog-post-featured-image",
                type: "img",
                src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                alt: "Blog post featured image",
                components: [
                  {
                    id: "blog-post-featured-image-mesh",
                    type: "mesh",
                    config: {
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    },
                  },
                  {
                    id: "blog-post-featured-image-border-radius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "8px 8px 0 0",
                    },
                  },
                ],
              },
              {
                id: "blog-post-featured-content",
                type: "div",
                components: [
                  {
                    id: "blog-post-featured-content-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  },
                  {
                    id: "blog-post-featured-content-padding",
                    type: "padding",
                    config: {
                      padding: "1.5rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "blog-post-featured-meta",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-featured-meta-mesh",
                        type: "mesh",
                        config: {
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "0.5rem",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "blog-post-featured-category",
                        type: "span",
                        content: "Technology",
                        components: [
                          {
                            id: "blog-post-featured-category-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.875rem",
                              color: "primary",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            },
                          },
                        ],
                      },
                      {
                        id: "blog-post-featured-date",
                        type: "span",
                        content: "March 15, 2024",
                        components: [
                          {
                            id: "blog-post-featured-date-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.875rem",
                              color: "gray-500",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "blog-post-featured-title",
                    type: "h2",
                    content:
                      "Building Modern Web Applications with WebEngine Canvas",
                    components: [
                      {
                        id: "blog-post-featured-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "2rem",
                          fontWeight: "700",
                          color: "gray-800",
                          lineHeight: "1.2",
                          marginBottom: "1rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "blog-post-featured-excerpt",
                    type: "p",
                    content:
                      "Discover how WebEngine Canvas revolutionizes web development with its component-based architecture and powerful prefab system. Learn about the latest features and best practices for building scalable applications.",
                    components: [
                      {
                        id: "blog-post-featured-excerpt-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.125rem",
                          color: "gray-600",
                          lineHeight: "1.6",
                          marginBottom: "1.5rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "blog-post-featured-author",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-featured-author-mesh",
                        type: "mesh",
                        config: {
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "blog-post-featured-author-avatar",
                        type: "img",
                        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
                        alt: "Author avatar",
                        components: [
                          {
                            id: "blog-post-featured-author-avatar-mesh",
                            type: "mesh",
                            config: {
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            },
                          },
                        ],
                      },
                      {
                        id: "blog-post-featured-author-info",
                        type: "div",
                        components: [
                          {
                            id: "blog-post-featured-author-info-mesh",
                            type: "mesh",
                            config: {
                              display: "flex",
                              flexDirection: "column",
                            },
                          },
                        ],
                        children: [
                          {
                            id: "blog-post-featured-author-name",
                            type: "span",
                            content: "Sarah Johnson",
                            components: [
                              {
                                id: "blog-post-featured-author-name-typography",
                                type: "typography",
                                config: {
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                  color: "gray-800",
                                },
                              },
                            ],
                          },
                          {
                            id: "blog-post-featured-author-title",
                            type: "span",
                            content: "Senior Developer",
                            components: [
                              {
                                id: "blog-post-featured-author-title-typography",
                                type: "typography",
                                config: {
                                  fontSize: "0.75rem",
                                  color: "gray-500",
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
          properties: {
            layout: "featured",
            imageSize: "large",
            typography: "prominent",
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "compact",
          name: "Compact Post",
          description:
            "Compact blog post for list views with smaller image and condensed layout",
          template: {
            id: "blog-post-compact",
            type: "article",
            components: [
              {
                id: "blog-post-compact-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  gap: "1rem",
                  maxWidth: "100%",
                },
              },
              {
                id: "blog-post-compact-padding",
                type: "padding",
                config: {
                  padding: "1rem",
                },
              },
              {
                id: "blog-post-compact-material",
                type: "material",
                config: {
                  backgroundColor: "white",
                },
              },
              {
                id: "blog-post-compact-border-radius",
                type: "borderRadius",
                config: {
                  borderRadius: "8px",
                },
              },
              {
                id: "blog-post-compact-shadow",
                type: "boxShadow",
                config: {
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                },
              },
            ],
            children: [
              {
                id: "blog-post-compact-image",
                type: "img",
                src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                alt: "Blog post thumbnail",
                components: [
                  {
                    id: "blog-post-compact-image-mesh",
                    type: "mesh",
                    config: {
                      width: "120px",
                      height: "80px",
                      objectFit: "cover",
                      flexShrink: "0",
                    },
                  },
                  {
                    id: "blog-post-compact-image-border-radius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "6px",
                    },
                  },
                ],
              },
              {
                id: "blog-post-compact-content",
                type: "div",
                components: [
                  {
                    id: "blog-post-compact-content-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      flex: "1",
                      gap: "0.5rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "blog-post-compact-meta",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-compact-meta-mesh",
                        type: "mesh",
                        config: {
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "blog-post-compact-category",
                        type: "span",
                        content: "Technology",
                        components: [
                          {
                            id: "blog-post-compact-category-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.75rem",
                              color: "primary",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            },
                          },
                        ],
                      },
                      {
                        id: "blog-post-compact-date",
                        type: "span",
                        content: "Mar 15, 2024",
                        components: [
                          {
                            id: "blog-post-compact-date-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.75rem",
                              color: "gray-500",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "blog-post-compact-title",
                    type: "h3",
                    content:
                      "Building Modern Web Applications with WebEngine Canvas",
                    components: [
                      {
                        id: "blog-post-compact-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "gray-800",
                          lineHeight: "1.3",
                          marginBottom: "0.5rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "blog-post-compact-excerpt",
                    type: "p",
                    content:
                      "Discover how WebEngine Canvas revolutionizes web development with its component-based architecture...",
                    components: [
                      {
                        id: "blog-post-compact-excerpt-typography",
                        type: "typography",
                        config: {
                          fontSize: "0.875rem",
                          color: "gray-600",
                          lineHeight: "1.4",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          properties: {
            layout: "compact",
            imageSize: "small",
            typography: "condensed",
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "minimal",
          name: "Minimal Post",
          description:
            "Minimal blog post without image, focused on typography and content",
          template: {
            id: "blog-post-minimal",
            type: "article",
            components: [
              {
                id: "blog-post-minimal-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "600px",
                },
              },
              {
                id: "blog-post-minimal-padding",
                type: "padding",
                config: {
                  padding: "1.5rem",
                },
              },
              {
                id: "blog-post-minimal-material",
                type: "material",
                config: {
                  backgroundColor: "gray-50",
                },
              },
              {
                id: "blog-post-minimal-border-radius",
                type: "borderRadius",
                config: {
                  borderRadius: "6px",
                },
              },
            ],
            children: [
              {
                id: "blog-post-minimal-meta",
                type: "div",
                components: [
                  {
                    id: "blog-post-minimal-meta-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "blog-post-minimal-category",
                    type: "span",
                    content: "Technology",
                    components: [
                      {
                        id: "blog-post-minimal-category-typography",
                        type: "typography",
                        config: {
                          fontSize: "0.875rem",
                          color: "primary",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        },
                      },
                    ],
                  },
                  {
                    id: "blog-post-minimal-date",
                    type: "span",
                    content: "March 15, 2024",
                    components: [
                      {
                        id: "blog-post-minimal-date-typography",
                        type: "typography",
                        config: {
                          fontSize: "0.875rem",
                          color: "gray-500",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "blog-post-minimal-title",
                type: "h2",
                content:
                  "Building Modern Web Applications with WebEngine Canvas",
                components: [
                  {
                    id: "blog-post-minimal-title-typography",
                    type: "typography",
                    config: {
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "gray-800",
                      lineHeight: "1.3",
                      marginBottom: "1rem",
                    },
                  },
                ],
              },
              {
                id: "blog-post-minimal-excerpt",
                type: "p",
                content:
                  "Discover how WebEngine Canvas revolutionizes web development with its component-based architecture and powerful prefab system. Learn about the latest features and best practices for building scalable applications.",
                components: [
                  {
                    id: "blog-post-minimal-excerpt-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      color: "gray-600",
                      lineHeight: "1.6",
                      marginBottom: "1rem",
                    },
                  },
                ],
              },
              {
                id: "blog-post-minimal-author",
                type: "div",
                components: [
                  {
                    id: "blog-post-minimal-author-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "blog-post-minimal-author-name",
                    type: "span",
                    content: "By Sarah Johnson",
                    components: [
                      {
                        id: "blog-post-minimal-author-name-typography",
                        type: "typography",
                        config: {
                          fontSize: "0.875rem",
                          color: "gray-700",
                          fontWeight: "500",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          properties: {
            layout: "minimal",
            imageSize: "none",
            typography: "clean",
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "card",
          name: "Card Post",
          description:
            "Card-style blog post with hover effects and modern design",
          template: {
            id: "blog-post-card",
            type: "article",
            components: [
              {
                id: "blog-post-card-mesh",
                type: "mesh",
                config: {
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "350px",
                  cursor: "pointer",
                },
              },
              {
                id: "blog-post-card-padding",
                type: "padding",
                config: {
                  padding: "0",
                },
              },
              {
                id: "blog-post-card-material",
                type: "material",
                config: {
                  backgroundColor: "white",
                },
              },
              {
                id: "blog-post-card-border-radius",
                type: "borderRadius",
                config: {
                  borderRadius: "12px",
                },
              },
              {
                id: "blog-post-card-shadow",
                type: "boxShadow",
                config: {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
              },
              {
                id: "blog-post-card-transition",
                type: "transition",
                config: {
                  transition: "all 0.3s ease",
                },
              },
            ],
            children: [
              {
                id: "blog-post-card-image",
                type: "img",
                src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                alt: "Blog post card image",
                components: [
                  {
                    id: "blog-post-card-image-mesh",
                    type: "mesh",
                    config: {
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    },
                  },
                  {
                    id: "blog-post-card-image-border-radius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "12px 12px 0 0",
                    },
                  },
                ],
              },
              {
                id: "blog-post-card-content",
                type: "div",
                components: [
                  {
                    id: "blog-post-card-content-mesh",
                    type: "mesh",
                    config: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    },
                  },
                  {
                    id: "blog-post-card-content-padding",
                    type: "padding",
                    config: {
                      padding: "1.25rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "blog-post-card-meta",
                    type: "div",
                    components: [
                      {
                        id: "blog-post-card-meta-mesh",
                        type: "mesh",
                        config: {
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        },
                      },
                    ],
                    children: [
                      {
                        id: "blog-post-card-category",
                        type: "span",
                        content: "Technology",
                        components: [
                          {
                            id: "blog-post-card-category-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.75rem",
                              color: "primary",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            },
                          },
                        ],
                      },
                      {
                        id: "blog-post-card-date",
                        type: "span",
                        content: "Mar 15",
                        components: [
                          {
                            id: "blog-post-card-date-typography",
                            type: "typography",
                            config: {
                              fontSize: "0.75rem",
                              color: "gray-500",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "blog-post-card-title",
                    type: "h3",
                    content:
                      "Building Modern Web Applications with WebEngine Canvas",
                    components: [
                      {
                        id: "blog-post-card-title-typography",
                        type: "typography",
                        config: {
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          color: "gray-800",
                          lineHeight: "1.3",
                          marginBottom: "0.5rem",
                        },
                      },
                    ],
                  },
                  {
                    id: "blog-post-card-excerpt",
                    type: "p",
                    content:
                      "Discover how WebEngine Canvas revolutionizes web development with its component-based architecture...",
                    components: [
                      {
                        id: "blog-post-card-excerpt-typography",
                        type: "typography",
                        config: {
                          fontSize: "0.875rem",
                          color: "gray-600",
                          lineHeight: "1.5",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          properties: {
            layout: "card",
            imageSize: "medium",
            typography: "modern",
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      parameters: [
        {
          id: "title",
          name: "Title",
          type: "string",
          required: true,
          defaultValue: "Blog Post Title",
        },
        {
          id: "excerpt",
          name: "Excerpt",
          type: "string",
          required: false,
          defaultValue: "Blog post excerpt...",
        },
        {
          id: "category",
          name: "Category",
          type: "string",
          required: false,
          defaultValue: "Technology",
        },
        {
          id: "date",
          name: "Date",
          type: "string",
          required: false,
          defaultValue: "March 15, 2024",
        },
        {
          id: "author",
          name: "Author",
          type: "string",
          required: false,
          defaultValue: "Sarah Johnson",
        },
        {
          id: "imageUrl",
          name: "Image URL",
          type: "string",
          required: false,
          defaultValue:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "star-small",
      name: "Small Star",
      type: "prefab" as const,
      path: "prefabs/stars",
      description: "Small twinkling star",
      tags: ["prefab", "star", "small", "twinkle"],
      template: {
        id: "star-small",
        type: "div",
        content: "★",
        components: [
          {
            id: "star-small-mesh",
            type: "mesh",
            config: {
              position: "absolute",
              width: "8px",
              height: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          {
            id: "star-small-material",
            type: "material",
            config: {
              color: "white",
              fontSize: "8px",
            },
          },
          {
            id: "star-small-animation",
            type: "animation",
            config: {
              animationId: "star-twinkle",
              loop: true,
              loopCount: -1,
              autoPlay: true,
              delay: 0,
            },
          },
        ],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any,
    {
      id: "star-medium",
      name: "Medium Star",
      type: "prefab" as const,
      path: "prefabs/stars",
      description: "Medium twinkling star",
      tags: ["prefab", "star", "medium", "twinkle"],
      template: {
        id: "star-medium",
        type: "div",
        content: "★",
        components: [
          {
            id: "star-medium-mesh",
            type: "mesh",
            config: {
              position: "absolute",
              width: "12px",
              height: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          {
            id: "star-medium-material",
            type: "material",
            config: {
              color: "white",
              fontSize: "12px",
            },
          },
          {
            id: "star-medium-animation",
            type: "animation",
            config: {
              animationId: "star-twinkle",
              loop: true,
              loopCount: -1,
              autoPlay: true,
              delay: 0,
            },
          },
        ],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any,
    {
      id: "star-large",
      name: "Large Star",
      type: "prefab" as const,
      path: "prefabs/stars",
      description: "Large twinkling star",
      tags: ["prefab", "star", "large", "twinkle"],
      template: {
        id: "star-large",
        type: "div",
        content: "★",
        components: [
          {
            id: "star-large-mesh",
            type: "mesh",
            config: {
              position: "absolute",
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          {
            id: "star-large-material",
            type: "material",
            config: {
              color: "white",
              fontSize: "16px",
            },
          },
          {
            id: "star-large-animation",
            type: "animation",
            config: {
              animationId: "star-twinkle",
              loop: true,
              loopCount: -1,
              autoPlay: true,
              delay: 0,
            },
          },
        ],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any,
  ],

  scenes: [mainScene, aboutScene, contactScene, docsScene, blogScene],

  routes: [
    {
      id: "main-route",
      path: "/",
      sceneId: "main",
    },
    {
      id: "about-route",
      path: "/about",
      sceneId: "about",
    },
    {
      id: "contact-route",
      path: "/contact",
      sceneId: "contact",
    },
    {
      id: "docs-route",
      path: "/docs",
      sceneId: "docs",
    },
    {
      id: "blog-route",
      path: "/blog",
      sceneId: "blog",
    },
  ],
}

export default sampleManifest

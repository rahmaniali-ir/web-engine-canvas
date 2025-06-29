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

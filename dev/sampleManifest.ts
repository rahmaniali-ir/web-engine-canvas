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

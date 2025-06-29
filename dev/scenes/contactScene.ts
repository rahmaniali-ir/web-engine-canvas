import { Scene } from "../../src/types"

const contactScene: Scene = {
  id: "contact",
  name: "Contact",
  path: "/contact",
  root: {
    id: "contact-root",
    type: "div",
    components: [
      {
        id: "contact-root-mesh",
        type: "mesh",
        config: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      },
      {
        id: "contact-root-material",
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
        id: "contact-header-section",
        type: "div",
        components: [
          {
            id: "contact-header-mesh",
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
            id: "contact-header-padding",
            type: "padding",
            config: {
              padding: "8rem 2rem 6rem 2rem",
            },
          },
          {
            id: "contact-header-material",
            type: "material",
            config: {
              background: "primary-gradient",
            },
          },
          {
            id: "contact-header-typography",
            type: "typography",
            config: {
              color: "white",
              textAlign: "center",
            },
          },
        ],
        children: [
          {
            id: "contact-title",
            type: "heading",
            level: 1,
            content: "Get in Touch",
            components: [
              {
                id: "contact-title-typography",
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
            id: "contact-subtitle",
            type: "paragraph",
            content:
              "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
            components: [
              {
                id: "contact-subtitle-typography",
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
        id: "contact-form-section",
        type: "div",
        components: [
          {
            id: "contact-form-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "contact-form-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
        ],
        children: [
          {
            id: "contact-form-title",
            type: "heading",
            level: 2,
            content: "Send us a Message",
            components: [
              {
                id: "contact-form-title-typography",
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
            id: "contact-form-subtitle",
            type: "paragraph",
            content: "Fill out the form below and we'll get back to you",
            components: [
              {
                id: "contact-form-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.125rem",
                  color: "gray-600",
                  marginBottom: "3rem",
                  textAlign: "center",
                  maxWidth: "500px",
                },
              },
            ],
          },
          {
            id: "contact-form",
            type: "div",
            components: [
              {
                id: "contact-form-container-mesh",
                type: "mesh",
                config: {
                  width: "100%",
                  maxWidth: "600px",
                },
              },
              {
                id: "contact-form-container-material",
                type: "material",
                config: {
                  backgroundColor: "white",
                },
              },
              {
                id: "contact-form-container-padding",
                type: "padding",
                config: {
                  padding: "3rem",
                },
              },
              {
                id: "contact-form-container-borderRadius",
                type: "borderRadius",
                config: {
                  borderRadius: "1rem",
                },
              },
              {
                id: "contact-form-container-shadow",
                type: "boxShadow",
                config: {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                },
              },
            ],
            children: [
              {
                id: "name-input",
                type: "input",
                inputType: "text",
                placeholder: "Your Name",
                required: true,
                components: [
                  {
                    id: "name-input-mesh",
                    type: "mesh",
                    config: {
                      width: "100%",
                    },
                  },
                  {
                    id: "name-input-padding",
                    type: "padding",
                    config: {
                      padding: "1rem",
                    },
                  },
                  {
                    id: "name-input-border",
                    type: "border",
                    config: {
                      border: "1px solid gray-300",
                    },
                  },
                  {
                    id: "name-input-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "0.5rem",
                    },
                  },
                  {
                    id: "name-input-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                    },
                  },
                  {
                    id: "name-input-margin",
                    type: "margin",
                    config: {
                      marginBottom: "1.5rem",
                    },
                  },
                ],
              },
              {
                id: "email-input",
                type: "input",
                inputType: "email",
                placeholder: "Your Email",
                required: true,
                components: [
                  {
                    id: "email-input-mesh",
                    type: "mesh",
                    config: {
                      width: "100%",
                    },
                  },
                  {
                    id: "email-input-padding",
                    type: "padding",
                    config: {
                      padding: "1rem",
                    },
                  },
                  {
                    id: "email-input-border",
                    type: "border",
                    config: {
                      border: "1px solid gray-300",
                    },
                  },
                  {
                    id: "email-input-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "0.5rem",
                    },
                  },
                  {
                    id: "email-input-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                    },
                  },
                  {
                    id: "email-input-margin",
                    type: "margin",
                    config: {
                      marginBottom: "1.5rem",
                    },
                  },
                ],
              },
              {
                id: "message-input",
                type: "div",
                content: "Your Message",
                components: [
                  {
                    id: "message-input-mesh",
                    type: "mesh",
                    config: {
                      width: "100%",
                      minHeight: "120px",
                      resize: "vertical",
                    },
                  },
                  {
                    id: "message-input-padding",
                    type: "padding",
                    config: {
                      padding: "1rem",
                    },
                  },
                  {
                    id: "message-input-border",
                    type: "border",
                    config: {
                      border: "1px solid gray-300",
                    },
                  },
                  {
                    id: "message-input-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "0.5rem",
                    },
                  },
                  {
                    id: "message-input-material",
                    type: "material",
                    config: {
                      backgroundColor: "white",
                    },
                  },
                  {
                    id: "message-input-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                    },
                  },
                  {
                    id: "message-input-margin",
                    type: "margin",
                    config: {
                      marginBottom: "2rem",
                    },
                  },
                ],
              },
              {
                id: "submit-button",
                type: "button",
                content: "Send Message",
                components: [
                  {
                    id: "submit-button-mesh",
                    type: "mesh",
                    config: {
                      width: "100%",
                    },
                  },
                  {
                    id: "submit-button-padding",
                    type: "padding",
                    config: {
                      padding: "1rem 2rem",
                    },
                  },
                  {
                    id: "submit-button-material",
                    type: "material",
                    config: {
                      backgroundColor: "primary",
                    },
                  },
                  {
                    id: "submit-button-typography",
                    type: "typography",
                    config: {
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "white",
                    },
                  },
                  {
                    id: "submit-button-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "0.5rem",
                    },
                  },
                  {
                    id: "submit-button-interaction",
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
        id: "contact-info-section",
        type: "div",
        components: [
          {
            id: "contact-info-mesh",
            type: "mesh",
            config: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            },
          },
          {
            id: "contact-info-padding",
            type: "padding",
            config: {
              padding: "6rem 2rem 6rem 2rem",
            },
          },
          {
            id: "contact-info-material",
            type: "material",
            config: {
              backgroundColor: "white",
            },
          },
        ],
        children: [
          {
            id: "contact-info-title",
            type: "heading",
            level: 2,
            content: "Contact Information",
            components: [
              {
                id: "contact-info-title-typography",
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
            id: "contact-info-subtitle",
            type: "paragraph",
            content: "Get in touch with us through any of these channels",
            components: [
              {
                id: "contact-info-subtitle-typography",
                type: "typography",
                config: {
                  fontSize: "1.125rem",
                  color: "gray-600",
                  marginBottom: "3rem",
                  textAlign: "center",
                  maxWidth: "500px",
                },
              },
            ],
          },
          {
            id: "contact-info-details",
            type: "div",
            components: [
              {
                id: "contact-info-details-mesh",
                type: "mesh",
                config: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem",
                  width: "100%",
                  maxWidth: "800px",
                },
              },
            ],
            children: [
              {
                id: "email-info",
                type: "div",
                components: [
                  {
                    id: "email-info-mesh",
                    type: "mesh",
                    config: {
                      textAlign: "center",
                    },
                  },
                  {
                    id: "email-info-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "email-info-material",
                    type: "material",
                    config: {
                      backgroundColor: "gray-50",
                    },
                  },
                  {
                    id: "email-info-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "email-info-title",
                    type: "heading",
                    level: 3,
                    content: "Email",
                    components: [
                      {
                        id: "email-info-title-typography",
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
                    id: "email-info-value",
                    type: "paragraph",
                    content: "hello@webenginecanvas.com",
                    components: [
                      {
                        id: "email-info-value-typography",
                        type: "typography",
                        config: {
                          fontSize: "1rem",
                          color: "gray-600",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "phone-info",
                type: "div",
                components: [
                  {
                    id: "phone-info-mesh",
                    type: "mesh",
                    config: {
                      textAlign: "center",
                    },
                  },
                  {
                    id: "phone-info-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "phone-info-material",
                    type: "material",
                    config: {
                      backgroundColor: "gray-50",
                    },
                  },
                  {
                    id: "phone-info-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "phone-info-title",
                    type: "heading",
                    level: 3,
                    content: "Phone",
                    components: [
                      {
                        id: "phone-info-title-typography",
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
                    id: "phone-info-value",
                    type: "paragraph",
                    content: "+1 (555) 123-4567",
                    components: [
                      {
                        id: "phone-info-value-typography",
                        type: "typography",
                        config: {
                          fontSize: "1rem",
                          color: "gray-600",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "address-info",
                type: "div",
                components: [
                  {
                    id: "address-info-mesh",
                    type: "mesh",
                    config: {
                      textAlign: "center",
                    },
                  },
                  {
                    id: "address-info-padding",
                    type: "padding",
                    config: {
                      padding: "2rem",
                    },
                  },
                  {
                    id: "address-info-material",
                    type: "material",
                    config: {
                      backgroundColor: "gray-50",
                    },
                  },
                  {
                    id: "address-info-borderRadius",
                    type: "borderRadius",
                    config: {
                      borderRadius: "1rem",
                    },
                  },
                ],
                children: [
                  {
                    id: "address-info-title",
                    type: "heading",
                    level: 3,
                    content: "Address",
                    components: [
                      {
                        id: "address-info-title-typography",
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
                    id: "address-info-value",
                    type: "paragraph",
                    content: "123 Web Street, Tech City, TC 12345",
                    components: [
                      {
                        id: "address-info-value-typography",
                        type: "typography",
                        config: {
                          fontSize: "1rem",
                          color: "gray-600",
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

export default contactScene

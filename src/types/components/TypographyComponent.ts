import { WebObjectComponent } from "../WebObjectComponent"

export interface TypographyComponent extends WebObjectComponent {
  type: "typography"
  config: {
    fontSize?: string
    fontWeight?: string | number
    fontFamily?: string
    textAlign?: "left" | "center" | "right" | "justify"
    textDecoration?: string
    color?: string
    lineHeight?: string | number
  }
}

import { WebObjectComponent } from "../WebObject"

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

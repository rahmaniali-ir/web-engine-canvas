import { WebObjectComponent } from "../WebObject"

export interface MeshComponent extends WebObjectComponent {
  type: "mesh"
  config: {
    display?: string
    position?: "static" | "relative" | "absolute" | "fixed" | "sticky"
    top?: string | number
    right?: string | number
    bottom?: string | number
    left?: string | number
    width?: string | number
    height?: string | number
    maxWidth?: string | number
    zIndex?: number
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse"
    justifyContent?:
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "space-evenly"
    alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline"
    gap?: string | number
    gridTemplateColumns?: string
  }
}

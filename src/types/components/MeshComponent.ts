import { WebObjectComponent } from "../WebObjectComponent"

export interface MeshComponent extends WebObjectComponent {
  type: "mesh"
  config: {
    display?: string
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
    justifyContent?:
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "space-evenly"
    alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline"
    gap?: string
    width?: string | number
    height?: string | number
    minWidth?: string | number
    minHeight?: string | number
    maxWidth?: string | number
    maxHeight?: string | number
    position?: "static" | "relative" | "absolute" | "fixed" | "sticky"
    top?: string | number
    left?: string | number
    right?: string | number
    bottom?: string | number
    zIndex?: number
    gridTemplateColumns?: string
  }
}

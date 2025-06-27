import { WebObjectComponent } from "../WebObject"

export interface BorderComponent extends WebObjectComponent {
  type: "border"
  config: {
    border?: string
    borderTop?: string
    borderRight?: string
    borderBottom?: string
    borderLeft?: string
  }
}

export interface BorderRadiusComponent extends WebObjectComponent {
  type: "borderRadius"
  config: {
    borderRadius?: string
    borderTopLeftRadius?: string
    borderTopRightRadius?: string
    borderBottomRightRadius?: string
    borderBottomLeftRadius?: string
  }
}

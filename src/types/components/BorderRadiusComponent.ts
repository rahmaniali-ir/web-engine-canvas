import { WebObjectComponent } from "../WebObject"

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

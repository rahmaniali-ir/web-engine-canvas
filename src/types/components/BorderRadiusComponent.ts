import { WebObjectComponent } from "../WebObjectComponent"

export interface BorderRadiusComponent extends WebObjectComponent {
  type: "borderRadius"
  config: {
    borderRadius?: string
    borderTopLeftRadius?: string
    borderTopRightRadius?: string
    borderBottomLeftRadius?: string
    borderBottomRightRadius?: string
  }
}

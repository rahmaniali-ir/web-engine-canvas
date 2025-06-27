import { WebObjectComponent } from "../WebObject"

export interface MaterialComponent extends WebObjectComponent {
  type: "material"
  config: {
    color?: string
    backgroundColor?: string
    background?: string
    opacity?: number
  }
}

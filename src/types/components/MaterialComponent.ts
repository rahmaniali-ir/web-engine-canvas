import { WebObjectComponent } from "../WebObjectComponent"

export interface MaterialComponent extends WebObjectComponent {
  type: "material"
  config: {
    backgroundColor?: string
    background?: string
    color?: string
    opacity?: number
    backdropFilter?: string
  }
}

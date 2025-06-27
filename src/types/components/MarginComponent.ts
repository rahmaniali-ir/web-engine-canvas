import { WebObjectComponent } from "../WebObjectComponent"

export interface MarginComponent extends WebObjectComponent {
  type: "margin"
  config: {
    margin?: string
    marginTop?: string
    marginRight?: string
    marginBottom?: string
    marginLeft?: string
  }
}

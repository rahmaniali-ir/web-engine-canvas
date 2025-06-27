import { WebObjectComponent } from "../WebObject"

export interface MarginComponent extends WebObjectComponent {
  type: "margin"
  config: {
    margin?: string
    marginTop?: string | number
    marginRight?: string | number
    marginBottom?: string | number
    marginLeft?: string | number
  }
}

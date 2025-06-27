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

export interface PaddingComponent extends WebObjectComponent {
  type: "padding"
  config: {
    padding?: string
    paddingTop?: string | number
    paddingRight?: string | number
    paddingBottom?: string | number
    paddingLeft?: string | number
  }
}

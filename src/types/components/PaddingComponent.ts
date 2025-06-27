import { WebObjectComponent } from "../WebObject"

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

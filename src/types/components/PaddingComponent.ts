import { WebObjectComponent } from "../WebObjectComponent"

export interface PaddingComponent extends WebObjectComponent {
  type: "padding"
  config: {
    padding?: string
    paddingTop?: string
    paddingRight?: string
    paddingBottom?: string
    paddingLeft?: string
  }
}

import { WebObjectComponent } from "../WebObjectComponent"

export interface BoxShadowComponent extends WebObjectComponent {
  type: "boxShadow"
  config: {
    boxShadow?: string
  }
}

import { WebObjectComponent } from "../WebObject"

export interface BoxShadowComponent extends WebObjectComponent {
  type: "boxShadow"
  config: {
    boxShadow?: string
  }
}

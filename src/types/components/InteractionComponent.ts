import { WebObjectComponent } from "../WebObject"

export interface InteractionComponent extends WebObjectComponent {
  type: "interaction"
  config: {
    cursor?: string
  }
}

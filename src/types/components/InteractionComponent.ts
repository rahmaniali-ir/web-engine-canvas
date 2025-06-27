import { WebObjectComponent } from "../WebObjectComponent"

export interface InteractionComponent extends WebObjectComponent {
  type: "interaction"
  config: {
    cursor?: string
    pointerEvents?: string
    userSelect?: string
  }
}

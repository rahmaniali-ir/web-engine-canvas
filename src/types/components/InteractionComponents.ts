import { WebObjectComponent } from "../WebObject"

export interface InteractionComponent extends WebObjectComponent {
  type: "interaction"
  config: {
    cursor?: string
  }
}

export interface TransitionComponent extends WebObjectComponent {
  type: "transition"
  config: {
    transition?: string
    transitionProperty?: string
    transitionDuration?: string
    transitionTimingFunction?: string
    transitionDelay?: string
  }
}

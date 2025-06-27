import { WebObjectComponent } from "../WebObject"

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

import { WebObjectComponent } from "../WebObjectComponent"

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

import { AssetValue } from "../Asset"

export interface AnimationComponent {
  id: string
  type: "animation"
  config: {
    // Animation asset reference
    animationId?: AssetValue<string>
    // State-based animations
    stateAnimations?: {
      [state: string]: AssetValue<string> // Animation asset ID for each state
    }
    // Animation settings
    duration?: number
    easing?: string
    delay?: number
    // Loop settings
    loop?: boolean
    loopCount?: number // -1 for infinite
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"
    // Auto-play settings
    autoPlay?: boolean
    autoPlayStates?: string[] // States that trigger auto-play
    // Pause/Resume
    pauseOnState?: string[] // States that pause the animation
    resumeOnState?: string[] // States that resume the animation
  }
}

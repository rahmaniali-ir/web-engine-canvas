import { AnimationAsset } from "../types/Asset"
import { AssetService } from "./AssetService"

export interface AnimationState {
  element: HTMLElement
  animationId: string
  isPlaying: boolean
  startTime: number
  duration: number
  currentTime: number
  loop: boolean
  loopCount: number
  currentLoop: number
  direction: "normal" | "reverse" | "alternate" | "alternate-reverse"
}

export class AnimationService {
  private elementAnimations: Map<HTMLElement, Map<string, Animation>> =
    new Map()
  private assetService: AssetService

  constructor(assetService: AssetService) {
    this.assetService = assetService
  }

  /**
   * Play animation on element
   */
  public playAnimation(
    element: HTMLElement,
    animationId: string,
    options: {
      loop?: boolean
      loopCount?: number
      direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"
      delay?: number
      duration?: number
    } = {}
  ) {
    const animationAsset = this.assetService.getAssetByType<AnimationAsset>(
      animationId,
      "animation"
    )

    if (!animationAsset) {
      console.error("AnimationService: Animation asset not found:", animationId)
      return
    }

    // Apply keyframe animations
    if (animationAsset.keyframeAnimations) {
      const animationOptions = {
        duration: options.duration || animationAsset.duration,
        easing: animationAsset.easing,
        iterations:
          options.loopCount === -1
            ? Infinity
            : options.loopCount || (options.loop ? Infinity : 1),
        direction: options.direction || animationAsset.direction || "normal",
        delay: options.delay || 0,
      }

      Object.entries(animationAsset.keyframeAnimations).forEach(
        ([property, keyframe]) => {
          const { from, to, duration, easing } = keyframe

          if (typeof from === "number" && typeof to === "number") {
            // Calculate initial state based on delay for alternate animations
            const delay = animationOptions.delay || 0
            const animationDuration =
              duration || animationOptions.duration || 4000

            if (animationOptions.direction === "alternate") {
              // For alternate animations, calculate where in the cycle we should start
              const cycleDuration = animationDuration * 2 // Full cycle is forward + reverse
              const cycleProgress = (delay % cycleDuration) / cycleDuration

              let initialValue
              if (cycleProgress <= 0.5) {
                // First half: from -> to
                const forwardProgress = cycleProgress * 2
                initialValue = from + (to - from) * forwardProgress
              } else {
                // Second half: to -> from
                const reverseProgress = (cycleProgress - 0.5) * 2
                initialValue = to - (to - from) * reverseProgress
              }

              // Set initial state
              if (property === "opacity") {
                element.style.opacity = initialValue.toString()
              } else if (property === "scale") {
                element.style.transform = `scale(${initialValue})`
              }
            }

            // Create animation
            const animation = element.animate(
              [{ [property]: from }, { [property]: to }],
              {
                duration: duration || animationOptions.duration,
                easing: easing || animationOptions.easing,
                iterations: animationOptions.iterations,
                direction: animationOptions.direction,
                delay: animationOptions.delay,
              }
            )

            // Store animation reference
            if (!this.elementAnimations.has(element)) {
              this.elementAnimations.set(element, new Map())
            }
            this.elementAnimations.get(element)!.set(property, animation)

            // Apply final state
            if (property === "rotation") {
              element.style.transform = `rotate(${to}deg)`
            } else if (property === "scale") {
              element.style.transform = `scale(${to})`
            } else if (property === "top") {
              element.style.setProperty(property, `${to}px`)
            } else {
              element.style.setProperty(property, `${to}px`)
            }
          } else if (typeof from === "string" && typeof to === "string") {
            // Create animation
            const animation = element.animate(
              [{ [property]: from }, { [property]: to }],
              {
                duration: duration || animationOptions.duration,
                easing: easing || animationOptions.easing,
                iterations: animationOptions.iterations,
                direction: animationOptions.direction,
                delay: animationOptions.delay,
              }
            )

            // Store animation reference
            if (!this.elementAnimations.has(element)) {
              this.elementAnimations.set(element, new Map())
            }
            this.elementAnimations.get(element)!.set(property, animation)

            // Apply final state
            element.style.setProperty(property, to)
          }
        }
      )
    } else {
      console.warn(
        "AnimationService: No keyframeAnimations found in animation asset"
      )
    }
  }

  /**
   * Stop animation on element
   */
  public stopAnimation(element: HTMLElement, _animationId?: string) {
    const elementAnimations = this.elementAnimations.get(element)
    if (elementAnimations) {
      elementAnimations.forEach((animation, _property) => {
        animation.cancel()
      })
      this.elementAnimations.delete(element)
    }
  }

  /**
   * Pause animation on element
   */
  public pauseAnimation(element: HTMLElement, _animationId?: string) {
    const elementAnimations = this.elementAnimations.get(element)
    if (elementAnimations) {
      elementAnimations.forEach((animation, _property) => {
        animation.pause()
      })
    }
  }

  /**
   * Resume animation on element
   */
  public resumeAnimation(element: HTMLElement, _animationId?: string) {
    const elementAnimations = this.elementAnimations.get(element)
    if (elementAnimations) {
      elementAnimations.forEach((animation, _property) => {
        animation.play()
      })
    }
  }

  /**
   * Check if animation is playing on element
   */
  public isAnimationPlaying(
    element: HTMLElement,
    _animationId?: string
  ): boolean {
    const elementAnimations = this.elementAnimations.get(element)
    if (elementAnimations) {
      for (const animation of elementAnimations.values()) {
        if (animation.playState === "running") {
          return true
        }
      }
    }
    return false
  }

  /**
   * Clean up animations for an element
   */
  public cleanupElement(element: HTMLElement) {
    this.stopAnimation(element)
  }
}

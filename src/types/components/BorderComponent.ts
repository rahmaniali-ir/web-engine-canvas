import { WebObjectComponent } from "../WebObject"

export interface BorderComponent extends WebObjectComponent {
  type: "border"
  config: {
    border?: string
    borderTop?: string
    borderRight?: string
    borderBottom?: string
    borderLeft?: string
  }
}

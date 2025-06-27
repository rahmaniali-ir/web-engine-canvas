import { WebObjectComponent } from "../WebObjectComponent"

export interface BorderComponent extends WebObjectComponent {
  type: "border"
  config: {
    border?: string
    borderTop?: string
    borderRight?: string
    borderBottom?: string
    borderLeft?: string
    borderWidth?: string
    borderStyle?: string
    borderColor?: string
  }
}

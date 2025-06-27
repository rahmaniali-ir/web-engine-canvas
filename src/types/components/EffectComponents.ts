import { WebObjectComponent } from "../WebObject"

export interface BoxShadowComponent extends WebObjectComponent {
  type: "boxShadow"
  config: {
    boxShadow?: string
  }
}

export interface FilterComponent extends WebObjectComponent {
  type: "filter"
  config: {
    filter?: string
    backdropFilter?: string
  }
}

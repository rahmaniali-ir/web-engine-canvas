import { WebObjectComponent } from "../WebObject"

export interface FilterComponent extends WebObjectComponent {
  type: "filter"
  config: {
    filter?: string
    backdropFilter?: string
  }
}

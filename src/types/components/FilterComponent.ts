import { WebObjectComponent } from "../WebObjectComponent"

export interface FilterComponent extends WebObjectComponent {
  type: "filter"
  config: {
    filter?: string
    backdropFilter?: string
  }
}

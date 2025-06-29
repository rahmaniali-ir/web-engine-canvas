import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface FilterComponent extends WebObjectComponent {
  type: "filter"
  config: {
    filter?: AssetValue<string>
    backdropFilter?: AssetValue<string>
  }
}

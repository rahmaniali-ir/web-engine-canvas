import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface BoxShadowComponent extends WebObjectComponent {
  type: "boxShadow"
  config: {
    boxShadow?: AssetValue<string>
  }
}

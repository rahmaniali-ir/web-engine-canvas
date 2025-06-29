import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface PaddingComponent extends WebObjectComponent {
  type: "padding"
  config: {
    padding?: AssetValue<string>
    paddingTop?: AssetValue<string | number>
    paddingRight?: AssetValue<string | number>
    paddingBottom?: AssetValue<string | number>
    paddingLeft?: AssetValue<string | number>
  }
}

import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface MarginComponent extends WebObjectComponent {
  type: "margin"
  config: {
    margin?: AssetValue<string>
    marginTop?: AssetValue<string | number>
    marginRight?: AssetValue<string | number>
    marginBottom?: AssetValue<string | number>
    marginLeft?: AssetValue<string | number>
  }
}

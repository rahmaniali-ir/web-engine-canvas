import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface BorderRadiusComponent extends WebObjectComponent {
  type: "borderRadius"
  config: {
    borderRadius?: AssetValue<string>
    borderTopLeftRadius?: AssetValue<string | number>
    borderTopRightRadius?: AssetValue<string | number>
    borderBottomLeftRadius?: AssetValue<string | number>
    borderBottomRightRadius?: AssetValue<string | number>
  }
}

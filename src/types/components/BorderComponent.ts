import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface BorderComponent extends WebObjectComponent {
  type: "border"
  config: {
    border?: AssetValue<string>
    borderTop?: AssetValue<string>
    borderRight?: AssetValue<string>
    borderBottom?: AssetValue<string>
    borderLeft?: AssetValue<string>
    borderWidth?: AssetValue<string | number>
    borderStyle?: AssetValue<string>
    borderColor?: AssetValue<string>
  }
}

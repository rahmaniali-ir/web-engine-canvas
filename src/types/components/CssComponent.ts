import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface CssComponent extends WebObjectComponent {
  type: "css"
  config: {
    [key: string]: AssetValue<string | number>
  }
}

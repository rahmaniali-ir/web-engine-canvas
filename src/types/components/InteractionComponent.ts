import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface InteractionComponent extends WebObjectComponent {
  type: "interaction"
  config: {
    cursor?: AssetValue<string>
    pointerEvents?: AssetValue<string>
    userSelect?: AssetValue<string>
  }
}

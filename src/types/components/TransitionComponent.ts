import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface TransitionComponent extends WebObjectComponent {
  type: "transition"
  config: {
    transition?: AssetValue<string>
    transitionProperty?: AssetValue<string>
    transitionDuration?: AssetValue<string | number>
    transitionTimingFunction?: AssetValue<string>
    transitionDelay?: AssetValue<string | number>
  }
}

import { AssetValue } from "../Asset"

export interface MaterialComponent {
  id: string
  type: "material"
  config: {
    backgroundColor?: AssetValue<string>
    color?: AssetValue<string>
    opacity?: AssetValue<number>
    backgroundImage?: AssetValue<string>
    backgroundSize?: AssetValue<string>
    backgroundPosition?: AssetValue<string>
    backgroundRepeat?: AssetValue<string>
    backgroundAttachment?: AssetValue<string>
    backgroundClip?: AssetValue<string>
    backgroundOrigin?: AssetValue<string>
    backgroundBlendMode?: AssetValue<string>
    backdropFilter?: AssetValue<string>
    mixBlendMode?: AssetValue<string>
    isolation?: AssetValue<string>
    boxDecorationBreak?: AssetValue<string>
    background?: AssetValue<string>
  }
}

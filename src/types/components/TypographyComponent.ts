import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface TypographyComponent extends WebObjectComponent {
  type: "typography"
  config: {
    fontSize?: AssetValue<string | number>
    fontWeight?: AssetValue<string | number>
    fontFamily?: AssetValue<string>
    textAlign?: AssetValue<"left" | "center" | "right" | "justify">
    textDecoration?: AssetValue<string>
    color?: AssetValue<string>
    lineHeight?: AssetValue<string | number>
    letterSpacing?: AssetValue<string | number>
    textTransform?: AssetValue<
      "none" | "capitalize" | "uppercase" | "lowercase"
    >
    fontStyle?: AssetValue<"normal" | "italic" | "oblique">
    textShadow?: AssetValue<string>
    whiteSpace?: AssetValue<
      "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line"
    >
    overflow?: AssetValue<"visible" | "hidden" | "scroll" | "auto">
    textOverflow?: AssetValue<"clip" | "ellipsis">
  }
}

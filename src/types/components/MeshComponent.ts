import { WebObjectComponent } from "../WebObjectComponent"
import { AssetValue } from "../Asset"

export interface MeshComponent extends WebObjectComponent {
  type: "mesh"
  config: {
    display?: AssetValue<string>
    flexDirection?: AssetValue<
      "row" | "column" | "row-reverse" | "column-reverse"
    >
    justifyContent?: AssetValue<
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "space-evenly"
    >
    alignItems?: AssetValue<
      "stretch" | "flex-start" | "flex-end" | "center" | "baseline"
    >
    gap?: AssetValue<string>
    width?: AssetValue<string | number>
    height?: AssetValue<string | number>
    minWidth?: AssetValue<string | number>
    minHeight?: AssetValue<string | number>
    maxWidth?: AssetValue<string | number>
    maxHeight?: AssetValue<string | number>
    position?: AssetValue<
      "static" | "relative" | "absolute" | "fixed" | "sticky"
    >
    top?: AssetValue<string | number>
    left?: AssetValue<string | number>
    right?: AssetValue<string | number>
    bottom?: AssetValue<string | number>
    zIndex?: AssetValue<number>
    gridTemplateColumns?: AssetValue<string>
    gridTemplateRows?: AssetValue<string>
    gridGap?: AssetValue<string>
    flexWrap?: AssetValue<"nowrap" | "wrap" | "wrap-reverse">
    flexGrow?: AssetValue<number>
    flexShrink?: AssetValue<number>
    flexBasis?: AssetValue<string>
    order?: AssetValue<number>
  }
}

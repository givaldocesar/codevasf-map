import React from "react";
import { CustomMap, CustomLayer, CustomCategorizedStyle} from "../../classes";
import { Style } from "ol/style";

const MapContext = React.createContext<CustomMap | null>(null);
const LayerContext = React.createContext<CustomLayer | null>(null);
const StyleContext = React.createContext<Style | CustomCategorizedStyle | null>(null);

export {
    MapContext,
    LayerContext,
    StyleContext
}
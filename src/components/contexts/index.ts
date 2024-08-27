import React from "react";
import { CustomMap, CustomLayer, CategorizedStyle, SimpleStyle } from "../../classes";


const MapContext = React.createContext<CustomMap | null>(null);
const LayerContext = React.createContext<CustomLayer | null>(null);
const StyleContext = React.createContext<SimpleStyle | CategorizedStyle | null | undefined >(null);

export {
    MapContext,
    LayerContext,
    StyleContext
}
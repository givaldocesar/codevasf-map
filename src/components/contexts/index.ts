import React from "react";
import { CustomMap, CustomLayer, CustomCategorizedStyle, CustomSimpleStyle, CustomSelect } from "../../classes";

const MapContext = React.createContext<CustomMap | null>(null);
const LayerContext = React.createContext<CustomLayer | null>(null);
const StyleContext = React.createContext<CustomSimpleStyle | CustomCategorizedStyle | null | undefined >(null);
const InteractionContext = React.createContext<CustomSelect | null | undefined >(null);

export {
    MapContext,
    LayerContext,
    StyleContext,
    InteractionContext
}
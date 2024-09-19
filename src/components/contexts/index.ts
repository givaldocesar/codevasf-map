import React from "react";
import { Select } from "ol/interaction";
import { CustomMap, CustomLayer, CustomCategorizedStyle, CustomSimpleStyle, SelectStyle } from "../../classes";

const MapContext = React.createContext<CustomMap | null>(null);
const LayerContext = React.createContext<CustomLayer | null>(null);
const StyleContext = React.createContext<SelectStyle | CustomSimpleStyle | CustomCategorizedStyle | null | undefined >(null);
const InteractionContext = React.createContext<Select | null | undefined >(null);

export {
    MapContext,
    LayerContext,
    StyleContext,
    InteractionContext
}
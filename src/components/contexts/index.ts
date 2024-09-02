import React from "react";
import { Select } from "ol/interaction";
import { CustomMap, CustomLayer, CategorizedStyle, SimpleStyle, SelectStyle } from "../../classes";

const MapContext = React.createContext<CustomMap | null>(null);
const LayerContext = React.createContext<CustomLayer | null>(null);
const StyleContext = React.createContext<SelectStyle | SimpleStyle | CategorizedStyle | null | undefined >(null);
const InteractionContext = React.createContext<Select | null | undefined >(null);

export {
    MapContext,
    LayerContext,
    StyleContext,
    InteractionContext
}
import React from "react";
import { MapType } from "../../classes/CustomMap";

const MapContext = React.createContext<MapType | null>(null);

export {
    MapContext
}
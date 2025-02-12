import React from "react";

function VectorLayers({children} : {children?: React.ReactNode}){
    return <>{children}</>
}

export default VectorLayers;

export { VectorLayers };
export { default as Layer } from "./Layer";
export { default as URLDataLayer } from "./URLDataLayer";
export { default as APIDataLayer } from "./APIDataLayer";

export * from "./styles";
export * from "./interactions";
export * from "./events";

export { 
    default as AttributesTable, 
    STATUS, ERROR,
    type FieldType, 
    type FeatureStatus 
} from "./attributes-table";


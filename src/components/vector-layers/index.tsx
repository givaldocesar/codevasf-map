import React from "react";

function VectorLayers({children} : {children?: React.ReactNode}){
    return <>{children}</>
}

export default VectorLayers;

export { VectorLayers };
export { default as Layer } from "./Layer";
export { default as URLDataLayer } from "./URLDataLayer";
export { default as APIDataLayer } from "./APIDataLayer";
export { default as createRandomLayer } from "./createRandomLayer";

export * from "./styles";
export * from "./interactions";
export * from "./events";

export { 
    default as AttributesTable, 
    STATUS, ERROR,
    type FieldType, 
    type FeatureStatus,
    type APIType,
} from "./attributes-table";


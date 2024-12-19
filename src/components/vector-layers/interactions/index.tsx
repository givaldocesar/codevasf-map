import React from "react";

export default function Interactions({children} : {children?: React.ReactNode}){
    return children;
}

export { Interactions };
export { default as Click } from "./Click";
export { default as Hover } from "./Hover";
export { default as SelectedInfoControl } from "./SelectedInfoControl";
export { default as SelectControl } from "./SelectControl";
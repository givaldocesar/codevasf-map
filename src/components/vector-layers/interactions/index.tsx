import React from "react";

const Interactions: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return children;
}

export { Interactions };
export { default as Click } from "./Click";
export { default as Hover } from "./Hover";
export { default as SelectedInfoControl } from "./SelectedInfoControl";
import React from "react";

const TileLayers: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return <>{children}</>
}

export default TileLayers;

export { TileLayers };
export { default as OpenStreetLayer } from "./OpenStreetLayer";
export { default as GoogleLayer } from "./GoogleLayer";
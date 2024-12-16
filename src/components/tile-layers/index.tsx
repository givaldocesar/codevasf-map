import React from "react";

export default function TileLayers({children} : {children?: React.ReactNode }){
    return <>{children}</>
}

export { TileLayers };
export { default as OpenStreetLayer } from "./OpenStreetLayer";
export { default as GoogleLayer } from "./GoogleLayer";
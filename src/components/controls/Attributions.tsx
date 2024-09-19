import React, { useMemo, useContext, useEffect } from "react";
import { Attribution } from "ol/control";
import { MapContext } from "../contexts";

const Attributions: React.FC<{
    className?: string,
    collapsible?: boolean
}> = ({
    className,
    collapsible=true
}) => {
    const map = useContext(MapContext);
    
    const attribution = useMemo(() => {
        return new Attribution({
            className: `${className} ol-attribution`,
            collapsible: collapsible,
            tipLabel: "Fontes"
        });
    }, []);

    useEffect(() => {
        map?.addControl(attribution);
        return () => { map?.removeControl(attribution) }
    }, [map, attribution]);
    
    return <></>;
}

export default Attributions;
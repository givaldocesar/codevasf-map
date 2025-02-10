import { useMemo, useContext, useEffect } from "react";
import { Attribution } from "ol/control";
import { MapContext } from "../contexts";

export default function Attributions({
    className='',
    collapsible=true
}: {
    className?: string,
    collapsible?: boolean
}){
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
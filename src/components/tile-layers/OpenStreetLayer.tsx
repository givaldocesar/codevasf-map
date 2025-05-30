import { useMemo, useContext, useEffect } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { MapContext } from "../contexts";

export default function OpenStreetLayer({
    standard=false, 
    order, 
    zIndex
}:{
    standard?: boolean,
    order?: number,
    zIndex?: number
}){
    const map = useContext(MapContext);
    
    const layer = useMemo(() =>{ 
        const layer = new TileLayer({
            preload: Infinity,
            source: new OSM({}),
            maxZoom: 20,
            visible: standard,
            zIndex: zIndex
        });

        layer.setProperties({
            title: 'OpenStreet Map',
            order: order,
        });
        
        return layer;
    }, [standard, order, zIndex]);

    useEffect(()=> {
        map?.addLayer(layer); 
        return () => { map?.removeLayer(layer) }
    }, [map, layer]);
    
    return <></>
}
import { useMemo, useContext, useEffect } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { MapContext } from "../contexts";

const OpenStreetLayer: React.FC<{
    standard?: boolean,
    order?: number,
    zIndex?: number
}> = ({standard=false, order, zIndex}) => {
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

export default OpenStreetLayer;
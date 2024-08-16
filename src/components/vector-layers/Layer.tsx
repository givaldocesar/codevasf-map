import { useMemo, useContext, useEffect } from "react";
import { GeoJSON } from "ol/format";
import { CustomLayer } from "../../classes";
import { MapContext, LayerContext } from "../contexts";
import { AttributionLike } from "ol/source/Source";

const FORMAT = new GeoJSON();

interface Props {
    children?: React.ReactNode;
    data: {[property: string]: any} | {[property: string]: any}[];
    
    attributions?: AttributionLike;
    minZoom?: number;
    maxZoom?: number;
    visible?: boolean;
    zIndex?: number;

    title?: string;
    order?: number;
    geometry: 'Point' | 'LineString' | 'Polygon';
}

const Layer: React.FC<Props> = ({children, data, ...props}) => {
    const map = useContext(MapContext);
    const layer = useMemo(() => {
        try{
            const features = FORMAT.readFeatures(data, {
                featureProjection: map?.getView().getProjection()
            });
            return new CustomLayer({features: features, ...props});
        
        } catch (err){
            throw new Error(`LAYER ${props.title} => 'invalid JSON data.'`);
        }
        
    }, []);
    
    useEffect(() => {
        map?.addLayer(layer);
        return () => { map?.removeLayer(layer) }
    }, []);
    
    return (
        <LayerContext.Provider value={layer}>
            {children}
        </LayerContext.Provider>
    );
}

export default Layer;
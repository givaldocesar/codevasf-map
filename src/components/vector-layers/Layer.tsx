import { useMemo, useContext, useEffect } from "react";
import { Feature } from "ol";
import { GeoJSON } from "ol/format";
import { AttributionLike } from "ol/source/Source";
import { CustomLayer } from "../../classes";
import { Geometries } from "../../interfaces";
import { MapContext, LayerContext } from "../contexts";


const FORMAT = new GeoJSON();

export interface LayerProps {
    children?: React.ReactNode;
    attributions?: AttributionLike;
    maxZoom?: number;
    minZoom?: number;
    zIndex?: number;
    fit?: boolean;
    title?: string;
    order?: number;
    geometry: Geometries;
}

interface Props extends LayerProps {
    data?: {[property: string]: any} | {[property: string]: any}[];
    layer?: CustomLayer;
}

const Layer: React.FC<Props> = ({children, data, layer, fit, ...props}) => {
    const map = useContext(MapContext);
    const base = useMemo(() => {
        try{            
            let features: Feature[] = [];

            if(data && data.length > 0 ){
                features = FORMAT.readFeatures(data, {
                    featureProjection: map?.getView().getProjection()
                });
            }

            if(data && layer) layer.getSource()?.addFeatures(features);
            
            return layer || new CustomLayer({ features: features, ...props });

        } catch (err){
            const error = err as Error;
            throw new Error(`LAYER ${props.title} => ${error.message}`);
        }
        
    }, []);
    
    useEffect(() => {
        map?.addLayer(base);
        if(fit) map?.fit(base.getSource()?.getExtent());
        return () => { map?.removeLayer(base) }
    }, []);
    
    return (
        <LayerContext.Provider value={base}>
            {children}
        </LayerContext.Provider>
    );
}

export default Layer;
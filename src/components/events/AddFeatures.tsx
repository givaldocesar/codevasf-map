import { useEffect, useCallback, useContext } from "react";
import { Feature } from "ol";
import { MapContext } from "../contexts";
import { createRandomLayer } from "../../utils";

class AddFeaturesEvent extends CustomEvent<{
    features: Feature[]; 
    layerTitle?: string;
    zoomTo?: boolean;
}> {
    static type: string = 'map-add-feature-event';

    constructor({
        features, 
        layerTitle,
        zoomTo
    }: {
        features: Feature[], 
        layerTitle?: string,
        zoomTo?: boolean 
    }){
        super('map-add-feature-event', {
            detail: {
                features: features, 
                layerTitle: layerTitle,
                zoomTo: zoomTo
            },
            bubbles: true
        });
    }
}

const AddFeatures: React.FC = () => {
    const map = useContext(MapContext);

    const addFeaturesToMap = useCallback((evt: AddFeaturesEvent) => {
        const layer = createRandomLayer({
            map: map,
            features: evt.detail.features as Feature[],
            showProperties: true
        });

        try{ map?.addLayer(layer) } catch {};
        
        if(evt.detail.zoomTo){
            layer.getFeaturesExtent().then(extent => map?.fit(extent));
        }
    }, []);

    useEffect(() => {
        document.addEventListener(AddFeaturesEvent.type, addFeaturesToMap as EventListener);
        return () => document.removeEventListener(AddFeaturesEvent.type, addFeaturesToMap as EventListener);
    }, []);
    
    return <></>
}

export {
    AddFeatures,
    AddFeaturesEvent
}
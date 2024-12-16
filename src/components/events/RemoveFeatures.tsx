import { useEffect, useCallback, useContext } from "react";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { MapContext } from "../contexts";



class RemoveFeaturesEvent extends CustomEvent<{layerTitle: string; features: Feature[]}> {
    static type: string = 'map-remove-features-event';
   
    constructor(layerTitle: string, features: Feature[]){
        super('map-remove-features-event', {
            detail: {
                layerTitle: layerTitle,
                features: features
            },
            bubbles: true
        });
    }
}

function RemoveFeatures(){
    const map = useContext(MapContext);

    const removeFeatures = useCallback((evt: RemoveFeaturesEvent) => {
        map?.getAllLayers().forEach(layer => {
            if(layer.get("title") === evt.detail.layerTitle){
                const source = layer.getSource() as VectorSource;
                source.removeFeatures(evt.detail.features);

                if(source.getFeatures().length === 0){
                    map.removeLayer(layer);
                } else {
                    layer.changed();
                }
            }
        })
    }, []);

    useEffect(() => {
        document.addEventListener(RemoveFeaturesEvent.type, removeFeatures as EventListener);
        return () => document.removeEventListener(RemoveFeaturesEvent.type, removeFeatures as EventListener);
    }, []);
    
    return <></>;
}

export {
    RemoveFeatures,
    RemoveFeaturesEvent
}
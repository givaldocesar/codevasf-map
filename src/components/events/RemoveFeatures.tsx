import { useEffect, useCallback, useContext } from "react";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { MapContext } from "../contexts";


export class RemoveFeaturesEvent extends CustomEvent<{mapName: string; layerTitle: string; features: Feature[]}> {
    static type: string = 'map-remove-features-event';
   
    constructor(mapName: string, layerTitle: string, features: Feature[]){
        super('map-remove-features-event', {
            detail: {
                layerTitle: layerTitle,
                mapName: mapName,
                features: features
            },
            bubbles: true
        });
    }
}

export default function RemoveFeatures(){
    const map = useContext(MapContext);
    if(!map?.get('name')) throw new Error("REMOVE FEATURES: Map name is required. Please set map name.");

    useEffect(() => {
        function removeFeatures(evt: RemoveFeaturesEvent){
            if(evt.detail.mapName === map?.get('name')){
                const layers = map.getAllLayers();

                for(let i = 0; layers.length; i++){
                    if(layers[i].get("title") === evt.detail.layerTitle){
                        const source = layers[i].getSource() as VectorSource;
                        source.removeFeatures(evt.detail.features);

                        if(source.getFeatures().length === 0) map.removeLayer(layers[i]);
                        else layers[i].changed();

                        break;
                    }
                }
            }
        };

        document.addEventListener(RemoveFeaturesEvent.type, removeFeatures as EventListener);
        return () => document.removeEventListener(RemoveFeaturesEvent.type, removeFeatures as EventListener);
    }, []);
    
    return <></>;
}
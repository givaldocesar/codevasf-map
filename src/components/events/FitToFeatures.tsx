import { useEffect, useContext } from "react";
import { Feature } from "ol";
import { getFeaturesExtent } from "../../utils";
import { MapContext } from "../contexts";


export class FitToFeaturesEvent extends CustomEvent<{mapName: string, features: Feature[]; maxZoom?: number}> {
    static type: string = 'map-fit-to-feature-event';

    constructor({
        mapName,
        features,
        maxZoom
    } :{
        mapName: string,
        features: Feature[],
        maxZoom?: number
    }){
        super('map-fit-to-feature-event', {
            detail: {
                mapName: mapName,
                features: features,
                maxZoom: maxZoom
            },
            bubbles: true
        });
    }
}

export default function FitToFeatures(){
    const map = useContext(MapContext);

    if(!map.get('name')) throw new Error("FIT TO FEATURES: Map name is required. Please set map name.");

    useEffect(() => {
        function fitToFeatures(evt: FitToFeaturesEvent){
            if(evt.detail.mapName === map.get('name')){
                const extent = getFeaturesExtent(evt.detail.features);
                map.fit(extent, evt.detail.maxZoom);
            }
        };

        document.addEventListener(FitToFeaturesEvent.type, fitToFeatures as EventListener);
        return () => document.removeEventListener(FitToFeaturesEvent.type, fitToFeatures as EventListener);
    }, []);
    
    return <></>;
}
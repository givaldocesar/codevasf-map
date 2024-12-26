import { useEffect, useCallback, useContext } from "react";
import { Feature } from "ol";
import { MapContext } from "../contexts";
import { getFeaturesExtent } from "../../utils";


class FitToFeaturesEvent extends CustomEvent<{mapName: string, features: Feature[]; maxZoom?: number}> {
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

function FitToFeatures(){
    const map = useContext(MapContext);

    if(!map?.get('name')) throw new Error("FIT TO FEATURES: Map name is required. Please set map name.");

    const fitToFeatures = useCallback((evt: FitToFeaturesEvent) => {
        if(evt.detail.mapName === map.get('name')){
            const extent = getFeaturesExtent(evt.detail.features);
            map?.fit(extent, evt.detail.maxZoom);
        }
    }, []);

    useEffect(() => {
        document.addEventListener(FitToFeaturesEvent.type, fitToFeatures as EventListener);
        return () => document.removeEventListener(FitToFeaturesEvent.type, fitToFeatures as EventListener);
    }, []);
    
    return <></>;
}

export {
    FitToFeatures,
    FitToFeaturesEvent
}
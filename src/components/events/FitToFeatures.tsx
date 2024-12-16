import { useEffect, useCallback, useContext } from "react";
import { Feature } from "ol";
import { MapContext } from "../contexts";
import { getFeaturesExtent } from "../../utils";


class FitToFeaturesEvent extends CustomEvent<{features: Feature[]; maxZoom?: number}> {
    static type: string = 'map-fit-to-feature-event';

    constructor(features: Feature[], maxZoom?: number){
        super('map-fit-to-feature-event', {
            detail: {
                features: features,
                maxZoom: maxZoom
            },
            bubbles: true
        });
    }
}

function FitToFeatures(){
    const map = useContext(MapContext);

    const fitToFeatures = useCallback((evt: FitToFeaturesEvent) => {
        const extent = getFeaturesExtent(evt.detail.features);
        map?.fit(extent, evt.detail.maxZoom);
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
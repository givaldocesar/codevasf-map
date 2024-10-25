import { useEffect, useCallback, useContext } from "react";
import { Feature } from "ol";
import { MapContext } from "../contexts";
import { getFeaturesExtent } from "../../utils";


class FitToFeaturesEvent extends CustomEvent<Feature[]> {
    static type: string = 'map-fit-to-feature-event';

    constructor(features: Feature[]){
        super('map-fit-to-feature-event', {
            detail: features,
            bubbles: true
        });
    }
}

const FitToFeatures: React.FC = () => {
    const map = useContext(MapContext);

    const fitToFeatures = useCallback((evt: FitToFeaturesEvent) => {
        const extent = getFeaturesExtent(evt.detail);
        map?.fit(extent);
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
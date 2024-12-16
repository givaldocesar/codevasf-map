import { useEffect, useCallback, useContext, useMemo, useState } from "react";
import { Feature } from "ol";
import { MapContext } from "../contexts";
import { createRandomLayer } from "../../utils";
import { CustomSimpleStyle } from "../../classes";
import { FlatText } from "ol/style/flat";

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

function AddFeatures({label} : {label?: {text?: FlatText; expression: string}}){
    const map = useContext(MapContext);

    const addFeaturesToMap = useCallback((evt: AddFeaturesEvent) => {
        const layer = createRandomLayer({
            map: map,
            title: evt.detail.layerTitle,
            features: evt.detail.features as Feature[],
            showProperties: true
        });

        try{ map?.addLayer(layer) } catch {};

        if(label){
            const style = layer.getBaseStyle() as CustomSimpleStyle; 
            style.setText(label.text || {
                "text-fill-color": "black",
                "text-stroke-color": "white",
                "text-stroke-width": 2,
                "text-scale": 1.5
            }, label.expression);
            layer.dispatchEvent('change-style');
        }
        
        if(evt.detail.zoomTo){
            layer.getFeaturesExtent().then(extent => map?.fit(extent));
        }
    }, []);

    useEffect(() => {
        document.addEventListener(AddFeaturesEvent.type, addFeaturesToMap as EventListener);
        return () => document.removeEventListener(AddFeaturesEvent.type, addFeaturesToMap as EventListener);
    }, []);
    
    return <></>;
}

export {
    AddFeatures,
    AddFeaturesEvent
}
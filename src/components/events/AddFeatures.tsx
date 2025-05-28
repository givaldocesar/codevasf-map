import { useEffect, useContext } from "react";
import { Feature } from "ol";
import { CustomSimpleStyle } from "../../classes";
import { LabelType } from "../../interfaces";
import { createLayer } from "../../utils";
import { MapContext } from "../contexts";


export class AddFeaturesEvent extends CustomEvent<{
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

export default function AddFeatures({label} : {label?: LabelType}){
    const map = useContext(MapContext);

    useEffect(() => {
        function addFeaturesToMap(evt: AddFeaturesEvent){
            try{ 
                const layer = createLayer({
                    map: map,
                    features: evt.detail.features as Feature[],
                    options: {
                        title: evt.detail.layerTitle,
                        showProperties: true,
                    }
                });

                map.addLayer(layer);

                if(label){
                    const style = layer.getBaseStyle() as CustomSimpleStyle; 
                    style.setFeatureLabel(label.expression, label.text);
                    layer.changed();
                }
                
                if(evt.detail.zoomTo){
                    layer.getFeaturesExtent().then(extent => map.fit(extent));
                }
            } 
            catch {
                console.error("ADD-FEATURES-EVENT: erro ao adicionar feições.");
            };
        }

        document.addEventListener(AddFeaturesEvent.type, addFeaturesToMap as EventListener);
        return () => document.removeEventListener(AddFeaturesEvent.type, addFeaturesToMap as EventListener);
    }, []);
    
    return <></>;
}
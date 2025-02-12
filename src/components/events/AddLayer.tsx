import { useEffect, useCallback, useContext } from "react";
import { FlatText } from "ol/style/flat";
import { MapContext } from "../contexts";
import { CustomLayer, CustomSimpleStyle } from "../../classes";


class AddLayerEvent extends CustomEvent<{
    layer: CustomLayer; 
    mapName: string;
    zoomTo?: boolean;
}> {
    static type: string = 'map-add-layer-event';

    constructor({
        layer,
        mapName,
        zoomTo
    }: {
        layer: CustomLayer; 
        mapName: string;
        zoomTo?: boolean ;
    }){
        super('map-add-layer-event', {
            detail: {
                layer: layer,
                mapName: mapName,
                zoomTo: zoomTo
            },
            bubbles: true
        });
    }
}

function AddLayer({label} : {label?: {text?: FlatText; expression: string}}){
    const map = useContext(MapContext);

    const addLayerToMap = useCallback((evt: AddLayerEvent) => {
        if(map?.get('name') === evt.detail.mapName){
            try{ map?.addLayer(evt.detail.layer) } catch {};
    
            if(label){
                const style = evt.detail.layer.getBaseStyle() as CustomSimpleStyle; 
                style.setText(label.text || {
                    "text-fill-color": "black",
                    "text-stroke-color": "white",
                    "text-stroke-width": 2,
                    "text-scale": 1.5
                }, label.expression);
                evt.detail.layer.dispatchEvent('change-style');
            }
            
            if(evt.detail.zoomTo){
                evt.detail.layer.getFeaturesExtent().then(extent => map?.fit(extent));
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener(AddLayerEvent.type, addLayerToMap as EventListener);
        return () => document.removeEventListener(AddLayerEvent.type, addLayerToMap as EventListener);
    }, []);
    
    return <></>;
}

export {
    AddLayer,
    AddLayerEvent
}
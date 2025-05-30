import { useEffect, useContext } from "react";
import { CustomLayer, CustomSimpleStyle } from "../../classes";
import { LabelType } from "../../interfaces";
import { MapContext } from "../contexts";


export class AddLayerEvent extends CustomEvent<{
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

export default function AddLayer({label} : {label?: LabelType}){
    const map = useContext(MapContext);
    if(!map?.get('name')) throw new Error("ADD LAYER: Map name is required. Please set map name.");

    useEffect(() => {
        function addLayerToMap(evt: AddLayerEvent){
            const layer = evt.detail.layer;
            
            if(map?.get('name') === evt.detail.mapName){
                try{ map?.addLayer(layer) } 
                catch (err){
                    console.error(`MAP ${map.get('name') || ""}: Erro ao adicionar camada ${layer.get("title") || ""} por evento.`)
                };
        
                if(label){
                    const style = layer.getBaseStyle(); 
                    style.setFeatureLabel(label.expression, label.text);
                    layer.changed();
                }
                
                if(evt.detail.zoomTo) layer.getFeaturesExtent().then(extent => map.fit(extent));
            }
        }

        document.addEventListener(AddLayerEvent.type, addLayerToMap as EventListener);
        return () => document.removeEventListener(AddLayerEvent.type, addLayerToMap as EventListener);
    }, []);
    
    return <></>;
}
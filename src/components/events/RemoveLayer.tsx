import { useEffect, useContext } from "react";
import { MapContext } from "../contexts";


export class RemoveLayerEvent extends CustomEvent<string> {
    static type: string = 'map-remove-layer-event';

    constructor(layerTitle: string){
        super('map-remove-layer-event', {
            detail: layerTitle,
            bubbles: true
        });
    }
}

export default function RemoveLayer(){
    const map = useContext(MapContext);

    useEffect(() => {
        function removeLayer(evt: RemoveLayerEvent){
            const layers = map.getAllLayers();
            for(let i = 0; layers.length; i++){
                if(layers[i].get("title") === evt.detail){
                    map.removeLayer(layers[i]);
                    break;
                }
            }
        }

        document.addEventListener(RemoveLayerEvent.type, removeLayer as EventListener);
        return () => document.removeEventListener(RemoveLayerEvent.type, removeLayer as EventListener);
    }, []);
    
    return <></>;
}
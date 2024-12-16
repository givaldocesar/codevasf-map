import { useEffect, useCallback, useContext } from "react";
import { MapContext } from "../contexts";


class RemoveLayerEvent extends CustomEvent<string> {
    static type: string = 'map-remove-layer-event';

    constructor(layerTitle: string){
        super('map-remove-layer-event', {
            detail: layerTitle,
            bubbles: true
        });
    }
}

function RemoveLayer(){
    const map = useContext(MapContext);

    const removeLayer = useCallback((evt: RemoveLayerEvent) => {
        map?.getAllLayers().forEach(layer => {
            if(layer.get("title") === evt.detail){
                map.removeLayer(layer);
            }
        })
    }, []);

    useEffect(() => {
        document.addEventListener(RemoveLayerEvent.type, removeLayer as EventListener);
        return () => document.removeEventListener(RemoveLayerEvent.type, removeLayer as EventListener);
    }, []);
    
    return <></>;
}

export {
    RemoveLayer,
    RemoveLayerEvent
}
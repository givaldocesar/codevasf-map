import { useEffect, useContext, useMemo, useCallback } from "react";
import { getUid } from "ol";
import { CollectionEvent } from "ol/Collection";
import BaseLayer from "ol/layer/Base";
import { CustomLayer } from "../../../../classes";
import { MapContext } from "../../../contexts";
import { useForceUpdate } from "../../../../utils";
import VectorLayerItem from "./VectorLayerItem";
import LayersArea from "../LayersArea";

export default function VectorLayersArea(){
    const map = useContext(MapContext);
    let layers = useMemo<CustomLayer[]>(() => [], []);
    const forceUpdate = useForceUpdate();

    const addLayer = useCallback((evt: CollectionEvent<BaseLayer>) => {
        const layer = evt.element; 
        if(layer.get('ignore')) return ;

        if(layer instanceof CustomLayer && !layers.some(item => getUid(item) === getUid(layer))){
            layers.push(layer);
            forceUpdate();
        }
    }, []);

    const removeLayer = useCallback((evt: CollectionEvent<BaseLayer>) => {
        const layer = evt.element;
        layers = layers.filter(item => getUid(item) !== getUid(layer));
        forceUpdate();
    }, []);

    map?.getLayers().on('add', addLayer);
    map?.getLayers().on('remove', removeLayer);
    
    useEffect(() => {
        return () => { 
            map?.getLayers().un('add', addLayer);
            map?.getLayers().un('remove', removeLayer);
        }
    }, []);

    return (
        <LayersArea title="Camadas">
            { layers.map(layer => <VectorLayerItem layer={layer} key={getUid(layer)} />) }
        </LayersArea>
    );
}
import { useEffect, useContext, useMemo } from "react";
import { getUid } from "ol";
import { CollectionEvent } from "ol/Collection";
import BaseLayer from "ol/layer/Base";
import { useForceUpdate } from "@/hooks";
import { CustomLayer } from "@/classes";
import { MapContext } from "../../../contexts";
import LayersArea from "../LayersArea";
import VectorLayerItem from "./VectorLayerItem";


export default function VectorLayersArea(){
    const forceUpdate = useForceUpdate();
    const map = useContext(MapContext);
    let layers = useMemo<CustomLayer[]>(() => [], []);

    useEffect(() => {
        function addLayer(evt: CollectionEvent<BaseLayer>){
            const layer = evt.element; 
            if(layer.get('ignore')) return ;

            if(layer instanceof CustomLayer && !layers.some(item => getUid(item) === getUid(layer))){
                layers.push(layer);
                forceUpdate();
            }
        }

        map?.getLayers().on('add', addLayer);
        return () => map?.getLayers().un('add', addLayer);
    }, []);

    useEffect(() => {
        function removeLayer(evt: CollectionEvent<BaseLayer>){
            const layer = evt.element;
            layers = layers.filter(item => getUid(item) !== getUid(layer));
            forceUpdate();
        }

        map?.getLayers().on('remove', removeLayer);
        return () => map?.getLayers().un('remove', removeLayer);
    }, [])

    return (
        <LayersArea title="Camadas">
            { layers.map(layer => <VectorLayerItem layer={layer} key={getUid(layer)} />) }
        </LayersArea>
    );
}
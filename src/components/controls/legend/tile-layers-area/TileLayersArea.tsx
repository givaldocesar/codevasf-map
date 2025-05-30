import { useEffect, useContext, useMemo, useRef, useCallback } from "react";
import { getUid } from "ol";
import { CollectionEvent } from "ol/Collection";
import BaseLayer from "ol/layer/Base";
import TileLayer from "ol/layer/Tile";
import { useForceUpdate } from "@/hooks";
import { MapContext } from "../../../contexts";
import LayersArea from "../LayersArea";
import TileLayerItem from "./TileLayerItem";


export default function TileLayersArea(){
    const ref = useRef<HTMLDivElement>(null);
    const map = useContext(MapContext);
    const layers = useMemo<TileLayer[]>(() => [], []);
    const forceUpdate = useForceUpdate();

    const addLayer = useCallback((evt: CollectionEvent<BaseLayer>) => {
        const layer = evt.element;
        
        if(layer instanceof TileLayer && !layers.some(item => getUid(item) === getUid(layer))){
            layers.push(layer);
            forceUpdate();
        }
    }, []);

    map?.getLayers().on('add', addLayer);

    const changeCurrent = useCallback((evt: Event) => {
        evt.stopPropagation();
        const target = evt.target as HTMLInputElement;
        layers.forEach(layer => layer.setVisible(target.value === getUid(layer)));
    }, []);

    useEffect(() => {
        ref.current?.addEventListener('change', changeCurrent);
        return () => { 
            map?.getLayers().un('add', addLayer) 
            ref.current?.removeEventListener('change', changeCurrent); 
        }
    }, []);

    return (
        <LayersArea ref={ref} title="Camadas de Base" hide={true}>
            { layers.map(layer => <TileLayerItem layer={layer} key={getUid(layer)} />) }
        </LayersArea>
    );
}
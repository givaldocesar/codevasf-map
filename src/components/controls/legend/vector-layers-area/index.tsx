import { useEffect, useContext, useState, useMemo } from "react";
import { getUid } from "ol";
import { CollectionEvent } from "ol/Collection";
import BaseLayer from "ol/layer/Base";
import { CustomLayer } from "../../../../classes";
import { MapContext } from "../../../contexts";
import VectorLayerItem from "./VectorLayerItem";
import LayersArea from "../LayersArea";

const VectorLayersArea: React.FC = () => {
    const map = useContext(MapContext);
    const layers = useMemo<CustomLayer[]>(() => [], []);
    const [revision, setRevision ] = useState(0);

    useEffect(() => {
        function addLayer(evt: CollectionEvent<BaseLayer>){
            const layer = evt.element;
            
            if(layer instanceof CustomLayer && !layers.some(item => getUid(item) === getUid(layer))){
                layers.push(layer);
                setRevision(revision + 1);
            }
        }

        map?.getLayers().on('add', addLayer);
        return () => { map?.getLayers().un('add', addLayer) }
    }, []);

    return (
        <LayersArea title="Camadas">
            { layers.map(layer => <VectorLayerItem layer={layer} key={getUid(layer)} />) }
        </LayersArea>
    );
}

export default VectorLayersArea;
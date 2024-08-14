import { useEffect, useContext, useState, useMemo, useRef } from "react";
import { getUid } from "ol";
import { CollectionEvent } from "ol/Collection";
import BaseLayer from "ol/layer/Base";
import TileLayer from "ol/layer/Tile";
import { MapContext } from "../../contexts";
import { ArrowButton } from "../../buttons";
import TileLayerItem from "./TileLayerItem";
import styles from "./Legend.module.scss";

const TileLayersArea: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const map = useContext(MapContext);
    const layers = useMemo<TileLayer[]>(() => [], []);
    
    const [revision, setRevision ] = useState(0);
    const [hide, setHide] = useState(true);
    

    useEffect(() => {
        function addLayer(evt: CollectionEvent<BaseLayer>){
            const layer = evt.element;
            
            if(layer instanceof TileLayer && !layers.some(item => getUid(item) === getUid(layer))){
                layers.push(layer);
                setRevision(revision + 1);
            }
        }

        map?.getLayers().on('add', addLayer);
        return () => { map?.getLayers().un('add', addLayer) }
    }, []);

    useEffect(() => {
        function changeCurrent(evt: Event){
            const target = evt.target as HTMLInputElement;
            layers.forEach(layer => layer.setVisible(target.value === getUid(layer)));
        }

        ref.current?.addEventListener('change', changeCurrent);
        return () => { ref.current?.removeEventListener('change', changeCurrent); }
    }, []);

    return (
        <div className={styles.area} ref={ref}>
            <div className={styles.title}>
                <ArrowButton 
                    title={hide ? 'Mostrar camadas' : 'Ocultar camadas'}
                    style={{rotate: hide ? '180deg' : '0deg'}}
                    onClick={() => setHide(!hide)}
                />
                <h3>Camadas de Base</h3>
            </div>
            <div className={styles.items} style={{maxHeight: hide ? '0px' : '500px' }}>
                { layers.map(layer => <TileLayerItem layer={layer} key={getUid(layer)} />)}
            </div>
        </div>
    );
}

export default TileLayersArea;
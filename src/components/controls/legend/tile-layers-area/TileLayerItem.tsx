import { getUid } from "ol";
import TileLayer from "ol/layer/Tile";
import styles from "../Legend.module.scss";


export default function TileLayerItem({layer} : {layer: TileLayer}){
    const id = getUid(layer);
    
    return (
        <div className={styles.item} style={{order: layer.get('order')}}>
            <input 
                type="radio" 
                name="tile-layer" 
                defaultChecked={layer.getVisible()} 
                value={id}
                id={`layer_${id}`}
            />
            <label htmlFor={`layer_${id}`}>{layer.get('title')}</label>
        </div>
    );
}
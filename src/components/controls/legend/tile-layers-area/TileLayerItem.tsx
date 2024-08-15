import TileLayer from "ol/layer/Tile";
import { getUid } from "ol";
import styles from "../Legend.module.scss";


const TileLayerItem: React.FC<{layer: TileLayer}> = ({layer}) => {
    const id = getUid(layer);
    
    return (
        <div className={styles.item}>
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


export default TileLayerItem;
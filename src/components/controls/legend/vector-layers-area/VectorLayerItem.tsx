import { CustomLayer } from "../../../../classes";
import VectorLayerIcon from "../../../VectorLayerIcon";
import styles from "../Legend.module.scss";


const VectorLayerItem: React.FC<{layer: CustomLayer}> = ({layer}) => {
    function changeVisibility(evt: React.ChangeEvent<HTMLInputElement>){
        layer.setVisible(evt.target.checked);
    }

    function zoom(){
        const map = layer.get('map');
        map.fit(layer.getSource()?.getExtent());
    }
    
    return (
        <div className={styles.item}>
            <input type="checkbox" defaultChecked={layer.getVisible()} onChange={changeVisibility} />
            <VectorLayerIcon layer={layer} />
            <label onClick={zoom}>{layer.get('title')}</label>
        </div>
    );
}


export default VectorLayerItem;
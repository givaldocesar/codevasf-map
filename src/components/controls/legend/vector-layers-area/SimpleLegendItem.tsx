import { CustomLayer, CustomStyle } from "../../../../classes";
import { VectorLayerIcon } from "../../../buttons";
import styles from "../Legend.module.scss";

interface Props {
    layer: CustomLayer
}

const SimpleLegendItem: React.FC<Props> = ({layer}) => {
    function changeVisibility(evt: React.ChangeEvent<HTMLInputElement>){
        layer.setVisible(evt.target.checked);
    }

    function zoom(){
        const map = layer.get('map');
        map.fit(layer.getSource()?.getExtent());
    }
    
    const style = layer.getStyle() as CustomStyle;

    return (
        <div className={styles.item}>
            <input type="checkbox" defaultChecked={layer.getVisible()} onChange={changeVisibility} />
            <VectorLayerIcon geometry={layer.getGeometry()} style={style}/>
            <label onClick={zoom}>{layer.get('title')}</label>
        </div>
    );
}

export default SimpleLegendItem;
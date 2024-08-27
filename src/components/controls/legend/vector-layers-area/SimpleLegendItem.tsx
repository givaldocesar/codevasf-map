import { useState } from "react";
import { CustomLayer, SimpleStyle } from "../../../../classes";
import { LayerStatus } from "../../../../interfaces";
import { VectorLayerIcon } from "../../../buttons";
import LoadingItem from "./LoadingItem";
import styles from "../Legend.module.scss";

interface Props {
    layer: CustomLayer
}

const SimpleLegendItem: React.FC<Props> = ({layer}) => {
    const [layerStatus, setStatus] = useState<LayerStatus>('loading');
    
    //@ts-expect-error
    layer.on('status-changed', () => setStatus(layer.getStatus()));

    //LOADING
    if(layerStatus === 'loading') return <LoadingItem layer={layer} />;
    
    //LOADING-COMPLETE
    function changeVisibility(evt: React.ChangeEvent<HTMLInputElement>){
        layer.setVisible(evt.target.checked);
    }

    function zoom(){
        const map = layer.get('map');
        map.fit(layer.getSource()?.getExtent());
    }

    const style = layer.getBaseStyle() as SimpleStyle;
    return (
        <div className={styles.item} style={{order: layer.get('order')}}>
            <input type="checkbox" defaultChecked={layer.getVisible()} onChange={changeVisibility} />
            <VectorLayerIcon geometry={layer.getGeometry()} style={style}/>
            <label onClick={zoom}>{layer.get('title')}</label>
        </div>
    );

    return <></>;
}

export default SimpleLegendItem;
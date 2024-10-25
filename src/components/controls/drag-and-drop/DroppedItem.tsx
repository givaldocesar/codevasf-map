import { useContext, useEffect } from "react";
import { CustomLayer, CustomSimpleStyle } from "../../../classes";
import { MapContext } from "../../../components/contexts";
import { RemoveLayerIcon, VectorLayerIcon } from "../../../components/buttons";
import { ChangeLayerStylePopup } from "../../../components/pop-ups";
import { useForceUpdate } from "../../../utils";
import styles from "./DragAndDrop.module.scss";


const DroppedItem: React.FC<{
    id: string;
    layer: CustomLayer;
}> = ({
    id, 
    layer
}) => {
    const [name, _] = id.split('_');
    const forceUpdate = useForceUpdate();
    const map = useContext(MapContext);

    useEffect(() => {
        //@ts-ignore
        layer.on("change-style", forceUpdate);
        //@ts-ignore
        return () => { layer.un("change-style", forceUpdate) }
    }, []);

    function zoom(){    
        map?.fit(layer.getSource()?.getExtent());
    }

    function changeStyle(evt:React.MouseEvent<HTMLOrSVGElement>){
        evt.stopPropagation();
        evt.target.dispatchEvent(new CustomEvent("show-popup", {
            detail: <ChangeLayerStylePopup layer={layer} />,
            bubbles: true
        }))
    }

    function remove(evt:React.MouseEvent<HTMLOrSVGElement>){
        evt.target.dispatchEvent(new CustomEvent('remove-layer', { 
            detail: id,
            bubbles: true
        }));
    }

    return (
        <div className={styles.item}>
            <VectorLayerIcon 
                geometry={layer.getGeometry()} 
                style={layer.getBaseStyle() as CustomSimpleStyle}
                onClick={changeStyle}
            />
            <span onClick={zoom}>{ name }</span>
            <RemoveLayerIcon onClick={remove}/>
        </div>
    );
}

export default DroppedItem;
import { useContext, useState, useEffect } from "react";
import { CustomLayer, SimpleStyle } from "../../../classes";
import { MapContext } from "../../../components/contexts";
import { RemoveLayerIcon, VectorLayerIcon } from "../../../components/buttons";
import { ChangeLayerStylePopup } from "../../../components/pop-ups";
import styles from "./DragAndDrop.module.scss";

interface Props {
    id: string;
    layer: CustomLayer;
}

const DroppedItem: React.FC<Props> = ({id, layer}) => {
    const [name, _] = id.split('_');
    const [__, setRevision] = useState<number>(0);
    const map = useContext(MapContext);

    useEffect(() => {
        function changeStyle(){ setRevision(revision => revision + 1) }
        //@ts-ignore
        layer.on("change-style", changeStyle);
        //@ts-ignore
        return () => { layer.un("change-style", changeStyle) }
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
                style={layer.getBaseStyle() as SimpleStyle}
                onClick={changeStyle}
            />
            <span onClick={zoom}>{ name }</span>
            <RemoveLayerIcon onClick={remove}/>
        </div>
    );
}

export default DroppedItem;
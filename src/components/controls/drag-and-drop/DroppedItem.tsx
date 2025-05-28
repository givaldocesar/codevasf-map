import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForceUpdate } from "@/hooks";
import { CustomLayer, CustomSimpleStyle } from "../../../classes";
import { MapContext } from "../../contexts";
import { RemoveLayerIcon, VectorLayerIcon } from "../../buttons";
import { ChangeLayerStylePopup } from "../../popups";
import RemoveDroppedLayerEvent from "./RemoveDroppedLayerEvent";
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
    const [popup, setPopup] = useState<React.ReactNode>(null);

    useEffect(() => {
        layer.on("change", forceUpdate);
        return () => { layer.un("change", forceUpdate) }
    }, []);

    
    function changeStyle(evt:React.MouseEvent<HTMLOrSVGElement>){
        evt.stopPropagation();
        setPopup(
            createPortal(
                <ChangeLayerStylePopup 
                    layer={layer} 
                    close={() => setPopup(null)}
                />, 
                document.body
            )
        );
    }

    function remove(evt:React.MouseEvent<HTMLOrSVGElement>){
        evt.target.dispatchEvent(new RemoveDroppedLayerEvent(id));
    }

    function zoom(){ map.fit(layer.getSource()?.getExtent()) }

    return (
        <>
            <div className={styles.item}>
                <VectorLayerIcon 
                    geometry={layer.getGeometry()} 
                    style={layer.getBaseStyle() as CustomSimpleStyle}
                    onClick={changeStyle}
                />
                <span onClick={zoom}>{ name }</span>
                <RemoveLayerIcon onClick={remove}/>
            </div>
            { popup }
        </>
    );
}

export default DroppedItem;
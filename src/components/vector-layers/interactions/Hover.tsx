import React, { useContext, useMemo } from "react";
import { pointerMove } from "ol/events/condition";
import { CustomLayer, CustomMap, CustomSelect } from "../../../classes";
import { MapContext, LayerContext } from "../../../components/contexts";
import BaseInteraction from "./BaseInteraction";


export default function Hover({children} : {children?: React.ReactNode}){
    const map = useContext(MapContext) as CustomMap;
    const layer = useContext(LayerContext) as CustomLayer;
    
    const hover = useMemo(()=> {
        const interaction = new CustomSelect({
            condition: pointerMove,
            layers: [layer]
        });
        
        interaction.on('select', (evt) => {
            const feature = evt.selected[0];
            if(feature) { 
                map.getViewport().style.cursor = 'pointer';
            } else {
                map.getViewport().style.cursor = 'default';
            }
        });
        
        return interaction;
    }, []);
    
    return (
        <BaseInteraction interaction={hover}>
            { children }
        </BaseInteraction>
    );
}
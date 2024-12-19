import React, { useContext, useMemo } from "react";
import { singleClick, never } from "ol/events/condition";
import { CustomLayer, CustomSelect } from "../../../classes";
import { getFeaturesExtent } from "../../../utils";
import { MapContext, LayerContext } from "../../../components/contexts";
import BaseInteraction from "./BaseInteraction";


export default function Click({
    children, 
    noClick,
    zoomToFeature
} : {
    children?: React.ReactNode; 
    noClick?: boolean;
    zoomToFeature?: boolean;
}){
    const map = useContext(MapContext);
    const layer = useContext(LayerContext) as CustomLayer;
    
    const click = useMemo(()=> {
        const interaction = new CustomSelect({
            condition: noClick ? never : singleClick,
            layers: [layer]
        });

        if(zoomToFeature){
            interaction.on('select', (evt) => map?.fit(getFeaturesExtent(evt.selected)) );
        }
        
        return interaction;
    }, [zoomToFeature]);
    
    return (
        <BaseInteraction interaction={click}>
            { children }
        </BaseInteraction>
    );
}
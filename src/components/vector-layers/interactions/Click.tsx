import React, { useContext, useMemo } from "react";
import { singleClick } from "ol/events/condition";
import { CustomLayer, CustomSelect } from "../../../classes";
import { getFeaturesExtent } from "../../../utils";
import { MapContext, LayerContext } from "../../../components/contexts";
import BaseInteraction from "./BaseInteraction";


const Click: React.FC<{
    children?: React.ReactNode; 
    zoomToFeature?: boolean;
}> = ({
    children, 
    zoomToFeature
}) => {
    const map = useContext(MapContext);
    const layer = useContext(LayerContext) as CustomLayer;
    
    const click = useMemo(()=> {
        const interaction = new CustomSelect({
            condition: singleClick,
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

export default Click;
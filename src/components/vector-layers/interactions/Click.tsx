import React, { useContext, useMemo } from "react";
import { singleClick, never } from "ol/events/condition";
import { SelectEvent } from "ol/interaction/Select";
import { CustomSelect } from "../../../classes";
import { getFeaturesExtent } from "../../../utils";
import { MapContext, LayerContext } from "../../contexts";
import BaseInteraction from "./BaseInteraction";


export default function Click({
    children, 
    name,
    noClick,
    zoomToFeature,
    onSelect
} : {
    children?: React.ReactNode; 
    name?: string;
    noClick?: boolean;
    zoomToFeature?: boolean;
    onSelect?: (evt: SelectEvent) => void; 
}){
    const map = useContext(MapContext);
    const layer = useContext(LayerContext);
    
    const click = useMemo(()=> {
        const interaction = new CustomSelect({
            condition: noClick ? never : singleClick,
            layers: [layer]
        });

        interaction.set("name", name);
        if(onSelect) interaction.on("select", onSelect);
        if(zoomToFeature) interaction.on('select', (evt) => map.fit(getFeaturesExtent(evt.selected)));
        return interaction;
    }, [zoomToFeature]);
    
    return (
        <BaseInteraction interaction={click}>
            { children }
        </BaseInteraction>
    );
}
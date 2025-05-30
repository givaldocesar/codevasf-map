import React, { useContext, useEffect, useState } from "react";
import { Feature } from "ol";
import { SelectEvent } from "ol/interaction/Select";
import { InteractionContext, LayerContext } from "../contexts";
import BaseControl from "./BaseControl";
import icon from "../../assets/information.png";


export default function SelectedInfoControl ({
    children,
    collapsable,
    collapseIcon,
    collapseButtonClassName,
    factory,
    ...props
} : React.HTMLAttributes<HTMLDivElement>&{
    collapsable?: boolean;
    collapseIcon?: string;
    collapseButtonClassName?: string;
    factory: (features: Feature[]) => React.ReactElement;
}){
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);
    const [features, setFeatures] = useState<Feature[]>([]);

    useEffect(() => {
        function changeFeatures(evt: SelectEvent){ setFeatures(evt.selected) }
        interaction?.on("select", changeFeatures);
        return () => { interaction?.un("select", changeFeatures) }
    }, []);
    
    try{
        return (
            <BaseControl 
                collapsable={collapsable}
                collapseIcon={collapseIcon || icon}
                collapseButtonClassName={collapseButtonClassName}
                style={{display: features.length > 0 ? "block" : "none"}}
                {...props} 
            >
                { factory(features) }
            </BaseControl>
        );
    } catch (err) {
        throw new Error(`LAYER ${layer?.get('title')}: no factory is provided for 'SelectedInfoControl'.`);
    }
}
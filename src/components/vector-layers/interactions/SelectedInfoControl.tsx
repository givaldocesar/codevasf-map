import React, { useContext, useEffect, useState } from "react";
import { Feature } from "ol";
import { SelectEvent } from "ol/interaction/Select";
import { InteractionContext, LayerContext } from "../../contexts";
import { BaseControl } from "../../controls";

interface SelectedInfoControlProps {
    collapsable?: boolean;
    collapseImage?: string;
    collapsePositionButton?: "top_right" | "top_left";
    factory: (features: Feature[]) => React.ReactElement; 
}

const SelectedInfoControl: React.FC<React.HTMLAttributes<HTMLDivElement>&SelectedInfoControlProps> = ({
    children,
    collapsable,
    collapseImage,
    collapsePositionButton,
    factory,
    ...props
}) => {
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
                collapseImage={collapseImage}
                collapsePositionButton={collapsePositionButton}
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

export default SelectedInfoControl;
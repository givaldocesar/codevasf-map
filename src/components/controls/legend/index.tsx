import React from "react";
import BaseControl from "../BaseControl";
import TileLayersArea from "./tile-layers-area";
import VectorLayersArea from "./vector-layers-area";

interface LegendProps extends React.HTMLAttributes<HTMLDivElement>{
    collapsable?: boolean;
    collapseImage?: string;
    collapsePositionButton?: 'top_right' | 'top_left';
}

const Legend: React.FC<LegendProps> = ({
    className, 
    collapsable=false, 
    collapseImage, 
    collapsePositionButton ='top_right'
}) => {
    return (
        <BaseControl 
            className={className} 
            collapsable={collapsable}
            collapseImage={collapseImage}
            collapsePositionButton={collapsePositionButton}
        >
            <TileLayersArea />
            <VectorLayersArea />
        </BaseControl>
    );
}

export default Legend;
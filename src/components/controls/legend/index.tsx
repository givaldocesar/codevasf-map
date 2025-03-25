import BaseControl from "../BaseControl";
import TileLayersArea from "./tile-layers-area";
import VectorLayersArea from "./vector-layers-area";
import icon from "../../../assets/legend.png";

export default function Legend({
    className,
    collapsable=false, 
    collapseImage, 
    collapsePositionButton ='top_right'
}: {
    className?: string;
    collapsable?: boolean;
    collapseImage?: string;
    collapsePositionButton?: 'top_right' | 'top_left';
}){
    return (
        <BaseControl 
            className={className} 
            collapsable={collapsable}
            collapseImage={collapseImage || icon}
            collapsePositionButton={collapsePositionButton}
        >
            <TileLayersArea />
            <VectorLayersArea />
        </BaseControl>
    );
}
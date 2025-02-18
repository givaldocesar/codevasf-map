import BaseControl from "../BaseControl";
import TileLayersArea from "./tile-layers-area";
import VectorLayersArea from "./vector-layers-area";


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
            collapseImage={collapseImage}
            collapsePositionButton={collapsePositionButton}
        >
            <TileLayersArea />
            <VectorLayersArea />
        </BaseControl>
    );
}
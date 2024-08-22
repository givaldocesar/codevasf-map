import { BaseControl } from "..";
import TileLayersArea from "./tile-layers-area";
import VectorLayersArea from "./vector-layers-area";

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    collapsable?: boolean;
    collapseImage?: string;
    position?: 'top_right' | 'top_left';
}

const Legend: React.FC<Props> = ({
    className, 
    collapsable=false, 
    collapseImage, 
    position ='top_right'
}) => {
    return (
        <BaseControl 
            className={className} 
            collapsable={collapsable}
            collapseImage={collapseImage}
            position={position}
        >
            <TileLayersArea />
            <VectorLayersArea />
        </BaseControl>
    );
}

export default Legend;
import { BaseControl } from "..";
import TileLayersArea from "./tile-layers-area";
import VectorLayersArea from "./vector-layers-area";

const Legend: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className}) => {
    return (
        <BaseControl className={className}>
            <TileLayersArea />
            <VectorLayersArea />
        </BaseControl>
    );
}

export default Legend;
import { BaseControl } from "..";
import TileLayersArea from "./TileLayersArea";

const Legend: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className}) => {
    return (
        <BaseControl className={className}>
            <TileLayersArea />
        </BaseControl>
    );
}

export default Legend;
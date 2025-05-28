import BaseControl from "../BaseControl";
import TileLayersArea from "./tile-layers-area";
import VectorLayersArea from "./vector-layers-area";
import icon from "../../../assets/legend.png";

export default function Legend({
    className,
    collapsable=false, 
    collapseIcon, 
    collapseButtonClassName
}: {
    className?: string;
    collapsable?: boolean;
    collapseIcon?: string;
    collapseButtonClassName?: string;
}){
    return (
        <BaseControl 
            className={className} 
            collapsable={collapsable}
            collapseIcon={collapseIcon || icon}
            collapseButtonClassName={collapseButtonClassName}
        >
            <TileLayersArea />
            <VectorLayersArea />
        </BaseControl>
    );
}
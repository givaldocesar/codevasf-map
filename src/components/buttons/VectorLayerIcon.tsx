import { CategoryStyle, CustomSimpleStyle } from "../../classes";
import BaseIcon from "./BaseIcon";


interface VectorLayerIconProps {
    className?: string;
    style: CustomSimpleStyle | CategoryStyle;
    geometry: string | undefined;
    onClick?: (evt: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => void;
}

const VectorLayerIcon: React.FC<VectorLayerIconProps> = ({
    className="",
    style,
    geometry,
    onClick
}) => {
    let flat = style.getStyle();
    
    return (
        <BaseIcon className={className} onClick={onClick}>
            {
                flat['icon-src'] ?
                    <>
                    </> :
                geometry === 'Point' ?
                    <> 
                        <circle 
                            cx={25}
                            cy={25}
                            r={ flat['circle-radius'] as number }
                            stroke={ flat['circle-stroke-color'] as string }
                            strokeWidth={ flat['circle-stroke-width'] as number }
                            fill={ flat['circle-fill-color'] as string }
                            strokeLinecap="round"
                        />
                    </> :
                geometry === 'LineString' ?
                    <>
                        <line 
                            x1={5} y1={25} x2={45} y2={25}
                            stroke={ flat['circle-stroke-color'] as string }
                            strokeWidth={ flat['circle-stroke-width'] as number }
                            strokeLinecap="round"
                        />
                    </> :
                geometry === 'Polygon' ?
                    <>
                        <rect 
                            x={5} y={5} width={40} height={40} 
                            stroke={flat['circle-stroke-color'] as string }
                            strokeWidth={ flat['circle-stroke-width'] as number }
                            fill={ flat['circle-fill-color'] as string }
                            strokeLinecap="round"
                        />
                    </> :
                    <>
                        <title>Sem geometria definida</title>
                        <text x={10} y={48} >?</text>
                    </>    
            }
        </BaseIcon>
    );
}

export default VectorLayerIcon;
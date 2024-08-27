import { CategoryStyle, SimpleStyle } from "../../classes";
import styles from "./Button.module.scss";


interface Props {
    style: SimpleStyle | CategoryStyle;
    geometry: string | undefined;
}

const VectorLayerIcon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>&Props> = ({
    className="",
    style,
    geometry
}) => {
    let flat = style.getStyle();
    
    return (
        <svg className={`${styles.layer_icon} ${className}`} viewBox="0 0 50 50">
            {
                flat['icon-src'] ?
                    <>
                    </> :
                geometry === 'Point' ?
                    <> 
                        <circle 
                            cx={25}
                            cy={25}
                            r={ flat['circle-radius'] }
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
        </svg>
    );
}

export default VectorLayerIcon;
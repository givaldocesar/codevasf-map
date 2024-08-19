import { Icon, Circle } from "ol/style";
import { CustomStyle } from "../../classes";
import styles from "./Button.module.scss";


interface Props {
    style: CustomStyle;
    geometry: string | undefined;
}

const VectorLayerIcon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>&Props> = ({
    className="",
    style,
    geometry
}) => {
    return (
        <svg className={`${styles.layer_icon} ${className}`} viewBox="0 0 50 50">
            {
                style.getImage() instanceof Icon ?
                    <>
                    </> :
                geometry === 'Point' ?
                    <> 
                        <circle 
                            cx={25}
                            cy={25}
                            r={(style?.getImage() as Circle).getRadius()}
                            stroke={ (style?.getImage() as Circle).getStroke()?.getColor() as string }
                            strokeWidth={ (style?.getImage() as Circle).getStroke()?.getWidth() }
                            fill={ (style?.getImage() as Circle).getFill()?.getColor() as string }
                            strokeLinecap="round"
                        />
                    </> :
                geometry === 'LineString' ?
                    <>
                        <line 
                            x1={5} y1={25} x2={45} y2={25}
                            stroke={ style?.getStroke()?.getColor() as string }
                            strokeWidth={ style?.getStroke()?.getWidth() }
                            strokeLinecap="round"
                        />
                    </> :
                geometry === 'Polygon' ?
                    <>
                        <rect 
                            x={5} y={5} width={40} height={40} 
                            fill={ style?.getFill()?.getColor() as string }
                            stroke={ style?.getStroke()?.getColor() as string }
                            strokeWidth={ style?.getStroke()?.getWidth() }
                            strokeLinecap="round"
                        />
                    </> :
                    <>
                        <title>Sem geometria definida</title>
                        <text x={50} y={195}>?</text>
                    </>    
            }
        </svg>
    );
}

export default VectorLayerIcon;
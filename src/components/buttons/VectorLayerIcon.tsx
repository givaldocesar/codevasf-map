import { Circle, Icon } from "ol/style";
import { CustomSimpleStyle, CustomCategoryStyle } from "@/classes";
import { Geometries } from "@/interfaces";
import BaseIcon from "./BaseIcon";


export default function VectorLayerIcon({
    className,
    style,
    geometry,
    ...props
} : React.HTMLAttributes<HTMLOrSVGElement>&{
    style: CustomSimpleStyle | CustomCategoryStyle;
    geometry?: Geometries;
}){ 
    if(style.getImage() instanceof Icon){
        return (
            <BaseIcon className={className} {...props}>
                <image href={(style.getImage() as Icon).getSrc()} x={4} y={4} width={42} height={42}/>
            </BaseIcon>
        );
    }

    if(geometry === 'Point'){
        const circle = style.getImage() as Circle;
        
        return (
            <BaseIcon className={className} {...props}>
                <circle 
                    cx={25}
                    cy={25}
                    r={ circle.getRadius() }
                    stroke={ circle.getStroke()?.getColor() as string}
                    strokeWidth={ circle.getStroke()?.getWidth() }
                    fill={ circle.getFill()?.getColor() as string }
                    strokeLinecap="round"
                />
            </BaseIcon>
        );
    }

    if(geometry === 'LineString'){
        return (
            <BaseIcon className={className} {...props}>
                <line 
                    x1={5} y1={25} x2={45} y2={25}
                    stroke={ style.getStroke()?.getColor() as string }
                    strokeWidth={ style.getStroke()?.getWidth() }
                    strokeLinecap="round"
                /> 
            </BaseIcon>
        );
    }

    if(geometry === 'Polygon'){
        return (
            <BaseIcon className={className} {...props}>
                <rect 
                    x={5} y={5} width={40} height={40} 
                    stroke={ style.getStroke()?.getColor() as string }
                    strokeWidth={ style.getStroke()?.getWidth() }
                    fill={ style.getFill()?.getColor() as string }
                    strokeLinecap="round"
                />
            </BaseIcon>
        )
    }

    return (
        <BaseIcon className={className} {...props}>
            <title>Sem geometria definida</title>
            <text x={10} y={48} >?</text>
        </BaseIcon>
    );
}
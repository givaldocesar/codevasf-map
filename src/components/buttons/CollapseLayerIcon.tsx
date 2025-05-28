import classNames from "classnames";
import BaseIcon from "./BaseIcon";
import styles from "./Button.module.scss";


export default function CollapseLayerIcon({
    className,
    collpased=false,
    ...props
} : React.HTMLAttributes<HTMLOrSVGElement>&{
    collpased?: boolean;
}){
    return (
        <BaseIcon
            className={classNames(styles.collapse_icon, className)} 
            { ...props }
        >
            <title>{ collpased ? "Mostrar" : "Ocultar" }</title>
            {collpased ?
                <>
                    <line x1={10} y1={25} x2={40} y2={25} />
                    <line x1={25} y1={10} x2={25} y2={40} />
                </> :
                <>
                    <line x1={10} y1={25} x2={40} y2={25} />
                </>
            }
        </BaseIcon>
    );
}
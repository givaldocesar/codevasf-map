import BaseIcon from "./BaseIcon";
import styles from "./Button.module.scss";

interface Props {
    collpased?: boolean;
}

const CollapseLayerIcon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>&Props> = ({
    className="",
    onClick,
    collpased=false
}) => {
    return (
        <BaseIcon
            className={`${styles.collapse_icon} ${className}`} 
            onClick={onClick}
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

export default CollapseLayerIcon;
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
        <svg 
            className={`${styles.layer_icon} ${styles.collapse_icon} ${className}`} 
            viewBox="0 0 50 50"
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
        </svg>
    );
}

export default CollapseLayerIcon;
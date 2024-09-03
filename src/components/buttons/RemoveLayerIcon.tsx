import BaseIcon from "./BaseIcon";
import styles from "./Button.module.scss";

const RemoveLayerIcon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = ({
    className="",
    title="Remover camada",
    onClick
}) => {
    return (
        <BaseIcon 
            className={`${styles.remove_icon} ${className}`} 
            onClick={onClick}
        >
            <title>{title}</title>
            <line x1={10} y1={10} x2={40} y2={40} />
            <line x1={40} y1={10} x2={10} y2={40} />
        </BaseIcon>
    );
}

export default RemoveLayerIcon;
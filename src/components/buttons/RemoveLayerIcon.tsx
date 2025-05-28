import classNames from "classnames";
import BaseIcon from "./BaseIcon";
import styles from "./Button.module.scss";

export default function RemoveLayerIcon({
    className,
    title="Remover camada",
    ...props
} : React.HTMLAttributes<HTMLOrSVGElement>){
    return (
        <BaseIcon 
            className={classNames(styles.remove_icon, className)} 
            {...props}
        >
            <title>{title}</title>
            <line x1={10} y1={10} x2={40} y2={40} />
            <line x1={40} y1={10} x2={10} y2={40} />
        </BaseIcon>
    );
}
import classNames from "classnames";
import styles from "./Toolbar.module.scss";

export default function Tool({
    children,
    className,
    active,
    ...props
} : React.ButtonHTMLAttributes<HTMLButtonElement>&{
    active?: boolean;
}){
    return (
        <button
            className={classNames(styles.tool, {[styles.active]: active}, className)}
            { ...props } 
        >
            { children }
        </button>
    );
}
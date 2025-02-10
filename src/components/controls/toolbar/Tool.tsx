import classNames from "classnames";
import styles from "./Toolbar.module.scss";

export default function Tool({
    children,
    className="",
    active,
    ...props
} : React.ButtonHTMLAttributes<HTMLButtonElement>&{
    active?: boolean;
}){
    return (
        <button
            { ...props } 
            className={classNames({
                [styles.tool]: true,
                [styles.active]: active,
                [className]: className !== "" ? true : false
            })}
        >
            { children }
        </button>
    );
}
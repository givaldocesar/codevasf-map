import classNames from "classnames";
import styles from "./Toolbar.module.scss";

const Tool: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>&{
    active?: boolean;
}> = ({
    children,
    className="",
    active,
    ...props
}) => {
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

export default Tool;
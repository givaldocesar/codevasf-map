import BaseControl from "../BaseControl";
import styles from "./Toolbar.module.scss";

const Toolbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className=""
}) => {
    return (
        <BaseControl className={`${styles.toolbar} ${className}`}>
            { children }
        </BaseControl>
    );
}

export default Toolbar;
export { Toolbar };
export { default as Tool } from "./Tool";
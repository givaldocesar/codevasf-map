import BaseControl from "../BaseControl";
import styles from "./Toolbar.module.scss";

export default function Toolbar({
    children,
    className=""
}: React.HTMLAttributes<HTMLDivElement>){
    return (
        <BaseControl className={`${styles.toolbar} ${className}`}>
            { children }
        </BaseControl>
    );
}

export { Toolbar };
export { default as Tool } from "./Tool";
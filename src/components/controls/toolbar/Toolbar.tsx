import classNames from "classnames";
import BaseControl from "../BaseControl";
import styles from "./Toolbar.module.scss";

export default function Toolbar({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>){
    return (
        <BaseControl 
            className={classNames(className)} 
            contentClassName={styles.toolbar}
            {...props}
        >
            { children }
        </BaseControl>
    );
}

export { default as Tool } from "./Tool";
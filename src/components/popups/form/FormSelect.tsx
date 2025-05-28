import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Form.module.scss";


export default forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <select className={classNames(styles.select, className)} {...props} ref={ref}>
            { children }
        </select>
    );
});
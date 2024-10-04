import React, { forwardRef } from "react";
import styles from "./Form.module.scss";

const Select= forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({
    className="",
    children,
    ...props
}, ref) => {
    return (
        <select className={`${styles.select} ${className}`} {...props} ref={ref}>
            { children }
        </select>
    );
});

export default Select;
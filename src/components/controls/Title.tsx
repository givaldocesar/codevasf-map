import React from "react";
import BaseControl from "./BaseControl";
import styles from "./Controls.module.scss";

export default function Title({
    children, 
    className='', 
    textClassName,
    ...props
} : React.HTMLAttributes<HTMLHeadingElement>&{
    textClassName?: string
}){   
    return (
        <BaseControl className={`ol-unselectable ${styles.title} ${className}`}>
            <h2 className={textClassName} {...props}>
                {children}
            </h2>
        </BaseControl>
    );
}
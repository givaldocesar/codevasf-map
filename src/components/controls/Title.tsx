import React from "react";
import BaseControl from "./BaseControl";
import styles from "./Controls.module.scss";

const Title:React.FC<React.HTMLAttributes<HTMLHeadingElement>&{textClassName?: string}> = ({
    children, 
    className='', 
    textClassName,
    ...props
}) => {   
    return (
        <BaseControl className={`ol-unselectable ${styles.title} ${className}`}>
            <h2 className={textClassName} {...props}>
                {children}
            </h2>
        </BaseControl>
    );
}

export default Title;
import React from "react";
import styles from "./Loaders.module.scss";

export default function Loader({
    children,
    className
} : React.HTMLAttributes<HTMLDivElement>){
    return (
        <div className={className}>
            <p className={styles.pulse}>
                {children}
                <span className={styles.dots} />
            </p>
        </div>
    );
}
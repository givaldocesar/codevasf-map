import React from "react";
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";
import styles from "./Button.module.scss";


export default function CollapseButton({
    className,
    collapsed,
    icon,
    ...props
} : React.ButtonHTMLAttributes<HTMLButtonElement>&{
    collapsed?: boolean;
    icon?: string | StaticImageData
}){
    return (
        <button 
            type="button"
            className={classNames(styles.collapse_button, {[styles.collapsed]: collapsed}, className)}
            title= {collapsed ? "Mostrar" : "Ocultar"} 
            {...props}
        >
            {
                collapsed && icon ?  
                    <Image 
                        src={icon}
                        width={44}
                        height={44}
                        alt="collapse-icon"
                    /> :
                collapsed ?
                    <svg  viewBox="0 0 50 50" className={styles.collapse_icon}>
                        <line x1={10} y1={25} x2={40} y2={25} />
                        <line x1={25} y1={10} x2={25} y2={40} />
                    </svg> :
                <svg  viewBox="0 0 50 50" className={styles.collapse_icon}>
                    <line x1={10} y1={25} x2={40} y2={25} />
                </svg>
            }
        </button>
    );
}
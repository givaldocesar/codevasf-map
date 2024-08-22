import { useEffect, useState } from "react";
import styles from "./Button.module.scss";

interface Props {
    collapsed?: boolean;
    image?: string;
}

const CollapseButton: React.FC<React.HTMLAttributes<HTMLOrSVGElement>&Props> = ({
    className="",
    collapsed=false,
    onClick,
    image
}) => {

    return (
        <svg 
            className={`${styles.collapse_icon} ${styles.collapse_button} ${className}`} 
            viewBox="0 0 50 50"
            onClick={onClick}
            style={{position: collapsed ? 'static' : 'absolute'}}
        >
            <title>{ collapsed ? "Mostrar" : "Ocultar" }</title>
            {collapsed ? 
                <>
                    {image ?  
                        <image href={image} width={48} height={48}/> : 
                        <>
                            <line x1={10} y1={25} x2={40} y2={25} />
                            <line x1={25} y1={10} x2={25} y2={40} />
                        </>
                    }
                </>
                : 
                <line x1={10} y1={25} x2={40} y2={25} /> 
            }
        </svg>
    );
}

export default CollapseButton;
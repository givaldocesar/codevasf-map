import { StaticImageData } from "next/image";
import styles from "./Button.module.scss";


export default function CollapseButton({
    className="",
    collapsed=false,
    onClick,
    image
} : React.HTMLAttributes<HTMLOrSVGElement> & {
    collapsed?: boolean;
    image?: string | StaticImageData;
}){
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
                        <image x={3} y={3} href={image as string} width={44} height={44}/> : 
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
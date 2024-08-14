import { useRef, useContext, useEffect } from "react";
import Control from "ol/control/Control";
import { MapContext } from "../contexts";
import styles from "./Controls.module.scss";


const BaseControl: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className="", ...props}) => {
    const ref = useRef<HTMLDivElement>(null);
    const map = useContext(MapContext);

    useEffect(() => {
        if(!ref.current){ return }

        const control = new Control({element: ref.current });
        map?.addControl(control);
        return () => { map?.removeControl(control) };
    }, []);
    
    return (
        <div ref={ref} className={`${styles.control} ${className}`}{ ...props }>
            { children }
        </div>
    );
}

export default BaseControl;
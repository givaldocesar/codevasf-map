import React, { forwardRef, useRef, useContext, useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import Control from "ol/control/Control";
import { MapContext } from "../contexts";
import { CollapseButton } from "../buttons";
import styles from "./Controls.module.scss";



const BaseControl = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>&{
    collapsable?: boolean;
    collapsePositionButton?: 'top_right' | 'top_left';
    collapseImage?: string | StaticImageData;
}>(({
    children, 
    className="", 
    collapsable, 
    collapsePositionButton='top_right', 
    collapseImage,
    ...props
}, ref) => {
    const controlRef = useRef<HTMLDivElement>(null);
    const map = useContext(MapContext);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        if(collapsable) window.innerWidth < 960 ? setCollapsed(true) : false;
    }, []);

    useEffect(() => {
        if(!controlRef.current){ return }

        const control = new Control({element: controlRef.current });
        map?.addControl(control);
        return () => { map?.removeControl(control) };
    }, []);

    if(collapsable){
        return (
            <div style={{display: 'none'}}>
                <div ref={controlRef} className={`${styles.control} ${className}`} { ...props }>
                    {collapsable &&
                        <CollapseButton 
                            className={styles[collapsePositionButton]}
                            collapsed={collapsed} 
                            onClick={() => setCollapsed(!collapsed)} 
                            image={collapseImage}
                        />
                    }
                    <div style={{display: collapsed ? 'none' : 'block'}} ref={ref}>
                        { children }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{display: 'none'}}>
            <div ref={controlRef} className={`${styles.control} ${className}`} { ...props }>  
                { children }
            </div>
        </div>
    );
});

export default BaseControl;
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StaticImageData } from "next/image";
import classNames from "classnames";
import Control from "ol/control/Control";
import { useInnerRef } from "@/hooks";
import { MapContext } from "../contexts";
import { CollapseButton } from "../buttons";
import styles from "./Controls.module.scss";


export default forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>&{
    collapsable?: boolean;
    collapseButtonClassName?: string;
    collapseIcon?: string | StaticImageData;
    contentClassName?: string;
}>(({
    children,
    className,
    collapsable,
    collapseButtonClassName,
    collapseIcon,
    contentClassName,
    ...props
}, ref) => {
    const innerRef = useInnerRef(ref);

    const map = useContext(MapContext);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        if(collapsable) window.innerWidth < 960 ? setCollapsed(true) : false;
    }, []);

    useEffect(() => {
        if(!innerRef.current){ return }

        const control = new Control({element: innerRef.current });
        map?.addControl(control);
        return () => { map?.removeControl(control) };
    }, []);

    return (
        <div 
            ref={innerRef} 
            className={classNames(styles.control, {[styles.collapsed]: collapsed}, className)} 
            { ...props }
        >  
            {collapsable &&
                <CollapseButton 
                    className={collapseButtonClassName}
                    collapsed={collapsed} 
                    icon={collapseIcon}
                    onClick={() => setCollapsed(!collapsed)} 
                />
            }
            <div className={classNames(styles.content, contentClassName)}>
                { children }
            </div>
        </div>
    );
});
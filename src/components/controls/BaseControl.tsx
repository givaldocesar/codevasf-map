import { useRef, useContext, useEffect, useState } from "react";
import Control from "ol/control/Control";
import { MapContext } from "../contexts";
import { CollapseButton } from "../buttons";
import styles from "./Controls.module.scss";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    collapsable?: boolean;
    collapsePositionButton?: 'top_right' | 'top_left';
    collapseImage?: string;
}

const BaseControl: React.FC<Props> = ({
    children, 
    className="", 
    collapsable, 
    collapsePositionButton='top_right', 
    collapseImage,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const map = useContext(MapContext);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        if(collapsable) window.innerWidth < 960 ? setCollapsed(true) : false;
    }, []);

    useEffect(() => {
        if(!ref.current){ return }
        const control = new Control({element: ref.current });
        map?.addControl(control);
        return () => { map?.removeControl(control) };
    }, []);
    
    return (
        <div ref={ref} className={`${styles.control} ${className}`}{ ...props }>
            {collapsable &&
                <CollapseButton 
                    className={styles[collapsePositionButton]}
                    collapsed={collapsed} 
                    onClick={() => setCollapsed(!collapsed)} 
                    image={collapseImage}
                />
            }
            <div style={{display: collapsed ? 'none' : 'block'}}>
                { children }
            </div>
        </div>
    );
}

export default BaseControl;
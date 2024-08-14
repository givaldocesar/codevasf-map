import { useMemo, useContext, useEffect } from "react";
import { ScaleLine } from "ol/control";
import { MapContext } from "../contexts";


const Scale: React.FC<{
    className?: string;
    minWidth?: number;
    maxWidth?: number;
    target?: HTMLElement | string;
    units?: 'degrees' | 'imperial' | 'nautical' | 'metric' | 'us';
    bar?: boolean;
    steps?: number;
    text?: boolean;
    dpi?: number;
}> = ({
    className, 
    ...props
}) => {
    const map = useContext(MapContext);
    const scale = useMemo(() => {
        return new ScaleLine({
            className: `${className} ${props.bar ? 'ol-scale-bar' : 'ol-scale-line'}`,
            ...props
        });
    }, [props]);

    useEffect(() => {
        map?.addControl(scale);
        return () => { map?.removeControl(scale) }
    }, [map, scale]);
    
    return <></>;
}

export default Scale;
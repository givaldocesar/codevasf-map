import { useMemo, useContext, useEffect } from "react";
import { ScaleLine } from "ol/control";
import classNames from "classnames";
import { MapContext } from "../contexts";


export default function Scale({
    className, 
    ...props
} : {
    className?: string;
    minWidth?: number;
    maxWidth?: number;
    target?: HTMLElement | string;
    units?: 'degrees' | 'imperial' | 'nautical' | 'metric' | 'us';
    bar?: boolean;
    steps?: number;
    text?: boolean;
    dpi?: number;
}){
    const map = useContext(MapContext);
    const scale = useMemo(() => {
        return new ScaleLine({
            className: classNames(className, {'ol-scale-bar': props.bar, 'ol-scale-line': !props.bar}),
            ...props
        });
    }, [props]);

    useEffect(() => {
        map.addControl(scale);
        return () => { map.removeControl(scale) }
    }, [map, scale]);
    
    return <></>;
}
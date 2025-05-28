import React, { forwardRef, useEffect, useMemo } from "react";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { CustomMap } from "../classes";
import { useInnerRef } from "../hooks";
import { MapContext } from "./contexts";
import { TextLoader } from "./loaders";
import styles from "./Components.module.scss";


type MapOptions = {
    center?:        [number, number];
    projection?:    string;
    minZoom?:       number;
    maxZoom?:       number;
    name?:          string;
    zoom?:          number;
}

const Map = forwardRef<HTMLDivElement, MapOptions&React.HTMLAttributes<HTMLDivElement>>(({
    children,
    className,
    center,
    projection,
    minZoom,
    maxZoom,
    name,
    zoom,
    ...props
}, ref) => {
    const innerRef = useInnerRef(ref);

    const map = useMemo(() => {
        const baseMap = new CustomMap({
            projection: projection,
            center: center,
            zoom: zoom,
            minZoom: minZoom,
            maxZoom: maxZoom
        });

        baseMap.set('name', name);
        
        return baseMap;
    }, []);

    useEffect(() => {
        if(innerRef.current) map.setTarget(innerRef.current);
        return () => map.setTarget(undefined);
    }, []);
    
    return (
        <MapContext.Provider value={map}>
            <div className={classNames(styles.map, className)} ref={innerRef} {...props}>
                { children }
            </div>
        </MapContext.Provider>
    );
});

export default dynamic( () => Promise.resolve(Map), {
    loading: () => <TextLoader className={classNames(styles.loading_map, styles.map)}>Carregando</TextLoader>,
    ssr: false
});
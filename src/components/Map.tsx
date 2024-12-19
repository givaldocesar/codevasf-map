import React, { useEffect, useMemo, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { CustomMap } from "../classes";
import { CRS } from "../interfaces";
import { registerProjections } from "../utils";
import { TextLoader } from "./loaders";
import { MapContext } from "./contexts";
import styles from "./Components.module.scss";

registerProjections();

function Map({
    children,
    className="",
    projection,
    center,
    zoom,
    minZoom,
    maxZoom
}: {
    children?:      React.ReactNode; 
    className?:     string; 
    projection?:    CRS;
    center?:        [number, number];
    zoom?:          number;
    minZoom?:       number;
    maxZoom?:       number;
}){
    const ref = useRef<HTMLDivElement>(null);
    const [popup, setPopup] = useState<React.ReactNode>(null);

    const map = useMemo(() => new CustomMap({
        projection: projection,
        center: center,
        zoom: zoom,
        minZoom: minZoom,
        maxZoom: maxZoom
    }), []);

    useEffect(() => {
        map.setTarget(ref?.current || undefined);
        return () => map.setTarget(undefined);
    }, [ref.current]);

    useEffect(() => {
        ref.current?.addEventListener('show-popup', ((evt: CustomEvent) => {
            evt.stopPropagation();
            setPopup(evt.detail);
        }) as EventListener);
    });

    return (
        <div className={`${styles.map} ${className}`} ref={ref}>
            <MapContext.Provider value={map}>
                { children }
            </MapContext.Provider>
            { popup }
        </div>
    );
}

export default dynamic( () => Promise.resolve(Map), {
    loading: () => <TextLoader className={`${styles.loading_map} ${styles.map}`}>Carregando</TextLoader>,
    ssr: false
});
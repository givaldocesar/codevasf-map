import React, { useEffect, useMemo, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { CustomMap } from "../classes";
import { registerProjections } from "../utils";
import { TextLoader } from "./loaders";
import { MapContext } from "./contexts";
import styles from "./Components.module.scss";


registerProjections();

interface MapProps {
    projection?:    "EPSG:31983" | "EPSG:31984" | "EPSG:4674" | "EPSG:4326";
    center?:        [number, number];
    zoom?:          number;
    minZoom?:       number;
    maxZoom?:       number;
}

const Map: React.FC<React.HTMLAttributes<HTMLDivElement>&MapProps> = ({
    children,
    className="",
    projection,
    center,
    zoom,
    minZoom,
    maxZoom
}) => {
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
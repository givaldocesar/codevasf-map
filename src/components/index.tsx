import { useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { CustomMap } from "../classes";
import { registerProjections } from "../utils";
import { TextLoader } from "./loaders";
import { MapContext } from "./contexts";
import styles from "./Components.module.scss";

registerProjections();

const Map: React.FC<React.HTMLAttributes<HTMLDivElement>&{
    projection?:    string;
    center?:        [number, number];
    zoom?:          number;
    minZoom?:       number;
    maxZoom?:       number;
}> = ({
    children,
    className="",
    projection,
    center,
    zoom,
    minZoom,
    maxZoom
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const map = useMemo(() => new CustomMap({
        projection: projection,
        center: center,
        zoom: zoom,
        minZoom: minZoom,
        maxZoom: maxZoom
    }), []);

    useEffect(() => {
        if(!ref.current){ return }
        
        map.setTarget(ref.current);
        return () => map.setTarget(undefined);
    }, []);

    return (
        <div ref={ref} className={`${styles.map} ${className}`}>
            <MapContext.Provider value={map}>
                { children }
            </MapContext.Provider>
        </div>
    );
}

export default dynamic( () => Promise.resolve(Map), {
    loading: () => <TextLoader className={`${styles.loading_map} ${styles.map}`}>Carregando</TextLoader>,
    ssr: false
});
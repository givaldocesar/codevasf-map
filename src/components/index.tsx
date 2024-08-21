import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { CustomMap } from "../classes";
import { registerProjections } from "../utils";
import { TextLoader } from "./loaders";
import { MapContext } from "./contexts";
import styles from "./Components.module.scss";
import { getUid } from "ol";

registerProjections();

interface Props {
    projection?:    "EPSG:31983" | "EPSG:31984" | "EPSG:4674" | "EPSG:4326";
    center?:        [number, number];
    zoom?:          number;
    minZoom?:       number;
    maxZoom?:       number;
}

const Map: React.FC<React.HTMLAttributes<HTMLDivElement>&Props> = ({
    children,
    className="",
    projection,
    center,
    zoom,
    minZoom,
    maxZoom
}) => {
    const map = useMemo(() => new CustomMap({
        projection: projection,
        center: center,
        zoom: zoom,
        minZoom: minZoom,
        maxZoom: maxZoom
    }), []);

    const mapID = `map_${getUid(map)}`;

    useEffect(() => {
        map.setTarget(mapID);
        return () => map.setTarget(undefined);
    }, []);

    return (
        <div className={`${styles.map} ${className}`} id={mapID}>
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
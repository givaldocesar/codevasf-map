import { useMemo, useContext, useEffect } from "react";
import { GeoJSON } from "ol/format";
import { CustomLayer } from "../../classes";
import { MapContext } from "../contexts";
import { AttributionLike } from "ol/source/Source";

const FORMAT = new GeoJSON();

interface Props {
    children?: React.ReactNode;
    attributions?: AttributionLike;
    data: {[property: string]: any} | {[property: string]: any}[];
    minZoom?: number;
    maxZoom?: number;
    visible?: boolean;
    zIndex?: number;

    title?: string;
    order?: number;
    geometry: 'Point' | 'LineString' | 'Polygon';
}

const Layer: React.FC<Props> = ({children, data, ...props}) => {
    const map = useContext(MapContext);
    const layer = useMemo(() => {
        const features = FORMAT.readFeatures(data, {
            featureProjection: map?.getView().getProjection()
        });

        return new CustomLayer({features: features, ...props});
    }, []);
    
    useEffect(() => {
        map?.addLayer(layer);
        return () => { map?.removeLayer(layer) }
    }, []);
    
    return <>{children}</>
}

export default Layer;
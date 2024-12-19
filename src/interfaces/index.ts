import { AttributionLike } from "ol/source/Source";

export interface Filter {
    field: string;
    value: string | null | undefined;
}

export interface CacheIndex {
    name: string;
    keyPath?: string;
    unique?: boolean;
}

export interface BaseLayerProps {
    children?: React.ReactNode;
    attributions?: AttributionLike;
    maxZoom?: number;
    minZoom?: number;
    zIndex?: number;
    fit?: boolean;
    title?: string;
    order?: number;
    geometry: Geometries;
}

export type CRS = "EPSG:31983" | "EPSG:31984" | "EPSG:4674" | "EPSG:4326";

export type Geometries = 'Point' | 'LineString' | 'Polygon'; 

export type LayerStatus = 'loading' | 'error' | 'complete';
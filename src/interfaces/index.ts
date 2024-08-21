export interface Filter {
    field: string;
    value: string | null | undefined;
}

export interface CacheIndex {
    name: string;
    keyPath?: string;
    unique?: boolean;
}

export type Geometries = 'Point' | 'LineString' | 'Polygon'; 

export type LayerStatus = 'loading' | 'error' | 'complete';
export interface Filter {
    field: string,
    value: string | null | undefined;
}

export type Geometries = 'Point' | 'LineString' | 'Polygon'; 

export type LayerStatus = 'loading' | 'error' | 'complete';
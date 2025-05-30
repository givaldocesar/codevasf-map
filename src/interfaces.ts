import { Feature } from "ol";
import { FlatText } from "ol/style/flat";
import { AttributionLike } from "ol/source/Source";

//CONSTANTS---------------------------------------------------------------
export const NULL_VALUE = "NULL_VALUE";

export const STATUS = "$T4TUS";

export const ERROR = "3RR0R";

export const FIELD_REGEX = /\{[\w]+\}/gi;

export const ELSE_CATEGORY = '3LS3-C4T3G0RY';

//FEATURES-----------------------------------------------------
export type Geometries = 'Point' | 'LineString' | 'Polygon' | 'NoGeometry'; 

export type LayerStatus = 'loading' | 'error' | 'complete';

export type FeatureStatus = "edited" | "excluded" | "loading" | "error" | "updated" | "removed" | null;

export type APIType = {
    url: string;
    token?: string;
}

export type APIData = {
    crs: string;
    geometry: string;
    [key: string]: string | number | undefined
}

export type Filter = {
    type: "NULL_VALUE" | "number" | "text" | "checkbox";
    field: string;
    value?: string | boolean| number| null;
}

export type FieldType = {
    name: string;
    label?: string;
    columnWidth?: string;
    type?: 'text' | 'number' | 'file' | 'text-area';
    maxLength?: number;
    editable?: boolean;
    decimals?: number;
    calculate?: (feature: Feature) => number;
}

export type CacheIndex = {
    name: string;
    keyPath?: string;
    unique?: boolean;
}

export type BaseLayerProps = {
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

export type AttributesTableOptions = {
    api?: APIType; 
    allowDelete?: boolean;
    allowDownload?: boolean;
    filters?: boolean;
    headers?: boolean;
    multipleEdit?: boolean; 
    rowFactory?: (feature: Feature) => React.ReactNode; 
    extraRowTools?: {
        toolsClassName?: string;
        factory: (feature: Feature) => React.ReactNode;
    }
}

//STYLES-------------------------------------------------------
export type LabelType = {
    text?: FlatText; 
    expression: string;
}
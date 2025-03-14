import { Feature } from "ol";
import { WKT } from "ol/format";
import { CustomLayer } from "../../../classes";

//CONTANTS
export const NULL_VALUE = "NULL_VALUE";

export const STATUS = "$T4TUS";

export const ERROR = "3RR0R";

export type FeatureStatus = "edited" | "excluded" | "loading" | "error" | "updated" | "removed" | null;

export type APIType = {
    url: string;
    token?: string;
}

export type FilterType = {
    type: "NULL_VALUE" | "number" | "text" | "checkbox";
    name: string;
    value: string | number | boolean| null;
}

export type FieldType = {
    name: string,
    label?: string,
    columnWidth?: string,
    type?: 'text' | 'number' | 'file',
    maxLength?: number,
    editable?: boolean,
    decimals?: number
}

//SORTER------------------------------------------------------------------------------------
export type SorterStatus = "waiting" | "ascendent" | "descendent";

export class SorterEvent extends CustomEvent<{field: string, type: SorterStatus}>{
    static type = "sort-features";

    constructor(type: SorterStatus, field: string){
        super("sort-features", {
            bubbles: true,
            detail: {
                type: type,
                field: field
            }
        });
    }
}

//FUNCTIONS----------------------------------------------------------------------------------
export function clear(element: HTMLElement){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

export function convertToFilter(field: HTMLInputElement): FilterType | null {     
    if(!field.value) return null;

    if(field.value === "NULL"){
        return {
            type: NULL_VALUE,
            name: field.name,
            value: null
        }
    }
    
    switch(field.type){
        case 'checkbox':
            if(field.checked) {
                return {
                    type: 'checkbox',
                    name: field.name,
                    value: field.checked
                }
            }
            
            return null;
        case 'number':
            return {
                type: 'number',
                name: field.name,
                value: parseFloat(field.value)
            }
        default:
            return {
                type: "text",
                name: field.name,
                value: field.value
            }
    }
}

export async function updateFeature(feature: Feature, api?: APIType){
    const format = new WKT({splitCollection: true});
    const { geometry, createdAt, updatedAt, ...properties } = feature.getProperties();
    delete properties[STATUS];
    delete properties[ERROR];
                    
    const data = {
        geometry: format.writeGeometry(geometry),
        ...properties
    }

    if(api){
        feature.set(STATUS, "loading");

        const response = await fetch(api.url, {
            method: "PUT",
            headers: {'Authorization': api.token as string},
            body: JSON.stringify(data)
        });

        switch(response.status){
            case 403:
                feature.set(STATUS, "error");
                feature.set(ERROR, "Operação não permitida para o usuário.");
                break;
            case 404:
                feature.set(STATUS, "error");
                feature.set(ERROR, "invalid API URL.");
                break;
            case 400:
                const error = await response.json()
                feature.set(STATUS, "error");
                feature.set(ERROR, error.message);
                break;
            case 200:
                feature.set(STATUS, "updated");
                return true;
            default:
                feature.set(STATUS, "error");
                feature.set(ERROR, "Erro desconhecido");
        }
    }  

    return false;
}

export async function deleteFeature(layer: CustomLayer, feature: Feature, api?: APIType){
    const { geometry, createdAt, updatedAt, ...properties } = feature.getProperties();

    if(api){
        feature.set(STATUS, "loading");

        const response = await fetch(api.url, {
            method: "DELETE",
            headers: {'Authorization': api.token as string},
            body: JSON.stringify(properties)
        });

        switch(response.status){
            case 403:
                feature.set(STATUS, "error");
                feature.set(ERROR, "Operação não permitida para o usuário.");
                break;
            case 404:
                feature.set(STATUS, "error");
                feature.set(ERROR, "invalid API URL.");
                break;
            case 400:
                const error = await response.json()
                feature.set(STATUS, "error");
                feature.set(ERROR, error.message);
                break;
            case 200:
                feature.set(STATUS, "removed");
                layer.getSource()?.removeFeature(feature);
                layer.changed();
                return true;
            default:
                feature.set(STATUS, "error");
                feature.set(ERROR, "erro desconhecido");
        }
    }  

    return false;
}
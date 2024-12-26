export type FieldType = {
    name: string,
    label?: string,
    columnWidth?: string,
    type?: 'text' | 'number' | 'file',
    maxLength?: number,
    editable?: boolean
}

export type SorterStatus = "waiting" | "asc" | "desc";

export function clear(element: HTMLElement){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

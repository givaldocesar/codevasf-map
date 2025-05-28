import { Filter, NULL_VALUE } from "../interfaces";

export default function convertToFilter(field: HTMLInputElement): Filter | null {     
    if(!field.value) return null;

    if(field.value === "NULL"){
        return {
            type: NULL_VALUE,
            field: field.name,
            value: null
        }
    }
    
    switch(field.type){
        case 'checkbox':
            if(field.checked) {
                return {
                    type: 'checkbox',
                    field: field.name,
                    value: field.checked
                }
            }
            
            return null;
        case 'number':
            return {
                type: 'number',
                field: field.name,
                value: parseFloat(field.value)
            }
        default:
            return {
                type: "text",
                field: field.name,
                value: field.value
            }
    }
}
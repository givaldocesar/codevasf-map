import { Feature } from "ol";
import { Filter, STATUS } from "../../../../interfaces";

export class AttributesTableEditEvent extends CustomEvent<{onlyFiltered: boolean, values: Filter[]}>{
    static type = "attribute-table-edit-features";
    
    constructor(values: Filter[], onlyFiltered=false){
        super("attribute-table-edit-features", {
            bubbles: true,
            detail: {
                onlyFiltered: onlyFiltered,
                values: values
            }
        })
    }
}

export default async function setEditedFeatures(features: Feature[], values: Filter[]) : Promise<void>{
    features.forEach(feature => {
        if(feature.get(STATUS) !== 'loading'){
            feature.set(STATUS, "edited");
            values.forEach(value => feature.set(value.field, value.value));
        }
    });
}
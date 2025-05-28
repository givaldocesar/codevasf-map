import { Feature, getUid} from "ol";

export type SorterStatus = "waiting" | "ascendent" | "descendent";

export function sortFeatures(features: Feature[], field: string, type: SorterStatus) : Feature[] {
    if(field === 'ol_uid'){
        features.sort((A, B) => {
            if(getUid(A) > getUid(B)) return type === "ascendent" ?  1 : -1;
            if(getUid(A) < getUid(B)) return type === "ascendent" ? -1 :  1;
            return 0;
        });
    }

    features.sort((A, B) => {
        if(!A.get(field) && !B.get(field)) return 0;
        if(A.get(field) && !B.get(field)) return type === "ascendent" ?  1 : -1;
        if(!A.get(field) && B.get(field)) return type === "ascendent" ? -1 :  1;
        
        if(A.get(field) > B.get(field)) return type === "ascendent" ?  1 : -1;
        if(A.get(field) < B.get(field)) return type === "ascendent" ? -1 :  1;
        return 0;
    });

    return [...features];
}

export default class SorterEvent extends CustomEvent<{field: string, type: SorterStatus}>{
    static type = "attributes-table-sort-features";

    constructor(type: SorterStatus, field: string){
        super("attributes-table-sort-features", {
            bubbles: true,
            detail: {
                type: type,
                field: field
            }
        });
    }
}
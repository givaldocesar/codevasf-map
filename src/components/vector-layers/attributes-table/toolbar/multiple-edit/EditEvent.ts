import { FilterType } from "../../utils";

export default class EditEvent extends CustomEvent<{onlyFiltered: boolean, values: FilterType[]}>{
    static type = "edit-features";
    constructor(values: FilterType[], onlyFiltered=false){
        super("edit-features", {
            bubbles: true,
            detail: {
                onlyFiltered: onlyFiltered,
                values: values
            }
        })
    }
}
import { Feature } from "ol";

export default class FilterEvent extends CustomEvent<Feature[]>{
    static type = "filter";

    constructor(features : Feature[] ){
        super("filter", {
            detail: features,
            bubbles: true
        });
    }
}
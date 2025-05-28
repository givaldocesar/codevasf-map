import { Feature } from "ol";

export default class FeaturesFilteredEvent extends CustomEvent<Feature[]>{
    static type = "features-filtered";

    constructor(features : Feature[] ){
        super("features-filtered", {
            detail: features,
            bubbles: true
        });
    }
}
import { Feature } from "ol";
import { createEmpty, extend } from "ol/extent";

export default function getFeaturesExtent(features: Feature[]){
    const extent = createEmpty();
    features.forEach(feature => {
        const featExtent = feature.getGeometry()?.getExtent();
        if(featExtent) extend(extent, featExtent);
    });

    return extent;
}
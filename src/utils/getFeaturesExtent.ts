import { Feature } from "ol";
import { createEmpty, extend } from "ol/extent";

export default function getFeaturesExtent(features: Feature[]){
    const extent = createEmpty();
    features.forEach(feat => {
        extend(extent, feat.getGeometry()?.getExtent() || createEmpty());
    });

    return extent;
}
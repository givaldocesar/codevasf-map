import { Feature } from "ol";
import { GeoJSON } from "ol/format";
import { Extent } from "ol/extent";
import booleanIntersects from "@turf/boolean-intersects";



export default async function checkFeaturesIntersect(featureA: Feature, featureB: Feature){
    if(featureA.getGeometry()?.intersectsExtent(featureB.getGeometry()?.getExtent() as Extent)){
        const GEOJSON = new GeoJSON({});
        const JSONFeatureA = GEOJSON.writeFeatureObject(featureA);
        const JSONFeatureB = GEOJSON.writeFeatureObject(featureB);
        return booleanIntersects(JSONFeatureA, JSONFeatureB);
    }
    
    return false;
}
import { Feature } from "ol";
import { GeoJSON } from "ol/format";
import booleanIntersects from "@turf/boolean-intersects";


export default async function checkFeaturesIntersect(featureA: Feature, featureB: Feature){
    const GEOJSON = new GeoJSON({});
    const JSONFeatureA = GEOJSON.writeFeatureObject(featureA);
    const JSONFeatureB = GEOJSON.writeFeatureObject(featureB);
    
    return booleanIntersects(JSONFeatureA, JSONFeatureB)
}
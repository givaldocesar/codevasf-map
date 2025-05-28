import { Feature } from "ol";

export default function getFieldsFromFeature(feature: Feature){
    const { geometry, ...properties } = feature.getProperties();
    return Object.keys(properties).map(key => ({name: key, editable: false})); 
}
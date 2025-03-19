import { GeoJSON } from "ol/format";
import { Projection } from "ol/proj";
import { CustomLayer, LayerCache } from "../../../classes";
import apiDataToFeature, { APIData } from "./apiDataToFeature";


export default function processAPIData({
    layer, 
    apiURL,
    database, 
    projection, 
    cache, 
    version, 
    groupField
} : {
    layer: CustomLayer;
    apiURL: string;
    database: string;
    projection?: Projection;
    cache: LayerCache; 
    version: {updatedAt: string; [field: string]: string; }; 
    groupField: string;
}){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const cacheData = await cache.get(version[groupField]);

            if(cacheData?.lastModified === version.updatedAt) {
                //CACHE FEATURES           
                const features = new GeoJSON().readFeatures(cacheData.features);
                layer.getSource()?.addFeatures(features);
                
            } else {
                //SERVER FEATURES
                const response = await fetch(apiURL + `/${database}?${groupField}=${version[groupField]}`);
            
                if(response.ok){
                    const data: APIData | APIData [] = await response.json();
                    const features =  apiDataToFeature(data, projection);
                    layer.getSource()?.addFeatures(features);
    
                    const jsonFeatures = new GeoJSON().writeFeaturesObject(features);
                    await cache.insert({
                        lastModified: version.updatedAt,
                        [groupField]: version[groupField],
                        features: jsonFeatures
                    });
                }
            }

            resolve(true);
        } catch(error){
            reject(error);
        }
    });
}
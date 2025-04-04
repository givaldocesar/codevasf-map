import { Feature } from "ol";
import { WKT } from "ol/format";
import { Projection } from "ol/proj";

export interface APIData {
    crs: string;
    geometry: string;
    [key: string]: string | number | undefined
}

function conversor(data : APIData, projection?: Projection){
    const {crs, geometry, ...properties } = data
    
    let convertedGeometry;
    try{
        convertedGeometry = new WKT().readGeometry(geometry, {
            dataProjection: crs,
            featureProjection: projection
        });
    } catch {
    
    }

    return new Feature({
        geometry: convertedGeometry,
        ...properties
    });
}

export default function apiDataToFeature(data: APIData | APIData[], projection?: Projection){
    const features: Feature[] = [];

    if(data instanceof Array){
        data.forEach(value => {
            const feature = conversor(value, projection);
            features.push(feature);
        });
    } else {
        const feature = conversor(data, projection);
        features.push(feature);
    }

    return features;
}
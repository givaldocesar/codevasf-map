import { Feature } from "ol";
import { WKT } from "ol/format";
import { Projection } from "ol/proj";

export interface APIData {
    crs: string;
    geometry: string;
    properties: {};
}

function conversor(data : APIData, projection?: Projection){
    return new Feature({
        geometry: new WKT().readGeometry(data.geometry, {
            dataProjection: data.crs,
            featureProjection: projection
        }),
        ...data.properties
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
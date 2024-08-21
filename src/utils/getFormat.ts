import { GeoJSON, KML } from "ol/format";

export default function getFormat(type: string){
    type = type.toLowerCase();

    if(type.includes('application/json') || type in ['geojson', 'json']){
        return new GeoJSON({});
    } else {
        return new KML({extractStyles: false});
    }
}
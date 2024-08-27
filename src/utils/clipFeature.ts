import { Feature } from "ol";
import { GeoJSON } from "ol/format";
import { Extent } from "ol/extent";
import { SimpleGeometry } from "ol/geom";
import bboxClip from "@turf/bbox-clip";


export default function clipFeature(geometry: SimpleGeometry, extent: Extent){
    const format = new GeoJSON();

    try{
        const element = format.writeGeometryObject(geometry);
        //@ts-ignore
        const clipped = bboxClip(element, extent);
        return format.readFeature(clipped) as Feature;
    } catch (error) {
        return null;
    }
}
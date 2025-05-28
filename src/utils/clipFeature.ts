import { GeoJSON } from "ol/format";
import { Extent } from "ol/extent";
import { Geometry, Polygon } from "ol/geom";
import bboxClip from "@turf/bbox-clip";
import truncate from "@turf/truncate";


export default function clipFeature(geometry: Geometry, extent?: Extent){
    const format = new GeoJSON();

    try{
        const element = format.writeGeometryObject(geometry);
        //@ts-ignore
        const clipped = truncate(bboxClip(element, extent), { coordinates: 2 });
        return format.readGeometry(clipped.geometry);
    } catch (error) {
        return null;
    }
}
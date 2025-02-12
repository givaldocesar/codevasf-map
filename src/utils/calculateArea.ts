import { MultiPolygon, Polygon } from "ol/geom";
import { getTransform, ProjectionLike } from "ol/proj";

export default function calculateArea(geometry: Polygon | MultiPolygon, sourceCRS: ProjectionLike, destCRS?: ProjectionLike){
    if(destCRS){
        const transform = getTransform(sourceCRS, destCRS);
        const convertedGeometry = geometry.clone();
        convertedGeometry.applyTransform(transform);
        return convertedGeometry.getArea();
    }
    
    return geometry.getArea();
}
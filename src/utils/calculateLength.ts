import { MultiLineString, LineString } from "ol/geom";
import { getTransform, ProjectionLike } from "ol/proj";

export default function calculateLength(geometry: LineString | MultiLineString, sourceCRS: ProjectionLike, destCRS?: ProjectionLike){
    let geometryToCalculate = geometry.clone();
    
    if(destCRS){
        const transform = getTransform(sourceCRS, destCRS);
        geometryToCalculate.applyTransform(transform);
    }
    
    if(geometryToCalculate.getType() === 'LineString'){
        return (geometryToCalculate as LineString).getLength();
    }

    if(geometryToCalculate.getType() === 'MultiLineString'){
        return (geometryToCalculate as MultiLineString).getLineStrings().reduce((sum, line) => sum += line.getLength(), 0)
    }

    return 0;
}
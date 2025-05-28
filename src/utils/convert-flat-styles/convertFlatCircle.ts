import { Circle, Fill, Stroke } from "ol/style";
import { FlatCircle } from "ol/style/flat";
import { Options } from "ol/style/Circle";

export default function convertFlatCircle(flatCircle: FlatCircle){
    const props : Options = { 
        radius: flatCircle['circle-radius'] as number,
        displacement: flatCircle['circle-displacement'],
        scale: flatCircle['circle-scale'],
        rotation: flatCircle['circle-rotation'] as number,
    }

    if(flatCircle['circle-fill-color']){
        props['fill'] = new Fill({color: flatCircle['circle-fill-color']})
    }

    if(Object.getOwnPropertyNames(flatCircle).some(property => property.includes('circle-stroke'))){
        props['stroke'] = new Stroke({
            color: flatCircle['circle-stroke-color'],
            width: flatCircle['circle-stroke-width'] as number,
            lineJoin: flatCircle['circle-stroke-line-join'] as CanvasLineJoin, 
            lineCap: flatCircle['circle-stroke-line-cap'] as CanvasLineCap,
        });
    }

    if(JSON.stringify(props) !== '{}') return new Circle(props);
}
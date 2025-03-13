import { Stroke } from "ol/style";
import { FlatStroke } from "ol/style/flat";

export default function convertFlatStroke(flatStroke: FlatStroke){
    const props = {
        color: flatStroke["stroke-color"],
        width: flatStroke["stroke-width"] as number,
        lineCap: flatStroke["stroke-line-cap"] as CanvasLineCap,
        lineJoin: flatStroke["stroke-line-join"] as CanvasLineJoin,
        lineDash: flatStroke["stroke-line-dash"],
        lineDashOffset: flatStroke["stroke-line-dash-offset"] as number,
        miterLimit: flatStroke["stroke-miter-limit"] as number
    }
    
    if(JSON.stringify(props) !== '{}') return new Stroke(props);
    
    return null;
}
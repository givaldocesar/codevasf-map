import { FlatStyle } from "ol/style/flat";
import { Style } from "ol/style";
import ImageStyle from "ol/style/Image";
import convertFlatFill from "./convertFlatFill";
import convertFlatStroke from "./convertFlatStroke";
import convertFlatIcon from "./convertFlatIcon";
import convertFlatCircle from "./convertFlatCircle";
import convertFlatText from "./convertFlatText";
 

export default function convertFlatStyle(flatStyle: FlatStyle){
    const fill = convertFlatFill(flatStyle);
    const stroke = convertFlatStroke(flatStyle);
    const icon  = convertFlatIcon(flatStyle);
    const circle = convertFlatCircle(flatStyle);
    const text = convertFlatText(flatStyle);

    const style = new Style({
        fill: fill,
        stroke: stroke,
        image: (icon || circle) as ImageStyle,
        text: text
    });

    return style;
}
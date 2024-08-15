import { Style, Stroke, Fill, Circle } from "ol/style";

const defaultStroke = new Stroke({color: 'black', width: 2});
const defaultFill = new Fill({color: '#FFFFFF7F'});

export const defaultStyle = new Style({
    stroke: defaultStroke,
    fill: defaultFill,
    image: new Circle({
        stroke: defaultStroke,
        fill: defaultFill,
        radius: 10
    })
});
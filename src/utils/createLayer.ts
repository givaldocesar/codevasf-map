import { Feature } from "ol";
import randomColor from "./randomColor";
import CustomMap from "../classes/CustomMap";
import CustomLayer from "../classes/CustomLayer";
import CustomSimpleStyle from "../classes/CustomSimpleStyle";
import { FlatStyle } from "ol/style/flat";


export default function createLayer({
    map,  
    features, 
    options
} : {
    map?: CustomMap; 
    features?: Feature[];
    options?: {
        title?: string;
        ignore?: boolean;
        showProperties?: boolean;
        style?: FlatStyle;
    }
}) : CustomLayer {
    const stroke = randomColor("HEX", 0.75);
    const fill = randomColor("HEX", 0.50);

    //LAYER
    const layer = new CustomLayer({
        geometry: 'Polygon',
        zIndex: 9999,
        style: new CustomSimpleStyle({
            "stroke-color": stroke,
            "stroke-width": 5,
            "circle-stroke-color": stroke,
            "fill-color": fill,
            "circle-fill-color": fill,
            "circle-radius": 10,
            ...options?.style
        })
    });
    layer.set('ignore', options?.ignore);
    layer.set('title', options?.title);
    if(features) layer.getSource()?.addFeatures(features); 
    map?.addLayer(layer);

    return layer;
}
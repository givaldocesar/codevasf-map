import { Feature, Overlay } from "ol";
import { Select } from "ol/interaction";
import { never, pointerMove } from "ol/events/condition";
import { Style, Stroke, Fill, Circle } from "ol/style";
import { CustomLayer, CustomMap } from "../classes";
import updatePopup from "../components/controls/drag-and-drop/updatePopup";
import randomColor from "./randomColor";
import styles from "./Utils.module.scss";


export default function createRandomLayer({
    map, 
    title, 
    features, 
    showProperties
} : {
    map?: CustomMap | null; 
    title?: string;
    features?: Feature[];
    showProperties?: boolean;
}){
    const stroke = randomColor("HEX", 0.75);
    const fill = randomColor("HEX", 0.50);
    
    //LAYER
    const layer = new CustomLayer({
        geometry: 'Polygon',
        zIndex: 9999,
        style: {
            "stroke-color": stroke,
            "circle-stroke-color": stroke,
            "fill-color": fill,
            "circle-fill-color": fill
        }
    });
    layer.set('ignore', true);
    layer.set('title', title);
    if(features) layer.getSource()?.addFeatures(features); 

    //HOVER SHOWING PROPERTIES
    if(showProperties && map){
        const hover = new Select({
            condition: pointerMove,
            toggleCondition: never,
            style: new Style({
                stroke: new Stroke({color: "crimson", width: 4}),
                fill: new Fill({color: "#F0808095"}),
                image: new Circle({
                    radius: 10,
                    stroke: new Stroke({color: "crimson", width: 4}),
                    fill: new Fill({color: "#F0808095"})
                })
            }),
            layers: [layer]
        });

        hover.on('select', (evt) => {
            if(evt.selected.length > 0){
                map.getViewport().style.cursor = "zoom-in";
            } else {
                map.getViewport().style.cursor = "default";
            }
        });

        const container = document.createElement('div');
        container.className = styles.popup;

        const popup = new Overlay({
            element: container
        });

        hover.on('select', (evt) => {
            if(evt.selected.length > 0){
                updatePopup(popup, evt.selected[0]);
                popup.setPosition(evt.mapBrowserEvent.coordinate);
                map.addOverlay(popup);
            } else {
                map.removeOverlay(popup);
            }
        });

        map.addInteraction(hover);
    }

    return layer;
}
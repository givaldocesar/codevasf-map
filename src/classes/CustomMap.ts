import { Map, View } from "ol";
import { defaults } from "ol/interaction/defaults";
import { Extent, isEmpty } from "ol/extent";
import Layer from "ol/layer/Layer";
import { registerProjections } from "../utils";

registerProjections();

export default class CustomMap extends Map {
    constructor({
        projection='EPSG:4674',
        center=[0,0],
        zoom=4,
        minZoom=1,
        maxZoom=20
    }){
        super({
            controls: [],
            interactions: defaults({
                doubleClickZoom: false, 
                shiftDragZoom: false,
                onFocusOnly: true
            }),
            view: new View({
                projection: projection,
                center: center,
                zoom: zoom,
                minZoom: minZoom,
                maxZoom: maxZoom
            })
        });
    }

    getLayerByTitle(title: string) : Layer | null {
        const layers = this.getAllLayers();
        for(let i = 0; i < layers.length; i++){
            if(layers[i].get("title") === title) return layers[i];
        }

        return null;
    }

    fit(extent: Extent | undefined | null, maxZoom?: number) : void {
        if(extent && !isEmpty(extent)){
            this.getView().fit(extent, {
                padding: [50, 50, 50, 50],
                duration: 500,
                maxZoom: maxZoom || 15
            });
        }
    }
}
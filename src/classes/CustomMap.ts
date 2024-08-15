import { Map, View } from "ol";
import { Extent } from "ol/extent";
import { defaults } from "ol/interaction/defaults";

class CustomMap extends Map {
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

    fit(extent: Extent){
        this.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 500
        });
    }
}

export default CustomMap;
export type MapType = InstanceType<typeof CustomMap>;
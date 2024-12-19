import { Map as OLMap, View } from "ol";
import { Extent, isEmpty } from "ol/extent";
import { defaults } from "ol/interaction/defaults";

export default class CustomMap extends OLMap {
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

    fit(extent?: Extent | null, maxZoom?: number){
        if(extent && !isEmpty(extent)){
            this.getView().fit(extent, {
                padding: [50, 50, 50, 50],
                duration: 500,
                maxZoom: maxZoom || 15
            });
        }
    }
}
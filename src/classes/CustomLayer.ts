import { Feature } from "ol";
import VectorImageLayer from "ol/layer/VectorImage";
import { AttributionLike } from "ol/source/Source";
import VectorSource from "ol/source/Vector";
import { defaultStyle } from "../components/vector-layers/styles";

interface Options {
    attributions?: AttributionLike;
    features?: Feature[];
    title?: string;
    order?: number;
    geometry: 'Point' | 'LineString' | 'Polygon';
}

class CustomLayer extends VectorImageLayer {
    constructor({
        attributions, 
        features, 
        title, 
        order,
        geometry,
        ...props
        } : Options
    ){
        super({
            source: new VectorSource({
                attributions: attributions,
                features: features
            }),
            style: defaultStyle,
            ...props
        });

        this.setProperties({
            geometry: geometry,
            order: order,
            title: title,
        });
    }

    getGeometry(): 'Point' | 'LineString' | 'Polygon' | undefined {
        return this.get('geometry');
    }
}

export default CustomLayer;
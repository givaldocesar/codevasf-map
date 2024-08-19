import { Feature } from "ol";
import { createEmpty, extend } from "ol/extent";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { AttributionLike } from "ol/source/Source";
import { defaultStyle } from "../components/vector-layers/styles";
import { Filter } from "../interfaces";
import { NO_CATEGORY } from "./CustomCategorizedStyle";


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

    async filterFeatures(filter: Filter){
        const features: Feature[] = [];

        this.getSource()?.forEachFeature((feature) => {
            if(feature.get(filter.field) === filter.value){
                features.push(feature);
            }
        });

        return features;
    }

    async getFeaturesExtent(filter?: Filter){
        if(filter){
            const extent = createEmpty();
            
            this.getSource()?.forEachFeature((feature) => {
                if(feature.get(filter.field) === filter.value){
                    extend(extent, feature.getGeometry()?.getExtent() || extent);
                }
            });

            return extent;
        } else {
            return this.getSource()?.getExtent();
        }
    }

    getGeometry(): 'Point' | 'LineString' | 'Polygon' | undefined {
        return this.get('geometry');
    }
}

export default CustomLayer;
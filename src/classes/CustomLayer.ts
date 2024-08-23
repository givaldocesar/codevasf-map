import { Feature } from "ol";
import { createEmpty, extend } from "ol/extent";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { AttributionLike } from "ol/source/Source";
import { Filter, Geometries, LayerStatus } from "../interfaces";
import { CustomCategorizedStyle, CustomStyle } from ".";


interface Options {
    attributions?: AttributionLike;
    features?: Feature[];
    title?: string;
    order?: number;
    visible?: boolean; 
    geometry: 'Point' | 'LineString' | 'Polygon';
}

class CustomLayer extends VectorImageLayer {
    geometry_: Geometries | undefined;
    status_: LayerStatus;
    lodingProgress_: number;
    
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
            style: new CustomStyle({}),
            ...props
        });

        this.geometry_ = geometry;
        this.status_ = 'loading';
        this.lodingProgress_ = 0;

        this.setProperties({
            order: order,
            title: title
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

    getGeometry(){
        return this.geometry_;
    }

    getLoadingProgress(){
        return this.lodingProgress_;
    }

    getStatus(){
        return this.status_;
    }

    getStyle(): CustomStyle | CustomCategorizedStyle {
        //@ts-ignore
        return this.style_;
    }

    setGeometry(geometry?: Geometries){
        this.geometry_ = geometry;
    }

    setLoadingProgress(value: number){
        this.lodingProgress_ = value;
        this.dispatchEvent('progress-changed');
    }

    setStatus(status: LayerStatus){
        this.status_ = status;
        this.dispatchEvent('status-changed');
    }

    setStyle(style: CustomStyle | CustomCategorizedStyle){
        //@ts-ignore
        this.style_ = style;

        //@ts-ignore
        this.styleFunction_ = style.renderFunction;
    }
}

export default CustomLayer;
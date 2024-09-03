import { Feature } from "ol";
import { createEmpty, extend } from "ol/extent";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { AttributionLike } from "ol/source/Source";
import { FlatStyle } from "ol/style/flat";
import { Filter, Geometries, LayerStatus } from "../interfaces";
import SimpleStyle from "./styles/SimpleStyle";
import CategorizedStyle from "./styles/CategorizedStyle";


interface Options {
    geometry?: Geometries;
    attributions?: AttributionLike;
    features?: Feature[];
    title?: string;
    order?: number;
    visible?: boolean; 
    style?: FlatStyle;
    zIndex?: number;
}

class CustomLayer extends VectorImageLayer {
    private geometry_: Geometries | undefined;
    private status_: LayerStatus;
    private lodingProgress_: number;
    private baseStyle_: SimpleStyle | CategorizedStyle;
    
    constructor({
        attributions, 
        features, 
        title, 
        order,
        geometry,
        style,
        ...props
        } : Options
    ){
        super({
            source: new VectorSource({ attributions: attributions, features: features }),
            ...props
        });
     
        this.baseStyle_ = new SimpleStyle(style);
        this.setStyle(this.baseStyle_.flatten() as FlatStyle);
        
        this.geometry_ = geometry;
        this.status_ = 'loading';
        this.lodingProgress_ = 0;

        this.setProperties({
            order: order,
            title: title
        });

        //@ts-ignore
        this.on('change-style', () => {
            try{
                this.setStyle(this.baseStyle_.flatten());
            } catch (err){
                const error = err as Error;
                throw new Error(`LAYER ${this.get('title')}: STYLE ERROR: ${error.message}`);
            }
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

    getBaseStyle(){
        return this.baseStyle_;
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

    setBaseStyle(style: SimpleStyle | CategorizedStyle){
        this.baseStyle_ = style;
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
}

export default CustomLayer;
import { Feature } from "ol";
import VectorImageLayer, { Options } from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { createEmpty, Extent, extend } from "ol/extent";
import { AttributionLike } from "ol/source/Source";
import { Geometries, LayerStatus, Filter } from "../interfaces";
import CustomSimpleStyle from "./CustomSimpleStyle";
import CustomCategorizedStyle from "./CustomCategorizedStyle";


export class LayerProgressEvent extends CustomEvent<{layerTitle: string; progress: number}>{
    static type: string = 'layer-progress-event';
    
    constructor(
        layerTitle: string,
        progress: number
    ){
        super('layer-progress-event', {
            bubbles: true,
            detail: {
                layerTitle: layerTitle,
                progress: progress
            }
        });
    }
}


export class LayerStatusEvent extends CustomEvent<CustomLayer>{
    static type: string = 'layer-status-event';
    
    constructor(layer: CustomLayer){
        super('layer-status-event', {
            bubbles: true,
            detail: layer
        });
    }
}


export default class CustomLayer extends VectorImageLayer {
    private baseStyle_: CustomSimpleStyle | CustomCategorizedStyle;

    constructor({
        geometry,
        style,
        attributions,
        features,
        ...props
    } : Options & {
        attributions?: AttributionLike;
        features?: Feature[];
        geometry: Geometries;
        style?: CustomSimpleStyle | CustomCategorizedStyle;
        zIndex?: number;
    }){
        super({
            source: new VectorSource({
                attributions: attributions,
                features: features
            }),
            ...props,
        });

        this.set('geometry', geometry);
        this.baseStyle_ = style || new CustomSimpleStyle();
        //@ts-ignore typescript chato demais
        this.setStyle(this.baseStyle_.renderFunction);
    }

    async filterFeatures(filters: Filter[], invert?: boolean) : Promise<Feature[]> {
        const features: Feature[] = [];

        this.getSource()?.forEachFeature((feature) => {
            let add = true;
            
            if(invert){
                for(let i = 0; i < filters.length; i++){
                    if(feature.get(filters[i].field) === filters[i].value){
                        add = false;
                        break;
                    }
                }
            } else {
                for(let i = 0; i < filters.length; i++){
                    if(feature.get(filters[i].field) !== filters[i].value){
                        add = false;
                        break;
                    }
                }
            }


            if(add) features.push(feature);
        });

        return features;
    }

    getBaseStyle() : CustomSimpleStyle | CustomCategorizedStyle {
        return this.baseStyle_;
    }

    async getFeaturesExtent(filters?: Filter[], invert?: boolean) : Promise<Extent>{
         if(filters){
            const extent = createEmpty();
            const features = await this.filterFeatures(filters, invert);
            
            features.forEach((feature) => {
                const featExtent = feature.getGeometry()?.getExtent();
                if(featExtent) extend(extent, featExtent);
            });

            return extent;
        } else {
            return this.getSource()?.getExtent() as Extent;
        }
    }

    getGeometry() : Geometries {
        return this.get('geometry') || 'NoGeometry';
    }

    getLoadingProgress() : number{
        return this.get('loading-progress');
    }

    getStatus() : LayerStatus {
        return this.get('status');
    }

    setBaseStyle(style: CustomSimpleStyle | CustomCategorizedStyle) : void {
        this.baseStyle_ = style;
        //@ts-ignore typescript chato demais
        this.setStyle(this.baseStyle_.renderFunction);
        this.changed();
    }

    setGeometry(geometry: Geometries) : void {
       this.set('geometry', geometry);
    }

    setLoadingProgress(progress: number): void {
        this.set('loading-progress', progress);
        document.dispatchEvent(new LayerProgressEvent(this.get('title'), progress));
        this.dispatchEvent('progress-changed');
    }

    setStatus(status : LayerStatus) : void {
        this.set('status', status);
        this.dispatchEvent('status-changed');
        document.dispatchEvent(new LayerStatusEvent(this));
    }
}
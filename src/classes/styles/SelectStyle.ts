import { FeatureLike } from "ol/Feature";
import { Geometry } from "ol/geom";
import { Style, Stroke, Fill, Circle, Text } from "ol/style";
import ImageStyle from "ol/style/Image";
import { clipFeature, getFeatureLabel } from "../../utils";
import CustomSelect from "../CustomSelect";

interface Props {
    select: CustomSelect;
    stroke?: Stroke;
    fill?: Fill;
    image?: ImageStyle;
    zIndex?: number;
}

class SelectStyle extends Style{
    private expression_?: string;
    private select_: CustomSelect;
    
    constructor({
        select,
        stroke = new Stroke({color: 'black', width: 3}),
        fill = new Fill({color: '#FFFFFF7F'}),
        image = new Circle({
            radius: 10,
            stroke: new Stroke({color: 'black', width: 3}),
            fill: new Fill({color: '#FFFFFF7F'})
        }),
        zIndex
    } : Props
    ){
        super({
            stroke, 
            fill, 
            image,
            zIndex
        });

        this.select_ = select;
        this.renderFunction = this.renderFunction.bind(this);

        this.setGeometry((feature) => { 
            const geometry = feature.getGeometry() as Geometry;
            
            switch(geometry.getType()){
                case 'Point': case 'MultiPoint':
                    return geometry;
                default:
                    const map = this.select_.getMap();
                    const extent = map?.getView().calculateExtent();    
                    const clipped = clipFeature(geometry, extent);
                    return clipped as Geometry;
            }
        });
    }

    clone(){
        const style = new SelectStyle({
            select: this.select_,
            stroke: this.getStroke()?.clone(),
            fill: this.getFill()?.clone(),
            image: this.getImage()?.clone(),
            zIndex: this.getZIndex(),
        });

        style.setLabel({
            expression: this.expression_,
            text: this.getText()?.clone()
        })
        
        return style;
    }

    renderFunction(feature: FeatureLike){
        if(this.expression_){
            const label = getFeatureLabel(feature, this.expression_);
            this.getText()?.setText(label);
        }

        return this.clone();
    }

    setLabel({expression, text}: {expression?: string, text?: Text | null}){
        this.expression_ = expression;
        if(text) this.setText(text);
    }
}

export default SelectStyle;
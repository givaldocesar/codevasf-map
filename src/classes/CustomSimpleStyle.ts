import { Feature } from "ol";
import { Style, Stroke, Fill, Circle } from "ol/style";
import { FlatStyle, FlatText } from "ol/style/flat";
import { convertFlatCircle, convertFlatFill, convertFlatIcon, convertFlatStroke } from "../utils/convert-flat-styles";
import extractLabelFromExpression from "../utils/extractLabelFromExpression";
import CustomLabel from "./CustomLabel";


export default class CustomSimpleStyle extends Style {
    values : {
        label?: CustomLabel;
        [key: string] : any
    };
    
    constructor(styles?: FlatStyle){
        if(styles){
            const stroke = convertFlatStroke(styles);
            const fill = convertFlatFill(styles);
            const circle = convertFlatCircle(styles);
            const icon = convertFlatIcon(styles);

            super({
                stroke: stroke,
                fill: fill,
                image: icon || circle
            });
        } else {
            super({
                stroke: new Stroke({color: 'black', width: 2}),
                fill: new Fill({color: '#FFFFFF65'}),
                image: new Circle({
                    stroke: new Stroke({color: 'black', width: 2}),
                    fill: new Fill({color: '#00000065'}),
                    radius: 10
                })
            });
        }

        this.values = {};
        this.renderFunction = this.renderFunction.bind(this);
    }

    clone() : CustomSimpleStyle {
        const clone = new CustomSimpleStyle();
        clone.setStroke(this.getStroke());
        clone.setFill(this.getFill());
        
        const image = this.getImage();
        if(image) clone.setImage(image);

        return clone;
    }

    getFeatureLabel() : CustomLabel | undefined {
        return this.values.label;
    }

    getProperties() : {[key: string] : any} {
        return this.values;
    }

    renderFunction(feature: Feature) : (CustomSimpleStyle | CustomLabel)[] {
        const styles : (CustomSimpleStyle | CustomLabel)[] = [];
        
        if(this.values.label){
            const label = extractLabelFromExpression(feature, this.values.label.getExpression());
            const clone = this.values.label.clone();
            clone.setLabel(label);
            styles.push(clone);
        }

        styles.push(this.clone());
        
        return styles;
    }

    setFeatureLabel(expression: string, textStyle?: FlatText): void {
        const label = new CustomLabel(expression, textStyle);
        this.values.label = label;
    }
}
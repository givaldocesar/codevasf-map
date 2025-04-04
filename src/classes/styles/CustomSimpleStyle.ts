import { Feature } from "ol";
import { Style } from "ol/style";
import { FlatCircle, FlatFill, FlatIcon, FlatStroke, FlatStyle, FlatText, StringExpression } from "ol/style/flat";
import { convertFlatStyle, extractStringFromExpression, getFeatureLabel } from "../../utils";


export const defaultStyle: FlatStyle = {
    "stroke-color": "black",
    "stroke-width": 2,
    "fill-color": "#FFFFFF7F",
    "circle-radius": 10,
    "circle-stroke-color": "black",
    "circle-stroke-width": 2,
    "circle-fill-color": "#FFFFFF7F"
}


export default class CustomSimpleStyle {
    private expression_?: string;
    private secondary_: FlatStyle[];
    private primary_: FlatStyle;
    private styles_?: Style[];

    constructor(options?: FlatStyle[]){
        if(options){
            this.primary_ = options[0];
            this.secondary_= options.slice(1);
        } else {
            this.primary_ = {...defaultStyle};
            this.secondary_= [];
        }

        this.renderFunction = this.renderFunction.bind(this);
        this.updateStyles();
    }
    
    flatten(): FlatStyle[] {
        return [this.primary_, ...this.secondary_];
    }

    getStyle(){
        return [this.primary_, ...this.secondary_];
    }

    renderFunction(feature: Feature){
        if(this.styles_ && this.expression_){
            const style = this.styles_[0].clone();
            const label = getFeatureLabel(feature, this.expression_);
            style.getText()?.setText(label);
            return [style, ...this.styles_.slice(1)];
        }
    
        return this.styles_;
    }

    setImage(image: FlatCircle | FlatIcon){
        this.primary_ = image;
        this.updateStyles();
    }

    setFill(fill: FlatFill){
        const circle : FlatCircle = {};
        if(fill['fill-color']) circle['circle-fill-color'] = fill['fill-color']
        
        this.primary_ = {
            ...this.primary_,
            ...fill,
            ...circle
        }

        this.updateStyles();
    }

    setStroke(stroke: FlatStroke){
        const circle: FlatCircle = {};
        //@ts-ignore
        for(let property in stroke){ circle[`circle-${property}`] = stroke[property] }
        
        this.primary_ = {
            ...this.primary_,
            ...stroke,
            ...circle
        }

        this.updateStyles();
    }

    setText(text: FlatText, expression?: string){
        this.expression_ = expression;

        const textValue: {'text-value'?: StringExpression} = {};
        if(expression) textValue['text-value'] = extractStringFromExpression(expression);
        
        this.primary_ = {
            ...this.primary_,
            ...text,
            ...textValue,
        }

        this.updateStyles();
    }

    updateStyles(){
        this.styles_ = this.getStyle().map(flat => convertFlatStyle(flat));
    }
}
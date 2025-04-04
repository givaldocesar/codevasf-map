import { FlatCircle, FlatFill, FlatIcon, FlatStroke, FlatStyle, FlatStyleLike, FlatText, StringExpression } from "ol/style/flat";
import extractStringFromExpression from "../../utils/extractStringExpressionFromExpression";

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
    private secondary: FlatStyle[];
    private primary: FlatStyle;

    constructor(options?: FlatStyle[]){
        this.primary = {...defaultStyle};
        this.secondary = [];
        if(options) this.secondary.concat(options);
    }
    
    flatten(): FlatStyle[] {
        return [this.primary, ...this.secondary];
    }

    getStyle(){
        return [this.primary, ...this.secondary];
    }

    setImage(image: FlatCircle | FlatIcon){
        this.primary = {
            ...image
        }
    }

    setFill(fill: FlatFill){
        const circle : FlatCircle = {};
        if(fill['fill-color']) circle['circle-fill-color'] = fill['fill-color']
        
        this.primary = {
            ...this.primary,
            ...fill,
            ...circle
        }
    }

    setStroke(stroke: FlatStroke){
        const circle: FlatCircle = {};
        //@ts-ignore
        for(let property in stroke){ circle[`circle-${property}`] = stroke[property] }
        
        this.primary = {
            ...this.primary,
            ...stroke,
            ...circle
        }
    }

    setText(text: FlatText, expression?: string){
        const textValue: {'text-value'?: StringExpression} = {};
        if(expression) textValue['text-value'] = extractStringFromExpression(expression);

        this.primary = {
            ...this.primary,
            ...text,
            ...textValue,
        }
    }
}
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
    private style: FlatStyle[];
    private standard: FlatStyle;

    constructor(options?: FlatStyle[]){
        this.standard = {...defaultStyle};
        this.style = [this.standard];
        if(options) this.style.concat(options);
    }
    
    flatten(): FlatStyle[] {
        return this.style;
    }

    getStyle(){
        return this.style;
    }

    setImage(image: FlatCircle | FlatIcon){
        this.standard = {
            ...this.standard,
            ...image
        }
    }

    setFill(fill: FlatFill){
        const circle : FlatCircle = {};
        if(fill['fill-color']) circle['circle-fill-color'] = fill['fill-color']
        
        this.standard = {
            ...this.standard,
            ...fill,
            ...circle
        }
    }

    setStroke(stroke: FlatStroke){
        const circle: FlatCircle = {};
        //@ts-ignore
        for(let property in stroke){ circle[`circle-${property}`] = stroke[property] }
        
        this.standard = {
            ...this.standard,
            ...stroke,
            ...circle
        }
    }

    setText(text: FlatText, expression?: string){
        const textValue: {'text-value'?: StringExpression} = {};
        if(expression) textValue['text-value'] = extractStringFromExpression(expression);

        this.standard = {
            ...this.standard,
            ...text,
            ...textValue,
        }
    }
}
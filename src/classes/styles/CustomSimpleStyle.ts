import { FlatFill, FlatStroke, FlatStyle, FlatStyleLike, FlatText, StringExpression } from "ol/style/flat";
import { extractStringFromExpression } from "../../utils";

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
    private style_: FlatStyle;

    constructor(options?: FlatStyle){
        this.style_ = {
            ...defaultStyle,
            ...options
        }
    }

    flatten(field?: string): FlatStyleLike {
        return this.style_;
    }

    getStyle(){
        return this.style_;
    }

    setFill(fill: FlatFill){
        const circle = {};
        //@ts-ignore
        if(fill['fill-color']) circle['circle-fill-color'] = fill['fill-color']
        
        this.style_ = {
            ...this.style_,
            ...fill,
            ...circle
        }
    }

    setStroke(stroke: FlatStroke){
        const circle = {};
        //@ts-ignore
        for(let property in stroke){ circle[`circle-${property}`] = stroke[property] }
        
        this.style_ = {
            ...this.style_,
            ...stroke,
            ...circle
        }
    }

    setText(text: FlatText, expression?: string){
        const textValue: {'text-value'?: StringExpression} = {};
        if(expression) textValue['text-value'] = extractStringFromExpression(expression);

        this.style_ = {
            ...this.style_,
            ...text,
            ...textValue,
        }
    }
}
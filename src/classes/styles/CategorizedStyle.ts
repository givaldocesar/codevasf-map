import { FlatText, Rule, StringExpression } from "ol/style/flat";
import { extractStringFromExpression } from "../../utils";
import CategoryStyle from "./CategoryStyle";

export default class CategorizedStyle {
    private categories_: CategoryStyle[];
    private field_: string;
    private baseText_?: FlatText; 
    private defaultVisible_: boolean;

    constructor({
        field, 
        categories, 
        visible
    } : {
        field: string;
        categories?: CategoryStyle[];
        visible?: boolean;
    }){
        this.field_ = field;
        this.categories_ = categories || [];
        this.defaultVisible_ = (visible === undefined ? true : visible);
    }

    addStyle(style: CategoryStyle){
        const idx = this.categories_.findIndex(category => category.getValue() === style.getValue());
        if(idx > -1) { 
            this.categories_[idx] = style;
        } else {
            this.categories_.push(style);
        }
    }

    flatten(){
        let style: Rule[] = [];
        
        this.categories_.forEach(category => style = [ 
            ...style, 
            ...category.flatten(this.field_, this.baseText_)
        ]);
        
        return style;
    }

    getField(){
        return this.field_;
    }

    getStyle(value: string){
        return this.categories_.find(category => category.getValue() === value);
    }

    getStyles(){
        return this.categories_;
    }

    getDefaultVisible(){
        return this.defaultVisible_;
    }

    setText(text: FlatText, expression?: string){
        const textValue: {'text-value'?: StringExpression} = {};
        if(expression) textValue['text-value'] = extractStringFromExpression(expression);
        this.baseText_ = {...text, ...textValue };
    }

    setVisible(visible: boolean, category?: string){
        if(category){
            const style = this.categories_.find(item => item.getValue() === category);
            style?.setVisible(visible);
        } else {
            this.categories_.forEach(category => category.setVisible(visible));
        }
    }
}
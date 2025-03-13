import { FlatText, Rule, StringExpression } from "ol/style/flat";
import extractStringFromExpression from "../../utils/extractStringExpressionFromExpression";
import CategoryStyle from "./CategoryStyle";

export default class CustomCategorizedStyle {
    private categories_: CategoryStyle[];
    private field_: string;
    private baseText_?: FlatText; 
    private defaultVisible_: boolean;
    private collapsed_: boolean;

    constructor({
        field, 
        categories, 
        visible,
        collapsed
    } : {
        field: string;
        categories?: CategoryStyle[];
        visible?: boolean;
        collapsed?: boolean;
    }){
        this.field_ = field;
        this.categories_ = categories || [];
        this.collapsed_ = collapsed || false;
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
            ...category.flattenCategory(this.field_, this.baseText_)
        ]);
        
        return style;
    }

    getCollapsed(){
        return this.collapsed_;
    }

    getDefaultVisible(){
        return this.defaultVisible_;
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

    setCollapsed(collapsed: boolean){
        this.collapsed_ = collapsed;
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
import { Feature } from "ol";
import { Style, Text } from "ol/style";
import { FlatText, Rule, StringExpression } from "ol/style/flat";
import {extractStringFromExpression, convertFlatStyle, getFeatureLabel, convertFlatText} from "../../utils/";
import CategoryStyle from "./CategoryStyle";

export default class CustomCategorizedStyle {
    private styles_: {[key:string] : Style[]};
    private categories_: CategoryStyle[];
    private field_: string;
    private defaultVisible_: boolean;
    private collapsed_: boolean;
    private label_: {
        flatText?: FlatText;
        expression?: string;
        text?: Text;
    };

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
        this.styles_ = {};
        this.label_ = {};
        this.field_ = field;
        this.categories_ = categories || [];
        this.collapsed_ = collapsed || false;
        this.defaultVisible_ = (visible === undefined ? true : visible);
        this.renderFunction = this.renderFunction.bind(this);
    }

    addStyle(style: CategoryStyle){
        const idx = this.categories_.findIndex(category => category.getValue() === style.getValue());
        if(idx > -1) { 
            this.categories_[idx] = style;
        } else {
            this.categories_.push(style);
        }
        this.updateStyles();
    }

    flatten(){
        let style: Rule[] = [];
        
        this.categories_.forEach(category => style = [ 
            ...style, 
            ...category.flattenCategory(this.field_, this.label_?.flatText)
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

    renderFunction(feature: Feature){
        const style = this.styles_[feature.get(this.field_)];

        if(style && this.label_.expression && this.label_.text){
            const primary = style[0].clone();
            primary.setText(this.label_.text.clone());
            
            const label = getFeatureLabel(feature, this.label_.expression);
            primary.getText()?.setText(label);
            
            return [primary, ...style.slice(1)];
        }
        return style;
    }

    setCollapsed(collapsed: boolean){
        this.collapsed_ = collapsed;
    }

    setText(text: FlatText, expression?: string){
        const textValue: {'text-value'?: StringExpression} = {};
        if(expression) textValue['text-value'] = extractStringFromExpression(expression);
        
        this.label_ ={
            expression: expression,
            flatText: {...text, ...textValue },
            text: convertFlatText(text)
        }
    }

    setVisible(visible: boolean, category?: string){
        if(category){
            const style = this.categories_.find(item => item.getValue() === category);
            style?.setVisible(visible);
        } else {
            this.categories_.forEach(category => category.setVisible(visible));
        }

        this.updateStyles();
    }

    updateStyles(){
        this.getStyles().forEach(category => {
            if(category.getVisible()){
                this.styles_[category.getValue()] = category.flatten().map(style => convertFlatStyle(style));
            }
        });
    }
}
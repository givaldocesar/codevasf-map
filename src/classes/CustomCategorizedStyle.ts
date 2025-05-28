import { Feature } from "ol";
import Style from "ol/style/Style";
import { FlatText } from "ol/style/flat";
import { ELSE_CATEGORY } from "../interfaces";
import extractLabelFromExpression from "../utils/extractLabelFromExpression";
import CustomCategoryStyle from "./CustomCategoryStyle";
import CustomLabel from "./CustomLabel";
import CustomSimpleStyle from "./CustomSimpleStyle";


export default class CustomCategorizedStyle extends Style {
    private categories: {[key: string]: CustomCategoryStyle};
    private values: {
        label?: CustomLabel;
        [key: string]: any
    };
    
    constructor({
        collapsed,
        defaultVisible,
        field
    } : {
        collapsed?: boolean;
        defaultVisible?: boolean;
        field: string;
    }){
        super();
        this.categories = {};
        this.values = {
            collapsed: collapsed,
            'default-visible': defaultVisible,
            field: field
        };

        this.renderFunction = this.renderFunction.bind(this);
    }

    addStyle(style: CustomCategoryStyle) : CustomCategoryStyle {
        this.categories[style.getValue()] = style;
        return style;
    }

    get(key: string): any {
        return this.values[key];
    }

    getCategories(): CustomCategoryStyle[] {
        return Object.values(this.categories);
    }

    getCategoriesNames(): string[]{
        return Object.keys(this.categories);
    }

    getCollapsed(): boolean {
        return this.get('collapsed');
    }

    getDefaultVisible(): boolean {
        return this.get('default-visible');
    }

    getField(): string {
        return this.get('field');
    }

    renderFunction(feature: Feature) : (CustomSimpleStyle | CustomLabel)[] | null{
        const category = this.categories[feature.get(this.values.field)];
        const allOtherValues = this.categories[ELSE_CATEGORY];
        const style: (CustomSimpleStyle | CustomLabel)[] = [];
        
        if(this.values.label){
            const label = extractLabelFromExpression(feature, this.values.label.getExpression());
            this.values.label.setLabel(label);
            style.push(this.values.label.clone());
        }

        if(category && category.getVisible()){ 
            style.push(category.clone()); 
        } else if(allOtherValues && allOtherValues.getVisible()){
            style.push(allOtherValues.clone());
        }
        
        return style;
    }

    set(key: string, value: any): void {
        this.values[key] = value;
    }

    setCollapsed(value: boolean): void {
        return this.set('collapsed', value);
    }

    setFeatureLabel(expression: string, textStyle?: FlatText): void {
        const label = new CustomLabel(expression, textStyle);
        this.set('label', label);
    }

    setField(field: string): void{
        this.set('field', field);
    }

    setVisible(visible: boolean, category?: string): void {
        if(category){
            const style = this.categories[category];
            style?.setVisible(visible);
        } else {
            Object.values(this.categories).forEach(category => category.setVisible(visible));
        }
    }
}
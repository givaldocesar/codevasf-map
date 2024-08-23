import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import CustomStyle from "./CustomStyle";
import { toContext } from "ol/render";
import CustomText from "./CustomText";


export const NO_CATEGORY = 'NO_CATEGORY';

interface Props {
    styles?: CustomStyle[]; 
    field: string
}

class CustomCategorizedStyle extends Style {
    styles_: {[value: string]: CustomStyle };
    field_: string;

    constructor({ styles=[], field}: Props){
        super({});
        this.field_ = field;

        this.styles_ = {};
        styles.forEach(style => {
            const value = style.getValue();
            if(value){ this.styles_['teste'] = style }
        });

        this.renderFunction = this.renderFunction.bind(this);
    }

    addStyle(style: CustomStyle){
        const value = style.getValue();
        if(this.getText()) style.setText(this.getText() as CustomText);
        if(value){ this.styles_[value] = style }
    }

    getField(){
        return this.field_;
    }

    getStyle(value: string){
        return this.styles_[value] || this.styles_[NO_CATEGORY];
    }

    getStyles(){
        return Object.values(this.styles_);
    }

    renderFunction(feature: Feature | FeatureLike){
        const style = this.getStyle(feature.get(this.field_))?.clone();
        const label = style?.getText() as CustomText;
        if(label) label.setFeatureLabel(feature);
        
        return style?.getVisible() ? style : undefined; 
    }

    setField(field: string){
        this.field_ = field;
    }

    setVisible(visible: boolean, styleValue?: string){
        if(styleValue){
            console.log(styleValue)
            this.styles_[styleValue].setVisible(visible);
        } else {
            for(let style in this.styles_){ this.styles_[style].setVisible(visible) }
        }
    }
}

export default CustomCategorizedStyle;

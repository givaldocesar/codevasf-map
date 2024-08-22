import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import CustomStyle from "./CustomStyle";
import { toContext } from "ol/render";


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

        this.setRenderer((coordinates, state) =>{
            const context = state.context;
            const geometry = state.geometry.clone();
            // @ts-ignore: Unreachable code error
            geometry.setCoordinates(coordinates);

            const render = toContext(context, {pixelRatio: 1});
            const style = this.renderFunction_(state.feature);
            if(style){
                render.setStyle(style);
                render.drawGeometry(geometry);
            }
        });
    }

    addStyle(style: CustomStyle){
        const value = style.getValue();
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

    renderFunction_(feature: Feature | FeatureLike){
        const style = this.getStyle(feature.get(this.field_));
        return style?.getVisible() ? style.clone() : undefined; 
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

import { Feature } from "ol";
import { Select } from "ol/interaction";
import { Condition, never } from "ol/events/condition";
import BaseEvent from "ol/events/Event";
import CustomLayer from "./CustomLayer";
import CustomSimpleStyle from "./CustomSimpleStyle";
import CustomCategorizedStyle from "./CustomCategorizedStyle";


export default class CustomSelect extends Select {
    private baseStyle: CustomSimpleStyle | CustomCategorizedStyle;
    
    constructor({
        condition,
        layers,
        style
    }: {
        condition?: Condition;
        layers?: CustomLayer[];
        style?: CustomSimpleStyle | CustomCategorizedStyle;
    }){
        super({
            toggleCondition: never,
            condition,
            layers,
        });

        this.baseStyle = style || new CustomSimpleStyle();
        //@ts-ignore
        this.style_ = this.baseStyle.renderFunction;
    }

    getStyle() : CustomSimpleStyle | CustomCategorizedStyle{
        return this.baseStyle;
    }

    setSelected(features: Feature[]){
        const event = new BaseEvent("select");
        //@ts-ignore
        event.selected = features;
        this.dispatchEvent(event)
        this.getFeatures().clear();
        this.getFeatures().extend(features || []); 
    }

    setStyle(style: CustomSimpleStyle | CustomCategorizedStyle){
        this.baseStyle = style ;
        //@ts-ignore
        this.style_= this.baseStyle.renderFunction;
    }
}
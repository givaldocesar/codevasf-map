import { Feature } from "ol";
import { Select } from "ol/interaction";
import BaseEvent from "ol/events/Event";
import { Condition, never } from "ol/events/condition";
import CustomLayer from "./CustomLayer";
import { CustomSimpleStyle, CustomCategorizedStyle } from "./styles";


export default class CustomSelect extends Select{
    private baseStyle_: CustomSimpleStyle | CustomCategorizedStyle;

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
            layers
        });

        this.baseStyle_ = style || new CustomSimpleStyle();
        //@ts-ignore
        this.style_ = this.baseStyle_.renderFunction;
    }

    getBaseStyle(){
        return this.baseStyle_;
    }

    setBaseStyle(style: CustomSimpleStyle | CustomCategorizedStyle){
        this.baseStyle_ = style;
        //@ts-ignore
        this.style_ = style.renderFunction;
    }

    setSelected(features: Feature[] | undefined){
        const event = new BaseEvent("select");
        //@ts-ignore
        event.selected = features;
        this.dispatchEvent(event)
        this.getFeatures().clear();
        this.getFeatures().extend(features || []); 
    }
}
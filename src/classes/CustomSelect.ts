import { Feature } from "ol";
import { Select } from "ol/interaction";
import { SelectEvent } from "ol/interaction/Select";
import BaseEvent from "ol/events/Event";
import { Condition, never } from "ol/events/condition";
import CustomLayer from "./CustomLayer";
import { SelectStyle } from "./styles";


interface Props {
    condition?: Condition;
    layers?: CustomLayer[];
    style?: SelectStyle;
}


class CustomSelect extends Select{
    private baseStyle_: SelectStyle;

    constructor({
        condition,
        layers,
        style
    }: Props){
        super({
            toggleCondition: never,
            condition,
            layers
        });

        this.baseStyle_ = style || new SelectStyle({select: this});
        //@ts-ignore
        this.style_ = this.baseStyle_.renderFunction;
    }

    getStyle(){
        return this.baseStyle_;
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

export default CustomSelect;
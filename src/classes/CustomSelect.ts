import { Select } from "ol/interaction";
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
}

export default CustomSelect;
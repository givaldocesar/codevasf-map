import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import { Fill, Stroke, Text } from "ol/style";
import { extractFieldsFromExpression } from "../utils";


interface Props {
    expression: string;
    fill?: Fill;
    stroke?: Stroke;
    placement?: 'point' | 'line';
    repeat?: number;
}

class CustomText extends Text {
    expression_: string;

    constructor({expression, ...props} : Props){
        super({overflow: false, ...props});
        this.expression_ = expression;
    }

    clone(){
        return new CustomText({
            expression: this.expression_,
            fill: this.getFill()?.clone(),
            stroke: this.getStroke()?.clone(),
            placement: this.getPlacement(),
            repeat: this.getRepeat()
        });
    }

    setFeatureLabel(feature: Feature | FeatureLike){
        const label = this.expression_.replace(/\{[\w]+\}/gi, (match, _) => {
            return feature.get(match.replace(/(\{|\})/g,'')) || '';
        });

        this.setText(label);
    }
}

export default CustomText;
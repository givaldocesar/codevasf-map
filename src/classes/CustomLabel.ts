import { Style } from "ol/style";
import { FlatText } from "ol/style/flat";
import { convertFlatText } from "@/utils/convert-flat-styles";

export default class CustomLabel extends Style{
    private expression: string;

    constructor(expression: string, textStyle?: FlatText){
        const text = convertFlatText(textStyle || {
            "text-fill-color": "black",
            "text-stroke-color": "white",
            "text-stroke-width": 2,
            "text-scale": 1.5
        });
        super({text: text});
        this.expression = expression;
    }

    clone() : CustomLabel {
        const clone = new CustomLabel(this.getExpression());
        const text = this.getText();
        if(text) clone.setText(text);
        return clone;
    }

    getExpression() : string{
        return this.expression;
    }

    setExpression(expression: string) : void {
        this.expression = expression;
    }

    setLabel(text: string) : void {
        this.getText()?.setText(text);
    }
}
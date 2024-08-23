import { useContext } from "react";
import { Fill, Stroke } from "ol/style";
import { StyleContext } from "../../contexts";
import { CustomCategorizedStyle, CustomText } from "../../../classes";

interface Props {
    expression: string;
    fill?: { color?: string };
    stroke?: { color?: string, width?: number };
    placement?: 'point' | 'line';
    repeat?: number;
}

const FeatureLabel: React.FC<Props> = ({expression, fill, stroke, ...props}) => {
    const style = useContext(StyleContext);
    
    const label = new CustomText({
        expression: expression,
        fill: fill ? new Fill(fill) : undefined,
        stroke: stroke ? new Stroke(stroke) : undefined,
        ...props
    });
    
    style?.setText(label);
    if(style instanceof CustomCategorizedStyle) {
        style.getStyles().forEach(item => {
            if(!item.getText()) item.setText(label);
        });
    }

    return <></>;
}

export default FeatureLabel;
import { useContext } from "react";
import { CustomSimpleStyle, SelectStyle, CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../../components/contexts";
import { convertFlatText } from "../utils/convert-flat-styles";


export default function FeatureLabel({expression, ...props}: {expression?: string;}){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);
    
    if(style instanceof CustomSimpleStyle || style instanceof CustomCategorizedStyle){
        style.setText(props, expression);
        layer?.dispatchEvent('change-style');
    
    } else if(style instanceof SelectStyle){
        const text = convertFlatText(props);
        style.setLabel({expression, text});
    }

    return <></>;
}


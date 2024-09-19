import React, { useContext } from "react";
import { CustomSimpleStyle, SelectStyle, CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../../components/contexts";
import { convertFlatText } from "../utils/convert-flat-styles";


const FeatureLabel: React.FC<{expression?: string;}> = ({expression, ...props}) => {
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

export default FeatureLabel;
import { useContext } from "react";
import { CustomCategorizedStyle, CustomSimpleStyle } from "@/classes";
import { LayerContext, StyleContext } from "../../../components/contexts";
import { FlatText } from "ol/style/flat";


export default function FeatureLabel({expression, ...props}: FlatText&{expression?: string;}){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle || style instanceof CustomCategorizedStyle){
        style?.setText(props, expression);
        layer?.dispatchEvent('change-style');
    } else {
        console.error(`CAMADA ${layer?.get("title")}: invalid style provided for FeatureLabel.`);
    }
    
    return <></>;
}
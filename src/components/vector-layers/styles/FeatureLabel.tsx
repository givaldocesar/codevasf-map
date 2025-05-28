import { useContext } from "react";
import { FlatText } from "ol/style/flat";
import { CustomCategorizedStyle, CustomSimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


export default function FeatureLabel({expression, ...props}: FlatText & {expression?: string;}){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(!expression) throw new Error(`CAMADA ${layer?.get("title")}: invalid expression provided for FeatureLabel.`);

    if(style instanceof CustomSimpleStyle || style instanceof CustomCategorizedStyle){
        const textStyle = Object.keys(props).length > 0 ? props : undefined;
        style?.setFeatureLabel(expression, textStyle);
        layer.changed();
    } else {
        throw new Error(`CAMADA ${layer?.get("title")}: invalid style provided for FeatureLabel. Use <SimpleStyle> or <CategorizedStyle> as parent.`);
    }
    
    return <></>;
}
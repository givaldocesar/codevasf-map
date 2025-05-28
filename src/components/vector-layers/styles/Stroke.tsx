import { useContext } from "react";
import { FlatStroke } from "ol/style/flat";
import { CustomCategoryStyle, CustomSimpleStyle } from "../../../classes";
import { convertFlatStroke } from "../../../utils";
import { LayerContext, StyleContext } from "../../contexts";


export default function Stroke(props: FlatStroke){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle || style instanceof CustomCategoryStyle){
        const stroke = convertFlatStroke(props);
        if(stroke){
            style.setStroke(stroke);
            layer.changed();
        }
    } else {
        throw new Error(`CAMADA ${layer?.get("title")}: invalid style provided for Stroke.`);
    }
   
    return <></>;
}
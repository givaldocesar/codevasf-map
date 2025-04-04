import { useContext } from "react";
import { FlatStroke } from "ol/style/flat";
import { CustomSimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


export default function Stroke(props: FlatStroke){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style.setStroke(props);
        layer?.dispatchEvent('change-style');
    } else {
        console.error(`CAMADA ${layer?.get("title")}: invalid style provided for Stroke.`);
    }
   
    return <></>;
}
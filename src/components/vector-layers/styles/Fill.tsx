import { useContext } from "react";
import { FlatFill } from "ol/style/flat";
import { CustomSimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


export default function Fill(props : FlatFill){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style?.setFill(props);
        layer?.dispatchEvent('change-style');
    } else {
        console.error(`CAMADA ${layer?.get("title")}: invalid style provided for Fill.`);
    }
   
    return <></>;
}
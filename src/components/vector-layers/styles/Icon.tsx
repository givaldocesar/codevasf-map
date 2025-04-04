import { useContext } from "react";
import { FlatIcon } from "ol/style/flat";
import { CustomSimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


export default function Icon(props: FlatIcon){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style.setImage(props);
        layer?.dispatchEvent('change-style');
    } else {
        console.error(`CAMADA ${layer?.get("title")}: invalid style provided for Icon.`);
    }
   
    return <></>;
}
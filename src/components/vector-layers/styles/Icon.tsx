import { useContext } from "react";
import { FlatIcon } from "ol/style/flat";
import { CustomSimpleStyle } from "../../../classes";
import { convertFlatIcon } from "../../../utils";
import { LayerContext, StyleContext } from "../../contexts";


export default function Icon(props: FlatIcon){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        const icon = convertFlatIcon(props);
        if(icon){
            style.setImage(icon);
            layer.changed();
        }
    } else {
        throw new Error(`CAMADA ${layer?.get("title")}: invalid style provided for Icon.`);
    }
   
    return <></>;
}
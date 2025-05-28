import { useContext } from "react";
import { FlatFill } from "ol/style/flat";
import { CustomSimpleStyle } from "../../../classes";
import { convertFlatFill } from "../../../utils";
import { LayerContext, StyleContext } from "../../contexts";


export default function Fill(props : FlatFill){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        const fill = convertFlatFill(props);
        if(fill) {
            style?.setFill(fill);
            layer.changed();
        }
    } else {
        throw new Error(`CAMADA ${layer?.get("title")}: invalid style provided for Fill.`);
    }
   
    return <></>;
}
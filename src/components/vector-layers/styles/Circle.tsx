import { useContext } from "react";
import { FlatCircle } from "ol/style/flat";
import { CustomSimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


export default function Circle(props: FlatCircle){
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style.setImage(props);
        layer?.dispatchEvent('change-style');
    } else {
        console.error(`CAMADA ${layer?.get("title")}: invalid style provided for Circle.`);
    }
   
    return <></>;
}
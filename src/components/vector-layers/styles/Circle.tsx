import { useContext } from "react";
import { FlatCircle } from "ol/style/flat";
import { CustomSimpleStyle } from "../../../classes";
import { convertFlatCircle } from "../../../utils";
import { LayerContext, StyleContext } from "../../contexts";


export default function Circle(props: FlatCircle){
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        const circle = convertFlatCircle(props);
        if(circle) {
            style.setImage(circle);
            layer.changed();
        }
    } else {
        console.error(`CAMADA ${layer?.get("title")}: invalid style provided for Circle.`);
    }
   
    return <></>;
}
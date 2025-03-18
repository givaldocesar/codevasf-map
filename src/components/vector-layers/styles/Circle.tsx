import { useContext } from "react";
import { FlatCircle } from "ol/style/flat";
import ImageStyle from "ol/style/Image";
import { CustomSimpleStyle, SelectStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";
import { convertFlatCircle } from "../utils/convert-flat-styles";


export default function Circle(props: FlatCircle){
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style.setImage(props);
        layer?.dispatchEvent('change-style');
       
    } else if(style instanceof SelectStyle) {
        const circle = convertFlatCircle(props) as ImageStyle;
        style.setImage(circle);
    }
   
    return <></>;
}
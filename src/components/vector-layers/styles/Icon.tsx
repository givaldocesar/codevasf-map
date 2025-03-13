import { useContext } from "react";
import { FlatIcon } from "ol/style/flat";
import ImageStyle from "ol/style/Image";
import { CustomSimpleStyle, SelectStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";
import { convertFlatIcon } from "../utils/convert-flat-styles";


export default function Icon(props: FlatIcon){
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style.setIcon(props);
        layer?.dispatchEvent('change-style');
       
    } else if(style instanceof SelectStyle) {
        const icon = convertFlatIcon(props) as ImageStyle;
        icon.load();
        style.setImage(icon);
    }
   
    return <></>;
}
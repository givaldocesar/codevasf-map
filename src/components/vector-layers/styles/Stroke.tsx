import React, { useContext } from "react";
import { FlatStroke } from "ol/style/flat";
import { CustomSimpleStyle, SelectStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";
import { convertFlatStroke } from "../utils/convert-flat-styles";


function Stroke(props: FlatStroke){
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style.setStroke(props);
        layer?.dispatchEvent('change-style');
       
    } else if(style instanceof SelectStyle) {
        style.setStroke(convertFlatStroke(props));
    }
   
    return <></>;
}

export default Stroke;
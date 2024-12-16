import React, { useContext } from "react";
import { FlatFill } from "ol/style/flat";
import { SelectStyle, CustomSimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";
import { convertFlatFill } from "../utils/convert-flat-styles";


function Fill(props : FlatFill){
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof CustomSimpleStyle){
        style?.setFill(props);
        layer?.dispatchEvent('change-style');
        
    } else if (style instanceof SelectStyle){
        style.setFill(convertFlatFill(props));
    }
   
    return <></>;
}

export default Fill;
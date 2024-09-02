import { useContext } from "react";
import { FlatFill } from "ol/style/flat";
import { SelectStyle, SimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";
import { convertFlatFill } from "../utils/convert-flat-styles";



const Fill: React.FC<FlatFill> = (props) => {
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);

    if(style instanceof SimpleStyle){
        style?.setFill(props);
        layer?.dispatchEvent('change-style');
        
    } else if (style instanceof SelectStyle){
        style.setFill(convertFlatFill(props));
    }
   
    return <></>;
}

export default Fill;
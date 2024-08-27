import { useContext } from "react";
import { FlatFill } from "ol/style/flat";
import { SimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


const Fill: React.FC<FlatFill> = (props) => {
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext) as SimpleStyle;
    
    try{
        style?.setFill(props);
        layer?.dispatchEvent('change-style');
    } catch {
        throw new Error(`LAYER ${layer?.get('title')}: No 'SimpleStyle' or 'Category' parent for 'Fill' element.`);
    }
   
    return <></>;
}

export default Fill;
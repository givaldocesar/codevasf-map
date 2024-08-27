import { useContext } from "react";
import { FlatStroke } from "ol/style/flat";
import { SimpleStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


const Stroke: React.FC<FlatStroke> = (props) => {
    //melhorar solução
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext) as SimpleStyle;

    try {
        style?.setStroke(props);
        layer?.dispatchEvent('change-style');
    } catch (error){
        throw new Error(`LAYER ${layer?.get('title')}: No 'SimpleStyle' or 'Category' parent for 'Stroke' element.`);
    }
   
    return <></>;
}

export default Stroke;
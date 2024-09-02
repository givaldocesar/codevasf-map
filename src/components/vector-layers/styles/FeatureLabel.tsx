import { useContext } from "react";
import { FlatText } from "ol/style/flat";
import { SimpleStyle, SelectStyle, CategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../../components/contexts";
import { convertFlatText } from "../utils/convert-flat-styles";


interface Props extends FlatText{
    expression?: string;
}

const FeatureLabel: React.FC<Props> = ({expression, ...props}) => {
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);
    
    if(style instanceof SimpleStyle || style instanceof CategorizedStyle){
        style.setText(props, expression);
        layer?.dispatchEvent('change-style');
    
    } else if(style instanceof SelectStyle){
        const text = convertFlatText(props);
        style.setLabel({expression, text});
    }

    return <></>;
}

export default FeatureLabel;
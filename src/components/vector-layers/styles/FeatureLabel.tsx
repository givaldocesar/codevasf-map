import { useContext } from "react";
import { FlatText } from "ol/style/flat";
import { LayerContext, StyleContext } from "../../../components/contexts";


interface Props extends FlatText{
    expression: string;
}

const FeatureLabel: React.FC<Props> = ({expression, ...props}) => {
    const layer = useContext(LayerContext);
    const style = useContext(StyleContext);
    style?.setText(props, expression);
    layer?.dispatchEvent('change-style');
    return <></>;
}

export default FeatureLabel;
import { useContext } from "react";
import { Stroke, Fill } from "ol/style";
import { LayerContext, StyleContext } from "../../contexts";
import { CustomStyle } from "../../../classes";


const Style: React.FC<{children?: React.ReactNode, visible?: boolean}> = ({children, visible=true}) => {
    const layer = useContext(LayerContext);
    layer?.setVisible(visible);
    const style = layer?.getStyle() as CustomStyle;

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default Style;

export const defaultStroke = new Stroke({color: 'black', width: 2});
export const defaultFill = new Fill({color: '#FFFFFF7F'});

export { default as CategorizedStyle } from "./CategorizedStyle";
export { default as Category } from "./Category";
export { default as Stroke } from "./Stroke";
export { default as Fill } from "./Fill";
export { default as FeatureLabel } from "./FeatureLabel";
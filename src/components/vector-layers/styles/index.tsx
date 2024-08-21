import { useContext } from "react";
import { LayerContext, StyleContext } from "../../contexts";
import { Style as OLStyle, Stroke, Fill, Circle } from "ol/style";

export const defaultStroke = new Stroke({color: 'black', width: 2});

export const defaultFill = new Fill({color: '#FFFFFF7F'});

export const defaultStyle = new OLStyle({
    stroke: defaultStroke,
    fill: defaultFill,
    image: new Circle({
        stroke: defaultStroke,
        fill: defaultFill,
        radius: 10
    })
});

const Style: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const layer = useContext(LayerContext);
    const style = layer?.getStyle() as OLStyle;

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default Style;
export { default as CategorizedStyle } from "./CategorizedStyle";
export { default as Category } from "./Category";
export { default as Stroke } from "./Stroke";
export { default as Fill } from "./Fill";
import { useContext } from "react";
import { Circle } from "ol/style";
import { StyleContext } from "../../contexts";


const Stroke: React.FC<{color?: string; width?: number;}> = ({color, width}) => {
    const style = useContext(StyleContext);
    
    const stroke = style?.getStroke();
    color ? stroke?.setColor(color) : null;
    width ? stroke?.setWidth(width) : null;
    
    const image = style?.getImage() as Circle;
    image.setStroke(stroke || null);

    return <></>;
}

export default Stroke;
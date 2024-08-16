import { useContext } from "react";
import { Circle } from "ol/style";
import { StyleContext } from "../../contexts";

const Fill: React.FC<{color?: string;}> = ({color}) => {
    const style = useContext(StyleContext);
    const fill = style?.getFill();
    const circle = style?.getImage() as Circle;

    if(color){
        fill?.setColor(color);
        circle.getFill()?.setColor(color);
    }
    
    return <></>;
}

export default Fill;
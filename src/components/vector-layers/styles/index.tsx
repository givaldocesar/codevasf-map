import { useContext } from "react";
import { SelectStyle } from "../../../classes";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


const SimpleStyle: React.FC<{
    children?: React.ReactNode, 
    visible?: boolean
}> = ({
    children, 
    visible=true
}) => {
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);
    
    let style;
    if(interaction){
        style = interaction.getStyle() as SelectStyle;
    } else {
        layer?.setVisible(visible);
        style = layer?.getBaseStyle();
    }
    
    return (
        <StyleContext.Provider value={style}>
            { children }
        </StyleContext.Provider>
    );
}

export default SimpleStyle;
export { default as CategorizedStyle } from "./CategorizedStyle";
export { default as Category } from "./Category";
export { default as Stroke } from "./Stroke";
export { default as Fill } from "./Fill";
export { default as FeatureLabel } from "./FeatureLabel";
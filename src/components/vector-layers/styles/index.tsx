import React, { useContext } from "react";
import { SelectStyle } from "../../../classes";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


function SimpleStyle({
    children, 
    visible=true
} : {
    children?: React.ReactNode, 
    visible?: boolean
}){
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

export { SimpleStyle };
export { default as CategorizedStyle } from "./CategorizedStyle";
export { default as Category } from "./Category";
export { default as Circle } from "./Circle";
export { default as Stroke } from "./Stroke";
export { default as Fill } from "./Fill";
export { default as Icon } from "./Icon";
export { default as FeatureLabel } from "./FeatureLabel";
import React, { useContext } from "react";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


export default function SimpleStyle({
    children, 
    visible=true
} : {
    children?: React.ReactNode, 
    visible?: boolean
}){
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);
    const style = interaction ? interaction.getStyle() : layer.getBaseStyle();

    if(!interaction) layer.setVisible(visible);
    
    return (
        <StyleContext.Provider value={style}>
            { children }
        </StyleContext.Provider>
    );
}
import React, { useContext } from "react";
import { CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


function CategorizedStyle({
    children, 
    field, 
    visible=true,
    collapsed
} : {
    children?: React.ReactNode;
    field: string;
    visible?: boolean;
    collapsed?: boolean;
}){
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);

    const style = new CustomCategorizedStyle({field, visible, collapsed});
    if(interaction){
        interaction?.setBaseStyle(style);
    } else {
        layer?.setBaseStyle(style);
    }

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default CategorizedStyle;
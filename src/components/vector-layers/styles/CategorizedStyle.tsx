import React, { useContext } from "react";
import { CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


export default function CategorizedStyle({
    children, 
    field, 
    defaultVisible=true,
    collapsed
} : {
    children?: React.ReactNode;
    field: string;
    defaultVisible?: boolean;
    collapsed?: boolean;
}){
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);

    const style = new CustomCategorizedStyle({field, defaultVisible, collapsed});
    if(interaction){
        interaction.setStyle(style);
    } else {
        layer.setBaseStyle(style);
    }

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}
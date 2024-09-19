import React, { useContext } from "react";
import { CustomCategorizedStyle as CStyle, SelectStyle } from "../../../classes";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


const CategorizedStyle: React.FC<{
    children?: React.ReactNode;
    field: string;
    visible?: boolean;
}> = ({
    children, 
    field, 
    visible=true
}) => {
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);

    let style;
    if(interaction){
        style = interaction.getStyle() as SelectStyle;
    } else {
        style = new CStyle({field, visible});
        layer?.setBaseStyle(style);
    }

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default CategorizedStyle;
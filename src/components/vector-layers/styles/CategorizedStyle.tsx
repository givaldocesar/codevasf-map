import React, { useContext } from "react";
import { CustomCategorizedStyle as CCS, SelectStyle } from "../../../classes";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


const CategorizedStyle: React.FC<{
    children?: React.ReactNode;
    field: string;
    visible?: boolean;
    collapsed?: boolean;
}> = ({
    children, 
    field, 
    visible=true,
    collapsed
}) => {
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);

    let style;
    if(interaction){
        style = interaction.getStyle() as SelectStyle;
    } else {
        style = new CCS({field, visible, collapsed});
        layer?.setBaseStyle(style);
    }

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default CategorizedStyle;
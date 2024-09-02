import { useContext } from "react";
import { CategorizedStyle as CStyle, SelectStyle } from "../../../classes";
import { LayerContext, StyleContext, InteractionContext } from "../../contexts";


interface Props {
    children?: React.ReactNode;
    field: string;
    visible?: boolean;
}

const CategorizedStyle: React.FC<Props> = ({children, field, visible=true}) => {
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
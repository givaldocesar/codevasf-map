import { useContext } from "react";
import { CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";

interface Props {
    children?: React.ReactNode;
    field: string;
    visible?: boolean;
}

const CategorizedStyle: React.FC<Props> = ({children, field, visible=true}) => {
    const layer = useContext(LayerContext);
    layer?.set('defaultVisible', visible);
    
    const style = new CustomCategorizedStyle({ field });
    layer?.setStyle(style);

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default CategorizedStyle;
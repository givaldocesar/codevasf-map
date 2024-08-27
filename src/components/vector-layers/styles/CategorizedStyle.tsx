import { useContext } from "react";
import { CategorizedStyle as CStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


interface Props {
    children?: React.ReactNode;
    field: string;
    visible?: boolean;
}

const CategorizedStyle: React.FC<Props> = ({children, field, visible=true}) => {
    const layer = useContext(LayerContext);
    const style = new CStyle({field, visible});
    layer?.setBaseStyle(style);

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default CategorizedStyle;
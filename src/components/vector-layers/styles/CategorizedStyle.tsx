import { useContext } from "react";
import { CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";

interface Props {
    children?: React.ReactNode;
    field: string;
    showNoCategoryFeatures?: boolean;
}

const CategorizedStyle: React.FC<Props> = ({children, field, showNoCategoryFeatures}) => {
    const layer = useContext(LayerContext);
    const style = new CustomCategorizedStyle({ field, showNoCategoryFeatures });
    layer?.setStyle(style);

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}

export default CategorizedStyle;
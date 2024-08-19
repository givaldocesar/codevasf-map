import { useContext } from "react";
import { CustomStyle, CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


interface Props {
    children?: React.ReactNode; 
    label: string;
    value: string;
    geometry?: 'Point' | 'LineString' | 'Polygon' | undefined;
}

const Category: React.FC<Props> = ({children, label, value, geometry}) => {
    const layer = useContext(LayerContext);
    const parentStyle = useContext(StyleContext) as CustomCategorizedStyle;
    
    const style = new CustomStyle({
        label: label,
        value: value, 
        geometry: geometry || layer?.getGeometry()
    });

    parentStyle.addStyle(style);

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}


export default Category;
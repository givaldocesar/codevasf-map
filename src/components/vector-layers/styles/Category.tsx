import { useContext } from "react";
import { CustomStyle, CustomCategorizedStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";


interface Props {
    children?: React.ReactNode; 
    label?: string;
    value: string;
    geometry?: 'Point' | 'LineString' | 'Polygon' | undefined;
    zIndex?: number;
    visible?: boolean;
}

const Category: React.FC<Props> = ({children, label, value, geometry, visible, ...props}) => {
    const layer = useContext(LayerContext);
    const parentStyle = useContext(StyleContext) as CustomCategorizedStyle;
    
    const style = new CustomStyle({
        label: label,
        value: value, 
        geometry: geometry || layer?.getGeometry(),
        visible: visible === undefined ? layer?.get('defaultVisible') : visible,
        ...props
    });

    if(parentStyle){
        parentStyle.addStyle(style);
    } else {
        console.error(`ERROR - LAYER ${layer?.get('title')}: no 'CategorizedStyle' element.`);
    }

    return (
        <StyleContext.Provider value={style}>
            {children}
        </StyleContext.Provider>
    );
}


export default Category;
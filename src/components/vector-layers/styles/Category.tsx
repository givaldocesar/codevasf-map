import { useContext } from "react";
import { CategorizedStyle, CategoryStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";
import { Geometries } from "../../../interfaces";


interface Props {
    children?: React.ReactNode; 
    label?: string;
    value: string;
    geometry?: Geometries;
    zIndex?: number;
    visible?: boolean;
}

const Category: React.FC<Props> = ({children, label, value, geometry, visible}) => {
    const layer = useContext(LayerContext);
    const parent = useContext(StyleContext) as CategorizedStyle;
    const style = new CategoryStyle({
        geometry: geometry || layer?.getGeometry(),
        visible: visible || parent.getDefaultVisible(),
        value, 
        label,
    });

    if(!parent){
        throw new Error(`LAYER ${layer?.get('title')}: No 'CategorizedStyle' parent for 'Category' element.`);
    } else {
        parent.addStyle(style);
    }

    return (
        <StyleContext.Provider value={style}>
            { children }
        </StyleContext.Provider>
    );
}


export default Category;
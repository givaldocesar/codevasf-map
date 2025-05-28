import React, { useContext } from "react";
import { CustomCategorizedStyle, CustomCategoryStyle } from "../../../classes";
import { Geometries } from "../../../interfaces";
import { LayerContext, StyleContext } from "../../contexts";


function Category({
    children, 
    legendLabel, 
    value, 
    geometry, 
    visible
}: {
    children?: React.ReactNode; 
    legendLabel?: string;
    value: string;
    geometry?: Geometries;
    zIndex?: number;
    visible?: boolean;
}){
    const layer = useContext(LayerContext);
    const parent = useContext(StyleContext) as CustomCategorizedStyle;
    const style = new CustomCategoryStyle({
        geometry: geometry || layer.getGeometry(),
        visible: visible || parent.getDefaultVisible(),
        value, 
        legendLabel,
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
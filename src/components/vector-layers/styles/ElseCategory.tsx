import React, { useContext } from "react";
import { FlatStyle } from "ol/style/flat";
import { CustomCategorizedStyle, CustomCategoryStyle } from "../../../classes";
import { LayerContext, StyleContext } from "../../contexts";
import { Geometries, ELSE_CATEGORY } from "../../../interfaces";


export default function ElseCategory({
    children, 
    legendLabel, 
    geometry, 
    styles,
    visible
}: {
    children?: React.ReactNode; 
    legendLabel?: string;
    geometry?: Geometries;
    styles?: FlatStyle
    visible?: boolean;
}){
    const layer = useContext(LayerContext);
    const parent = useContext(StyleContext) as CustomCategorizedStyle;
    const style = new CustomCategoryStyle({
        geometry: geometry || layer.getGeometry(),
        visible: visible || parent.getDefaultVisible(),
        value: ELSE_CATEGORY, 
        legendLabel: legendLabel || "Outros valores",
        styles
    });

    if(!parent){
        throw new Error(`LAYER ${layer?.get('title')}: No 'CategorizedStyle' parent for 'ElseCategory' element.`);
    } else {
        parent.addStyle(style);
    }

    return (
        <StyleContext.Provider value={style}>
            { children }
        </StyleContext.Provider>
    );
}
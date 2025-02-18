import { CustomLayer, CustomCategorizedStyle } from "../../../../classes";
import CategorizedLegendItem from "./CategorizedLegendItem";
import SimpleLegendItem from "./SimpleLegendItem";


export default function VectorLayerItem({layer} : {layer: CustomLayer}){
    if(layer.getBaseStyle() instanceof CustomCategorizedStyle){
        return <CategorizedLegendItem layer={layer}/>
    } else {
        return <SimpleLegendItem layer={layer} />
    }
}
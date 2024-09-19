import { CustomLayer, CustomCategorizedStyle } from "../../../../classes";
import CategorizedLegendItem from "./CategorizedLegendItem";
import SimpleLegendItem from "./SimpleLegendItem";


const VectorLayerItem: React.FC<{layer: CustomLayer}> = ({layer}) => {
    if(layer.getBaseStyle() instanceof CustomCategorizedStyle){
        return <CategorizedLegendItem layer={layer}/>
    } else {
        return <SimpleLegendItem layer={layer} />
    }
}
   
export default VectorLayerItem;
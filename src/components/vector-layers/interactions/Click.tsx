import { useContext, useMemo } from "react";
import { singleClick } from "ol/events/condition";
import { CustomLayer, CustomSelect } from "../../../classes";
import { MapContext, LayerContext } from "../../../components/contexts";
import BaseInteraction from "./BaseInteraction";


interface Props {
    children?: React.ReactNode; 
    zoomToFeature?: boolean;
}

const Click: React.FC<Props> = ({children, zoomToFeature}) => {
    const map = useContext(MapContext);
    const layer = useContext(LayerContext) as CustomLayer;
    
    const click = useMemo(()=> {
        const interaction = new CustomSelect({
            condition: singleClick,
            layers: [layer]
        });

        if(zoomToFeature){
            interaction.on('select', (evt) => {
                const feature = evt.selected[0];
                if(feature) map?.fit(feature.getGeometry()?.getExtent());
            });
        }
        
        return interaction;
    }, [zoomToFeature]);
    
    return (
        <BaseInteraction interaction={click}>
            { children }
        </BaseInteraction>
    );
}

export default Click;
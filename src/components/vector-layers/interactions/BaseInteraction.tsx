import { useContext, useEffect } from "react";
import { CustomSelect } from "../../../classes";
import { MapContext, InteractionContext } from "../../../components/contexts";


interface Props {
    children?: React.ReactNode; 
    interaction: CustomSelect;
}

const BaseInteraction: React.FC<Props> = ({children, interaction}) => {
    const map = useContext(MapContext);

    useEffect(() => {
        map?.addInteraction(interaction);
        return () => { map?.removeInteraction(interaction) }
    }, []);
    
    return (
        <InteractionContext.Provider value={interaction}>
            { children }
        </InteractionContext.Provider>
    );
}

export default BaseInteraction;
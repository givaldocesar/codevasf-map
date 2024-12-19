import React, { useContext, useEffect } from "react";
import { CustomSelect } from "../../../classes";
import { MapContext, InteractionContext } from "../../../components/contexts";


export default function BaseInteraction({
    children, 
    interaction
} : {
    children?: React.ReactNode; 
    interaction: CustomSelect;
}){
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
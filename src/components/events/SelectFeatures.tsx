import { useEffect, useContext } from "react";
import { Feature } from "ol";
import { MapContext } from "../contexts";
import { CustomSelect } from "../../classes";


export class SelectFeaturesEvent extends CustomEvent<{mapName: string; selectName: string; features: Feature[]}> {
    static type: string = 'map-select-features-event';
   
    constructor(mapName: string, selectName: string, features: Feature[]){
        super('map-select-features-event', {
            detail: {
                mapName: mapName,
                selectName: selectName,
                features: features
            },
            bubbles: true
        });
    }
}

export default function SelectFeatures(){
    const map = useContext(MapContext);
    if(!map?.get('name')) throw new Error("SELECT FEATURES: Map name is required. Please set map name.");

    useEffect(() => {
        function selectFeatures(evt: SelectFeaturesEvent){
            if(evt.detail.mapName === map?.get('name')){
                const interactions = map?.getInteractions().getArray();

                for(let i = 0; i < interactions.length; i++){
                    if(interactions[i].get('name') === evt.detail.selectName){
                        const select = interactions[i] as CustomSelect;
                        select.setSelected(evt.detail.features);
                        select.changed();
                        break;
                    }
                }
            }
        }

        document.addEventListener(SelectFeaturesEvent.type, selectFeatures as EventListener);
        return () => document.removeEventListener(SelectFeaturesEvent.type, selectFeatures as EventListener);
    }, []);
    
    return <></>;
}
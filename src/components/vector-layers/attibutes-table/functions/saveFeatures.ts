import { Feature } from "ol";
import { CustomLayer } from "../../../../classes";
import { APIType, STATUS } from "../../../../interfaces";
import updateFeature from "./updateFeatures";
import deleteFeature from "./deleteFeature";


export default async function saveFeatures(
    currentWindow: Window, 
    button: HTMLButtonElement, 
    layer: CustomLayer, 
    api: APIType | undefined
) : Promise<void> {
    const confirm = currentWindow.confirm("Deseja salvar alterações?");
    
    if(confirm){
        const features : Feature[] = layer.getSource()?.getFeatures() || [];
        currentWindow.document.body.style.cursor = "wait";
        button.disabled = true;

        if(api?.url){
            let updates: Promise<boolean>[] = [];
            
            for(let i = 0; i < features.length; i++){
                switch(features[i].get(STATUS)){
                    case 'edited':
                        updates.push(updateFeature(features[i], api));
                        break;
                    case 'excluded':
                        updates.push(deleteFeature(layer, features[i], api));
                        break;
                    default:
                        continue;

                }
                
                if(updates.length === 50){
                    await Promise.all(updates);
                    updates = [];
                }
            }

            await Promise.all(updates);
        }

        currentWindow.document.body.style.cursor = "default";
        button.disabled = false;
        currentWindow.alert("Atualização concluída.");
    }
}
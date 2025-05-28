import { Feature } from "ol";
import { STATUS} from "../../../../interfaces";

export default function SetDeletedFeatures(button: HTMLButtonElement, currentWindow: Window, features: Feature[]) : void {
    currentWindow.document.body.style.cursor = "wait";
    const confirm = currentWindow.confirm("Deseja remover as feições filtradas?");

    if(confirm){
        button.disabled = true;
        features.forEach(feature => feature.set(STATUS, 'excluded'));
        currentWindow.document.body.style.cursor = "default";
        button.disabled = false;
    }
}


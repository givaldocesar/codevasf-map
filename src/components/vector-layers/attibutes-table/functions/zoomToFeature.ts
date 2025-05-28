import { Feature } from "ol";
import { FitToFeaturesEvent } from "../../../events";

export default function ZoomToFeatures(currentWindow: Window, mapName: string, features: Feature[]) : void{
    if(features.length > 0){ 
        document.dispatchEvent(new FitToFeaturesEvent({
            mapName: mapName,
            features: features,
            maxZoom: 13
        }));
    } else {
        currentWindow.alert("Não há feições para mostrar.");
    }
}
import { Feature } from "ol";
import { KML } from "ol/format";

export default async function downloadFeatures(currentWindow: Window, features: Feature[], fileName: string) : Promise<void> {
        const format = new KML();
        const kml = format.writeFeatures(features);
        
        let link = currentWindow.document.createElement('a');
        link.setAttribute('href', 'data:application/kml;charset=utf-8,' + encodeURIComponent(kml));
        link.setAttribute('download', fileName);
        link.style.display = 'none';
        currentWindow.document.body.appendChild(link);
        link.click();
        currentWindow.document.body.removeChild(link);
}
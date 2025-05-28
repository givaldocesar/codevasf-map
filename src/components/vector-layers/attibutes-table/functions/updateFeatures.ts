import { Feature } from "ol";
import { WKT } from "ol/format";
import { APIType, STATUS, ERROR } from "../../../../interfaces";

export default async function updateFeature(feature: Feature, api?: APIType){
    const format = new WKT({splitCollection: true});
    const { geometry, createdAt, updatedAt, ...properties } = feature.getProperties();
    delete properties[STATUS];
    delete properties[ERROR];
                    
    const data = {
        geometry: format.writeGeometry(geometry),
        ...properties
    }

    if(api){
        feature.set(STATUS, "loading");

        const response = await fetch(api.url, {
            method: "PUT",
            headers: {'Authorization': api.token as string},
            body: JSON.stringify(data)
        });

        switch(response.status){
            case 403:
                feature.set(STATUS, "error");
                feature.set(ERROR, "Operação não permitida para o usuário.");
                break;
            case 404:
                feature.set(STATUS, "error");
                feature.set(ERROR, "invalid API URL.");
                break;
            case 400:
                const error = await response.json()
                feature.set(STATUS, "error");
                feature.set(ERROR, error.message);
                break;
            case 200:
                feature.set(STATUS, "updated");
                return true;
            default:
                feature.set(STATUS, "error");
                feature.set(ERROR, "Erro desconhecido");
        }
    }  

    return false;
}

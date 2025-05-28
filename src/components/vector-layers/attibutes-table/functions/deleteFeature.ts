import { Feature } from "ol";
import { CustomLayer } from "../../../../classes";
import { APIType, STATUS, ERROR } from "../../../../interfaces";

export default async function deleteFeature(layer: CustomLayer, feature: Feature, api?: APIType){
    const { geometry, createdAt, updatedAt, ...properties } = feature.getProperties();

    if(api){
        feature.set(STATUS, "loading");

        const response = await fetch(api.url, {
            method: "DELETE",
            headers: {'Authorization': api.token as string},
            body: JSON.stringify(properties)
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
                feature.set(STATUS, "removed");
                layer.getSource()?.removeFeature(feature);
                layer.changed();
                return true;
            default:
                feature.set(STATUS, "error");
                feature.set(ERROR, "erro desconhecido");
        }
    }  

    return false;
}
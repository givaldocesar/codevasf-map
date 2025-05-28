import { FeatureLike } from "ol/Feature";
import { FIELD_REGEX } from "../interfaces";

export default function getFeatureLabel(feature: FeatureLike, expression: string){
    return expression.replaceAll(FIELD_REGEX, (match, _) => {
        const field = match.replaceAll(/(\{|\})/g, '');
        return feature.get(field) || '';
    });
}
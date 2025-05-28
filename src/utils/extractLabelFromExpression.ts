import { Feature, getUid } from "ol";
import { FIELD_REGEX } from "../interfaces";

export default function extractLabelFromExpression(feature: Feature, expression: string) : string {
    const toSplit = expression.replace(FIELD_REGEX, (match, _) => `§${match}§`);
    const splitted = toSplit.split('§').filter(item => item !== '');
    
    const string = splitted.reduce((result, value) => {
        if(FIELD_REGEX.test(value)){
            const field = value.replaceAll(/(\{|\})/g, '');
            if(field === 'ol_uid'){
                return result + getUid(feature);
            } else {
                return result + feature.get(field);
            }
        } else {
            return result + value;
        }
    }, "");
    
    return string;
}
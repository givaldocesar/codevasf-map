export const FIELD_REGEX = /\{[\w]+\}/gi;

export default function extractStringFromExpression(expression: string){
    const toSplit = expression.replace(FIELD_REGEX, (match, _) => `§${match}§`);
    const splitted = toSplit.split('§').filter(item => item !== '');
    
    const stringExpression = splitted.map(item => {
        if(FIELD_REGEX.test(item)){
            const field = item.replaceAll(/(\{|\})/g, '');
            return ['string', ['get', field], ''];
        } else {
            return item;
        }
    });
    
    switch(stringExpression.length){
        case 0:
            return '';
        case 1:
            return stringExpression[0];
        default:
            return ['concat', ...stringExpression];
    }
}
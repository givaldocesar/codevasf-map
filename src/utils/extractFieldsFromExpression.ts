export default function extractFieldsFromExpression(expression: string){
    const fields: string[] = []; 
    const matchs = expression.match(/\{[\w]+\}/gi);
    matchs?.forEach((value) => fields.push(value.replaceAll(/(\{|\})/g,'')));
    return fields;
}
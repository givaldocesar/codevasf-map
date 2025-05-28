export default class RemoveDroppedLayerEvent extends CustomEvent<string> {
    static type = 'remove-dropped-layer';
    
    constructor(id: string){
        super('remove-dropped-layer', {
            detail: id,
            bubbles: true
        });
    }
}
export default class LayerProgressEvent extends CustomEvent<{layerTitle: string; progress: number}>{
    static type: string = 'layer-progress-event';
    
    constructor(
        layerTitle: string,
        progress: number
    ){
        super('layer-progress-event', {
            bubbles: true,
            detail: {
                layerTitle: layerTitle,
                progress: progress
            }
        });
    }
}
import { LayerStatus } from "../../../interfaces";

export default class LayerStatusEvent extends CustomEvent<{layerTitle: string; status: LayerStatus}>{
    static type: string = 'layer-status-event';
    
    constructor(
        layerTitle: string,
        status: LayerStatus
    ){
        super('layer-status-event', {
            bubbles: true,
            detail: {
                layerTitle: layerTitle,
                status: status
            }
        });
    }
}
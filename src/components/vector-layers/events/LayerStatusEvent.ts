import { CustomLayer } from "../../../classes";

export default class LayerStatusEvent extends CustomEvent<CustomLayer>{
    static type: string = 'layer-status-event';
    
    constructor(layer: CustomLayer){
        super('layer-status-event', {
            bubbles: true,
            detail: layer
        });
    }
}
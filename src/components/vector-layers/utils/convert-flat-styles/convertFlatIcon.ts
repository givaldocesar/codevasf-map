
import { Icon } from "ol/style";
import { FlatIcon } from "ol/style/flat";

export default function convertFlatIcon(flatIcon: FlatIcon){
    const props = { 
        src: flatIcon['icon-src'],
        width: flatIcon['icon-width'] as number,
        height: flatIcon['icon-height'] as number,
        scale: flatIcon['icon-scale'],
        color: flatIcon['icon-color'],
        rotation: flatIcon['icon-rotation'] as number,
        opacity: flatIcon['icon-opacity'] as number
    }

    if(JSON.stringify(flatIcon) !== '{}') return new Icon(props);
    
    return null;
}
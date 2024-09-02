import { Fill } from "ol/style";
import { FlatFill } from "ol/style/flat";

export default function convertFlatFill(flatFill: FlatFill){
    const props = { color: flatFill["fill-color"] }
    if(JSON.stringify(flatFill) !== '{}') return new Fill(props);
    return null;
}
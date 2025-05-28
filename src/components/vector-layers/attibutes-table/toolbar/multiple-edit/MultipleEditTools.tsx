import Tool from "../Tool";
import { SHOW_MULTEDIT_EVENT } from "../Events";
import icon from "../../../../../assets/multiple-edit.png";


export default function MultipleEditTools(){  
    return (
        <Tool
            title="MOSTRAR EDIÇÃO MÚLTIPLA"
            onClick={(evt) => { evt.target.dispatchEvent(new Event(SHOW_MULTEDIT_EVENT, { bubbles: true }))}}
            icon={{ src: icon, alt:"edit-icon" }}
        />
    );
}
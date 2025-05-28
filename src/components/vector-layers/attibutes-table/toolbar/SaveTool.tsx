import Tool from "./Tool";
import { SAVE_EVENT } from "./Events";
import icon from "../../../../assets/save.png";


export default function SaveTool(){
    return (
        <Tool
            title="SALVAR ALTERAÇÕES"
            onClick={(evt) => { evt.target.dispatchEvent(new Event(SAVE_EVENT, { bubbles: true }))}}
            icon={{
                src: icon,
                alt:"save-icon"
            }}
        />
    )
}
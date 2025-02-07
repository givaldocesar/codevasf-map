import Tool from "./Tool";
import icon from "../../../../assets/save.png";


export default function SaveTool(){
    return (
        <Tool
            title="SALVAR ALTERAÇÕES"
            onClick={(evt) => { evt.target.dispatchEvent(new Event('save', { bubbles: true }))}}
            icon={{
                src: icon,
                alt:"save-icon"
            }}
        />
    )
}
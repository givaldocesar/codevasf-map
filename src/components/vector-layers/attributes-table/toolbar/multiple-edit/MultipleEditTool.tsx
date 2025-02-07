import Tool from "../Tool";
import icon from "../../../../../assets/multiple-edit.png";


export default function FiltersTools(){  
    return (
        <Tool
            title="MOSTRAR EDIÇÃO MÚLTIPLA"
            onClick={(evt) => { evt.target.dispatchEvent(new Event('show-edit', { bubbles: true }))}}
            icon={{ src: icon, alt:"edit-icon" }}
        />
    );
}
import Tool from "./Tool";
import { DOWNLOAD_EVENT } from "./Events";
import icon from "../../../../assets/downloads.png";


export default function DownloadTool(){
    return (
        <Tool
            title="BAIXAR CAMADA"
            onClick={(evt) => { evt.target.dispatchEvent(new Event(DOWNLOAD_EVENT, { bubbles: true }))}}
            name="download-tool"
            icon={{
                src: icon,
                alt:"download-icon"
            }}
        />
    )
}
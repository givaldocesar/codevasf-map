import { useContext } from "react";
import AttributesTableOptionsContext from "../../AttributesTableOptionsContext";
import Tool from "../Tool";
import { DOWNLOAD_EVENT, REMOVE_FILTERED_EVENT, SHOW_FILTERS_EVENT, ZOOM_EVENT } from "../Events";

import showIcon from "../../../../../assets/show-filter.png";
import clearIcon from "../../../../../assets/clear-filter.png";
import filterIcon from "../../../../../assets/filter.png";
import zoomIcon from "../../../../../assets/zoom-filter.png";
import downloadIcon from "../../../../../assets/download-filter.png";


export default function FiltersTools({
    popup,
    mapName, 
    layerUID
} : {
    popup?: Window,
    mapName: string; 
    layerUID: string;
}){  
    const options = useContext(AttributesTableOptionsContext);
    const doc = popup?.document || window.document;
    
    function filter(){
        const form = doc.getElementById(`${mapName}-${layerUID}-filters`) as HTMLFormElement;
        form.requestSubmit();
    }

    function reset(){
        const form = doc.getElementById(`${mapName}-${layerUID}-filters`) as HTMLFormElement;
        form.reset();
    }
    
    return (
        <>
            <Tool
                title="MOSTRAR FILTROS"
                onClick={(evt) => { evt.target.dispatchEvent(new Event(SHOW_FILTERS_EVENT, { bubbles: true }))}}
                icon={{
                    src: showIcon,
                    alt:"show-filter-icon"
                }}
            />
            <Tool
                id={`${mapName}-${layerUID}-filter-tool`}
                title="FILTRAR"
                onClick={filter}
                icon={{
                    src: filterIcon,
                    alt:"filter-icon"
                }}
            />
            <Tool
                id={`${mapName}-${layerUID}-clear-filter-tool`}
                title="LIMPAR FILTROS"
                onClick={reset}
                icon={{
                    src: clearIcon,
                    alt:"clear-filter-icon"
                }}
            />
            <Tool
                title="MOSTRAR FEIÇÕES FILTRADAS"
                onClick={(evt) => { evt.target.dispatchEvent(new Event(ZOOM_EVENT, { bubbles: true }))}}
                icon={{
                    src: zoomIcon,
                    alt:"zoom-filtered-icon"
                }}
            />
            {options.allowDownload && 
                <Tool
                    title="BAIXAR FEIÇÕES FILTRADAS"
                    onClick={evt => evt.target.dispatchEvent(new Event(DOWNLOAD_EVENT, { bubbles: true }))}
                    name="filter-download-tool"
                    icon={{
                        src: downloadIcon,
                        alt:"download-filtered-icon"
                    }}
                />
                
            }
            {options.allowDelete && 
                <Tool
                    title="EXCLUIR FEIÇÕES FILTRADAS"
                    onClick={evt => evt.target.dispatchEvent(new Event(REMOVE_FILTERED_EVENT, { bubbles: true }))}
                    icon={{
                        src: filterIcon,
                        alt:"delete-filtered-icon"
                    }}
                >
                    <svg viewBox="0 0 50 50" style={{position: 'absolute', top: 0, left: 0, zIndex: 2}}>
                        <line x1={15} y1={15} x2={35} y2={35} stroke="red" strokeWidth={5} />
                        <line x1={35} y1={15} x2={15} y2={35} stroke="red" strokeWidth={5} />
                    </svg>
                </Tool>
            }
        </>
    );
}
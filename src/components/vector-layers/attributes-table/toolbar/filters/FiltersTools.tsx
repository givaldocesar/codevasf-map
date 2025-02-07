import Image from "next/image";
import Tool from "../Tool";

import showIcon from "../../../../../assets/show-filter.png";
import clearIcon from "../../../../../assets/clear-filter.png";
import filterIcon from "../../../../../assets/filter.png";
import zoomIcon from "../../../../../assets/zoom-filter.png";
import downloadIcon from "../../../../../assets/download-filter.png";


export default function FiltersTools({
    popup,
    mapName, 
    layerName,
    allowDelete,
    allowDownload
} : {
    popup?: Window,
    mapName: string; 
    layerName: string;
    allowDelete?: boolean;
    allowDownload?: boolean;
}){  
    const doc = popup?.document || window.document;
    
    function filter(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        const form = doc.getElementById(`${mapName}-${layerName}-filter`) as HTMLFormElement;
        form.requestSubmit();
    }

    function reset(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        const form = doc.getElementById(`${mapName}-${layerName}-filter`) as HTMLFormElement;
        form.reset();
    }
    
    return (
        <>
            <Tool
                title="MOSTRAR FILTROS"
                onClick={(evt) => { evt.target.dispatchEvent(new Event('show-filters', { bubbles: true }))}}
                icon={{
                    src: showIcon,
                    alt:"show-filter-icon"
                }}
            />
            <Tool
                id={`${mapName}-${layerName}-filter-tool`}
                title="FILTRAR"
                onClick={filter}
                icon={{
                    src: filterIcon,
                    alt:"filter-icon"
                }}
            />
            <Tool
                id={`${mapName}-${layerName}-clear-filter-tool`}
                title="LIMPAR FILTROS"
                onClick={reset}
                icon={{
                    src: clearIcon,
                    alt:"clear-filter-icon"
                }}
            />
            <Tool
                title="MOSTRAR FEIÇÕES FILTRADAS"
                onClick={(evt) => { evt.target.dispatchEvent(new Event('zoom-features', { bubbles: true }))}}
                icon={{
                    src: zoomIcon,
                    alt:"zoom-filtered-icon"
                }}
            />
            {allowDownload && 
                <Tool
                    title="BAIXAR FEIÇÕES FILTRADAS"
                    onClick={evt => evt.target.dispatchEvent(new Event('download-features', { bubbles: true }))}
                    name="filter-download-tool"
                    icon={{
                        src: downloadIcon,
                        alt:"download-filtered-icon"
                    }}
                />
                
            }
            {allowDelete && 
                <Tool
                    title="EXCLUIR FEIÇÕES FILTRADAS"
                    onClick={evt => evt.target.dispatchEvent(new Event('remove-filtered-features', { bubbles: true }))}
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
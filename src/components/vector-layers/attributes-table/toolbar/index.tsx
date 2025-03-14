import { useEffect, useRef, useState} from "react";
import { CustomLayer } from "../../../../classes";
import { FieldType, APIType } from "../utils";
import { Filters, FiltersTools, FilterEvent } from "./filters";
import { MultipleEdit, MultipleEditTool, EditEvent } from "./multiple-edit";
import DownloadTool from "./DownloadTool";
import SaveTool from "./SaveTool";
import styles from "./Toolbar.module.scss";


export { 
    FilterEvent,
    EditEvent
}

export default function Toolbar({
    popup,
    mapName,
    layer,
    fields,
    options
}: {
    popup?: Window;
    mapName: string;
    layer: CustomLayer;
    fields: FieldType[];
    options?: {
        allowDelete?: boolean;
        allowDownload?: boolean;
        api?: APIType;
        filters?: boolean;
        multipleEdit?: boolean;
    }
}){
    const ref = useRef<HTMLDivElement>(null);
    const [filtersCollapsed, setFiltersCollapsed] = useState<boolean>(true); 
    const [editCollapsed, setEditCollapsed] = useState<boolean>(true); 

    //HANDLE FILTERS EVENTS
    useEffect(() => {
        function collapse(evt: Event){
            evt.stopPropagation();
            
            const button = evt.target as HTMLButtonElement;
            button.classList.toggle(styles.active);
            button.title = filtersCollapsed ? "OCULTAR FILTROS" : "MOSTRAR FILTROS";
            
            setFiltersCollapsed(collapsed => !collapsed);
        }

        const element = ref.current;
        element?.addEventListener('show-filters', collapse);
        return () => element?.removeEventListener('show-filters', collapse);
    }, [filtersCollapsed]);

    //HANDLE MULTIPLE EDIT EVENTS
    useEffect(() => {
        function collapse(evt: Event){
            evt.stopPropagation();
            
            const button = evt.target as HTMLButtonElement;
            button.classList.toggle(styles.active);
            button.title = editCollapsed ? "OCULTAR CAMPOS" : "MOSTRAR CAMPOS";
            
            setEditCollapsed(collapsed => !collapsed);
        }

        const element = ref.current;
        element?.addEventListener('show-edit', collapse);
        return () => element?.removeEventListener('show-edit', collapse);
    }, [filtersCollapsed]);

    return (
        <div className={styles.tools} ref={ref}>
            <div className={styles.toolbar}>
                { options?.filters && 
                    <FiltersTools 
                        popup={popup}
                        mapName={mapName} 
                        layerName={layer.get("title")} 
                        allowDelete={options.allowDelete}
                        allowDownload={options.allowDownload}
                    /> 
                }
                { options?.multipleEdit && <MultipleEditTool /> }
                { options?.allowDownload && <DownloadTool /> }
                { options?.api && <SaveTool /> }
            </div>
            { options?.filters && 
                <Filters 
                    popup={popup}
                    mapName={mapName} 
                    layer={layer} 
                    fields={fields} 
                    collapsed={filtersCollapsed}
                    options={options}
                />
            }
            { options?.multipleEdit && 
                <MultipleEdit 
                    popup={popup}
                    mapName={mapName} 
                    layer={layer} 
                    fields={fields} 
                    collapsed={editCollapsed} 
                />
            }

        </div>
    );
}
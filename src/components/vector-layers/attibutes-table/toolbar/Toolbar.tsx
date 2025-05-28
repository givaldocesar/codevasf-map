import { useEffect, useRef, useState, useContext} from "react";
import { getUid } from "ol";
import { CustomLayer } from "../../../../classes";
import { FieldType } from "../../../../interfaces";
import AttributesTableOptionsContext from "../AttributesTableOptionsContext";
import { SHOW_FILTERS_EVENT, SHOW_MULTEDIT_EVENT } from "./Events";
import Filters, { FiltersTools } from "./filters";
import MultipleEdit, { MultipleEditTools } from "./multiple-edit";
import DownloadTool from "./DownloadTool";
import SaveTool from "./SaveTool";
import styles from "./Toolbar.module.scss";


export default function Toolbar({
    popup,
    mapName,
    layer,
    fields
}: {
    popup?: Window;
    mapName: string;
    layer: CustomLayer;
    fields: FieldType[];
}){
    const ref = useRef<HTMLDivElement>(null);
    const options = useContext(AttributesTableOptionsContext);
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
        element?.addEventListener(SHOW_FILTERS_EVENT, collapse);
        return () => element?.removeEventListener(SHOW_FILTERS_EVENT, collapse);
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
        element?.addEventListener(SHOW_MULTEDIT_EVENT, collapse);
        return () => element?.removeEventListener(SHOW_MULTEDIT_EVENT, collapse);
    }, [filtersCollapsed]);

    return (
        <div className={styles.tools} ref={ref}>
            <div className={styles.toolbar}>
                { options?.filters && <FiltersTools popup={popup} mapName={mapName} layerUID={getUid(layer)} />  }
                { options?.multipleEdit && <MultipleEditTools /> }
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
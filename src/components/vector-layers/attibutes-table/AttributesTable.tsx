import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Feature, getUid } from "ol";
import { CustomLayer } from "../../../classes";
import { FieldType, AttributesTableOptions } from "../../../interfaces";
import { downloadFeatures, getFieldsFromFeature } from "../../../utils";
import { FeaturesFilteredEvent } from "../../events";
import AttributesTableOptionsContext from "./AttributesTableOptionsContext";
import { AttributesTableEditEvent, saveFeatures, setEditedFeatures, setDeletedFeatures, zoomToFeatures } from "./functions";
import FeaturesTable from "./features-table";
import Toolbar, { DOWNLOAD_EVENT, REMOVE_FILTERED_EVENT, SAVE_EVENT, ZOOM_EVENT } from "./toolbar";
import TableLoader from "./TableLoader";
import styles from "./Attributes.module.scss";

export default function AttributesTable({
    popup,
    mapName,
    layer,
    fields=[],
    options={ 
        headers: true,
        filters: true,
    }
} : {  
    popup?: Window;
    mapName: string;
    layer: CustomLayer;
    fields?: FieldType[];
    options?: AttributesTableOptions
}){
    const ref = useRef<HTMLDivElement>(null);
    const standardFeatures: Feature[] = layer.getSource()?.getFeatures() || [];
    const [revision, setRevison] = useState<number>(0);
    const [currentFeatures, setFeatures] = useState<Feature[]>((standardFeatures));

    //UPDATE FIELDS---------------------------------------------------------
    const fieldSet = useMemo(() => {
        if(fields.length === 0 && standardFeatures.length > 0) {
            return getFieldsFromFeature(standardFeatures[0])
        } else {
            return fields;
        };
    }, [fields, standardFeatures]);
    
    //RESET FORMS-----------------------------------------------------------
    useEffect(() => {
        ref.current?.addEventListener('reset', (evt: Event) => {
            evt.stopPropagation();
            const form = evt.target as HTMLFormElement;
            (form.elements.namedItem('submit') as HTMLElement)?.classList.remove(styles.active);
            
            if(form.id.includes('filter')) {
                const tool = (popup || window).document.getElementById(`${mapName}-${getUid(layer)}-filter-tool`);
                tool?.classList.remove(styles.active);
                setFeatures(standardFeatures);
            }
        });
    }, [popup, layer]);

    //FILTER----------------------------------------------------------------
    useEffect(() => {
        ref.current?.addEventListener(FeaturesFilteredEvent.type, ((evt: FeaturesFilteredEvent) => {
            evt.stopPropagation();
            setFeatures(evt.detail);
            setRevison(revision => revision + 1);
        }) as EventListener);
    }, []);

    //ZOOM TO FILTERED------------------------------------------------------
    useEffect(() => {
        function zoom(evt: Event) : void {
            evt.stopPropagation();
            zoomToFeatures(popup || window, mapName, currentFeatures);
        }

        const element = ref.current;
        element?.addEventListener(ZOOM_EVENT, zoom);
        return () => element?.removeEventListener(ZOOM_EVENT, zoom);
    }, [revision]);

    //EDIT FEATURES---------------------------------------------------------
    useEffect(() => {
        function edit(evt: AttributesTableEditEvent) : void {
            const {onlyFiltered, values} = evt.detail;
            const inEdit = onlyFiltered ? currentFeatures : standardFeatures;
            setEditedFeatures(inEdit, values);
            setRevison(revision => revision + 1);
        }

        const element = ref.current;
        element?.addEventListener(AttributesTableEditEvent.type, edit as EventListener);
        return () => element?.removeEventListener(AttributesTableEditEvent.type, edit as EventListener);
    }, [revision]);

    //DELETE FEATURES-------------------------------------------------------
    useEffect(() => {
        async function remove(evt: Event) : Promise<void> {
            evt.stopPropagation();
            const currentWindow = popup || window;

            if(currentFeatures.length === standardFeatures.length){
                currentWindow.alert("Não há feições filtradas.");
            } else {
                setDeletedFeatures(evt.target as HTMLButtonElement, currentWindow, currentFeatures);
            }
        }

        const element = ref.current;
        element?.addEventListener(REMOVE_FILTERED_EVENT, remove);
        return () => element?.removeEventListener(REMOVE_FILTERED_EVENT, remove);
    }, [revision]);

    //SAVE FEATURES---------------------------------------------------------
    useEffect(() => {
        async function save(evt: Event){
            evt.stopPropagation();
            await saveFeatures(
                popup || window, 
                evt.target as HTMLButtonElement, 
                layer, 
                options.api
            );
        }

        const element = ref.current;
        element?.addEventListener(SAVE_EVENT, save);
        return () => element?.removeEventListener(SAVE_EVENT, save);
    }, [revision]);

    //DOWNLOAD TOOL---------------------------------------------------------
    useEffect(() => {
        async function dowload(evt: Event){
            const currentWindow = (popup || window);
            currentWindow.document.body.style.cursor = "wait";
            
            const button = evt.target as HTMLButtonElement;
            button.disabled = true;
            
            const featuresToDownload = button.name === 'download-tool' ? standardFeatures : currentFeatures;
            await downloadFeatures(currentWindow, featuresToDownload, (layer.get('title') || "download").toLowerCase() + '.kml');
             
            currentWindow.document.body.style.cursor = "default";
            button.disabled = false;
        }

        const element = ref.current;
        element?.addEventListener(DOWNLOAD_EVENT, dowload);
        return () => element?.removeEventListener(DOWNLOAD_EVENT, dowload);
    }, [revision]);

    return (
        <div className={styles.area} ref={ref}>
            <AttributesTableOptionsContext.Provider value={options}>
                <h3 className={styles.title}>{layer.get("title")}</h3>
                <Toolbar 
                    popup={popup}
                    mapName={mapName}
                    layer={layer}
                    fields={fieldSet}
                />
                <Suspense fallback={<TableLoader />}>
                    <FeaturesTable 
                        key={`table-${revision}`}
                        mapName={mapName}
                        features={currentFeatures}
                        fields={fieldSet}
                    />
                </Suspense>
            </AttributesTableOptionsContext.Provider>
        </div>
    );
}
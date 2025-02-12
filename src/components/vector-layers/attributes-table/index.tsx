import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Feature } from "ol";
import { KML } from "ol/format";
import { CustomLayer } from "../../../classes";
import { FitToFeaturesEvent } from "../../events";
import Table, { TableLoader } from "./table";
import Toolbar, { FilterEvent, EditEvent } from "./toolbar";
import { FieldType, STATUS, ERROR, updateFeature, deleteFeature, FeatureStatus } from "./utils";
import styles from "./Attributes.module.scss";
import formStyles from "./toolbar/Form.module.scss";

export {
    STATUS,
    ERROR
}

export type {
    FieldType,
    FeatureStatus
}

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
    options?: {
        allowDelete?: boolean;
        allowDownload?: boolean;
        apiURL?: string;
        filters?: boolean;
        headers?: boolean;
        multipleEdit?: boolean;
        
    }
}){
    const ref = useRef<HTMLDivElement>(null);
    const [revision, setRevison] = useState<number>(0);
    const [features, setFeatures] = useState<Feature[]>((layer.getSource()?.getFeatures() || []));

    //UPDATE FIELDS---------------------------------------------------------
    const fieldSet = useMemo(() => {
        if(fields.length === 0 && features.length > 0) {
            const { geometry, ...properties } = features[0].getProperties();
            return Object.keys(properties).map(key => ({name: key, editable: false})); 
        } 

        return fields;
    }, [fields, features]);
    
    //RESET FORMS-----------------------------------------------------------
    useEffect(() => {
        ref.current?.addEventListener('reset', (evt: Event) => {
            evt.stopPropagation();
            const form = evt.target as HTMLFormElement;
            (form.elements.namedItem('submit') as HTMLElement)?.classList.remove(formStyles.active);
            
            if(form.id.includes('filter')) {
                const tool = (popup || window).document.getElementById(`${mapName}-${layer.get("title")}-filter-tool`);
                tool?.classList.remove(formStyles.active);
                setFeatures(layer.getSource()?.getFeatures() || []);
                setRevison(revision => revision + 1);
            }
        });
    }, [popup, layer]);

    //FILTER----------------------------------------------------------------
    useEffect(() => {
        ref.current?.addEventListener(FilterEvent.type, ((evt: FilterEvent) => {
            evt.stopPropagation();
            setFeatures(evt.detail);
            setRevison(revision => revision + 1);
        }) as EventListener);
    }, []);

    //ZOOM TO FILTERED------------------------------------------------------
    useEffect(() => {
        function zoom(evt: Event){
            evt.stopPropagation();
            if(features.length > 0){
                document.dispatchEvent(new FitToFeaturesEvent({
                    mapName: mapName,
                    features: features,
                    maxZoom: 13
                }));
            } else {
                (popup || window).alert("Não há feições para mostrar.");
            }
        }

        const element = ref.current;
        element?.addEventListener('zoom-features', zoom);
        return () => element?.removeEventListener('zoom-features', zoom);
    }, [revision]);

    //EDIT FEATURES---------------------------------------------------------
    useEffect(() => {
        function edit(evt: EditEvent){
            const {onlyFiltered, values} = evt.detail;
            
            const toEdit = onlyFiltered ? features : layer.getSource()?.getFeatures() as Feature[];
            toEdit.forEach(feat => {
                if(feat.get(STATUS) !== 'loading'){
                    feat.set(STATUS, "edited");
                    values.forEach(value => feat.set(value.name, value.value));
                }
            });

            setRevison(revision => revision + 1);
        }

        const element = ref.current;
        element?.addEventListener(EditEvent.type, edit as EventListener);
        return () => element?.removeEventListener(EditEvent.type, edit as EventListener);
    }, [revision]);

    //DELETE FEATURES-------------------------------------------------------
    useEffect(() => {
        async function remove(evt: Event){
            const currentWindow = (popup || window);

            if(features.length === layer.getSource()?.getFeatures().length){
                currentWindow.alert("Não há feições filtradas.");
                return ;
            }
            
            currentWindow.document.body.style.cursor = "wait";
            const confirm = currentWindow.confirm("Deseja remover as feições filtradas?");

            if(confirm){
                const button = evt.target as HTMLButtonElement;
                button.disabled = true;

                features.forEach(feature => feature.set(STATUS, 'excluded'));
    
                currentWindow.document.body.style.cursor = "default";
                button.disabled = false;
            }
        }

        const element = ref.current;
        element?.addEventListener('remove-filtered-features', remove);
        return () => element?.removeEventListener('remove-filtered-features', remove);
    }, [revision]);

    //SAVE FEATURES---------------------------------------------------------
    useEffect(() => {
        async function save(evt: Event){
            const currentWindow = (popup || window);
            const confirm = currentWindow.confirm("Deseja salvar alterações?");

            if(confirm){
                currentWindow.document.body.style.cursor = "wait";
                const button = evt.target as HTMLButtonElement;
                button.disabled = true;
    
                if(options.apiURL){
                    const features = layer.getSource()?.getFeatures() as Feature[];
                    let updates: Promise<boolean>[] = [];
                    
                    for(let i = 0; i < features.length; i++){
                        switch(features[i].get(STATUS)){
                            case 'edited':
                                updates.push(updateFeature(features[i], options.apiURL));
                                break;
                            case 'excluded':
                                updates.push(deleteFeature(layer, features[i], options.apiURL));
                                break;
                            default:
                                continue;

                        }
                        
                        if(updates.length === 50){
                            await Promise.all(updates);
                            updates = [];
                        }
                    }
                }
    
                currentWindow.document.body.style.cursor = "default";
                button.disabled = false;
                currentWindow.alert("Atualização concluída.");
            }
        }

        const element = ref.current;
        element?.addEventListener('save', save);
        return () => element?.removeEventListener('save', save);
    }, [revision]);

    //DOWNLOAD TOOL---------------------------------------------------------
    useEffect(() => {
        async function dowload(evt: Event){
            const currentWindow = (popup || window);
            const button = evt.target as HTMLButtonElement;
            
            button.disabled = true;
            currentWindow.document.body.style.cursor = "wait";
            
            const dowloadFeatures = button.name === 'download-tool' ? layer.getSource()?.getFeatures() as Feature[] : features;
            const format = new KML();
            const kml = format.writeFeatures(dowloadFeatures);
            
            let link = currentWindow.document.createElement('a');
            link.setAttribute('href', 'data:application/kml;charset=utf-8,' + encodeURIComponent(kml));
            link.setAttribute('download', (layer.get('title') as string).toLowerCase() + '.kml');
            link.style.display = 'none';
            currentWindow.document.body.appendChild(link);
            link.click();
            currentWindow.document.body.removeChild(link);
            
            button.disabled = false;
            currentWindow.document.body.style.cursor = "default";
        }

        const element = ref.current;
        element?.addEventListener('download-features', dowload);
        return () => element?.removeEventListener('download-features', dowload);
    }, [revision]);

    return (
        <div className={styles.area} ref={ref}>
            <h3 className={styles.title}>{layer.get("title")}</h3>
            <Toolbar 
                popup={popup}
                mapName={mapName}
                layer={layer}
                fields={fieldSet}
                options={options}
            />
            <Suspense fallback={<TableLoader />}>
                <Table 
                    key={`table-${revision}`}
                    mapName={mapName}
                    features={features}
                    fields={fieldSet}
                    headers={options.headers}
                    allowDelete={options.allowDelete? true : false}
                />
            </Suspense>
        </div>
    );
}
import { useRef, useEffect, useState } from "react";
import { Feature, getUid } from "ol";
import { FieldType, STATUS } from "../../../../interfaces";
import SorterEvent, { sortFeatures } from "./SorterEvent";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import Pagination, { ChangePageEvent, PAGE_LIMIT } from "./Pagination";
import styles from "./FeatureTable.module.scss";

export default function Table({
    mapName,
    features,
    headers=true,
    fields,
} : {
    mapName: string;
    features: Feature[];
    headers?: boolean;
    fields: FieldType[];
}){
    const ref = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState<number>(1);
    const [currentFeatures, setCurrentFeatures] = useState<Feature[]>(features);

    //HANDLE CHANGE PAGE EVENT
    useEffect(() => {
        function changePage(evt: Event){
            evt.stopPropagation();
            const select = (evt.target) as HTMLSelectElement;
            setPage(parseInt(select.value));
        }

        const element = ref.current;
        element?.addEventListener(ChangePageEvent.type, changePage); 
        return () => element?.removeEventListener(ChangePageEvent.type, changePage); 
    }, []);

    //HANDLE SORTER EVENT
    useEffect(() => {
        function sorter(evt: SorterEvent){
            evt.stopPropagation();
            const { type, field } = evt.detail;
            const sorted = sortFeatures(currentFeatures, field, type);
            setCurrentFeatures(sorted);
        }

        const element = ref.current;
        element?.addEventListener(SorterEvent.type, sorter as EventListener); 
        return () => element?.removeEventListener(SorterEvent.type, sorter as EventListener); 
    }, []);

    async function createRows(){
        return currentFeatures.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT).map(feature => 
            <TableRow 
                key={`${getUid(feature)}_${feature.get(STATUS)}`}
                feature={feature}
                fields={fields}
                mapName={mapName}
            />
        );
    }
    
    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.wrapper}>
                <table>
                    { headers && <TableHead fields={fields} /> }
                    <tbody>
                        { createRows() }
                    </tbody>
                </table>
            </div>
            <Pagination current={page} total={currentFeatures.length} />
        </div>
    );
}

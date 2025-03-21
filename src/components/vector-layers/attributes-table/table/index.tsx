import { useRef, useEffect, useState } from "react";
import { Feature } from "ol";
import { FieldType, SorterEvent, STATUS } from "../utils";
import TableHead from "./TableHead"
import TableRow from "./TableRow";
import Pagination, { PAGE_LIMIT } from "./Pagination";
import styles from "./FeatureTable.module.scss";

export { default as TableLoader } from "./TableLoader";

export default function Table({
    mapName,
    features,
    headers=true,
    fields,
    allowDelete=false
} : {
    mapName: string;
    features: Feature[];
    headers?: boolean;
    fields: FieldType[];
    allowDelete?: boolean;
}){
    const ref = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState<number>(1);
    const [current, setCurrent] = useState<Feature[]>(features);

    //HANDLE CHANGE PAGE EVENT
    useEffect(() => {
        function changePage(evt: Event){
            evt.stopPropagation();
            const select = (evt.target) as HTMLSelectElement;
            setPage(parseInt(select.value));
        }

        const element = ref.current;
        element?.addEventListener("change-page", changePage); 
        return () => element?.removeEventListener("change-page", changePage); 
    }, []);

    //HANDLE SORTER EVENT
    useEffect(() => {
        function sorter(evt: SorterEvent){
            evt.stopPropagation();
            const { type, field } = evt.detail;

            if(field === 'ol_uid'){
                current.sort((A, B) => {
                    //@ts-expect-error ol_uid undefined
                    if(A.ol_uid > B.ol_uid) return type === "ascendent" ?  1 : -1;
                    //@ts-expect-error ol_uid undefined
                    if(A.ol_uid < B.ol_uid) return type === "ascendent" ? -1 :  1;
                    return 0;
                });
            }

            current.sort((A, B) => {
                if(!A.get(field) && !B.get(field)) return 0;
                if(A.get(field) && !B.get(field)) return type === "ascendent" ?  1 : -1;
                if(!A.get(field) && B.get(field)) return type === "ascendent" ? -1 :  1;
                
                if(A.get(field) > B.get(field)) return type === "ascendent" ?  1 : -1;
                if(A.get(field) < B.get(field)) return type === "ascendent" ? -1 :  1;
                return 0;
            });

            setCurrent([...current]);
        }

        const element = ref.current;
        element?.addEventListener(SorterEvent.type, sorter as EventListener); 
        return () => element?.removeEventListener(SorterEvent.type, sorter as EventListener); 
    }, []);

    async function createRows(){
        return current.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT).map(feature => 
            <TableRow 
                //@ts-ignore
                key={`${feature.ol_uid}_${feature.get(STATUS)}`}
                feature={feature}
                fields={fields}
                mapName={mapName}
                allowDelete={allowDelete}
            />
        )
    }
    
    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.wrapper}>
                <table>
                    { headers && <TableHead fields={fields} allowDelete={allowDelete} /> }
                    <tbody>
                        { createRows() }
                    </tbody>
                </table>
            </div>
            <Pagination 
                total={current.length} 
                current={page}
            />
        </div>
    );
}

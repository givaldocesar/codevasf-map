import { useRef, useEffect } from "react";
import { FieldType } from "./utils";
import Sorter from "./Sorter";
import styles from "./AttributesTable.module.scss";

export default function TableHead({
    fields,
    sortFeatures
} : {
    fields?: FieldType[];
    sortFeatures: (field: string, type: 'asc' | 'desc') => void
}){
    const ref = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        function sort(evt: CustomEvent<{field: string, type: 'asc' | 'desc'}>){
            sortFeatures(evt.detail.field, evt.detail.type);
        }

        ref.current?.addEventListener("sort-features", sort as EventListener);
    }, []);
    
    return (
        <thead>
            <tr ref={ref}>
                <th className={styles.no_header} style={{width: '25px'}}/>
                
                {fields?.map(field => {
                    return (
                        <th 
                            key={field.name}
                            className={styles.header} 
                            style={{width: field.columnWidth}}
                        >
                            <div>
                                {field.label || field.name}
                                <Sorter 
                                    field={field.name}
                                    defaultStatus={"waiting"}
                                />
                            </div>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
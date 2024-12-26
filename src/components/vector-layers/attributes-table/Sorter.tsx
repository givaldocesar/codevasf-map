import { useState } from "react";
import classNames from "classnames";
import { FieldType, SorterStatus } from "./utils";
import styles from "./AttributesTable.module.scss";

export default function Sorter({
    defaultStatus,
    field
} : {
    defaultStatus: SorterStatus;
    field: string;
}){
    const [status, setStatus] = useState<SorterStatus>(defaultStatus);

    function changeStatus(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        let current : SorterStatus = 'asc';

        switch(status){
            case 'waiting':
                current = 'asc';
                break;
            case 'asc':
                current = 'desc';
                break;
            default:
        }

        setStatus(current);
        evt.target.dispatchEvent(
            new CustomEvent<{field: string, type: SorterStatus}>(
                "sort-features", 
                {
                    bubbles: true,
                    detail: {
                        field: field,
                        type: current
                    }
                }
            )
        );
    }
    
    if(status === 'waiting'){
        return (
            <button className={styles.sorter} onClick={changeStatus}>
                <svg viewBox="0 0 50 50">
                    <line x1={0} y1={25} x2={50} y2={25}/>
                </svg>
            </button>
        );
    }

    return (
        <button className={styles.sorter} onClick={changeStatus}>
            <svg viewBox="0 0 50 50" className={classNames({
                [styles.ascendent]: status === 'asc',
                [styles.descendent]: status === 'desc'
            })}>
                <line x1={0} y1={40} x2={25} y2={15}/>
                <line x1={25} y1={15} x2={50} y2={40}/>
            </svg>
        </button>
    );
}
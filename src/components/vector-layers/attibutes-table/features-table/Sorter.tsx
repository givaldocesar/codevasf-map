import { useState } from "react";
import SorterEvent , { SorterStatus } from "./SorterEvent";
import styles from "./FeatureTable.module.scss";


export default function Sorter({field} : {field: string;}){
    const [status, setStatus] = useState<SorterStatus>("waiting");

    function changeStatus(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        const current : SorterStatus = (status === 'ascendent' ? 'descendent' : 'ascendent');
        setStatus(current);
        evt.target.dispatchEvent(new SorterEvent(current, field));
    }

    return (
        <button className={styles.sorter} onClick={changeStatus}>
            { 
                status === "waiting" ? 
                    <svg viewBox="0 0 50 50">
                        <line x1={0} y1={25} x2={50} y2={25}/>
                    </svg> 
                :
                status === "ascendent" ?
                    <svg viewBox="0 0 50 50" className={styles.ascendent}>
                        <line x1={0} y1={40} x2={25} y2={15}/>
                        <line x1={25} y1={15} x2={50} y2={40}/>
                    </svg>
                :
                    <svg viewBox="0 0 50 50" className={styles.descendent}>
                        <line x1={0} y1={40} x2={25} y2={15}/>
                        <line x1={25} y1={15} x2={50} y2={40}/>
                    </svg>
            }
        </button>
    );
}
import React from "react";
import styles from "./FeatureTable.module.scss";

export const PAGE_LIMIT = 200;

export default function Pagination({
    total,
    current
} : {
    total: number;
    current: number;
}){
    const pages = Math.ceil(total / PAGE_LIMIT);

    //UMA PÁGINA NÃO EXIBE
    if(pages <= 1) return null;
    
    //CRIAR OS BOTOES
    const options: React.ReactNode[] = [];
    
   for(let i = 1; i <= pages; i++){
        options.push(<option key={i}value={i}>{i}</option>);
    }
    
    return (
        <>
            <hr />
            <div className={styles.pagination}>
                <span>Página</span>
                <select onChange={evt => {evt.target.dispatchEvent(new Event("change-page", {bubbles: true}))}}>
                    { options }
                </select>
                <span>de {pages}</span>
            </div>
        </>
    );
}
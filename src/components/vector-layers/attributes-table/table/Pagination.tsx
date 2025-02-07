import React from "react";
import classNames from "classnames";
import styles from "./FeatureTable.module.scss";

export const PAGE_LIMIT = 100;

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
    const buttons: React.ReactNode[] = [];
    
   for(let i = 1; i <= pages; i++){
        buttons.push(
            <button 
                key={i} 
                className={classNames({[styles.active]: current === i})}
                onClick={evt => {evt.target.dispatchEvent(new Event("change-page", {bubbles: true}))}}
            >
                {i}
            </button>
        );
    }
    
    return (
        <div className={styles.pagination}>
            { buttons }
        </div>
    );
}
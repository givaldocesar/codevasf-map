import React from "react";
import styles from "./FeatureTable.module.scss";

export const PAGE_LIMIT = 200;

export class ChangePageEvent extends Event{
    static type = "attributes-table-change-page";

    constructor(){
        super("attributes-table-change-page", { bubbles: true });
    }
}

export default function Pagination({
    total,
    current
} : {
    total: number;
    current: number;
}){
    const pages = Math.ceil(total / PAGE_LIMIT);

    //UMA PÁGINA NÃO EXIBE
    if(pages <= 1) return <></>;
    
    //CRIA OS BOTOES
    const options: React.ReactNode[] = [];
    for(let i = 1; i <= pages; i++) options.push(<option key={i} value={i}>{i}</option>);

    function changePage(evt: React.ChangeEvent<HTMLSelectElement>){
        evt.target?.dispatchEvent(new ChangePageEvent());
    }
    
    return (
        <>
            <hr />
            <div className={styles.pagination}>
                <span>Página</span>
                <select 
                    defaultValue={current}
                    onChange={changePage}
                >
                    { options }
                </select>
                <span>de {pages}</span>
            </div>
        </>
    );
}
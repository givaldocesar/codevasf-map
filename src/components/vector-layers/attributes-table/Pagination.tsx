import classNames from "classnames";
import styles from "./AttributesTable.module.scss";

export const PAGE_LIMIT = 100;

export default function Pagination({
    total,
    current,
    changePage
} : {
    total: number,
    current: number,
    changePage: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}){
    function createButtons(){
        const buttons: React.JSX.Element[] = [];
        const pages = Math.ceil(total / PAGE_LIMIT);

        //UMA PÁGINA NÃO EXIBE
        if(pages <= 1) return null;

        for(let i = 1; i <= pages; i++){
            buttons.push(
                <button 
                    key={i} 
                    className={classNames({[styles.active]: current === i})}
                    onClick={changePage}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    }
    
    return (
        <div className={styles.pagination}>
            { createButtons() }
        </div>
    );
}
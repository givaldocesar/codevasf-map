import { TextLoader } from "../../loaders";
import styles from "./Attributes.module.scss";

export default function TableLoader(){
    return (
        <div className={styles.table_loader}>
            <TextLoader className={styles.text_loader}>
                CARREGANDO FEIÇÕES
            </TextLoader>
        </div>
    );
}
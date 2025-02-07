import { TextLoader } from "../../../loaders";
import styles from "./FeatureTable.module.scss";

export default function TableLoader(){
    return (
        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <TextLoader className={styles.loader}>
                CARREGANDO FEIÇÕES
            </TextLoader>
        </div>
    );
}
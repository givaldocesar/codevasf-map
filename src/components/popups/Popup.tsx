import { RemoveLayerIcon } from "../buttons";
import styles from "./Popup.module.scss";

export default function Popup({
    children,
    close
} : React.HTMLAttributes<HTMLDivElement>&{close: () => void}
){
    
    return (
        <div className={styles.popup}>
            <div className={styles.overlay} />
            <div className={styles.content}>
                <RemoveLayerIcon className={styles.close_button} title="Fechar" onClick={close}/>
                { children }
            </div>
        </div>
    );
}
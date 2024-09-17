import { RemoveLayerIcon } from "../buttons";
import styles from "./Popup.module.scss";

const Popup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    function close(evt: React.MouseEvent<HTMLOrSVGElement, MouseEvent>){
        evt.target.dispatchEvent(new CustomEvent('show-popup', {
            detail: null,
            bubbles: true
        }));
    }
    
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

export default Popup;
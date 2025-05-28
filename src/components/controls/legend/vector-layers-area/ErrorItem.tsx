import { CustomLayer } from "@/classes";
import { ErrorIcon } from "../../../buttons";
import styles from "../Legend.module.scss";

export default function ErrorItem({layer} : {layer: CustomLayer}){
    return (
        <div className={styles.item} style={{order: layer.get('order')}}>
            <input type="checkbox" defaultChecked={true} disabled />
            <ErrorIcon message={layer.get('error')}/>
            <span>{layer.get('title')}</span>
        </div>
    )
}
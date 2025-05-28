import { useState } from "react";
import { CustomLayer } from "@/classes";
import { LoadingIcon } from "../../../buttons";
import styles from "../Legend.module.scss";

export default function LoadingItem({layer}:{layer: CustomLayer}){
    const [progress, setProgress] = useState<number>(0);

    //@ts-ignore
    layer.on('progress-changed', () => setProgress(layer.getLoadingProgress()));
    
    return (
        <div className={styles.item} style={{order: layer.get('order')}}>
            <input type="checkbox" defaultChecked={true} disabled />
            <LoadingIcon />
            <span>{layer.get('title')}</span>
            <span>({progress.toFixed(2)}%)</span> 
        </div>
    )
}
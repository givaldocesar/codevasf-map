import { useState, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import { Feature } from "ol";
import { ObjectEvent } from "ol/Object";
import { FitToFeaturesEvent } from "../../../events";
import { FieldType, FeatureStatus, STATUS, ERROR } from "../utils";
import styles from "./FeatureTable.module.scss";
import zoom_icon from "../../../../assets/zoom.png";
import restore_icon from "../../../../assets/restore-delete.png";


export default function TableRow({
    mapName,
    feature,
    fields,
    allowDelete=false
}: {
    mapName: string;
    feature: Feature;
    fields: FieldType[];
    allowDelete?: boolean;
}){
    const [status, setStatus] = useState<FeatureStatus>(feature.get(STATUS));
    const [error, setError] = useState<string>();

    useEffect(() => {
        function updateStatus(evt: ObjectEvent){
            setStatus(feature.get(STATUS));
            setError(feature.get(ERROR));
        }
        
        feature.on("propertychange", updateStatus);
        return () => feature.un("propertychange", updateStatus);
    }, []);
    
    function update(evt: React.ChangeEvent<HTMLInputElement>){
        feature.set(STATUS, "edited");
        
        const field = evt.target;
        let value: string | number = field.value;
        if(!field.value){
            feature.set(field.name, null);
            return;
        }
        
        if(field.type === 'number'){ value = parseFloat(value) }
        feature.set(field.name, value);
    }

    function handleExclude(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        if(status === 'excluded'){
            feature.set(STATUS, 'edited');
            return ;
        } 

        feature.set(STATUS, "excluded");
    }

    function zoom(){
        document.dispatchEvent(new FitToFeaturesEvent({
            features: [feature],
            maxZoom: 17,
            mapName: mapName
        }));
    }

    if(status === 'removed') return ;

    return (
        <tr
            title={error}
            className={classNames({
                [styles.edited]: status === 'edited',
                [styles.excluded]: status === 'excluded',
                [styles.loading]: status === 'loading',
                [styles.error]: status === 'error',
                [styles.updated]: status === 'updated'
            })}
        >
            {allowDelete && 
                <td title={status === 'excluded' ? "Restaurar Feição" : "Excluir Feição" } >
                    <button className={`${styles.button} ${styles.table_button}`} onClick={handleExclude}>
                        {status === 'excluded' ?
                            <Image 
                                width={24}
                                height={24}
                                src={restore_icon}
                                alt="restore_icon"
                            /> :
                            <svg viewBox="0 0 50 50" className={styles.close_icon}>
                                <line x1={10} y1={10} x2={40} y2={40} />
                                <line x1={40} y1={10} x2={10} y2={40} />
                            </svg>
                        }
                    </button>
                </td>
            }
            
            <td title="Mostar Feição">
                <button className={`${styles.button} ${styles.table_button}`} onClick={zoom}>
                    <Image 
                        width={24}
                        height={24}
                        src={zoom_icon}
                        alt="zoom_icon"
                    />
                </button>
            </td>

            {fields.map(field => {
                if(field.editable){
                    return (
                        <td 
                            key={field.name} 
                            className={classNames({
                                [styles.row]: true,
                                [styles.disabled]: status === 'loading'
                            })}
                        >
                            <input 
                                name={field.name}
                                type={field.type || 'text'}
                                className={styles.field}
                                maxLength={field.maxLength || 2056}
                                defaultValue={feature.get(field.name)}
                                onChange={update}
                                disabled={status === 'loading' || status === 'excluded'}
                            />
                        </td>
                    );
                }
                
                return (
                    <td key={field.name} className={styles.row}>
                        {feature.get(field.name)}
                    </td>
                );
            })}
        </tr>
    );
}
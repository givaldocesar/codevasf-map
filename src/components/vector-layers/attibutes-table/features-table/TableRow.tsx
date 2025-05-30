import { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import Image from "next/image";
import { Feature, getUid } from "ol";
import { FieldType, FeatureStatus, STATUS, ERROR } from "../../../../interfaces";
import { FitToFeaturesEvent  } from "../../../events";
import AttributesTableOptionsContext from "../AttributesTableOptionsContext";
import styles from "./FeatureTable.module.scss";
import zoom_icon from "../../../../assets/zoom.png";
import restore_icon from "../../../../assets/restore-delete.png";


export default function TableRow({
    mapName,
    feature,
    fields,
}: {
    mapName: string;
    feature: Feature;
    fields: FieldType[];
}){
    const options = useContext(AttributesTableOptionsContext);
    const [status, setStatus] = useState<FeatureStatus>(feature.get(STATUS));
    const [error, setError] = useState<string>(feature.get(ERROR));

    useEffect(() => {
        function updateStatus() : void {
            setStatus(feature.get(STATUS));
            setError(feature.get(ERROR));
        }
        
        feature.on("propertychange", updateStatus);
        return () => feature.un("propertychange", updateStatus);
    }, []);
    
    function update(evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) : void {
        feature.set(STATUS, "edited");
        
        const field = evt.target;
        let value: string | number = field.value;
        if(!value){
            feature.set(field.name, null);
            return;
        }
        
        if(field.type === 'number'){ value = parseFloat(value) }
        feature.set(field.name, value);
    }

    function handleExclude() : void {
        if(status === 'excluded'){
            feature.set(STATUS, 'edited');
        } else {
            feature.set(STATUS, "excluded");
        }
    }

    function zoom() : void {
        document.dispatchEvent(new FitToFeaturesEvent({
            features: [feature],
            maxZoom: 15,
            mapName: mapName
        }));
    }

    if(status === 'removed') return <></>;

    const blockZoom = feature.getGeometry() ? false : true;

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
            <td className={classNames(options?.extraRowTools?.toolsClassName)}>
                <div className={styles.row_tools}>
                    {options.allowDelete && 
                        <button 
                            className={`${styles.button} ${styles.table_button}`}
                            title={status === 'excluded' ? "Restaurar Feição" : "Excluir Feição" }
                            onClick={handleExclude}
                        >
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
                    }
                    
                    <button 
                        disabled={blockZoom}
                        title={blockZoom ? "Sem Geometria" : "Mostrar Feição"}
                        onClick={zoom}
                        className={classNames({
                            [styles.button]: true,
                            [styles.table_button]: true
                        })}
                    >
                        <Image 
                            width={24}
                            height={24}
                            src={zoom_icon}
                            alt="zoom_icon"
                        />
                    </button>

                    { options.extraRowTools ? options.extraRowTools.factory(feature) : null }
                </div>
            </td>

            {options.rowFactory ?
                options.rowFactory(feature) :
                
                fields.map(field => {
                    if(field.editable){
                        return (
                            <td 
                                key={field.name} 
                                className={classNames({
                                    [styles.row]: true,
                                    [styles.disabled]: status === 'loading'
                                })}
                            >
                                {field.type === 'text-area' ?
                                    <textarea 
                                        name={field.name}
                                        className={styles.field}
                                        maxLength={field.maxLength || 2056}
                                        defaultValue={feature.get(field.name)}
                                        onChange={update}
                                        disabled={status === 'loading' || status === 'excluded'}
                                    />:
                                    <input 
                                        name={field.name}
                                        type={field.type || 'text'}
                                        className={styles.field}
                                        maxLength={field.maxLength || 2056}
                                        defaultValue={feature.get(field.name)}
                                        onChange={update}
                                        disabled={status === 'loading' || status === 'excluded'}
                                    />
                                }
                                
                            </td>
                        );
                    }

                    if(field.type === 'number' && field.decimals){
                        let value = field.calculate ? field.calculate(feature) : feature.get(field.name) ? parseFloat(feature.get(field.name)) : 0;
                        
                        return (
                            <td key={field.name} className={styles.row}>
                                { value.toFixed(field.decimals) }
                            </td>
                        );
                    }

                    return (
                        <td key={field.name} className={styles.row}>
                            { field.name === 'ol_uid' ? getUid(feature) : feature.get(field.name) }
                        </td>
                    );
                })
            }
        </tr>
    );
}
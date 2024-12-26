import Image from "next/image";
import { Feature } from "ol";
import { FitToFeaturesEvent } from "../../events";
import { FieldType } from "./utils";
import styles from "./AttributesTable.module.scss";
import zoom_icon from "../../../assets/zoom.png";

export default function TableRow({
    feature,
    fields
}: {
    feature: Feature;
    fields: FieldType[]
}){
    function update(evt: React.ChangeEvent<HTMLInputElement>){
        const field = evt.target;
        let value: string | number = field.value;
        if(!field.value){
            feature.set(field.name, null);
            return;
        }
        
        if(field.type === 'number'){ value = parseFloat(value) }
        feature.set(field.name, value);
    }

    function zoom(){
        document.dispatchEvent(new FitToFeaturesEvent({
            features: [feature],
            maxZoom: 17,
            mapName: 'area-atuacao'
        }));
    }
    
    return (
        <tr>
            <td>
                <button className={styles.zoom_button} onClick={zoom}>
                    <Image 
                        width={24}
                        height={24}
                        src={zoom_icon}
                        alt="zomm_icon"
                    />
                </button>
            </td>

            {fields?.map(field => {
                if(field.editable){
                    return (
                        <td key={field.name} className={styles.row}>
                            <input 
                                name={field.name}
                                type={field.type || 'text'}
                                className={styles.field}
                                maxLength={field.maxLength || 2056}
                                defaultValue={feature.get(field.name)}
                                onChange={update}
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
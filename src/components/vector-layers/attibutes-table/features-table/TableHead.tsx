import { useContext } from "react";
import { FieldType } from "../../../../interfaces";
import AttributesTableOptionsContext from "../AttributesTableOptionsContext";
import Sorter from "./Sorter";
import styles from "./FeatureTable.module.scss";

export default function TableHead({ fields }:{ fields: FieldType[] }){
    const options = useContext(AttributesTableOptionsContext);
    
    return (
        <thead>
            <tr>
                <th className={styles.no_header} />
                
                {fields?.map(field => {
                    return (
                        <th 
                            key={field.name}
                            style={{width: field.columnWidth}}
                            className={styles.header} 
                        >
                            <div>
                                {field.label || field.name}
                                <Sorter field={field.name} />
                            </div>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
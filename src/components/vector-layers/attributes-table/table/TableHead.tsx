import { FieldType } from "../utils";
import Sorter from "./Sorter";
import styles from "./FeatureTable.module.scss";

export default function TableHead({
    fields,
    allowDelete = false
}:{
    fields: FieldType[];
    allowDelete?: boolean;
}){
    return (
        <thead>
            <tr>
                {allowDelete && <th className={styles.no_header} style={{width: '25px'}} /> }
                <th className={styles.no_header} style={{width: '25px'}}/>
                
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
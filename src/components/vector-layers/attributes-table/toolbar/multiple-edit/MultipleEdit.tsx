import React from "react";
import { CustomLayer } from "../../../../../classes";
import { FieldType, FilterType, convertToFilter } from "../../utils";
import FieldsForm from "../FieldsForm";
import EditEvent from "./EditEvent";
import styles from "../Form.module.scss";

export default function MultipleEdit({
    popup,
    mapName, 
    collapsed,
    fields,
    layer
} : {
    popup?: Window;
    mapName: string;
    collapsed: boolean;
    fields: FieldType[];
    layer: CustomLayer;
}){
    const doc = popup?.document || window.document;
    
    async function edit(evt: React.FormEvent<HTMLFormElement>){
        evt.stopPropagation();
        evt.preventDefault();
        
        const form = evt.target as HTMLFormElement;
        const values: FilterType[] = []; 
    
        for(let i = 0; i < form.elements.length; i++){
            const valueInput = form.elements.item(i) as HTMLInputElement;
            const value = convertToFilter(valueInput);
            if(value && value.type !== 'checkbox') values.push(value);
        } 

        if(values.length > 0){
            const onlyFiltered = form.elements.namedItem("onlyFiltered") as HTMLInputElement;
            evt.target.dispatchEvent(new EditEvent(values, onlyFiltered.checked));
            return;
        }
        
        (popup || window).alert("Nada para atualizar.");
        return;
    }

    return (
        <FieldsForm 
            id={`${mapName}-${layer.get("title")}-edit`}
            fields={fields}
            className={collapsed ? styles.collapsed : null}
            inputsClassName={styles.edit_input}
            onSubmit={edit}
        >
            <div className={styles.row}>
                <input type="checkbox" defaultChecked id={`${mapName}-${layer.get("title")}-onlyFiltered`} name="onlyFiltered"/>
                <label 
                    htmlFor={`${mapName}-${layer.get("title")}-onlyFiltered`} 
                    style={{cursor: 'pointer'}}
                >
                    Atualizar somente as filtradas.
                </label>
            </div>
            <div className={styles.row}>
                <button type="reset" className={styles.button} style={{width: '200px'}}>LIMPAR CAMPOS</button>
                <button type="submit" className={`${styles.button} ${styles.red}`} style={{width: '200px'}}>ATUALIZAR FEIÇÕES</button>
            </div>
        </FieldsForm>
    );
}
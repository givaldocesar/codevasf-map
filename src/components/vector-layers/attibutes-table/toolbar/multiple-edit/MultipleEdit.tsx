import React from "react";
import { getUid } from "ol";
import classNames from "classnames";
import { CustomLayer } from "../../../../../classes";
import { FieldType, Filter } from "../../../../../interfaces";
import { convertToFilter } from "../../../../../utils";
import { AttributesTableEditEvent } from "../../functions";
import FieldsForm from "../FieldsForm";
import styles from "../Toolbar.module.scss";


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
    async function edit(evt: React.FormEvent<HTMLFormElement>){
        evt.stopPropagation();
        evt.preventDefault();
        
        const form = evt.target as HTMLFormElement;
        const values: Filter[] = []; 
    
        for(let i = 0; i < form.elements.length; i++){
            const valueInput = form.elements.item(i) as HTMLInputElement;
            const value = convertToFilter(valueInput);
            if(value && value.type !== 'checkbox') values.push(value);
        } 

        if(values.length > 0){
            const onlyFiltered = form.elements.namedItem("onlyFiltered") as HTMLInputElement;
            evt.target.dispatchEvent(new AttributesTableEditEvent(values, onlyFiltered.checked));
            return;
        }
        
        (popup || window).alert("Nada para atualizar.");
        return;
    }

    return (
        <FieldsForm 
            id={`${mapName}-${getUid(layer)}-edit`}
            fields={fields}
            className={classNames({[styles.collapsed]: collapsed})}
            inputsClassName={styles.edit_input}
            onSubmit={edit}
        >
            <div className={styles.row}>
                <input 
                    type="checkbox" 
                    id={`${mapName}-${getUid(layer)}-onlyFiltered`} 
                    name="onlyFiltered"
                    defaultChecked 
                />
                <label 
                    htmlFor={`${mapName}-${getUid(layer)}-onlyFiltered`} 
                    style={{cursor: 'pointer'}}
                >
                    Atualizar somente as filtradas.
                </label>
            </div>
            <div className={styles.row}>
                <button type="reset" className={styles.button} style={{width: '200px'}}>LIMPAR CAMPOS</button>
                <button type="submit" className={classNames(styles.button, styles.red)} style={{width: '200px'}}>ATUALIZAR FEIÇÕES</button>
            </div>
        </FieldsForm>
    );
}
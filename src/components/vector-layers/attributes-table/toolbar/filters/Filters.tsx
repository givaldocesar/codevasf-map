import React from "react";
import { Feature } from "ol";
import { CustomLayer } from "../../../../../classes";
import { FieldType, FilterType, convertToFilter, NULL_VALUE, STATUS } from "../../utils";
import FieldsForm from "../FieldsForm";
import FilterEvent from "./FilterEvent";
import styles from "../Form.module.scss";

export default function Filters({
    popup,
    mapName, 
    layer,
    fields,
    collapsed,
    options
} : {
    popup?: Window;
    mapName: string; 
    layer: CustomLayer;
    fields: FieldType[];
    collapsed: boolean;
    options?: {
        allowDelete?: boolean;
        multipleEdit?: boolean;
    }
}){
    const doc = popup?.document || window.document;
    const isEditable = options?.allowDelete || options?.multipleEdit || fields.some(field => field.editable);
    const baseID = `${mapName}-${layer.get("title")}-filter`;
    
    async function filter(evt: React.FormEvent<HTMLFormElement>){
        evt.stopPropagation();
        evt.preventDefault();
        
        const form = evt.target as HTMLFormElement;
        const filters: FilterType[] = []; 
        const editFilters: FilterType[] = [];
        const filtereds: Feature[] = [];
        
        for(let i = 0; i < form.elements.length; i++){
            const filterInput = form.elements.item(i) as HTMLInputElement;
            const filter = convertToFilter(filterInput);
            if(filter) {
                if(filter.type === 'checkbox'){
                    editFilters.push(filter)
                    continue;
                }

                filters.push(filter);
            };
        } 
    
        const tool = doc.getElementById(`${baseID}-tool`);

        if(filters.length > 0 || editFilters.length > 0){
            const features = layer.getSource()?.getFeatures() as Feature[];
            
            features.forEach(feature => {
                let isFiltered = true;
                
                //Verifica se passa nos filtros base
                filters.forEach(filter => {
                    switch(filter.type){
                        case NULL_VALUE:
                            isFiltered = isFiltered && feature.get(filter.name) ? false : true;
                            break;
                        case "number":
                            isFiltered = isFiltered && feature.get(filter.name) === filter.value;
                            break;
                        default:
                            const featValue = feature.get(filter.name);
                            const filterValue = filter.value as string;
                            isFiltered = isFiltered && (featValue ? featValue.toLowerCase().includes(filterValue.toLowerCase()) : false);
                    }
                });

                //Verifica se foi editada
                if(editFilters.length > 0){
                    let isEdited = false;
                    editFilters.forEach(filter => {
                        isEdited = isEdited || feature.get(STATUS) === filter.name;
                    });

                    if(isFiltered && isEdited) filtereds.push(feature);
                    return;
                }
                
                if(isFiltered) filtereds.push(feature);
            });
            
            tool?.classList.add(styles.active);
            (form.elements.namedItem('submit') as HTMLElement).classList.add(styles.active);
            evt.target.dispatchEvent(new FilterEvent(filtereds));
            return ;
        } 
        
        tool?.classList.remove(styles.active);
        (form.elements.namedItem('submit') as HTMLElement).classList.remove(styles.active);
        (popup || window).alert("Não há filtros criados.");
    }
   
    return (
        <FieldsForm 
            id={baseID}
            fields={fields}
            className={collapsed ? styles.collapsed : null}
            onSubmit={filter}
        >
            {isEditable && 
                <div className={styles.row}>
                    <div className={styles.field} style={{justifyContent: 'center'}}>
                        <input type="checkbox" id={baseID + '-edited'} name="edited"/>
                        <label htmlFor={baseID + '-edited'} style={{cursor: 'pointer'}}>Editadas</label>
                    </div>
                    <div className={styles.field} style={{justifyContent: 'center'}}>
                        <input type="checkbox" id={baseID + '-excluded'} name="excluded"/>
                        <label htmlFor={baseID + '-excluded'} style={{cursor: 'pointer'}}>Excluídas</label>
                    </div>
                    <div className={styles.field} style={{justifyContent: 'center'}}>
                        <input type="checkbox" id={baseID + '-updated'} name="updated"/>
                        <label htmlFor={baseID + '-updated'} style={{cursor: 'pointer'}}>Atualizadas</label>
                    </div>
                    <div className={styles.field} style={{justifyContent: 'center'}}>
                        <input type="checkbox" id={baseID + '-error'} name="error"/>
                        <label htmlFor={baseID + '-error'} style={{cursor: 'pointer'}}>Com erro</label>
                    </div>
                </div>
            }
            
            <div className={styles.row}>
                <button 
                    type="reset" 
                    className={styles.button} 
                    style={{width: '200px'}}
                >
                    LIMPAR FILTROS
                </button>
                <button
                    type="submit" 
                    className={styles.button} 
                    style={{width: '200px'}}
                    name="submit"
                >
                    FILTRAR
                </button>
            </div>
        </FieldsForm>
    );
}
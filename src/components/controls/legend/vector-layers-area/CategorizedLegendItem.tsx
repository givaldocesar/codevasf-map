import { useState } from "react";
import { CustomCategorizedStyle, CustomLayer, NO_CATEGORY } from "../../../../classes";
import { VectorLayerIcon, CollpaseLayerIcon } from "../../../buttons";
import styles from "../Legend.module.scss";

const CategorizedLegendItem: React.FC<{layer: CustomLayer}> = ({layer}) => {
    const [collapsed, setCollapsed] = useState(false);
    const style = layer.getStyle() as CustomCategorizedStyle;
    
    function changeVisibility(evt: React.ChangeEvent<HTMLInputElement>){
        evt.stopPropagation();
        const elements = evt.target.form?.elements as HTMLFormControlsCollection;
        
        if(evt.target.name === 'main'){
            style.setVisible(evt.target.checked);
            
            for(let i = 0; i < elements.length; i++){
                const item = elements.item(i) as HTMLInputElement;
                item.checked =  evt.target.checked;
            }  
        
        } else {
            style.setVisible(evt.target.checked, evt.target.name);
            
            let count = 0;
            for(let i = 0; i < elements.length; i++){
                const item = elements.item(i) as HTMLInputElement;
                if(item.name !== 'main' && item.checked){
                    count += 1;
                }
            }  

            const main = elements.namedItem('main') as HTMLInputElement;
            main.indeterminate = false;
            
            switch(count){
                case 0:
                    main.checked = false;
                    break ;
                case style.getStyles().length:
                    main.checked = true;
                    break ;
                default:
                    main.indeterminate = true;
            }
        }   

        layer.changed();
    }

    async function zoom(value?: string){
        const map = layer.get('map');
        let filter;

        if(value){ 
            filter = {
                field: style.getField(), 
                value: value === NO_CATEGORY ? undefined : value
            } 
        }

        map.fit(await layer.getFeaturesExtent(filter));
  
    }
    
    return (
        <form className={styles.categorized_item}>
            <div className={styles.item}>
                <input type="checkbox" defaultChecked={layer.getVisible()} onChange={changeVisibility} name="main"/>
                <CollpaseLayerIcon collpased={collapsed} onClick={() => setCollapsed(!collapsed)}/>
                <label onClick={() => zoom()}>{layer.get('title')}</label>
            </div>
            <div className={styles.categories} style={{maxHeight: collapsed ? '0px' : '500px'}}>
                { 
                    style.getStyles().map(item => {
                        return (
                            <div className={styles.item} key={item.getValue()}>
                                <input type="checkbox" defaultChecked={layer.getVisible()} onChange={changeVisibility} name={item.getValue()}/>
                                <VectorLayerIcon geometry={item.getGeometryType()} style={item}/>
                                <label onClick={() => zoom(item.getValue())} id={item.getValue()}>{item.getLabel() || item.getValue() }</label>
                            </div>
                        );
                    })
                }
            </div>
        </form>
    );
}

export default CategorizedLegendItem;
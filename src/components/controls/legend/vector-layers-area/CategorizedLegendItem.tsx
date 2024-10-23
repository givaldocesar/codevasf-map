import { useState } from "react";
import {  CustomLayer, CustomCategorizedStyle, NO_CATEGORY } from "../../../../classes";
import { LayerStatus } from "../../../../interfaces";
import { VectorLayerIcon, CollpaseLayerIcon } from "../../../buttons";
import LoadingItem from "./LoadingItem";
import styles from "../Legend.module.scss";

const CategorizedLegendItem: React.FC<{layer: CustomLayer}> = ({layer}) => {
    const style = layer.getBaseStyle() as CustomCategorizedStyle;
    
    const [collapsed, setCollapsed] = useState(style.getCollapsed());
    const [layerStatus, setStatus] = useState<LayerStatus>('loading');

    //@ts-expect-error
    layer.on('status-changed', () => setStatus(layer.getStatus()));

    //LOADING
    if(layerStatus === 'loading') return <LoadingItem layer={layer} />;

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

        layer.dispatchEvent('change-style');
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

    const visible = style.getDefaultVisible();
    
    return (
        <form className={styles.categorized_item} style={{order: layer.get('order')}}>
            <div className={styles.item}>
                <input type="checkbox" defaultChecked={visible} onChange={changeVisibility} name="main"/>
                <CollpaseLayerIcon collpased={collapsed} onClick={() => setCollapsed(!collapsed)}/>
                <label onClick={() => zoom()}>{layer.get('title')}</label>
            </div>
            <div className={styles.categories} style={{maxHeight: collapsed ? '0px' : '500px'}}>
                { 
                    style.getStyles().map(item => {
                        return (
                            <div className={styles.item} key={item.getValue()}>
                                <input type="checkbox" defaultChecked={visible} onChange={changeVisibility} name={item.getValue()}/>
                                <VectorLayerIcon geometry={item.getGeometry()} style={item}/>
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
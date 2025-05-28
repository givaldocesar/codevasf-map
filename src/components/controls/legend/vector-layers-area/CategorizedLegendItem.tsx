import { useState } from "react";
import { CustomLayer, CustomCategorizedStyle } from "../../../../classes";
import { LayerStatus, Filter, ELSE_CATEGORY } from "../../../../interfaces";
import { VectorLayerIcon, CollapseLayerIcon } from "../../../buttons";
import LoadingItem from "./LoadingItem";
import ErrorItem from "./ErrorItem";
import styles from "../Legend.module.scss";

export default function CategorizedLegendItem({layer} : {layer: CustomLayer}){
    const style = layer.getBaseStyle() as CustomCategorizedStyle;
    const [collapsed, setCollapsed] = useState(style.getCollapsed());
    const [layerStatus, setStatus] = useState<LayerStatus>('loading');

    //@ts-ignore
    layer.on('status-changed', () => setStatus(layer.getStatus()));

    //LOADING
    if(layerStatus === 'loading') return <LoadingItem layer={layer} />;

    //ERROR
    if(layerStatus === 'error') return <ErrorItem layer={layer} />;

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
                if(item.name !== 'main' && item.checked) count += 1;
            }  

            const main = elements.namedItem('main') as HTMLInputElement;
            main.indeterminate = false;
            
            switch(count){
                case 0:
                    main.checked = false;
                    break ;
                case style.getCategories().length:
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
        let filters : Filter[] | undefined;

        switch(value){
            case undefined:
                map.fit(await layer.getFeaturesExtent());
                return ;
            case ELSE_CATEGORY:
                filters = style.getCategories().map(category=> ({
                    type: 'text',
                    value: category.getValue(),
                    field: style.getField()
                }));    

                map.fit(await layer.getFeaturesExtent(filters, true));
                return ;
            default:
                filters  = [{
                    type: 'text',
                    field: style.getField(), 
                    value: value
                }];

                map.fit(await layer.getFeaturesExtent(filters));
        }
    }

    const visible = style.getDefaultVisible();
    
    return (
        <form className={styles.categorized_item} style={{order: layer.get('order')}}>
            <div className={styles.item}>
                <input type="checkbox" defaultChecked={visible} onChange={changeVisibility} name="main"/>
                <CollapseLayerIcon collpased={collapsed} onClick={() => setCollapsed(!collapsed)}/>
                <label onClick={() => zoom()}>{layer.get('title')}</label>
            </div>
            <div className={styles.categories} style={{maxHeight: collapsed ? '0px' : '500px'}}>
                { 
                    style.getCategories().map(item => {
                        const value = item.getValue();
                        
                        return (
                            <div className={styles.item} key={value}>
                                <input type="checkbox" defaultChecked={visible} onChange={changeVisibility} name={value}/>
                                <VectorLayerIcon geometry={item.getGeometry()} style={item}/>
                                <label onClick={() => zoom(value)} id={value}>{item.getLegendLabel() || value }</label>
                            </div>
                        );
                    })
                }
            </div>
        </form>
    );
}
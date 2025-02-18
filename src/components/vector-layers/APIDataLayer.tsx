import { useEffect, useMemo, useContext } from "react";
import { CustomLayer, LayerCache } from "../../classes";
import { BaseLayerProps } from "../../interfaces";
import { MapContext } from "../contexts";
import Layer from "./Layer";
import { processAPIData, BASE_URL } from "./utils";

const PROMISES_LIMIT = 30;

interface APIDataLayerProps extends BaseLayerProps {
   database: string;
   urlInit?: RequestInit;
   groupField: string;
}

function APIDataLayer({
    children, 
    database, 
    urlInit, 
    groupField, 
    fit, 
    ...props
} : APIDataLayerProps){
    const map = useContext(MapContext);
    const projection = map?.getView().getProjection();
    const layer = useMemo(() => new CustomLayer(props), []);
    let isLoading = false;

    //LOAD LAYER
    useEffect(() => {
        async function getData(){
            try{
                const response = await fetch(BASE_URL + `/${database}/versions`, urlInit);
                const cache = new LayerCache({name: database, keyPath: groupField});
                await cache.connect();
                
                if(response.ok){
                    const versions = await response.json();
                    layer.setLoadingProgress(5);
                    
                    let promises: Promise<boolean>[] = [];
                    let count = 0;
                    const total = Math.floor(versions.length / PROMISES_LIMIT) + 1;

                    for(let i = 0; i < versions.length; i++){
                        const getter = processAPIData({layer, database, projection, cache, groupField, version: versions[i]});
                        promises.push(getter);

                        if(promises.length === PROMISES_LIMIT){
                            await Promise.all(promises);
                            promises = [];
                            count += 1;
                            layer.setLoadingProgress(count/total*100);
                        }
                    } 

                    await Promise.all(promises);
                    layer.setLoadingProgress(100); 
                } else {
                    const result = await response.json();
                    throw new Error(result);
                }
                
                if(fit) map?.fit(layer.getSource()?.getExtent());
                layer.setStatus('complete');
            } catch (err) {
                const error = err as Error;
                layer.setStatus('error');
                layer.set('error', error.message)
                throw new Error(`LAYER ${props.title} => ${error.message}`);
            }
        }

        if(!isLoading){
            isLoading = true;
            layer.setStatus('loading');
            getData(); 
        }
        
    }, []);

    //HANDLE DELETE FEATURE
    useEffect(() => {
        layer.getSource()?.on('removefeature', async (evt) => {
            const cache = new LayerCache({name: database, keyPath: groupField});
            await cache.connect();
            await cache.delete(evt.feature.get(groupField));
        });
    });
    
    return (
        <Layer layer={layer} {...props} >
            { children }
        </Layer>
    );
}

export default APIDataLayer;
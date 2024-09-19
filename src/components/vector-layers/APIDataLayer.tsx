import React, { useEffect, useMemo, useContext } from "react";
import { CustomLayer, LayerCache } from "../../classes";
import { MapContext } from "../contexts";
import Layer, { BaseLayerProps } from "./Layer";
import { processAPIData, BASE_URL } from "./utils";

const PROMISES_LIMIT = 1;

interface APIDataLayerProps extends BaseLayerProps {
   database: string;
   urlInit?: RequestInit;
   groupField: string;
}

const APIDataLayer: React.FC<APIDataLayerProps> = ({children, database, urlInit, groupField, fit, ...props}) => {
    const map = useContext(MapContext);
    const projection = map?.getView().getProjection();
    const layer = useMemo(() => new CustomLayer(props), []);

    useEffect(() => {
        async function getData(){
            try{
                const versionsResponse = await fetch(BASE_URL + `/${database}/versions`, urlInit);

                const cache = new LayerCache({name: database, keyPath: groupField});
                await cache.connect();
                
                if(versionsResponse.ok){
                    const versions = await versionsResponse.json();
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
                }
                
                if(fit) map?.fit(layer.getSource()?.getExtent());
                layer.setStatus('complete');
            } catch (err) {
                const error = err as Error;
                throw new Error(`LAYER ${props.title} => ${error.message}`);
            }
        }

        layer.setStatus('loading');
        getData(); 
    }, []);
    
    return (
        <Layer layer={layer} {...props} >
            { children }
        </Layer>
    );
}

export default APIDataLayer;
import { useEffect, useMemo, useContext } from "react";
import { GeoJSON } from "ol/format";
import { CustomLayer, LayerCache } from "../../classes";
import { BaseLayerProps } from "../../interfaces";
import { getFormatFromContent } from "../../utils";
import { MapContext } from "../contexts";
import Layer from "./Layer";


export default function URLDataLayer({
    children, 
    url, 
    urlInit, 
    fit, 
    ...props
} : BaseLayerProps & {
    url: string;
    urlInit?: RequestInit;
}){
    const map = useContext(MapContext);
    const layer = useMemo(() => new CustomLayer(props), []);

    useEffect(() => {
        async function getData(){
            try{
                const headResponse = await fetch(url, { method: "HEAD" });
                const serverLastModified = headResponse.headers.get('last-modified');
                                
                const cache = new LayerCache({ name: 'url_files', keyPath: 'url'});
                await cache.connect();
                
                const cacheData = await cache.get(url);
                if(cacheData?.lastModified === serverLastModified){
                    //CACHE FEATURES
                    layer.setLoadingProgress(5); 
                    
                    const features = new GeoJSON().readFeatures(cacheData.features);
                    layer.getSource()?.addFeatures(features);
                
                } else {
                    //SERVER FEATURES
                    layer.setLoadingProgress(5); 
                    const response = await fetch(url, urlInit);
                    
                    if(response.ok){
                        const contentType = response.headers.get('content-type') as string;
                        const contentLenght = response.headers.get('content-length') as string;
                        const lastModified = response.headers.get('last-modified') as string;
    
                        const format = getFormatFromContent(contentType);
                        const reader = response.body?.getReader();
    
                        if(reader){
                            let loaded = 0;
                            const values = [];
    
                            while(true){
                                const { done, value } =  await reader.read();
                                if(done) break;
                                
                                values.push(value);
                                loaded += value.byteLength;
                                layer.setLoadingProgress(((loaded/parseInt(contentLenght)) * 75) + 5);
                            }
        
                            const data = await new Blob(values).text();   
                            layer.setLoadingProgress(85);   
                            
                            const features = format.readFeatures(data, { featureProjection: map?.getView().getProjection() });
                            layer.getSource()?.addFeatures(features);
                            layer.setLoadingProgress(90);   
                            
                            const jsonFeatures = new GeoJSON().writeFeaturesObject(features);
                            await cache.insert({
                                lastModified: lastModified,
                                url: url,
                                features: jsonFeatures
                            });
    
                            layer.setLoadingProgress(95);   
                        }
                    }
                    
                    if(response.status === 404) throw new Error('URL não encontrada.');
                }

                if(fit) map.fit(layer.getSource()?.getExtent());
                layer.setLoadingProgress(100); 
                layer.setStatus('complete');
            } catch (err) {
                const error = err as Error;
                layer.setStatus('error');
                layer.set('error', error.message);
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
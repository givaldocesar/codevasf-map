import { useEffect, useMemo, useContext } from "react";
import { CustomLayer, LayerCache } from "../../classes";
import { getFormat } from "../../utils";
import { MapContext } from "../contexts";
import Layer, { LayerProps } from "./Layer";
import { GeoJSON } from "ol/format";


interface Props extends LayerProps {
    url: string;
    urlInit?: RequestInit;
}

const URLDataLayer: React.FC<Props> = ({children, url, urlInit, fit, ...props}) => {
    const map = useContext(MapContext);
    const layer = useMemo(() => new CustomLayer(props), []);

    useEffect(() => {
        async function getData(){
            try{
                const headResponse = await fetch(url, { method: "HEAD" });
                const serverLastModified = headResponse.headers.get('last-modified');                
                
                const cache = new LayerCache({
                    name: 'url_files',
                    keyPath: 'url',
                    indexes: [{name: "lastModified", unique: false}]
                });
                
                await cache.connect();
                const cacheData = await cache.get(url);
                
                if(cacheData.lastModified === serverLastModified){
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
    
                        const format = getFormat(contentType);
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
                }

                if(fit) map?.fit(layer.getSource()?.getExtent());
                layer.setLoadingProgress(100); 
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

export default URLDataLayer;
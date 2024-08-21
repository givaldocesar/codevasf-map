import { useEffect, useMemo, useContext } from "react";
import { CustomLayer } from "../../classes";
import { getFormat } from "../../utils";
import { MapContext } from "../contexts";
import Layer, { LayerProps } from "./Layer";


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
                const response = await fetch(url, urlInit);
                
                if(response.ok){
                    const contentType = response.headers.get('content-type') as string;
                    const contentLenght = response.headers.get('content-length') as string;
                    console.log(contentType)

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
                            layer.setLoadingProgress((loaded/parseInt(contentLenght)) * 90);
                        }
    
                        const data = await new Blob(values).text();   
                        layer.setLoadingProgress(95);   
                        
                        const features = format.readFeatures(data, { featureProjection: map?.getView().getProjection() });
                        layer.getSource()?.addFeatures(features);
                        layer.setLoadingProgress(100); 
                        layer.setStatus('complete');
                        
                        if(fit) map?.fit(layer.getSource()?.getExtent());
                    }
                }
                
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
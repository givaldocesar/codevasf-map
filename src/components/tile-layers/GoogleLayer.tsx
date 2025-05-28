import { useContext, useState, useMemo, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import classNames from "classnames";
import TileLayer from "ol/layer/Tile";
import { Google, XYZ } from "ol/source";
import { MapContext } from "../contexts";
import { BaseControl }  from "../controls";
import styles from "./Tiles.module.scss";
import google from "../../assets/google.png";
import google_white from "../../assets/google_white.png";


class CustomGoogle extends Google {
    constructor({
        apiKey,
        mapType,
        layerTypes,
        image
    }: {
        apiKey: string;
        mapType?: 'hybrid' | 'roadmap' | 'satellite' | 'terrain';
        layerTypes?: string[];
        image: StaticImageData;
    }){
        super({
            key: apiKey,
            mapType: mapType,
            layerTypes: layerTypes,
            scale: 'scaleFactor2x',
            language: 'pt-BR',
            region: 'pt_BR',
            highDpi: true,
        });

        this.set('image', image);
    }
}

export default function GoogleLayer({
    apiKey,
    standard=false, 
    order, 
    zIndex, 
    mapType='satellite'
}: {
    apiKey: string;
    standard?: boolean;
    order?: number;
    zIndex?: number;
    mapType?: 'hybrid' | 'roadmap' | 'satellite' | 'terrain'
}){
    if(!apiKey) throw new Error("GOOGLE LAYER: Not api key.");

    const map = useContext(MapContext);
    const [showLogo, setShow] = useState(standard);
    
    const layer = useMemo(() => {
        let title, source;

        if(process.env.NODE_ENV === 'development'){
            source = new XYZ({});

            switch(mapType){
                case 'hybrid':
                    title = 'Google Hybrid';
                    source.setUrl("https://mt{0-3}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}");
                    source.set("image", google_white);
                    break;
                case 'roadmap':
                    title = 'Google Maps';
                    source.setUrl("https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}");
                    source.set("image", google);
                    break;
                case "satellite":
                    title = 'Google Satellite';
                    source.setUrl("https://mt{0-3}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}");
                    source.set("image", google_white);
                    break;
                case "terrain":
                    title = 'Google Terrain';
                    source.setUrl("https://mt{0-3}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}");
                    source.set("image", google);
            }

        } else {
            switch(mapType){
                case 'hybrid':
                    title = 'Google Hybrid';
                    source = new CustomGoogle({
                        apiKey: apiKey,
                        mapType: 'satellite',
                        layerTypes: ['layerRoadmap'],
                        image: google_white
                    });
                    break;
                case 'roadmap':
                    title = 'Google Maps';
                    source = new CustomGoogle({
                        apiKey: apiKey,
                        mapType: mapType,
                        image: google
                    });
                    break;
                case "satellite":
                    title = 'Google Satellite';
                    source = new CustomGoogle({
                        apiKey: apiKey,
                        mapType: mapType,
                        image: google_white
                    });
                    break;
                case "terrain":
                    title = 'Google Terrain';
                    source = new CustomGoogle({
                        apiKey: apiKey,
                        mapType: mapType,
                        layerTypes: ['layerRoadmap'],
                        image: google
                    });
                    break;
            }
        }
    
        const layer = new TileLayer({
            preload: Infinity,
            source: source,
            visible: standard,
            zIndex: zIndex,
            maxZoom: 20,
        });

        layer.setProperties({
            title: title,
            order: order,
        });

        layer.on("change:visible", () => setShow(layer.getVisible()));

        return layer;
    }, []);

    useEffect(() => {
        map.addLayer(layer);
        return () => { map?.removeLayer(layer) }
    }, [map, layer]);
    
    return (
        <BaseControl 
            className={classNames('ol-unselectable', styles.google_logo, {[styles.hidden]: !showLogo})}
        >
            <Image 
                src={layer.getSource()?.get("image")}
                width={119}
                height={36}
                alt="google-logo"
                style={{pointerEvents: "none"}}
            />
        </BaseControl>
    );
}
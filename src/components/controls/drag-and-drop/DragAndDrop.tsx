import React, { useContext, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { Feature } from "ol";
import { KML } from "ol/format";
import { DragAndDrop as Interaction } from "ol/interaction";
import { useForceUpdate } from "@/hooks";
import { createLayer } from "@/utils";
import { MapContext } from "../../contexts";
import BaseControl from "../BaseControl";
import DroppedItem from "./DroppedItem";
import RemoveDroppedLayerEvent from "./RemoveDroppedLayerEvent";
import styles from "./DragAndDrop.module.scss";
import icon from "../../../assets/kml-file.png";


export default function DragAndDrop({
    className,
    collapsable=false, 
    collapseImage, 
    collapseButtonClassName,
    showControl=true,
    showFeaturesProperties=false
} : {
    className?: string;
    collapsable?: boolean;
    collapseImage?: string;
    collapseButtonClassName?: string;
    showControl?: boolean;
    showFeaturesProperties?: boolean;
}){
    const ref = useRef<HTMLDivElement>(null);
    const map = useContext(MapContext);
    const forceUpdate = useForceUpdate();
    const files: React.JSX.Element[] = useMemo(() => [], []);

    const interaction = useMemo(() => new Interaction({
        formatConstructors: [new KML({extractStyles: false})]
    }), []);

    //Adiciona a interação ao mapa
    useEffect(() => {
        map.addInteraction(interaction);
        return () => { map.removeInteraction(interaction) }
    }, []);

    //escuta quando um arquivo é adicionado (apenas uma única vez)
    useEffect(() => {
        interaction.on('addfeatures', (evt) => {
            const id = `${evt.file.name}_${evt.file.lastModified}`;
            const file = files.find(file => file.props.id === id);
            
            if(file) {
                map.fit(file.props.layer.getSource()?.getExtent());
            
            } else {
                const layer = createLayer({
                    map: map,
                    features: evt.features as Feature[],
                    options: {
                        title: evt.file.name,
                        showProperties: showFeaturesProperties,
                        ignore: true
                    }
                });
                
                map.fit(layer.getSource()?.getExtent());
                
                files.push(<DroppedItem key={id} id={id} layer={layer} />);
                forceUpdate();
            }
        });
    }, []);

    //escuta quando algo é removido, quando o botão de remover é clicado.
    useEffect(() => {
        function remove(evt: RemoveDroppedLayerEvent){
            const idx = files.findIndex(file => file.props.id === evt.detail);
            
            map?.removeLayer(files[idx].props.layer);
            files.splice(idx, 1);
            forceUpdate();
        }
        
        const element = ref.current;
        element?.addEventListener(RemoveDroppedLayerEvent.type, remove as EventListener);
        return () => element?.removeEventListener(RemoveDroppedLayerEvent.type, remove as EventListener);
    }, [ref.current]);

    return (
        <>
            { showControl &&
                <BaseControl
                    className={classNames(className, {[styles.hidden]: files.length == 0})} 
                    collapsable={collapsable}
                    collapseIcon={collapseImage || icon}
                    collapseButtonClassName={collapseButtonClassName}
                >
                    <h3 className={styles.title}>Arquivos KML</h3>
                    <div ref={ref}>
                        { files }
                    </div>
                </BaseControl>
            }
        </>
    );
}
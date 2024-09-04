import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { Feature } from "ol";
import { KML } from "ol/format";
import { DragAndDrop as Interaction } from "ol/interaction";
import { MapContext } from "../../../components/contexts";
import BaseControl from "../BaseControl";
import DroppedItem from "./DroppedItem";
import createLayer from "./createLayer";
import styles from "./DragAndDrop.module.scss";


interface Props extends React.HTMLAttributes<HTMLDivElement>{
    collapsable?: boolean;
    collapseImage?: string;
    collapsePositionButton?: 'top_right' | 'top_left';
    showControl?: boolean;
    showFeaturesProperties?: boolean;
}

const DragAndDrop: React.FC<Props> = ({
    className, 
    collapsable=false, 
    collapseImage, 
    collapsePositionButton ='top_right',
    showControl=true,
    showFeaturesProperties=false
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const map = useContext(MapContext);
    const [revision, setRevision] = useState(0);
    const files: React.ReactElement[] = useMemo(() => [], []);

    const interaction = useMemo(() => new Interaction({
        formatConstructors: [new KML({extractStyles: false})]
    }), []);

    //Adiciona a interação ao mapa
    useEffect(() => {
        map?.addInteraction(interaction);
        return () => { map?.removeInteraction(interaction) }
    }, []);

    //escuta quando um arquivo é adicionado (apenas uma única vez)
    useEffect(() => {
        interaction.on('addfeatures', (evt) => {
            const id = `${evt.file.name}_${evt.file.lastModified}`;
            const file = files.find(file => file.props.id === id);
            
            if(file) {
                map?.fit(file.props.layer.getSource()?.getExtent());
            
            } else {
                const layer = createLayer({
                    map: map,
                    title: evt.file.name, 
                    features: evt.features as Feature[],
                    showProperties: showFeaturesProperties
                });
                
                files.push(<DroppedItem key={id} id={id} layer={layer} />);
                setRevision(revision => revision + 1);
            }
        });
    }, []);

    //escuta quando algo é removido, quando o botão de remover é clicado.
    useEffect(() => {
        ref.current?.addEventListener('remove-layer', ((evt: CustomEvent) => {
            const idx = files.findIndex(file => file.props.id === evt.detail);
            map?.removeLayer(files[idx].props.layer);
            files.splice(idx, 1);
            setRevision(revision => revision + 1);
        }) as EventListener);
    }, [ref.current]);

    return (
        <>
            { showControl &&
                <BaseControl
                    key={revision}
                    className={className} 
                    collapsable={collapsable}
                    collapseImage={collapseImage}
                    collapsePositionButton={collapsePositionButton}
                    style={{display: files.length > 0 ? 'block' : 'none'}}
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

export default DragAndDrop;
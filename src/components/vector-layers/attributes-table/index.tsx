import { useEffect, useState, Suspense } from "react";
import { createPortal } from "react-dom";
import { Feature } from "ol";
import { CustomLayer } from "../../../classes";
import { TextLoader } from "../../loaders";
import { FieldType, clear } from "./utils";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import Pagination, { PAGE_LIMIT } from "./Pagination";
import styles from "./AttributesTable.module.scss";


export default function AttributesTable({
    layer,
    headers=true,
    fields=[]
} : { 
    layer?: CustomLayer,
    headers?: boolean;
    fields?: FieldType[];
}){
    const [popup, setPopup] = useState<Window | null>();
    const [features, setFeatures] = useState<Feature[]>((layer?.getSource()?.getFeatures() as Feature[]));
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const newPopup = window.open(undefined, layer?.get('title'), "popup,height=850,width=960,status=no,menubar=no,toolbar=no,location=no");
        
        if(!newPopup) alert("Por favor, desbloqueie os popup's de seu navegador para acessar a tabela de atributos.");
        
        if(newPopup) {
            //UPDATE POPUP HEAD
            clear(newPopup.document.head);
            const head = window.document.head;
            for(let i = 0; i < head.children.length; i++) newPopup.document.head.appendChild(head.children.item(i)?.cloneNode(true) as HTMLElement);
            setPopup(newPopup);
        }
    
    }, []);

    async function createRows(features: Feature[], page: number){
        return features.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT).map(feat => 
            <TableRow 
                //@ts-ignore
                key={feat.ol_uid}
                feature={feat}
                fields={fields}
            />
        );
    }

    async function sortFeatures(field: string, type: 'asc' | 'desc'){
        const sorted = [...features];
        sorted.sort((A, B) => {
            if(!A.get(field) && !B.get(field)) return 0;
            if(A.get(field) && !B.get(field)) return type === 'asc' ?  1 : -1;
            if(!A.get(field) && B.get(field)) return type === 'asc' ? -1 :  1;
            
            if(A.get(field) > B.get(field)) return type === 'asc' ?  1 : -1;
            if(A.get(field) < B.get(field)) return type === 'asc' ? -1 :  1;
            return 0;
        });

        setFeatures(sorted);
    }

    if(popup && layer){
        if(fields.length === 0 && features.length > 0) {
            const { geometry, ...properties } = features[0].getProperties();
            fields = Object.keys(properties).map(key => ({name: key, editable: false})); 
        } 

        //NÃO HÁ FEIÇÕES
        if(features.length === 0){
            return createPortal(
                <div className={styles.area} style={{alignItems: 'center', justifyContent: 'center'}}>
                    <span className={styles.no_features}>Não há feições para exibir.</span>
                </div>,
                popup.document.body
            );
        }

        //MOSTAR A TABELA
        return createPortal(
            <div className={styles.area}>
                <h3 className={styles.title}>{layer.get("title")}</h3>
                    <Suspense fallback={
                        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <TextLoader className={styles.loader}>CARREGANDO FEIÇÕES</TextLoader>
                        </div>
                    }>
                        <div className={styles.wrapper}>
                            <table>
                                { headers && 
                                    <TableHead 
                                        fields={fields}
                                        sortFeatures={sortFeatures}
                                    /> 
                                }
                                <tbody>
                                    { createRows(features, page) }
                                </tbody>
                            </table>
                        </div>
                        <Pagination 
                            total={features.length} 
                            current={page}
                            changePage={(evt) => {
                                const button = (evt.target) as HTMLButtonElement;
                                const page = parseInt(button.innerText);
                                setPage(page);
                            }}
                        />
                    </Suspense>
            </div>,
            popup.document.body
        );
    }

    return null;  
}
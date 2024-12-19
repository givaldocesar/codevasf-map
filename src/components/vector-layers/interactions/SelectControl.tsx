import React, { useState, useEffect, useContext, useRef } from "react";
import { Feature } from "ol";
import { SelectEvent } from "ol/interaction/Select";
import { LayerStatus } from "../../../interfaces";
import { getFeatureLabel } from "../../../utils";
import { LayerContext, InteractionContext } from "../../contexts";
import { BaseControl } from "../../controls";
import { ArrowButton } from "../../buttons";
import { Select } from "../../pop-ups/form";
import styles from "./Interaction.module.scss";


interface SelectedControlProps extends React.HTMLAttributes<HTMLDivElement> {
    fieldValue: string;
    expression?: string;
    label?: string; 
    labelClassName?: string;
    collapsable?: boolean;
}

export default function SelectControl({
    children,
    className="",
    fieldValue,
    expression,
    label,
    labelClassName,
    collapsable=true,
    ...props
} : SelectedControlProps){

    const ref = useRef<HTMLSelectElement>(null);
    const layer = useContext(LayerContext);
    const interaction = useContext(InteractionContext);
    const [layerStatus, setStatus] = useState<LayerStatus>('loading');
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [options, setOptions] = useState<React.ReactElement[]>([]);

    //@ts-ignore
    layer.on('status-changed', () => setStatus(layer.getStatus()));
    
    useEffect(() => {
        if(collapsable) window.innerWidth < 960 ? setCollapsed(true) : false;
    }, []);

    useEffect(() => {
        function onSelected(evt: SelectEvent){
            const feature = evt.selected[0];
            if(ref.current && feature){
                ref.current.value = feature.get(fieldValue);
            } else {
                ref.current ? ref.current.value = "NO_ONE" : null;
            }
        }

        interaction?.on("select", onSelected);
        return () => { interaction?.un("select", onSelected) }
    }, []);

    useEffect(() => {
        async function getValues() {
            const features = layer?.getSource()?.getFeatures();
            const data = new Map<string, {value: string, text?: string}>();
            const options_: React.ReactElement[]  = [];
            
            features?.forEach(feature => {
                const value = feature.get(fieldValue);
                data.set(value, {
                    value: value,
                    text: expression ? getFeatureLabel(feature, expression) : undefined
                });
            });

            Array.from(data.values()).sort((a, b) =>{
                if(a.value > b.value){ return 1 } 
                else if(a.value < b.value){ return -1 } 
                return 0
            }).forEach(optionData => {
                options_.push(
                    <option 
                        value={optionData.value} 
                        key={optionData.value}
                    >
                        {optionData.text || optionData.value}
                    </option>
                )
            });
            
            setOptions(options_);
        }

        if(layerStatus === "complete") getValues();
    }, [layerStatus]);

    if(layerStatus === "loading" || layerStatus === "error") return <></>;

    async function selected(evt: React.ChangeEvent<HTMLSelectElement>){
        let features: Feature[] = []

        if(evt.target.value !== "NO_ONE"){
            features = (await layer?.filterFeatures([{field: fieldValue, value: evt.target.value }])) || [];
        }

        interaction?.setSelected(features);
    }

    return (
        <BaseControl 
            className={`${styles.control} ${collapsed ? styles.hidden : ""} ${className}`} 
            {...props}
        >
            <div className={styles.select} style={{display: collapsed ? "none" : "flex"}}>
                <span className={labelClassName}>{label}</span>
                <Select onChange={selected} ref={ref}>
                    <option value="NO_ONE">Nenhum selecionado</option>
                    { options }
                </Select>
                { children }
            </div>
            { collapsable && 
                <ArrowButton 
                    title= {collapsed ? "Expandir" : "Ocultar"}
                    style={{rotate: collapsed ? "270deg" : "90deg"}}
                    onClick={() => setCollapsed(!collapsed)}
                /> 
            }
        </BaseControl>
    );
} 
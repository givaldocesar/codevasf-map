import { asArray } from "ol/color";
import { CustomLayer, CustomSimpleStyle } from "@/classes";
import Popup from "./Popup";
import Form, { FormRow, FormTitle } from "./form";


export default function ChangeLayerStylePopup({
    layer,
    close
}:{
    layer: CustomLayer;
    close: () => void;
}){
    function changeColor(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault();
        evt.stopPropagation();

        const data = new FormData(evt.target as HTMLFormElement);
        const opacityValue = Math.ceil(parseInt(data.get('opacity') as string)*255/100).toString(16).padStart(2, '0');

        const baseStyle = layer.getBaseStyle() as CustomSimpleStyle;
        baseStyle.getStroke()?.setColor(data.get('stroke') as string);
        baseStyle.getFill()?.setColor(data.get('fill') + opacityValue);

        layer.changed();
    }
    
    const style = layer.getStyle() as CustomSimpleStyle;
    const stroke = (style.getStroke()?.getColor() as string) || "#000000";
    const fill = asArray(style.getFill()?.getColor() as string || "#FFFFFFA0");
    const alpha = fill[3];

    return (
        <Popup close={close}>
            <Form style={{width: '275px'}} onSubmit={changeColor}>
                <FormRow>
                    <FormTitle>Alterar estilo</FormTitle>
                </FormRow>
                <FormRow>
                    <span style={{padding: '5px 0px', fontWeight: "bold"}}>Camada: {layer?.get("title")}</span>
                </FormRow>
                <FormRow>
                    <label>Contorno:</label>
                    <input type="color" name="stroke" required defaultValue={stroke}/>
                </FormRow>
                <FormRow>
                    <label>Preenchimento:</label>
                    <input type="color" name="fill" required defaultValue={`#${fill.slice(0,3).join()}`}/>
                </FormRow>
                <FormRow>
                    <label>Opacidade:</label>
                    <input 
                        type="number" 
                        min={0} max={100} 
                        name="opacity" 
                        required 
                        defaultValue={(alpha / 255 * 100).toFixed(0)}
                    />
                    %
                </FormRow>
                <br />
                <FormRow style={{justifyContent: 'center', gap: '10px'}}>
                    <button>ALTERAR</button>
                    <button type="button" onClick={close}>CANCELAR</button>
                </FormRow>
            </Form>
        </Popup>
    );
}
import { FlatStyle } from "ol/style/flat";
import Popup from ".";
import { CustomLayer, SimpleStyle } from "../../classes";
import Form, { FormRow, FormTitle } from "./form";

const ChangeLayerStylePopup: React.FC<{layer: CustomLayer}> = ({layer}) => {
   
    
    function close(evt: React.MouseEvent<HTMLOrSVGElement, MouseEvent>){
        evt.target.dispatchEvent(new CustomEvent('show-popup', {
            detail: null,
            bubbles: true
        }));
    }

    function changeColor(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault();
        evt.stopPropagation();

        const target = evt.target as HTMLFormElement;
        //@ts-ignore
        const { stroke, fill, opacity } = target.elements;
        const opacityValue = Math.ceil(parseInt(opacity.value)*255/100).toString(16).padStart(2, '0');

        const baseStyle = layer.getBaseStyle() as SimpleStyle;
        baseStyle.setStroke({"stroke-color": stroke.value});
        baseStyle.setFill({"fill-color": fill.value + opacityValue});

        layer.dispatchEvent("change-style");
    }
    
    const style = layer.getStyle() as FlatStyle;
    const stroke = (style["stroke-color"] as string).substring(0,7);
    const fill = (style["fill-color"] as string).substring(0,7);
    const alpha = parseInt( (style["fill-color"] as string).substring(7), 16);

    return (
        <Popup>
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
                    <input type="color" name="fill" required defaultValue={fill}/>
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

export default ChangeLayerStylePopup;
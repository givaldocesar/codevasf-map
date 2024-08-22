import { Style, Circle, Stroke, Fill } from "ol/style";
import { defaultFill, defaultStroke } from "../components/vector-layers/styles";

interface Props {
    fill?: Fill;
    geometry?: 'Point' | 'LineString' | 'Polygon'; 
    label?: string,
    stroke?: Stroke;
    value?: string,
    visible?: boolean
}


class CustomStyle extends Style {
    label_?: string;
    value_?: string;
    visible_: boolean;
    geometryType_?: 'Point' | 'LineString' | 'Polygon'; 

    constructor({
        stroke=defaultStroke.clone(),
        fill=defaultFill.clone(),
        geometry,
        label,
        value,
        visible=true,
        ...props
    }: Props){
        super({
            stroke: stroke,
            fill: fill,
            image: new Circle({
                stroke: stroke,
                fill: fill,
                radius: 10
            }),
            ...props
        });

        this.geometryType_ = geometry;
        this.label_ = label;
        this.value_ = value;
        this.visible_ = visible;

        this.clone = this.clone.bind(this);
    }

    clone(){
        return new CustomStyle({
            geometry: this.geometryType_,
            label: this.label_,
            value: this.value_,
            visible: this.visible_,
            stroke: this.getStroke() || undefined,
            fill: this.getFill() || undefined
        });
    }

    getGeometryType(){
        return this.geometryType_;
    }

    getLabel(){
        return this.label_;
    }

    getValue(){
        return this.value_;
    }

    getVisible(){
        return this.visible_;
    }

    setGeometrytype(geometry?: 'Point' | 'LineString' | 'Polygon'){
        this.geometryType_ = geometry;
    }

    setLabel(label: string){
        this.label_ = label;
    }

    setValue(value: string){
        this.value_ = value;
    }

    setVisible(visible: boolean){
        this.visible_ = visible;
    }
}

export default CustomStyle;
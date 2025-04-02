import { FlatStyle, FlatText, Rule } from "ol/style/flat";
import { Geometries } from "../../interfaces";
import SimpleStyle from "./CustomSimpleStyle";

export default class CategoryStyle extends SimpleStyle{
    private label_?: string;
    private value_: any;
    private geometry_?: Geometries;
    private visible_?: boolean;

    constructor({
        value, 
        label, 
        options,
        geometry,
        visible
    } : {
        value: any;
        label?: string;
        options?: FlatStyle[];
        geometry?: Geometries;
        visible?: boolean;
    }){
        super(options);
        this.value_ = value;
        this.label_ = label;
        this.geometry_ = geometry;
        this.visible_ = (visible === undefined ? true : visible);
    }

    flattenCategory(field: string, baseText?: FlatText): Rule[] { 
        return [{
            filter: ['==', ['get', field], this.value_],
            style: this.visible_ ? [...super.flatten(), baseText || {}] : {}
        }];
    }

    getGeometry(){
        return this.geometry_;
    }

    getLabel(){
        return this.label_;
    }

    getValue(){
        return this.value_;
    }

    setVisible(visible: boolean){
        this.visible_ = visible;
    }
}
import { FlatStyle } from "ol/style/flat";
import { Geometries } from "../interfaces";
import CustomSimpleStyle from "./CustomSimpleStyle";


export default class CustomCategoryStyle extends CustomSimpleStyle{
    constructor({
        geometry,
        value,
        legendLabel,
        visible=true,
        styles
    } : {
        geometry: Geometries;
        value: any;
        legendLabel?: string;
        visible?: boolean;
        styles?: FlatStyle;
    }){
        super(styles);
        this.values.geometry = geometry;
        this.values.value = value;
        this.values.visible = visible;
        this.values.legendLabel = legendLabel;
    }

    clone() : CustomCategoryStyle {
        const clone = new CustomCategoryStyle({
            geometry: this.getGeometry(),
            value: this.getValue(),
            visible: this.getVisible()
        });

        clone.setStroke(this.getStroke());
        clone.setFill(this.getFill());
        const image = this.getImage();
        if(image) clone.setImage(image);

        return clone;
    }

    getGeometry(): Geometries {
        return this.values.geometry;
    }

    getLegendLabel(): string | undefined{
        return this.values.legendLabel;
    }

    getValue(): string {
        return this.values.value;
    }

    getVisible() : boolean {
        return this.values.visible;
    }

    setGeometry(geometry: string) : void {
        this.values.geometry = geometry;
    }

    setLegendLabel(label: string): void{
        this.values.legendLabel = label;
    }

    setValue(value: string): void {
        this.values.value = value;
    }

    setVisible(visible: boolean): void {
        this.values.visible = visible;
    }
}
import { Text } from "ol/style";
import { FlatText } from "ol/style/flat";
import { TextJustify, TextPlacement } from "ol/style/Text";
import convertFlatFill from "./convertFlatFill";
import convertFlatStroke from "./convertFlatStroke";

export default function convertFlatText(flatText: FlatText){
    if(flatText && Object.keys(flatText).length > 0){
        return new Text({
            font: flatText['text-font'] as string,
            maxAngle: flatText['text-max-angle'] as number,	
            offsetX: flatText['text-offset-x'] as number,
            offsetY: flatText['text-offset-y'] as number,
            overflow: flatText['text-overflow'] as boolean,
            placement: flatText['text-placement'] as TextPlacement,	
            repeat: flatText['text-repeat'] as number,	
            scale: flatText['text-scale'],	
            rotateWithView: flatText['text-rotate-with-view'] as boolean,	
            rotation: flatText['text-rotation'] as number,	
            textAlign: flatText['text-align'] as CanvasTextAlign,
            justify: flatText['text-justify'] as TextJustify,
            textBaseline: flatText['text-baseline'] as CanvasTextBaseline,
            padding: flatText['text-padding'],
            declutterMode: flatText['text-declutter-mode'],
            fill: convertFlatFill({
                'fill-color': flatText['text-fill-color']
            }) || undefined,
            backgroundFill: convertFlatFill({
                'fill-color': flatText['text-background-fill-color']
            }) || undefined,
            stroke: convertFlatStroke({
                'stroke-color': flatText['text-stroke-color'],
                'stroke-line-cap': flatText['text-stroke-line-cap'],
                'stroke-line-join':  flatText['text-stroke-line-join'],
                'stroke-line-dash': flatText['text-stroke-line-dash'],
                'stroke-line-dash-offset': flatText['text-stroke-line-dash-offset'],
                'stroke-miter-limit': flatText['text-stroke-miter-limit'],
                'stroke-width': flatText['text-stroke-width'],
            }) || undefined,
            backgroundStroke: convertFlatStroke({
                'stroke-color': flatText['text-background-stroke-color'],
                'stroke-line-cap': flatText['text-background-stroke-line-cap'],
                'stroke-line-join':  flatText['text-background-stroke-line-join'],
                'stroke-line-dash': flatText['text-background-stroke-line-dash'],
                'stroke-line-dash-offset': flatText['text-background-stroke-line-dash-offset'],
                'stroke-miter-limit': flatText['text-background-stroke-miter-limit'],
                'stroke-width': flatText['text-background-stroke-width'],
            }) || undefined,
        });
    }
}
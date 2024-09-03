import { asString } from "ol/color";

export default function randomColor(type: 'HEX' | 'RGB', opacity=0.5){
    switch(type){
        case 'HEX':
            const R = Math.ceil(Math.random() * 256).toString(16);
            const G = Math.ceil(Math.random() * 256).toString(16);
            const B = Math.ceil(Math.random() * 256).toString(16);
            const A =  Math.ceil(opacity*256).toString(16);

            return `#${R}${G}${B}${A}`;
        case 'RGB':
            return asString([
                Math.ceil(Math.random() * 256),
                Math.ceil(Math.random() * 256),
                Math.ceil(Math.random() * 256),
                opacity
            ]);
    }
}
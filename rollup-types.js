import { dts } from 'rollup-plugin-dts';

export default function rollupTypes({input, name}){
    return  {
        input: input,
        output: [{ file: `dist/${name}.d.ts`, format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    }
}
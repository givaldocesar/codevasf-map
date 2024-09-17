import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

export default function rollupConfig({
    input,
    output,
    css
}){
    return [{
        input: input,
        output: [
            {
                file: `dist/esm/${output}.esm.js`,
                format: 'esm',
                exports: 'named',
                sourcemap: true
            },
            {
                file: `dist/cjs/${output}.js`,
                format: 'cjs',
                exports: 'named',
                sourcemap: true
            },
        ],
        plugins: [
            image(),
            external(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss( {extract: `${css}.css`} ) 
        ]
    },
    {
        input: input,
        output: [{ file: `dist/esm/${output}.d.ts`, format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    }]
}
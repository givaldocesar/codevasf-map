import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import { dts } from 'rollup-plugin-dts';

function types(input, output){
    return {
        input: input,
        output: [{ file: output, format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    }
}

export default [
    {
        input: "./src/index.ts",
        output: [
            {
                file: `dist/index.js`,
                format: 'esm',
                exports: 'named',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            image(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss( {
                extract: 'styles_components.css',
                use: { sass: { silenceDeprecations: ['legacy-js-api'] }}
            }) 
        ]
    },
    types("./src/index.ts", "dist/index.d.ts"),
]
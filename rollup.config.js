import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import rollupTypes from './rollup-types.js';

export default [
    {
        input: "src/components/index.ts",
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
                use: { sass: { silenceDeprecations: ['legacy-js-api'] },
             }
            }) 
        ]
    },
    rollupTypes({input: "src/components/index.ts", name: "index"}),
    rollupTypes({input: "src/components/controls/index.tsx", name: "controls"}),
    rollupTypes({input: "src/components/events/index.tsx", name: "events"}),
    rollupTypes({input: "src/components/tile-layers/index.tsx", name: "tile-layers"}),
    rollupTypes({input: "src/components/vector-layers/index.tsx", name: "vector-layers"}),
]
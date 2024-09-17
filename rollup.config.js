import rollupConfig from "./rollup-config.js";

export default [
    ...rollupConfig({
        input: './src/components/index.tsx',
        output: 'index',
        css: 'components'
    }),
    ...rollupConfig({
        input: './src/components/controls/index.tsx',
        output: 'controls/index',
        css: 'controls'
    }),
    ...rollupConfig({
        input: './src/components/tile-layers/index.tsx',
        output: 'tile-layers/index',
        css: 'tile-layers'
    }),
    ...rollupConfig({
        input: './src/components/vector-layers/index.tsx',
        output: 'vector-layers/index',
        css: 'vector-layers'
    }),
    ...rollupConfig({
        input: './src/components/vector-layers/styles/index.tsx',
        output: 'vector-layers/styles/index',
        css: 'vector-styles'
    }),
    ...rollupConfig({
        input: './src/components/vector-layers/interactions/index.tsx',
        output: 'vector-layers/interactions/index',
        css: 'vector-interactions'
    }),
]
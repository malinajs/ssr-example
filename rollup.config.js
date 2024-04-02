import resolve from '@rollup/plugin-node-resolve';
import {derver} from 'derver/rollup-plugin';
import malina from 'malinajs/malina-rollup'
import malinaSass from 'malinajs/plugins/sass'

const DEV = !!process.env.ROLLUP_WATCH;

export default [{
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife',
    },
    plugins: [
        malina({
            css: true,
            plugins: [malinaSass()]
        }),
        resolve(),
        DEV && derver()
    ],
    watch: {
        clearScreen: false
    }
}, {
    input: 'src/ssr-main.js',
    output: {
        file: './ssr-bundle.mjs',
        format: 'esm'
    },
    plugins: [
        malina({
            css: true,
            plugins: [malinaSass()]
        }),
        resolve()
    ]
}];

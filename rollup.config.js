const path = require("path");
import {defineConfig} from 'rollup'
import {uglify} from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts';

const tsPlugin = ts({
    tsconfig: path.resolve(
        __dirname,
        "./tsconfig.json"
    ),
    extensions: [
        '.js',
        '.ts',
        '.tsx'
    ]
})

export default defineConfig([
    {
        "input": path.resolve(
            __dirname,
            "./src/core/index.ts"
        ),
        "output": {
            "file": path.resolve(
                __dirname,
                "./dist/umd/pdd.js"
            ),
            "format": "umd",
            "name": "Pdd",
            "sourcemap": true
        },
        "plugins": [
            tsPlugin,
            uglify(),
            babel({"exclude": "node_modules/**"})
        ]
    },
    {
        "input": path.resolve(
            __dirname,
            "./src/core/index.ts"
        ),
        "output": {
            "file": path.resolve(
                __dirname,
                "./dist/es/pdd.js"
            ),
            "format": "esm",
            "name": "Pdd",
            "sourcemap": true
        },
        "plugins": [
            tsPlugin,
            uglify(),
            babel({"exclude": "node_modules/**"})
        ]
    },
    {
        input: path.resolve(
            __dirname,
            "./src/index.ts"
        ),
        plugins: [dts()],
        output: {
            format: 'esm',
            file: './index.d.ts',
        },
    }
])

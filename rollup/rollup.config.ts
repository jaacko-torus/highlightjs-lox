import type { Options } from "rollup-plugin-terser"
import type { RollupOptions, OutputOptions } from "rollup"

import typescript from "typescript"

import rollup_typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser"

const terser_config: Options = {
	ecma: 2015,
	compress: true,
	mangle: {
		toplevel: true,
		reserved: ["lox"]
	}
}

const default_output = (outputOptions: OutputOptions, ext?: string): OutputOptions => ({
	...outputOptions,
	name: outputOptions.name ?? "lox",
	file: `dist/${outputOptions.format}/${outputOptions.name ?? "lox"}.${ext ??"js"}`,
	exports: "default",
	sourcemap: "inline",
})

const min_output = (outputOptions: OutputOptions, ext?: string): OutputOptions => ({
	...outputOptions,
	name: outputOptions.name ?? "lox",
	file: `dist/${outputOptions.format}/${outputOptions.name ?? "lox"}.min.${ext ??"js"}`,
	exports: "default",
	sourcemap: true,
	plugins: [terser(terser_config)],
})

const config: RollupOptions = {
	input: "src/lox.ts",
	output: [
		default_output({ format: "umd" }),
		default_output({ format: "cjs" }),
		default_output({ format: "cjs" }, "cjs"),
		default_output({ format: "amd" }),
		default_output({ format: "iife", globals: { "highlight.js": "hljs"} }),
		default_output({ format: "es" }),
		default_output({ format: "es" }, "mjs"),
		// might be useful for browsers to minify
		min_output({ format: "iife", globals: { "highlight.js": "hljs"} }),
		min_output({ format: "es" }),
		min_output({ format: "es" }, "mjs"),
	],
	external: "highlight.js",
	plugins: [
		// TODO: use `import.meta.resolve` https://stackoverflow.com/questions/54977743/do-require-resolve-for-es-modules
		rollup_typescript({ tsconfig: "./tsconfig.json" , typescript, tslib: require.resolve("tslib") }),
	]
}

export default config
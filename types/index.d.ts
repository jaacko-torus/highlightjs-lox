// BUG: Rollup can't export typescript type declarations yet (@rollup/plugin-typescript)
declare module "highlightjs-lox" {
	import type { LanguageFn } from "highlight.js"
	
	const lox: LanguageFn
	
	export default lox
}
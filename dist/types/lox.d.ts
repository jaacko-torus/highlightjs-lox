// TODO: Rollup doesnt yet support emition
/**
 * @name Lox
 * @author jaacko-torus <jaacko.torus@gmail.com> (https://github.com/jaacko-torus)
 * @website http://craftinginterpreters.com/
 * @license MIT
 */
declare module "highlightjs-lox" {
	import type { LanguageFn } from "highlight.js"
	const lox: LanguageFn
	export default lox
}

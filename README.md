# Lox syntax support for [highlight.js](https://highlightjs.org/)

<p align="center">
	<a href="https://www.npmjs.com/package/highlightjs-lox">
		<img alt="NPM version" src="https://img.shields.io/npm/v/highlightjs-lox">
	</a>
	<a href="LICENSE.md">
		<img alt="GitHub" src="https://img.shields.io/github/license/jaacko-torus/highlightjs-lox">
		</a>
	<a href="https://bundlephobia.com/package/highlightjs-lox">
		<img alt="Bundlephobia NPM bundle size" src="https://img.shields.io/bundlephobia/min/highlightjs-lox">
	</a>
	<a href="https://npmstats.org/highlightjs-lox">
		<img alt="npm" src="https://img.shields.io/npm/dm/highlightjs-lox">
	</a>
</p>

This repository provides syntax highlighting for the Lox language using highlight.js.

## Dependencies

```json
{
	"highlight.js": "^11.3.1"
}
```

## Usage

Provided in the [`dist/`](dist) folder are 5 versions: `iife` (for browsers), `es`, `umd`, `cjs`, and `amd`. Choose whatever version you like :smile:.

### Static HTML

To import lox make sure to include `lox.js` in the HTML:

```html
<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.3.1/build/highlight.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-lox/dist/iife/lox.js"></script>
<!-- unpkg -->
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.3.1/highlight.js"></script>
<script src="https://unpkg.com/highlightjs-lox/dist/iife/lox.js"></script>
```

and then:

```html
<script>
	hljs.initHighlightingOnLoad();
</script>
```

This will find and highlight code inside of `<pre><code>` tags; it tries to detect the language automatically. If automatic detection doesn’t work for you, you can specify the language in the class attribute:

```html
<pre>
	<code class="lox">
		...
	</code>
</pre>
```

### Node or other build systems

[ES Modules](dest/es), [CommonJS](dest/cjs), [AMD](dest/amd) and [UMD](dest/umd) can all be found in the [`dest/`](dest) folder.

To add the package run:

```sh
# npm
npm install highlight.js
npm install highlightjs-lox

# yarn
yarn add highlight.js
yarn add highlightjs-lox
```

#### ES6+ module syntax

```js
import hljs from "highlight.js"
import lox from "highlightjs-lox"

hljs.registerLanguage("lox", lox)
hljs.initHighlightingOnLoad()
```

#### CommonJS syntax

```js
const hljs = require("highlight.js")
const lox = require("highlightjs-lox")
```

### Demos
If you would like to see some more in depth examples you can check out [the demo folder](demo)

## Building
Go to [highlight.js](https://github.com/highlightjs/highlight.js) and update `lox.js` directly into the library. Then run their build tool:

```sh
node ./tools/build.js lox
```

## [License](./LICENSE.md)
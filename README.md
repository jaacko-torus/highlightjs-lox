# Lox syntax support for [highlight.js](https://highlightjs.org/)

![GitHub all releases](https://img.shields.io/github/downloads/jaacko-torus/highlightjs-lox/total) ![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/highlightjs-lox) ![npm](https://img.shields.io/npm/dm/highlightjs-lox) ![NPM](https://img.shields.io/npm/l/highlightjs-lox) ![npm](https://img.shields.io/npm/v/highlightjs-lox)

This repository provides syntax highlighting for the Lox language using highlight.js.

## Usage

### Static HTML

To import lox make sure to import the `lox.js`

```html
<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.3.1/build/highlight.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-lox@1.0.1/build/dist/lox.js"></script>
<!-- unpkg -->
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.3.1/highlight.js"></script>
<script src="https://unpkg.com/highlightjs-lox@1.0.1/build/dist/lox.js"></script>
```

and then:

```html
<script src="/path/to/highlight.js"></script>
<script src="/path/to/lox.js"></script>
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


### Node or other build system

To add the package run:

```sh
# npm
npm install highlight.js
npm install highlightjs-lox

# yarn
yarn add highlight.js
yarn add highlightjs-lox
```

For use with Node/Webpack/Snowpack/Rollup, etc.

```js
import hljs from "highlight.js";
import lox from "highlightjs-lox"

hljs.registerLanguage("lox", lox);

hljs.initHighlightingOnLoad();
```

## Building
Go to [highlight.js](https://github.com/highlightjs/highlight.js) and update `lox.js` directly into the library. Then run their build tool:

```sh
node ./tools/build.js lox
```

## [License](./LICENSE.md)
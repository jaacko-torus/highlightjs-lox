# Demo

Here are some demos if you are struggling to put this plugin to use.

## [`client/es5`](client/es5/index.html)

Uses the [`iife`](../dist/iife/lox.js) module syntax. It's the one I recommend for pre-es-module builds. Simple import, simple use.

## [`client/es6`](client/es6/main.js)

If you want to use [`es6`](../dist/es/lox.js) modules then there's an export for that.

## [`server`](server/src/app.js)

Finally, in case you are using it in Node, and don't want to use `"type": "module"` nor compile your code, then there's a [`cjs`](../dist/cjs/lox.js) export also.

# License

All the demos, unless otherwise stated, are under the MIT license.

```txt
Copyright (c) 2021 Julián A. Avar C.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

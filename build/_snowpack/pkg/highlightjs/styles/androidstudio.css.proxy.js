// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#a9b7c6;background:#282b2e}.hljs-bullet,.hljs-literal,.hljs-number,.hljs-symbol{color:#6897bb}.hljs-deletion,.hljs-keyword,.hljs-selector-tag{color:#cc7832}.hljs-link,.hljs-template-variable,.hljs-variable{color:#629755}.hljs-comment,.hljs-quote{color:grey}.hljs-meta{color:#bbb529}.hljs-addition,.hljs-attribute,.hljs-string{color:#6a8759}.hljs-section,.hljs-title,.hljs-type{color:#ffc66d}.hljs-name,.hljs-selector-class,.hljs-selector-id{color:#e8bf6a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
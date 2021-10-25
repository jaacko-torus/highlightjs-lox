"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _highlight = _interopRequireDefault(require("highlight.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @name Lox
 * @param {LanguageFn} hljs
 * @website http://craftinginterpreters.com/
 * @license MIT
 */
var regex = _highlight["default"].regex;
var IDENT_RE = "[A-Za-z][0-9A-Za-z]*";
var LANGUAGE_KEYWORDS = ["class", "else", "for", "function", "if", "print", "return", "var", "while"];
var LITERALS = ["false", "nil", "true"];
var BUILT_IN_VARIABLES = ["super", "this"];
var KEYWORDS = {
  $pattern: IDENT_RE,
  keyword: LANGUAGE_KEYWORDS,
  literal: LITERALS,
  "variable.language": BUILT_IN_VARIABLES
};
var NUMBER = {
  scope: "number",
  variants: [{
    begin: "[\\d]+"
  }, {
    begin: "\\d+(\.\\d+)?"
  }],
  relevance: 0
};
var PARAMS_CONTAINS = [_highlight["default"].C_LINE_COMMENT_MODE, // eat recursive parens in sub expressions
{
  begin: /\(/,
  end: /\)/,
  keywords: KEYWORDS,
  contains: ["self", _highlight["default"].C_LINE_COMMENT_MODE]
}];
var PARAMS = {
  scope: "params",
  begin: /\(/,
  end: /\)/,
  excludeBegin: true,
  excludeEnd: true,
  keywords: KEYWORDS,
  contains: PARAMS_CONTAINS
};
var CLASS_OR_EXTENDS = {
  variants: [// class Car < Vehicle
  {
    match: [/class/, /\s+/, IDENT_RE, /\s+/, /</, /\s+/],
    scope: {
      1: "keyword",
      3: "title.class",
      5: "keyword",
      7: "title.class.inherited"
    }
  }, // class Car
  {
    match: [/class/, /\s+/, IDENT_RE],
    scope: {
      1: "keyword",
      3: "title.class"
    }
  }]
};
var FUNCTION_DEFINITION = {
  variants: [{
    match: [/function/, /\s+/, IDENT_RE, /(?=\s*\()/]
  }],
  scope: {
    1: "keyword",
    3: "title.function"
  },
  label: "func.def",
  contains: [PARAMS],
  illegal: /%/
};
var UPPER_CASE_CONSTANT = {
  relevance: 0,
  match: /\b[A-Z][A-Z0-9]+\b/,
  scope: "variable.constant"
};

function noneOf(list) {
  return regex.concat("(?!", list.join("|"), ")");
}

var FUNCTION_CALL = {
  match: regex.concat(/\b/, noneOf(["super"]), IDENT_RE, regex.lookahead(/\(/)),
  scope: "title.function",
  relevance: 0
};
var PROPERTY_ACCESS = {
  begin: regex.concat(/\./, regex.lookahead(regex.concat(IDENT_RE, /(?![0-9A-Za-z(])/))),
  end: IDENT_RE,
  excludeBegin: true,
  scope: "property",
  relevance: 0
}; // HLJSApi

/**
 * @name Lox
 * @param {HLJSApi} hljs
 * @website http://craftinginterpreters.com/
 */

var lox = function lox(hljs) {
  return {
    name: "Lox",
    aliases: ["lox"],
    keywords: KEYWORDS,
    illegal: /#(?![$_A-z])/,
    contains: [hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, NUMBER, {
      begin: "(" + hljs.RE_STARTERS_RE + "|\\b(return)\\b)\\s*",
      keywords: "return",
      relevance: 0,
      contains: [hljs.C_LINE_COMMENT_MODE, hljs.REGEXP_MODE, {
        begin: /,/,
        relevance: 0
      }, {
        match: /\s+/,
        relevance: 0
      }]
    }, FUNCTION_DEFINITION, {
      // prevent this from getting swallowed up by function since they appear "function like"
      beginKeywords: "while if for"
    }, {
      // we have to count the parens to make sure we actually have the correct
      // bounding ( ).  There could be any number of sub-expressions inside
      // also surrounded by parens.
      begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\(" + // first parens
      "[^()]*(\\(" + "[^()]*(\\(" + "[^()]*" + "\\)[^()]*)*" + "\\)[^()]*)*" + "\\)\\s*\\{",
      returnBegin: true,
      label: "func.def",
      contains: [PARAMS, hljs.inherit(hljs.TITLE_MODE, {
        begin: IDENT_RE,
        scope: "title.function"
      })]
    }, PROPERTY_ACCESS, {
      match: [/\binit(?=\s*\()/],
      scope: {
        1: "title.function"
      },
      contains: [PARAMS]
    }, FUNCTION_CALL, UPPER_CASE_CONSTANT, CLASS_OR_EXTENDS, {
      match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`

    }]
  };
};

var _default = lox;
exports["default"] = _default;
//# sourceMappingURL=lox.js.map

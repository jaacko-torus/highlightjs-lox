/**
 * @name Lox
 * @param {LanguageFn} hljs
 * @website http://craftinginterpreters.com/
 * @license MIT
 */
import hljs from "../_snowpack/pkg/highlightjs.js";
const regex = hljs.regex;
const IDENT_RE = "[A-Za-z][0-9A-Za-z]*";
const LANGUAGE_KEYWORDS = [
  "class",
  "else",
  "for",
  "function",
  "if",
  "print",
  "return",
  "var",
  "while"
];
const LITERALS = [
  "false",
  "nil",
  "true"
];
const BUILT_IN_VARIABLES = [
  "super",
  "this"
];
const KEYWORDS = {
  $pattern: IDENT_RE,
  keyword: LANGUAGE_KEYWORDS,
  literal: LITERALS,
  "variable.language": BUILT_IN_VARIABLES
};
const NUMBER = {
  scope: "number",
  variants: [
    {begin: "[\\d]+"},
    {begin: "\\d+(.\\d+)?"}
  ],
  relevance: 0
};
const PARAMS_CONTAINS = [
  hljs.C_LINE_COMMENT_MODE,
  {
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS,
    contains: ["self", hljs.C_LINE_COMMENT_MODE]
  }
];
const PARAMS = {
  scope: "params",
  begin: /\(/,
  end: /\)/,
  excludeBegin: true,
  excludeEnd: true,
  keywords: KEYWORDS,
  contains: PARAMS_CONTAINS
};
const CLASS_OR_EXTENDS = {
  variants: [
    {
      match: [
        /class/,
        /\s+/,
        IDENT_RE,
        /\s+/,
        /</,
        /\s+/
      ],
      scope: {
        1: "keyword",
        3: "title.class",
        5: "keyword",
        7: "title.class.inherited"
      }
    },
    {
      match: [
        /class/,
        /\s+/,
        IDENT_RE
      ],
      scope: {
        1: "keyword",
        3: "title.class"
      }
    }
  ]
};
const FUNCTION_DEFINITION = {
  variants: [
    {
      match: [
        /function/,
        /\s+/,
        IDENT_RE,
        /(?=\s*\()/
      ]
    }
  ],
  scope: {
    1: "keyword",
    3: "title.function"
  },
  label: "func.def",
  contains: [PARAMS],
  illegal: /%/
};
const UPPER_CASE_CONSTANT = {
  relevance: 0,
  match: /\b[A-Z][A-Z0-9]+\b/,
  scope: "variable.constant"
};
function noneOf(list) {
  return regex.concat("(?!", list.join("|"), ")");
}
const FUNCTION_CALL = {
  match: regex.concat(/\b/, noneOf(["super"]), IDENT_RE, regex.lookahead(/\(/)),
  scope: "title.function",
  relevance: 0
};
const PROPERTY_ACCESS = {
  begin: regex.concat(/\./, regex.lookahead(regex.concat(IDENT_RE, /(?![0-9A-Za-z(])/))),
  end: IDENT_RE,
  excludeBegin: true,
  scope: "property",
  relevance: 0
};
const lox = (hljs2) => {
  return {
    name: "Lox",
    aliases: ["lox"],
    keywords: KEYWORDS,
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs2.QUOTE_STRING_MODE,
      hljs2.C_LINE_COMMENT_MODE,
      NUMBER,
      {
        begin: "(" + hljs2.RE_STARTERS_RE + "|\\b(return)\\b)\\s*",
        keywords: "return",
        relevance: 0,
        contains: [
          hljs2.C_LINE_COMMENT_MODE,
          hljs2.REGEXP_MODE,
          {
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        beginKeywords: "while if for"
      },
      {
        begin: "\\b(?!function)" + hljs2.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs2.inherit(hljs2.TITLE_MODE, {begin: IDENT_RE, scope: "title.function"})
        ]
      },
      PROPERTY_ACCESS,
      {
        match: [/\binit(?=\s*\()/],
        scope: {1: "title.function"},
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      {
        match: /\$[(.]/
      }
    ]
  };
};
export default lox;

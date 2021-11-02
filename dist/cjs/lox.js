'use strict';

var hljs = require('highlight.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hljs__default = /*#__PURE__*/_interopDefaultLegacy(hljs);

/**
 * @name Lox
 * @param {LanguageFn} hljs
 * @website http://craftinginterpreters.com/
 * @license MIT
 */
const regex = hljs__default["default"].regex;
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
    "while",
];
const LITERALS = [
    "false",
    "nil",
    "true",
];
const BUILT_IN_VARIABLES = [
    "super",
    "this",
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
        { begin: "[\\d]+" },
        { begin: "\\d+(\.\\d+)?" },
    ],
    relevance: 0
};
const PARAMS_CONTAINS = [
    hljs__default["default"].C_LINE_COMMENT_MODE,
    // eat recursive parens in sub expressions
    {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: ["self", hljs__default["default"].C_LINE_COMMENT_MODE]
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
        // class Car < Vehicle
        {
            match: [
                /class/,
                /\s+/,
                IDENT_RE,
                /\s+/,
                /</,
                /\s+/,
            ],
            scope: {
                1: "keyword",
                3: "title.class",
                5: "keyword",
                7: "title.class.inherited"
            }
        },
        // class Car
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
        },
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
        },
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
/**
 * @name Lox
 * @param {HLJSApi} hljs
 * @website http://craftinginterpreters.com/
 */
function lox(hljs) {
    return {
        name: "Lox",
        aliases: ["lox"],
        keywords: KEYWORDS,
        illegal: /#(?![$_A-z])/,
        contains: [
            hljs.QUOTE_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            NUMBER,
            {
                begin: "(" + hljs.RE_STARTERS_RE + "|\\b(return)\\b)\\s*",
                keywords: "return",
                relevance: 0,
                contains: [
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.REGEXP_MODE,
                    {
                        begin: /,/,
                        relevance: 0
                    },
                    {
                        match: /\s+/,
                        relevance: 0
                    },
                ],
            },
            FUNCTION_DEFINITION,
            {
                // prevent this from getting swallowed up by function since they appear "function like"
                beginKeywords: "while if for"
            },
            {
                // we have to count the parens to make sure we actually have the correct
                // bounding ( ).  There could be any number of sub-expressions inside
                // also surrounded by parens.
                begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE +
                    "\\(" + // first parens
                    "[^()]*(\\(" +
                    "[^()]*(\\(" +
                    "[^()]*" +
                    "\\)[^()]*)*" +
                    "\\)[^()]*)*" +
                    "\\)\\s*\\{",
                returnBegin: true,
                label: "func.def",
                contains: [
                    PARAMS,
                    hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE, scope: "title.function" })
                ]
            },
            PROPERTY_ACCESS,
            {
                match: [/\binit(?=\s*\()/],
                scope: { 1: "title.function" },
                contains: [PARAMS]
            },
            FUNCTION_CALL,
            UPPER_CASE_CONSTANT,
            CLASS_OR_EXTENDS,
            {
                match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
            }
        ]
    };
}

module.exports = lox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG94LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG94LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG5hbWUgTG94XG4gKiBAcGFyYW0ge0xhbmd1YWdlRm59IGhsanNcbiAqIEB3ZWJzaXRlIGh0dHA6Ly9jcmFmdGluZ2ludGVycHJldGVycy5jb20vXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG5pbXBvcnQgdHlwZSB7IEhMSlNSZWdleCB9IGZyb20gXCIuLi90eXBlc1wiXG5pbXBvcnQgdHlwZSB7IEhMSlNBcGksIExhbmd1YWdlLCBMYW5ndWFnZUZuLCBNb2RlIH0gZnJvbSBcImhpZ2hsaWdodC5qc1wiXG5pbXBvcnQgaGxqcyBmcm9tIFwiaGlnaGxpZ2h0LmpzXCJcblxuY29uc3QgcmVnZXggPSAoaGxqcyBhcyBITEpTQXBpICYgSExKU1JlZ2V4KS5yZWdleFxuXG5jb25zdCBJREVOVF9SRSA9IFwiW0EtWmEtel1bMC05QS1aYS16XSpcIlxuXG5jb25zdCBMQU5HVUFHRV9LRVlXT1JEUyA9IFtcblx0XCJjbGFzc1wiLFxuXHRcImVsc2VcIixcblx0XCJmb3JcIixcblx0XCJmdW5jdGlvblwiLFxuXHRcImlmXCIsXG5cdFwicHJpbnRcIixcblx0XCJyZXR1cm5cIixcblx0XCJ2YXJcIixcblx0XCJ3aGlsZVwiLFxuXVxuXG5jb25zdCBMSVRFUkFMUyA9IFtcblx0XCJmYWxzZVwiLFxuXHRcIm5pbFwiLFxuXHRcInRydWVcIixcbl1cblxuY29uc3QgQlVJTFRfSU5fVkFSSUFCTEVTID0gW1xuXHRcInN1cGVyXCIsXG5cdFwidGhpc1wiLFxuXVxuXG5jb25zdCBLRVlXT1JEUyA9IHtcblx0JHBhdHRlcm46IElERU5UX1JFLFxuXHRrZXl3b3JkOiBMQU5HVUFHRV9LRVlXT1JEUyxcblx0bGl0ZXJhbDogTElURVJBTFMsXG5cdFwidmFyaWFibGUubGFuZ3VhZ2VcIjogQlVJTFRfSU5fVkFSSUFCTEVTXG59O1xuXG5jb25zdCBOVU1CRVI6IE1vZGUgPSB7XG5cdHNjb3BlOiBcIm51bWJlclwiLFxuXHR2YXJpYW50czogW1xuXHRcdHsgYmVnaW46IFwiW1xcXFxkXStcIiB9LFxuXHRcdHsgYmVnaW46IFwiXFxcXGQrKFxcLlxcXFxkKyk/XCIgfSxcblx0XSxcblx0cmVsZXZhbmNlOiAwXG59O1xuXG5jb25zdCBQQVJBTVNfQ09OVEFJTlMgPSBbXG5cdGhsanMuQ19MSU5FX0NPTU1FTlRfTU9ERSxcblx0Ly8gZWF0IHJlY3Vyc2l2ZSBwYXJlbnMgaW4gc3ViIGV4cHJlc3Npb25zXG5cdHtcblx0XHRiZWdpbjogL1xcKC8sXG5cdFx0ZW5kOiAvXFwpLyxcblx0XHRrZXl3b3JkczogS0VZV09SRFMsXG5cdFx0Y29udGFpbnM6IFtcInNlbGZcIiwgaGxqcy5DX0xJTkVfQ09NTUVOVF9NT0RFXVxuXHR9IGFzIE1vZGVcbl07XG5cbmNvbnN0IFBBUkFNUzogTW9kZSA9IHtcblx0c2NvcGU6IFwicGFyYW1zXCIsXG5cdGJlZ2luOiAvXFwoLyxcblx0ZW5kOiAvXFwpLyxcblx0ZXhjbHVkZUJlZ2luOiB0cnVlLFxuXHRleGNsdWRlRW5kOiB0cnVlLFxuXHRrZXl3b3JkczogS0VZV09SRFMsXG5cdGNvbnRhaW5zOiBQQVJBTVNfQ09OVEFJTlNcbn07XG5cbmNvbnN0IENMQVNTX09SX0VYVEVORFM6IE1vZGUgPSB7XG5cdHZhcmlhbnRzOiBbXG5cdFx0Ly8gY2xhc3MgQ2FyIDwgVmVoaWNsZVxuXHRcdHtcblx0XHRcdG1hdGNoOiBbXG5cdFx0XHRcdC9jbGFzcy8sXG5cdFx0XHRcdC9cXHMrLyxcblx0XHRcdFx0SURFTlRfUkUsXG5cdFx0XHRcdC9cXHMrLyxcblx0XHRcdFx0LzwvLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRdLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0MTogXCJrZXl3b3JkXCIsXG5cdFx0XHRcdDM6IFwidGl0bGUuY2xhc3NcIixcblx0XHRcdFx0NTogXCJrZXl3b3JkXCIsXG5cdFx0XHRcdDc6IFwidGl0bGUuY2xhc3MuaW5oZXJpdGVkXCJcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8vIGNsYXNzIENhclxuXHRcdHtcblx0XHRcdG1hdGNoOiBbXG5cdFx0XHRcdC9jbGFzcy8sXG5cdFx0XHRcdC9cXHMrLyxcblx0XHRcdFx0SURFTlRfUkVcblx0XHRcdF0sXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHQxOiBcImtleXdvcmRcIixcblx0XHRcdFx0MzogXCJ0aXRsZS5jbGFzc1wiXG5cdFx0XHR9XG5cdFx0fSxcblx0XVxufTtcblxuY29uc3QgRlVOQ1RJT05fREVGSU5JVElPTjogTW9kZSA9IHtcblx0dmFyaWFudHM6IFtcblx0XHR7XG5cdFx0XHRtYXRjaDogW1xuXHRcdFx0XHQvZnVuY3Rpb24vLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRcdElERU5UX1JFLFxuXHRcdFx0XHQvKD89XFxzKlxcKCkvXG5cdFx0XHRdXG5cdFx0fSxcblx0XSxcblx0c2NvcGU6IHtcblx0XHQxOiBcImtleXdvcmRcIixcblx0XHQzOiBcInRpdGxlLmZ1bmN0aW9uXCJcblx0fSxcblx0bGFiZWw6IFwiZnVuYy5kZWZcIixcblx0Y29udGFpbnM6IFtQQVJBTVNdLFxuXHRpbGxlZ2FsOiAvJS9cbn07XG5cbmNvbnN0IFVQUEVSX0NBU0VfQ09OU1RBTlQ6IE1vZGUgPSB7XG5cdHJlbGV2YW5jZTogMCxcblx0bWF0Y2g6IC9cXGJbQS1aXVtBLVowLTldK1xcYi8sXG5cdHNjb3BlOiBcInZhcmlhYmxlLmNvbnN0YW50XCJcbn07XG5cbmZ1bmN0aW9uIG5vbmVPZihsaXN0OiBzdHJpbmdbXSkge1xuXHRyZXR1cm4gcmVnZXguY29uY2F0KFwiKD8hXCIsIGxpc3Quam9pbihcInxcIiksIFwiKVwiKTtcbn1cblxuY29uc3QgRlVOQ1RJT05fQ0FMTDogTW9kZSA9IHtcblx0bWF0Y2g6IHJlZ2V4LmNvbmNhdChcblx0XHQvXFxiLyxcblx0XHRub25lT2YoW1wic3VwZXJcIl0pLFxuXHRcdElERU5UX1JFLCByZWdleC5sb29rYWhlYWQoL1xcKC8pKSxcblx0c2NvcGU6IFwidGl0bGUuZnVuY3Rpb25cIixcblx0cmVsZXZhbmNlOiAwXG59O1xuXG5jb25zdCBQUk9QRVJUWV9BQ0NFU1M6IE1vZGUgPSB7XG5cdGJlZ2luOiByZWdleC5jb25jYXQoL1xcLi8sIHJlZ2V4Lmxvb2thaGVhZChcblx0XHRyZWdleC5jb25jYXQoSURFTlRfUkUsIC8oPyFbMC05QS1aYS16KF0pLylcblx0KSksXG5cdGVuZDogSURFTlRfUkUsXG5cdGV4Y2x1ZGVCZWdpbjogdHJ1ZSxcblx0c2NvcGU6IFwicHJvcGVydHlcIixcblx0cmVsZXZhbmNlOiAwXG59O1xuXG4vKipcbiAqIEBuYW1lIExveFxuICogQHBhcmFtIHtITEpTQXBpfSBobGpzXG4gKiBAd2Vic2l0ZSBodHRwOi8vY3JhZnRpbmdpbnRlcnByZXRlcnMuY29tL1xuICovXG5mdW5jdGlvbiBsb3goaGxqczogSExKU0FwaSkge1xuXHRyZXR1cm4ge1xuXHRcdG5hbWU6IFwiTG94XCIsXG5cdFx0YWxpYXNlczogW1wibG94XCJdLFxuXHRcdGtleXdvcmRzOiBLRVlXT1JEUyxcblx0XHRpbGxlZ2FsOiAvIyg/IVskX0Etel0pLyxcblx0XHRjb250YWluczogW1xuXHRcdFx0aGxqcy5RVU9URV9TVFJJTkdfTU9ERSxcblx0XHRcdGhsanMuQ19MSU5FX0NPTU1FTlRfTU9ERSxcblx0XHRcdE5VTUJFUixcblx0XHRcdHsgLy8gXCJ2YWx1ZVwiIGNvbnRhaW5lclxuXHRcdFx0XHRiZWdpbjogXCIoXCIgKyBobGpzLlJFX1NUQVJURVJTX1JFICsgXCJ8XFxcXGIocmV0dXJuKVxcXFxiKVxcXFxzKlwiLFxuXHRcdFx0XHRrZXl3b3JkczogXCJyZXR1cm5cIixcblx0XHRcdFx0cmVsZXZhbmNlOiAwLFxuXHRcdFx0XHRjb250YWluczogW1xuXHRcdFx0XHRcdGhsanMuQ19MSU5FX0NPTU1FTlRfTU9ERSxcblx0XHRcdFx0XHRobGpzLlJFR0VYUF9NT0RFLFxuXHRcdFx0XHRcdHsgLy8gY291bGQgYmUgYSBjb21tYSBkZWxpbWl0ZWQgbGlzdCBvZiBwYXJhbXMgdG8gYSBmdW5jdGlvbiBjYWxsXG5cdFx0XHRcdFx0XHRiZWdpbjogLywvLFxuXHRcdFx0XHRcdFx0cmVsZXZhbmNlOiAwXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtYXRjaDogL1xccysvLFxuXHRcdFx0XHRcdFx0cmVsZXZhbmNlOiAwXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XHRGVU5DVElPTl9ERUZJTklUSU9OLFxuXHRcdFx0e1xuXHRcdFx0XHQvLyBwcmV2ZW50IHRoaXMgZnJvbSBnZXR0aW5nIHN3YWxsb3dlZCB1cCBieSBmdW5jdGlvbiBzaW5jZSB0aGV5IGFwcGVhciBcImZ1bmN0aW9uIGxpa2VcIlxuXHRcdFx0XHRiZWdpbktleXdvcmRzOiBcIndoaWxlIGlmIGZvclwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQvLyB3ZSBoYXZlIHRvIGNvdW50IHRoZSBwYXJlbnMgdG8gbWFrZSBzdXJlIHdlIGFjdHVhbGx5IGhhdmUgdGhlIGNvcnJlY3Rcblx0XHRcdFx0Ly8gYm91bmRpbmcgKCApLiAgVGhlcmUgY291bGQgYmUgYW55IG51bWJlciBvZiBzdWItZXhwcmVzc2lvbnMgaW5zaWRlXG5cdFx0XHRcdC8vIGFsc28gc3Vycm91bmRlZCBieSBwYXJlbnMuXG5cdFx0XHRcdGJlZ2luOiBcIlxcXFxiKD8hZnVuY3Rpb24pXCIgKyBobGpzLlVOREVSU0NPUkVfSURFTlRfUkUgK1xuXHRcdFx0XHRcdFwiXFxcXChcIiArIC8vIGZpcnN0IHBhcmVuc1xuXHRcdFx0XHRcdFwiW14oKV0qKFxcXFwoXCIgK1xuXHRcdFx0XHRcdFwiW14oKV0qKFxcXFwoXCIgK1xuXHRcdFx0XHRcdFwiW14oKV0qXCIgK1xuXHRcdFx0XHRcdFwiXFxcXClbXigpXSopKlwiICtcblx0XHRcdFx0XHRcIlxcXFwpW14oKV0qKSpcIiArXG5cdFx0XHRcdFx0XCJcXFxcKVxcXFxzKlxcXFx7XCIsIC8vIGVuZCBwYXJlbnNcblx0XHRcdFx0cmV0dXJuQmVnaW46IHRydWUsXG5cdFx0XHRcdGxhYmVsOiBcImZ1bmMuZGVmXCIsXG5cdFx0XHRcdGNvbnRhaW5zOiBbXG5cdFx0XHRcdFx0UEFSQU1TLFxuXHRcdFx0XHRcdGhsanMuaW5oZXJpdChobGpzLlRJVExFX01PREUsIHsgYmVnaW46IElERU5UX1JFLCBzY29wZTogXCJ0aXRsZS5mdW5jdGlvblwiIH0pXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHRQUk9QRVJUWV9BQ0NFU1MsXG5cdFx0XHR7XG5cdFx0XHRcdG1hdGNoOiBbL1xcYmluaXQoPz1cXHMqXFwoKS9dLFxuXHRcdFx0XHRzY29wZTogeyAxOiBcInRpdGxlLmZ1bmN0aW9uXCIgfSxcblx0XHRcdFx0Y29udGFpbnM6IFtQQVJBTVNdXG5cdFx0XHR9LFxuXHRcdFx0RlVOQ1RJT05fQ0FMTCxcblx0XHRcdFVQUEVSX0NBU0VfQ09OU1RBTlQsXG5cdFx0XHRDTEFTU19PUl9FWFRFTkRTLFxuXHRcdFx0e1xuXHRcdFx0XHRtYXRjaDogL1xcJFsoLl0vIC8vIHJlbGV2YW5jZSBib29zdGVyIGZvciBhIHBhdHRlcm4gY29tbW9uIHRvIEpTIGxpYnM6IGAkKHNvbWV0aGluZylgIGFuZCBgJC5zb21ldGhpbmdgXG5cdFx0XHR9XG5cdFx0XVxuXHR9IGFzIExhbmd1YWdlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb3ggYXMgTGFuZ3VhZ2VGbjsiXSwibmFtZXMiOlsiaGxqcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0FBV0EsTUFBTSxLQUFLLEdBQUlBLHdCQUE0QixDQUFDLEtBQUssQ0FBQTtBQUVqRCxNQUFNLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQTtBQUV2QyxNQUFNLGlCQUFpQixHQUFHO0lBQ3pCLE9BQU87SUFDUCxNQUFNO0lBQ04sS0FBSztJQUNMLFVBQVU7SUFDVixJQUFJO0lBQ0osT0FBTztJQUNQLFFBQVE7SUFDUixLQUFLO0lBQ0wsT0FBTztDQUNQLENBQUE7QUFFRCxNQUFNLFFBQVEsR0FBRztJQUNoQixP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

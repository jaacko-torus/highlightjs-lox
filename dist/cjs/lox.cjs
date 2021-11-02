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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG94LmNqcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xveC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBuYW1lIExveFxuICogQHBhcmFtIHtMYW5ndWFnZUZufSBobGpzXG4gKiBAd2Vic2l0ZSBodHRwOi8vY3JhZnRpbmdpbnRlcnByZXRlcnMuY29tL1xuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBITEpTUmVnZXggfSBmcm9tIFwiLi4vdHlwZXNcIlxuaW1wb3J0IHR5cGUgeyBITEpTQXBpLCBMYW5ndWFnZSwgTGFuZ3VhZ2VGbiwgTW9kZSB9IGZyb20gXCJoaWdobGlnaHQuanNcIlxuaW1wb3J0IGhsanMgZnJvbSBcImhpZ2hsaWdodC5qc1wiXG5cbmNvbnN0IHJlZ2V4ID0gKGhsanMgYXMgSExKU0FwaSAmIEhMSlNSZWdleCkucmVnZXhcblxuY29uc3QgSURFTlRfUkUgPSBcIltBLVphLXpdWzAtOUEtWmEtel0qXCJcblxuY29uc3QgTEFOR1VBR0VfS0VZV09SRFMgPSBbXG5cdFwiY2xhc3NcIixcblx0XCJlbHNlXCIsXG5cdFwiZm9yXCIsXG5cdFwiZnVuY3Rpb25cIixcblx0XCJpZlwiLFxuXHRcInByaW50XCIsXG5cdFwicmV0dXJuXCIsXG5cdFwidmFyXCIsXG5cdFwid2hpbGVcIixcbl1cblxuY29uc3QgTElURVJBTFMgPSBbXG5cdFwiZmFsc2VcIixcblx0XCJuaWxcIixcblx0XCJ0cnVlXCIsXG5dXG5cbmNvbnN0IEJVSUxUX0lOX1ZBUklBQkxFUyA9IFtcblx0XCJzdXBlclwiLFxuXHRcInRoaXNcIixcbl1cblxuY29uc3QgS0VZV09SRFMgPSB7XG5cdCRwYXR0ZXJuOiBJREVOVF9SRSxcblx0a2V5d29yZDogTEFOR1VBR0VfS0VZV09SRFMsXG5cdGxpdGVyYWw6IExJVEVSQUxTLFxuXHRcInZhcmlhYmxlLmxhbmd1YWdlXCI6IEJVSUxUX0lOX1ZBUklBQkxFU1xufTtcblxuY29uc3QgTlVNQkVSOiBNb2RlID0ge1xuXHRzY29wZTogXCJudW1iZXJcIixcblx0dmFyaWFudHM6IFtcblx0XHR7IGJlZ2luOiBcIltcXFxcZF0rXCIgfSxcblx0XHR7IGJlZ2luOiBcIlxcXFxkKyhcXC5cXFxcZCspP1wiIH0sXG5cdF0sXG5cdHJlbGV2YW5jZTogMFxufTtcblxuY29uc3QgUEFSQU1TX0NPTlRBSU5TID0gW1xuXHRobGpzLkNfTElORV9DT01NRU5UX01PREUsXG5cdC8vIGVhdCByZWN1cnNpdmUgcGFyZW5zIGluIHN1YiBleHByZXNzaW9uc1xuXHR7XG5cdFx0YmVnaW46IC9cXCgvLFxuXHRcdGVuZDogL1xcKS8sXG5cdFx0a2V5d29yZHM6IEtFWVdPUkRTLFxuXHRcdGNvbnRhaW5zOiBbXCJzZWxmXCIsIGhsanMuQ19MSU5FX0NPTU1FTlRfTU9ERV1cblx0fSBhcyBNb2RlXG5dO1xuXG5jb25zdCBQQVJBTVM6IE1vZGUgPSB7XG5cdHNjb3BlOiBcInBhcmFtc1wiLFxuXHRiZWdpbjogL1xcKC8sXG5cdGVuZDogL1xcKS8sXG5cdGV4Y2x1ZGVCZWdpbjogdHJ1ZSxcblx0ZXhjbHVkZUVuZDogdHJ1ZSxcblx0a2V5d29yZHM6IEtFWVdPUkRTLFxuXHRjb250YWluczogUEFSQU1TX0NPTlRBSU5TXG59O1xuXG5jb25zdCBDTEFTU19PUl9FWFRFTkRTOiBNb2RlID0ge1xuXHR2YXJpYW50czogW1xuXHRcdC8vIGNsYXNzIENhciA8IFZlaGljbGVcblx0XHR7XG5cdFx0XHRtYXRjaDogW1xuXHRcdFx0XHQvY2xhc3MvLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRcdElERU5UX1JFLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRcdC88Lyxcblx0XHRcdFx0L1xccysvLFxuXHRcdFx0XSxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdDE6IFwia2V5d29yZFwiLFxuXHRcdFx0XHQzOiBcInRpdGxlLmNsYXNzXCIsXG5cdFx0XHRcdDU6IFwia2V5d29yZFwiLFxuXHRcdFx0XHQ3OiBcInRpdGxlLmNsYXNzLmluaGVyaXRlZFwiXG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBjbGFzcyBDYXJcblx0XHR7XG5cdFx0XHRtYXRjaDogW1xuXHRcdFx0XHQvY2xhc3MvLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRcdElERU5UX1JFXG5cdFx0XHRdLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0MTogXCJrZXl3b3JkXCIsXG5cdFx0XHRcdDM6IFwidGl0bGUuY2xhc3NcIlxuXHRcdFx0fVxuXHRcdH0sXG5cdF1cbn07XG5cbmNvbnN0IEZVTkNUSU9OX0RFRklOSVRJT046IE1vZGUgPSB7XG5cdHZhcmlhbnRzOiBbXG5cdFx0e1xuXHRcdFx0bWF0Y2g6IFtcblx0XHRcdFx0L2Z1bmN0aW9uLyxcblx0XHRcdFx0L1xccysvLFxuXHRcdFx0XHRJREVOVF9SRSxcblx0XHRcdFx0Lyg/PVxccypcXCgpL1xuXHRcdFx0XVxuXHRcdH0sXG5cdF0sXG5cdHNjb3BlOiB7XG5cdFx0MTogXCJrZXl3b3JkXCIsXG5cdFx0MzogXCJ0aXRsZS5mdW5jdGlvblwiXG5cdH0sXG5cdGxhYmVsOiBcImZ1bmMuZGVmXCIsXG5cdGNvbnRhaW5zOiBbUEFSQU1TXSxcblx0aWxsZWdhbDogLyUvXG59O1xuXG5jb25zdCBVUFBFUl9DQVNFX0NPTlNUQU5UOiBNb2RlID0ge1xuXHRyZWxldmFuY2U6IDAsXG5cdG1hdGNoOiAvXFxiW0EtWl1bQS1aMC05XStcXGIvLFxuXHRzY29wZTogXCJ2YXJpYWJsZS5jb25zdGFudFwiXG59O1xuXG5mdW5jdGlvbiBub25lT2YobGlzdDogc3RyaW5nW10pIHtcblx0cmV0dXJuIHJlZ2V4LmNvbmNhdChcIig/IVwiLCBsaXN0LmpvaW4oXCJ8XCIpLCBcIilcIik7XG59XG5cbmNvbnN0IEZVTkNUSU9OX0NBTEw6IE1vZGUgPSB7XG5cdG1hdGNoOiByZWdleC5jb25jYXQoXG5cdFx0L1xcYi8sXG5cdFx0bm9uZU9mKFtcInN1cGVyXCJdKSxcblx0XHRJREVOVF9SRSwgcmVnZXgubG9va2FoZWFkKC9cXCgvKSksXG5cdHNjb3BlOiBcInRpdGxlLmZ1bmN0aW9uXCIsXG5cdHJlbGV2YW5jZTogMFxufTtcblxuY29uc3QgUFJPUEVSVFlfQUNDRVNTOiBNb2RlID0ge1xuXHRiZWdpbjogcmVnZXguY29uY2F0KC9cXC4vLCByZWdleC5sb29rYWhlYWQoXG5cdFx0cmVnZXguY29uY2F0KElERU5UX1JFLCAvKD8hWzAtOUEtWmEteihdKS8pXG5cdCkpLFxuXHRlbmQ6IElERU5UX1JFLFxuXHRleGNsdWRlQmVnaW46IHRydWUsXG5cdHNjb3BlOiBcInByb3BlcnR5XCIsXG5cdHJlbGV2YW5jZTogMFxufTtcblxuLyoqXG4gKiBAbmFtZSBMb3hcbiAqIEBwYXJhbSB7SExKU0FwaX0gaGxqc1xuICogQHdlYnNpdGUgaHR0cDovL2NyYWZ0aW5naW50ZXJwcmV0ZXJzLmNvbS9cbiAqL1xuZnVuY3Rpb24gbG94KGhsanM6IEhMSlNBcGkpIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiBcIkxveFwiLFxuXHRcdGFsaWFzZXM6IFtcImxveFwiXSxcblx0XHRrZXl3b3JkczogS0VZV09SRFMsXG5cdFx0aWxsZWdhbDogLyMoPyFbJF9BLXpdKS8sXG5cdFx0Y29udGFpbnM6IFtcblx0XHRcdGhsanMuUVVPVEVfU1RSSU5HX01PREUsXG5cdFx0XHRobGpzLkNfTElORV9DT01NRU5UX01PREUsXG5cdFx0XHROVU1CRVIsXG5cdFx0XHR7IC8vIFwidmFsdWVcIiBjb250YWluZXJcblx0XHRcdFx0YmVnaW46IFwiKFwiICsgaGxqcy5SRV9TVEFSVEVSU19SRSArIFwifFxcXFxiKHJldHVybilcXFxcYilcXFxccypcIixcblx0XHRcdFx0a2V5d29yZHM6IFwicmV0dXJuXCIsXG5cdFx0XHRcdHJlbGV2YW5jZTogMCxcblx0XHRcdFx0Y29udGFpbnM6IFtcblx0XHRcdFx0XHRobGpzLkNfTElORV9DT01NRU5UX01PREUsXG5cdFx0XHRcdFx0aGxqcy5SRUdFWFBfTU9ERSxcblx0XHRcdFx0XHR7IC8vIGNvdWxkIGJlIGEgY29tbWEgZGVsaW1pdGVkIGxpc3Qgb2YgcGFyYW1zIHRvIGEgZnVuY3Rpb24gY2FsbFxuXHRcdFx0XHRcdFx0YmVnaW46IC8sLyxcblx0XHRcdFx0XHRcdHJlbGV2YW5jZTogMFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWF0Y2g6IC9cXHMrLyxcblx0XHRcdFx0XHRcdHJlbGV2YW5jZTogMFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdFx0RlVOQ1RJT05fREVGSU5JVElPTixcblx0XHRcdHtcblx0XHRcdFx0Ly8gcHJldmVudCB0aGlzIGZyb20gZ2V0dGluZyBzd2FsbG93ZWQgdXAgYnkgZnVuY3Rpb24gc2luY2UgdGhleSBhcHBlYXIgXCJmdW5jdGlvbiBsaWtlXCJcblx0XHRcdFx0YmVnaW5LZXl3b3JkczogXCJ3aGlsZSBpZiBmb3JcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0Ly8gd2UgaGF2ZSB0byBjb3VudCB0aGUgcGFyZW5zIHRvIG1ha2Ugc3VyZSB3ZSBhY3R1YWxseSBoYXZlIHRoZSBjb3JyZWN0XG5cdFx0XHRcdC8vIGJvdW5kaW5nICggKS4gIFRoZXJlIGNvdWxkIGJlIGFueSBudW1iZXIgb2Ygc3ViLWV4cHJlc3Npb25zIGluc2lkZVxuXHRcdFx0XHQvLyBhbHNvIHN1cnJvdW5kZWQgYnkgcGFyZW5zLlxuXHRcdFx0XHRiZWdpbjogXCJcXFxcYig/IWZ1bmN0aW9uKVwiICsgaGxqcy5VTkRFUlNDT1JFX0lERU5UX1JFICtcblx0XHRcdFx0XHRcIlxcXFwoXCIgKyAvLyBmaXJzdCBwYXJlbnNcblx0XHRcdFx0XHRcIlteKCldKihcXFxcKFwiICtcblx0XHRcdFx0XHRcIlteKCldKihcXFxcKFwiICtcblx0XHRcdFx0XHRcIlteKCldKlwiICtcblx0XHRcdFx0XHRcIlxcXFwpW14oKV0qKSpcIiArXG5cdFx0XHRcdFx0XCJcXFxcKVteKCldKikqXCIgK1xuXHRcdFx0XHRcdFwiXFxcXClcXFxccypcXFxce1wiLCAvLyBlbmQgcGFyZW5zXG5cdFx0XHRcdHJldHVybkJlZ2luOiB0cnVlLFxuXHRcdFx0XHRsYWJlbDogXCJmdW5jLmRlZlwiLFxuXHRcdFx0XHRjb250YWluczogW1xuXHRcdFx0XHRcdFBBUkFNUyxcblx0XHRcdFx0XHRobGpzLmluaGVyaXQoaGxqcy5USVRMRV9NT0RFLCB7IGJlZ2luOiBJREVOVF9SRSwgc2NvcGU6IFwidGl0bGUuZnVuY3Rpb25cIiB9KVxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0UFJPUEVSVFlfQUNDRVNTLFxuXHRcdFx0e1xuXHRcdFx0XHRtYXRjaDogWy9cXGJpbml0KD89XFxzKlxcKCkvXSxcblx0XHRcdFx0c2NvcGU6IHsgMTogXCJ0aXRsZS5mdW5jdGlvblwiIH0sXG5cdFx0XHRcdGNvbnRhaW5zOiBbUEFSQU1TXVxuXHRcdFx0fSxcblx0XHRcdEZVTkNUSU9OX0NBTEwsXG5cdFx0XHRVUFBFUl9DQVNFX0NPTlNUQU5ULFxuXHRcdFx0Q0xBU1NfT1JfRVhURU5EUyxcblx0XHRcdHtcblx0XHRcdFx0bWF0Y2g6IC9cXCRbKC5dLyAvLyByZWxldmFuY2UgYm9vc3RlciBmb3IgYSBwYXR0ZXJuIGNvbW1vbiB0byBKUyBsaWJzOiBgJChzb21ldGhpbmcpYCBhbmQgYCQuc29tZXRoaW5nYFxuXHRcdFx0fVxuXHRcdF1cblx0fSBhcyBMYW5ndWFnZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG94IGFzIExhbmd1YWdlRm47Il0sIm5hbWVzIjpbImhsanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQVdBLE1BQU0sS0FBSyxHQUFJQSx3QkFBNEIsQ0FBQyxLQUFLLENBQUE7QUFFakQsTUFBTSxRQUFRLEdBQUcsc0JBQXNCLENBQUE7QUFFdkMsTUFBTSxpQkFBaUIsR0FBRztJQUN6QixPQUFPO0lBQ1AsTUFBTTtJQUNOLEtBQUs7SUFDTCxVQUFVO0lBQ1YsSUFBSTtJQUNKLE9BQU87SUFDUCxRQUFRO0lBQ1IsS0FBSztJQUNMLE9BQU87Q0FDUCxDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQUc7SUFDaEIs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

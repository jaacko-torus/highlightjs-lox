define(['highlight.js'], (function (hljs) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var hljs__default = /*#__PURE__*/_interopDefaultLegacy(hljs);

    /**
     * @name Lox
     * @author jaacko-torus <jaacko.torus@gmail.com> (https://github.com/jaacko-torus)
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

    return lox;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG94LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG94LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG5hbWUgTG94XG4gKiBAYXV0aG9yIGphYWNrby10b3J1cyA8amFhY2tvLnRvcnVzQGdtYWlsLmNvbT4gKGh0dHBzOi8vZ2l0aHViLmNvbS9qYWFja28tdG9ydXMpXG4gKiBAd2Vic2l0ZSBodHRwOi8vY3JhZnRpbmdpbnRlcnByZXRlcnMuY29tL1xuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBITEpTUmVnZXggfSBmcm9tIFwiLi4vdHlwZXNcIlxuaW1wb3J0IHR5cGUgeyBITEpTQXBpLCBMYW5ndWFnZSwgTGFuZ3VhZ2VGbiwgTW9kZSB9IGZyb20gXCJoaWdobGlnaHQuanNcIlxuaW1wb3J0IGhsanMgZnJvbSBcImhpZ2hsaWdodC5qc1wiXG5cbmNvbnN0IHJlZ2V4ID0gKGhsanMgYXMgSExKU0FwaSAmIEhMSlNSZWdleCkucmVnZXhcblxuY29uc3QgSURFTlRfUkUgPSBcIltBLVphLXpdWzAtOUEtWmEtel0qXCJcblxuY29uc3QgTEFOR1VBR0VfS0VZV09SRFMgPSBbXG5cdFwiY2xhc3NcIixcblx0XCJlbHNlXCIsXG5cdFwiZm9yXCIsXG5cdFwiZnVuY3Rpb25cIixcblx0XCJpZlwiLFxuXHRcInByaW50XCIsXG5cdFwicmV0dXJuXCIsXG5cdFwidmFyXCIsXG5cdFwid2hpbGVcIixcbl1cblxuY29uc3QgTElURVJBTFMgPSBbXG5cdFwiZmFsc2VcIixcblx0XCJuaWxcIixcblx0XCJ0cnVlXCIsXG5dXG5cbmNvbnN0IEJVSUxUX0lOX1ZBUklBQkxFUyA9IFtcblx0XCJzdXBlclwiLFxuXHRcInRoaXNcIixcbl1cblxuY29uc3QgS0VZV09SRFMgPSB7XG5cdCRwYXR0ZXJuOiBJREVOVF9SRSxcblx0a2V5d29yZDogTEFOR1VBR0VfS0VZV09SRFMsXG5cdGxpdGVyYWw6IExJVEVSQUxTLFxuXHRcInZhcmlhYmxlLmxhbmd1YWdlXCI6IEJVSUxUX0lOX1ZBUklBQkxFU1xufTtcblxuY29uc3QgTlVNQkVSOiBNb2RlID0ge1xuXHRzY29wZTogXCJudW1iZXJcIixcblx0dmFyaWFudHM6IFtcblx0XHR7IGJlZ2luOiBcIltcXFxcZF0rXCIgfSxcblx0XHR7IGJlZ2luOiBcIlxcXFxkKyhcXC5cXFxcZCspP1wiIH0sXG5cdF0sXG5cdHJlbGV2YW5jZTogMFxufTtcblxuY29uc3QgUEFSQU1TX0NPTlRBSU5TID0gW1xuXHRobGpzLkNfTElORV9DT01NRU5UX01PREUsXG5cdC8vIGVhdCByZWN1cnNpdmUgcGFyZW5zIGluIHN1YiBleHByZXNzaW9uc1xuXHR7XG5cdFx0YmVnaW46IC9cXCgvLFxuXHRcdGVuZDogL1xcKS8sXG5cdFx0a2V5d29yZHM6IEtFWVdPUkRTLFxuXHRcdGNvbnRhaW5zOiBbXCJzZWxmXCIsIGhsanMuQ19MSU5FX0NPTU1FTlRfTU9ERV1cblx0fSBhcyBNb2RlXG5dO1xuXG5jb25zdCBQQVJBTVM6IE1vZGUgPSB7XG5cdHNjb3BlOiBcInBhcmFtc1wiLFxuXHRiZWdpbjogL1xcKC8sXG5cdGVuZDogL1xcKS8sXG5cdGV4Y2x1ZGVCZWdpbjogdHJ1ZSxcblx0ZXhjbHVkZUVuZDogdHJ1ZSxcblx0a2V5d29yZHM6IEtFWVdPUkRTLFxuXHRjb250YWluczogUEFSQU1TX0NPTlRBSU5TXG59O1xuXG5jb25zdCBDTEFTU19PUl9FWFRFTkRTOiBNb2RlID0ge1xuXHR2YXJpYW50czogW1xuXHRcdC8vIGNsYXNzIENhciA8IFZlaGljbGVcblx0XHR7XG5cdFx0XHRtYXRjaDogW1xuXHRcdFx0XHQvY2xhc3MvLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRcdElERU5UX1JFLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRcdC88Lyxcblx0XHRcdFx0L1xccysvLFxuXHRcdFx0XSxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdDE6IFwia2V5d29yZFwiLFxuXHRcdFx0XHQzOiBcInRpdGxlLmNsYXNzXCIsXG5cdFx0XHRcdDU6IFwia2V5d29yZFwiLFxuXHRcdFx0XHQ3OiBcInRpdGxlLmNsYXNzLmluaGVyaXRlZFwiXG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBjbGFzcyBDYXJcblx0XHR7XG5cdFx0XHRtYXRjaDogW1xuXHRcdFx0XHQvY2xhc3MvLFxuXHRcdFx0XHQvXFxzKy8sXG5cdFx0XHRcdElERU5UX1JFXG5cdFx0XHRdLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0MTogXCJrZXl3b3JkXCIsXG5cdFx0XHRcdDM6IFwidGl0bGUuY2xhc3NcIlxuXHRcdFx0fVxuXHRcdH0sXG5cdF1cbn07XG5cbmNvbnN0IEZVTkNUSU9OX0RFRklOSVRJT046IE1vZGUgPSB7XG5cdHZhcmlhbnRzOiBbXG5cdFx0e1xuXHRcdFx0bWF0Y2g6IFtcblx0XHRcdFx0L2Z1bmN0aW9uLyxcblx0XHRcdFx0L1xccysvLFxuXHRcdFx0XHRJREVOVF9SRSxcblx0XHRcdFx0Lyg/PVxccypcXCgpL1xuXHRcdFx0XVxuXHRcdH0sXG5cdF0sXG5cdHNjb3BlOiB7XG5cdFx0MTogXCJrZXl3b3JkXCIsXG5cdFx0MzogXCJ0aXRsZS5mdW5jdGlvblwiXG5cdH0sXG5cdGxhYmVsOiBcImZ1bmMuZGVmXCIsXG5cdGNvbnRhaW5zOiBbUEFSQU1TXSxcblx0aWxsZWdhbDogLyUvXG59O1xuXG5jb25zdCBVUFBFUl9DQVNFX0NPTlNUQU5UOiBNb2RlID0ge1xuXHRyZWxldmFuY2U6IDAsXG5cdG1hdGNoOiAvXFxiW0EtWl1bQS1aMC05XStcXGIvLFxuXHRzY29wZTogXCJ2YXJpYWJsZS5jb25zdGFudFwiXG59O1xuXG5mdW5jdGlvbiBub25lT2YobGlzdDogc3RyaW5nW10pIHtcblx0cmV0dXJuIHJlZ2V4LmNvbmNhdChcIig/IVwiLCBsaXN0LmpvaW4oXCJ8XCIpLCBcIilcIik7XG59XG5cbmNvbnN0IEZVTkNUSU9OX0NBTEw6IE1vZGUgPSB7XG5cdG1hdGNoOiByZWdleC5jb25jYXQoXG5cdFx0L1xcYi8sXG5cdFx0bm9uZU9mKFtcInN1cGVyXCJdKSxcblx0XHRJREVOVF9SRSwgcmVnZXgubG9va2FoZWFkKC9cXCgvKSksXG5cdHNjb3BlOiBcInRpdGxlLmZ1bmN0aW9uXCIsXG5cdHJlbGV2YW5jZTogMFxufTtcblxuY29uc3QgUFJPUEVSVFlfQUNDRVNTOiBNb2RlID0ge1xuXHRiZWdpbjogcmVnZXguY29uY2F0KC9cXC4vLCByZWdleC5sb29rYWhlYWQoXG5cdFx0cmVnZXguY29uY2F0KElERU5UX1JFLCAvKD8hWzAtOUEtWmEteihdKS8pXG5cdCkpLFxuXHRlbmQ6IElERU5UX1JFLFxuXHRleGNsdWRlQmVnaW46IHRydWUsXG5cdHNjb3BlOiBcInByb3BlcnR5XCIsXG5cdHJlbGV2YW5jZTogMFxufTtcblxuLyoqXG4gKiBAbmFtZSBMb3hcbiAqIEBwYXJhbSB7SExKU0FwaX0gaGxqc1xuICogQHdlYnNpdGUgaHR0cDovL2NyYWZ0aW5naW50ZXJwcmV0ZXJzLmNvbS9cbiAqL1xuZnVuY3Rpb24gbG94KGhsanM6IEhMSlNBcGkpIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiBcIkxveFwiLFxuXHRcdGFsaWFzZXM6IFtcImxveFwiXSxcblx0XHRrZXl3b3JkczogS0VZV09SRFMsXG5cdFx0aWxsZWdhbDogLyMoPyFbJF9BLXpdKS8sXG5cdFx0Y29udGFpbnM6IFtcblx0XHRcdGhsanMuUVVPVEVfU1RSSU5HX01PREUsXG5cdFx0XHRobGpzLkNfTElORV9DT01NRU5UX01PREUsXG5cdFx0XHROVU1CRVIsXG5cdFx0XHR7IC8vIFwidmFsdWVcIiBjb250YWluZXJcblx0XHRcdFx0YmVnaW46IFwiKFwiICsgaGxqcy5SRV9TVEFSVEVSU19SRSArIFwifFxcXFxiKHJldHVybilcXFxcYilcXFxccypcIixcblx0XHRcdFx0a2V5d29yZHM6IFwicmV0dXJuXCIsXG5cdFx0XHRcdHJlbGV2YW5jZTogMCxcblx0XHRcdFx0Y29udGFpbnM6IFtcblx0XHRcdFx0XHRobGpzLkNfTElORV9DT01NRU5UX01PREUsXG5cdFx0XHRcdFx0aGxqcy5SRUdFWFBfTU9ERSxcblx0XHRcdFx0XHR7IC8vIGNvdWxkIGJlIGEgY29tbWEgZGVsaW1pdGVkIGxpc3Qgb2YgcGFyYW1zIHRvIGEgZnVuY3Rpb24gY2FsbFxuXHRcdFx0XHRcdFx0YmVnaW46IC8sLyxcblx0XHRcdFx0XHRcdHJlbGV2YW5jZTogMFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWF0Y2g6IC9cXHMrLyxcblx0XHRcdFx0XHRcdHJlbGV2YW5jZTogMFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdFx0RlVOQ1RJT05fREVGSU5JVElPTixcblx0XHRcdHtcblx0XHRcdFx0Ly8gcHJldmVudCB0aGlzIGZyb20gZ2V0dGluZyBzd2FsbG93ZWQgdXAgYnkgZnVuY3Rpb24gc2luY2UgdGhleSBhcHBlYXIgXCJmdW5jdGlvbiBsaWtlXCJcblx0XHRcdFx0YmVnaW5LZXl3b3JkczogXCJ3aGlsZSBpZiBmb3JcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0Ly8gd2UgaGF2ZSB0byBjb3VudCB0aGUgcGFyZW5zIHRvIG1ha2Ugc3VyZSB3ZSBhY3R1YWxseSBoYXZlIHRoZSBjb3JyZWN0XG5cdFx0XHRcdC8vIGJvdW5kaW5nICggKS4gIFRoZXJlIGNvdWxkIGJlIGFueSBudW1iZXIgb2Ygc3ViLWV4cHJlc3Npb25zIGluc2lkZVxuXHRcdFx0XHQvLyBhbHNvIHN1cnJvdW5kZWQgYnkgcGFyZW5zLlxuXHRcdFx0XHRiZWdpbjogXCJcXFxcYig/IWZ1bmN0aW9uKVwiICsgaGxqcy5VTkRFUlNDT1JFX0lERU5UX1JFICtcblx0XHRcdFx0XHRcIlxcXFwoXCIgKyAvLyBmaXJzdCBwYXJlbnNcblx0XHRcdFx0XHRcIlteKCldKihcXFxcKFwiICtcblx0XHRcdFx0XHRcIlteKCldKihcXFxcKFwiICtcblx0XHRcdFx0XHRcIlteKCldKlwiICtcblx0XHRcdFx0XHRcIlxcXFwpW14oKV0qKSpcIiArXG5cdFx0XHRcdFx0XCJcXFxcKVteKCldKikqXCIgK1xuXHRcdFx0XHRcdFwiXFxcXClcXFxccypcXFxce1wiLCAvLyBlbmQgcGFyZW5zXG5cdFx0XHRcdHJldHVybkJlZ2luOiB0cnVlLFxuXHRcdFx0XHRsYWJlbDogXCJmdW5jLmRlZlwiLFxuXHRcdFx0XHRjb250YWluczogW1xuXHRcdFx0XHRcdFBBUkFNUyxcblx0XHRcdFx0XHRobGpzLmluaGVyaXQoaGxqcy5USVRMRV9NT0RFLCB7IGJlZ2luOiBJREVOVF9SRSwgc2NvcGU6IFwidGl0bGUuZnVuY3Rpb25cIiB9KVxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0UFJPUEVSVFlfQUNDRVNTLFxuXHRcdFx0e1xuXHRcdFx0XHRtYXRjaDogWy9cXGJpbml0KD89XFxzKlxcKCkvXSxcblx0XHRcdFx0c2NvcGU6IHsgMTogXCJ0aXRsZS5mdW5jdGlvblwiIH0sXG5cdFx0XHRcdGNvbnRhaW5zOiBbUEFSQU1TXVxuXHRcdFx0fSxcblx0XHRcdEZVTkNUSU9OX0NBTEwsXG5cdFx0XHRVUFBFUl9DQVNFX0NPTlNUQU5ULFxuXHRcdFx0Q0xBU1NfT1JfRVhURU5EUyxcblx0XHRcdHtcblx0XHRcdFx0bWF0Y2g6IC9cXCRbKC5dLyAvLyByZWxldmFuY2UgYm9vc3RlciBmb3IgYSBwYXR0ZXJuIGNvbW1vbiB0byBKUyBsaWJzOiBgJChzb21ldGhpbmcpYCBhbmQgYCQuc29tZXRoaW5nYFxuXHRcdFx0fVxuXHRcdF1cblx0fSBhcyBMYW5ndWFnZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG94IGFzIExhbmd1YWdlRm47Il0sIm5hbWVzIjpbImhsanMiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7SUFXQSxNQUFNLEtBQUssR0FBSUEsd0JBQTRCLENBQUMsS0FBSyxDQUFBO0lBRWpELE1BQU0sUUFBUSxHQUFHLHNCQUFzQixDQUFBO0lBRXZDLE1BQU0saUJBQWlCLEdBQUc7UUFDekIsT0FBTztRQUNQLE1BQU07UUFDTixLQUFLO1FBQ0wsVUFBVTtRQUNWLElBQUk7UUFDSixPQUFPO1FBQ1AsUUFBUTtRQUNS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

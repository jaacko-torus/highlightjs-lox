/**
 * @name Lox
 * @param {LanguageFn} hljs
 * @website http://craftinginterpreters.com/
 * @license MIT
 */

import type { HLJSRegex } from "../types";
import type { HLJSApi, Language, LanguageFn, Mode } from "highlight.js";
import hljs from "highlight.js";

console.log(hljs)

const regex = (hljs as HLJSApi & HLJSRegex).regex

const IDENT_RE = "[A-Za-z][0-9A-Za-z]*"

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
]

const LITERALS = [
	"false",
	"nil",
	"true",
]

const BUILT_IN_VARIABLES = [
	"super",
	"this",
]

const KEYWORDS = {
	$pattern: IDENT_RE,
	keyword: LANGUAGE_KEYWORDS,
	literal: LITERALS,
	"variable.language": BUILT_IN_VARIABLES
};

const NUMBER: Mode = {
	scope: "number",
	variants: [
		{ begin: "[\\d]+" },
		{ begin: "\\d+(\.\\d+)?" },
	],
	relevance: 0
};

const PARAMS_CONTAINS = [
	hljs.C_LINE_COMMENT_MODE,
	// eat recursive parens in sub expressions
	{
		begin: /\(/,
		end: /\)/,
		keywords: KEYWORDS,
		contains: ["self", hljs.C_LINE_COMMENT_MODE]
	} as Mode
];

const PARAMS: Mode = {
	scope: "params",
	begin: /\(/,
	end: /\)/,
	excludeBegin: true,
	excludeEnd: true,
	keywords: KEYWORDS,
	contains: PARAMS_CONTAINS
};

const CLASS_OR_EXTENDS: Mode = {
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

const FUNCTION_DEFINITION: Mode = {
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

const UPPER_CASE_CONSTANT: Mode = {
	relevance: 0,
	match: /\b[A-Z][A-Z0-9]+\b/,
	scope: "variable.constant"
};

function noneOf(list: string[]) {
	return regex.concat("(?!", list.join("|"), ")");
}

const FUNCTION_CALL: Mode = {
	match: regex.concat(
		/\b/,
		noneOf(["super"]),
		IDENT_RE, regex.lookahead(/\(/)),
	scope: "title.function",
	relevance: 0
};

const PROPERTY_ACCESS: Mode = {
	begin: regex.concat(/\./, regex.lookahead(
		regex.concat(IDENT_RE, /(?![0-9A-Za-z(])/)
	)),
	end: IDENT_RE,
	excludeBegin: true,
	scope: "property",
	relevance: 0
};

// HLJSApi

/**
 * @name Lox
 * @param {HLJSApi} hljs
 * @website http://craftinginterpreters.com/
 */
const lox: LanguageFn = (hljs: HLJSApi) => {
	return {
		name: "Lox",
		aliases: ["lox"],
		keywords: KEYWORDS,
		illegal: /#(?![$_A-z])/,
		contains: [
			hljs.QUOTE_STRING_MODE,
			hljs.C_LINE_COMMENT_MODE,
			NUMBER,
			{ // "value" container
				begin: "(" + hljs.RE_STARTERS_RE + "|\\b(return)\\b)\\s*",
				keywords: "return",
				relevance: 0,
				contains: [
					hljs.C_LINE_COMMENT_MODE,
					hljs.REGEXP_MODE,
					{ // could be a comma delimited list of params to a function call
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
					"\\)\\s*\\{", // end parens
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
	} as Language;
}

export default lox;
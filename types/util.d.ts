export type RecordEntry<R extends Record<K, V>, K extends keyof R = keyof R, V = R[K]> = [K, V]

export type Entry<T> = { [K in keyof T]: [K, T[K]] }[keyof T]

type RegexOptions = {
	capture?: boolean
}

type RegexEitherArgs =
	(RegExp | string)[] | [RegexOptions] |
	[...(RegExp | string)[], RegexOptions]

export interface HLJSRegex {
	regex: {
		concat: (...args: (RegExp | string)[]) => string,
		lookahead: (re: RegExp | string) => string,
		either: (...args: RegexEitherArgs) => string,
		optional: (re: RegExp | string) => string,
		anyNumberOfTimes: (re: RegExp | string) => string
	}
}

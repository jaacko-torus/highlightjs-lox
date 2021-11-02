import typescript from "typescript";
import rollup_typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
const terser_config = {
    ecma: 2015,
    compress: true,
    mangle: {
        toplevel: true,
        reserved: ["lox"]
    }
};
const default_output = (outputOptions, ext) => ({
    ...outputOptions,
    name: outputOptions.name ?? "lox",
    file: `dist/${outputOptions.format}/${outputOptions.name ?? "lox"}.${ext ?? "js"}`,
    exports: "default",
    sourcemap: "inline",
});
const min_output = (outputOptions, ext) => ({
    ...outputOptions,
    name: outputOptions.name ?? "lox",
    file: `dist/${outputOptions.format}/${outputOptions.name ?? "lox"}.min.${ext ?? "js"}`,
    exports: "default",
    sourcemap: true,
    plugins: [terser(terser_config)],
});
const config = {
    input: "src/lox.ts",
    output: [
        default_output({ format: "umd" }),
        default_output({ format: "cjs" }),
        default_output({ format: "cjs" }, "cjs"),
        default_output({ format: "amd" }),
        default_output({ format: "iife", globals: { "highlight.js": "hljs" } }),
        default_output({ format: "es" }),
        default_output({ format: "es" }, "mjs"),
        // might be useful for browsers to minify
        min_output({ format: "iife", globals: { "highlight.js": "hljs" } }),
        min_output({ format: "es" }),
        min_output({ format: "es" }, "mjs"),
    ],
    external: "highlight.js",
    plugins: [
        // TODO: use `import.meta.resolve` https://stackoverflow.com/questions/54977743/do-require-resolve-for-es-modules
        rollup_typescript({ tsconfig: "./tsconfig.json", typescript, tslib: require.resolve("tslib") }),
    ]
};
export default config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbHVwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbGx1cC9yb2xsdXAuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQTtBQUVuQyxPQUFPLGlCQUFpQixNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUU3QyxNQUFNLGFBQWEsR0FBWTtJQUM5QixJQUFJLEVBQUUsSUFBSTtJQUNWLFFBQVEsRUFBRSxJQUFJO0lBQ2QsTUFBTSxFQUFFO1FBQ1AsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDakI7Q0FDRCxDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxhQUE0QixFQUFFLEdBQVksRUFBaUIsRUFBRSxDQUFDLENBQUM7SUFDdEYsR0FBRyxhQUFhO0lBQ2hCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxJQUFJLEtBQUs7SUFDakMsSUFBSSxFQUFFLFFBQVEsYUFBYSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUcsSUFBSSxFQUFFO0lBQ2pGLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFNBQVMsRUFBRSxRQUFRO0NBQ25CLENBQUMsQ0FBQTtBQUVGLE1BQU0sVUFBVSxHQUFHLENBQUMsYUFBNEIsRUFBRSxHQUFZLEVBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xGLEdBQUcsYUFBYTtJQUNoQixJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksSUFBSSxLQUFLO0lBQ2pDLElBQUksRUFBRSxRQUFRLGFBQWEsQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxLQUFLLFFBQVEsR0FBRyxJQUFHLElBQUksRUFBRTtJQUNyRixPQUFPLEVBQUUsU0FBUztJQUNsQixTQUFTLEVBQUUsSUFBSTtJQUNmLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUNoQyxDQUFDLENBQUE7QUFFRixNQUFNLE1BQU0sR0FBa0I7SUFDN0IsS0FBSyxFQUFFLFlBQVk7SUFDbkIsTUFBTSxFQUFFO1FBQ1AsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ2pDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNqQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNqQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsRUFBRSxDQUFDO1FBQ3RFLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDO1FBQ3ZDLHlDQUF5QztRQUN6QyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsRUFBRSxDQUFDO1FBQ2xFLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUM1QixVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDO0tBQ25DO0lBQ0QsUUFBUSxFQUFFLGNBQWM7SUFDeEIsT0FBTyxFQUFFO1FBQ1IsaUhBQWlIO1FBQ2pILGlCQUFpQixDQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFHLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0tBQ2hHO0NBQ0QsQ0FBQTtBQUVELGVBQWUsTUFBTSxDQUFBIn0=
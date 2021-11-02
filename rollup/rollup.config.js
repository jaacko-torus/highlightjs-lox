import path from "path";
import typescript from "typescript";
import rollup_typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
// https://stackoverflow.com/a/68060892/9564132
const AssertRecordType = () => (record) => record;
const AssertOutputRecord = AssertRecordType();
const remove_extension = (parsed_filename) => path.join(parsed_filename.dir, parsed_filename.name);
const minify_file_name = (file_name) => `${remove_extension(path.parse(file_name))}.min.js`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbHVwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbGx1cC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQ3ZCLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQTtBQUduQyxPQUFPLGlCQUFpQixNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUc3QywrQ0FBK0M7QUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxHQUFNLEVBQUUsQ0FBQyxDQUE4QixNQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQTtBQUNwRixNQUFNLGtCQUFrQixHQUFHLGdCQUFnQixFQUFpQixDQUFBO0FBRTVELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxlQUFnQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ25ILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFBO0FBRW5HLE1BQU0sYUFBYSxHQUFZO0lBQzlCLElBQUksRUFBRSxJQUFJO0lBQ1YsUUFBUSxFQUFFLElBQUk7SUFDZCxNQUFNLEVBQUU7UUFDUCxRQUFRLEVBQUUsSUFBSTtRQUNkLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNqQjtDQUNELENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLGFBQTRCLEVBQUUsR0FBWSxFQUFpQixFQUFFLENBQUMsQ0FBQztJQUN0RixHQUFHLGFBQWE7SUFDaEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLElBQUksS0FBSztJQUNqQyxJQUFJLEVBQUUsUUFBUSxhQUFhLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBRyxJQUFJLEVBQUU7SUFDakYsT0FBTyxFQUFFLFNBQVM7SUFDbEIsU0FBUyxFQUFFLFFBQVE7Q0FDbkIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUE0QixFQUFFLEdBQVksRUFBaUIsRUFBRSxDQUFDLENBQUM7SUFDbEYsR0FBRyxhQUFhO0lBQ2hCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxJQUFJLEtBQUs7SUFDakMsSUFBSSxFQUFFLFFBQVEsYUFBYSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLEtBQUssUUFBUSxHQUFHLElBQUcsSUFBSSxFQUFFO0lBQ3JGLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ2hDLENBQUMsQ0FBQTtBQUVGLE1BQU0sTUFBTSxHQUFrQjtJQUM3QixLQUFLLEVBQUUsWUFBWTtJQUNuQixNQUFNLEVBQUU7UUFDUCxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDakMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ2pDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLENBQUM7UUFDeEMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ2pDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBQyxFQUFFLENBQUM7UUFDdEUsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2hDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUM7UUFDdkMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFDLEVBQUUsQ0FBQztRQUNsRSxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDNUIsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQztLQUNuQztJQUNELFFBQVEsRUFBRSxjQUFjO0lBQ3hCLE9BQU8sRUFBRTtRQUNSLGlIQUFpSDtRQUNqSCxpQkFBaUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRyxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztLQUNoRztDQUNELENBQUE7QUFFRCxlQUFlLE1BQU0sQ0FBQSJ9
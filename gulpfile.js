import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import ts from "gulp-typescript";
import babel from "gulp-babel";
import terser from "gulp-terser";
import rename from "gulp-rename";
const modules = {
    mjs: {},
    umd: {},
    amd: {},
    commonjs: { dirname: "cjs" },
    systemjs: { dirname: "sjs" }
};
const task_default = () => {
    const taskCallback = ([moduleName, moduleInfoRecord]) => {
        const tsResult = gulp
            .src(["src/**/*.ts"])
            .pipe(sourcemaps.init())
            .pipe(ts.createProject("tsconfig.json")());
        const applyModuleTransformation = () => moduleName === "mjs"
            ? tsResult.js
            : tsResult.js.pipe(babel({
                presets: ["@babel/preset-env"],
                plugins: [`@babel/plugin-transform-modules-${moduleName}`]
            }));
        const babelResult = applyModuleTransformation()
            .pipe(rename({ dirname: moduleInfoRecord?.dirname ?? moduleName }));
        const taskOpts = { ...moduleInfoRecord, task: () => babelResult };
        return [moduleName, taskOpts];
    };
    return Object.fromEntries(Object.entries(modules).map(taskCallback));
};
const task_minify = () => {
    const taskCallback = ([moduleName, moduleOpts]) => {
        const terserResult = moduleOpts.task()
            .pipe(rename({ suffix: ".min" }))
            .pipe(terser({
            ecma: 2015,
            compress: true,
            mangle: {
                toplevel: true,
                reserved: ["lox"]
            }
        }));
        return [moduleName, { ...moduleOpts, task: () => terserResult }];
    };
    return Object.fromEntries(Object.entries(task_default()).map(taskCallback));
};
function series(taskNames) {
    return gulp.series(taskNames.map(taskName => gulp.task(taskName)));
}
const mapAndWrite = (task) => () => task().pipe(sourcemaps.write(".")).pipe(gulp.dest("dist"));
const makeTasks = (taskSetName, taskRecord) => {
    const getTaskName = (taskName) => `${taskSetName}_${taskName}`;
    Object.entries(taskRecord).map(([taskName, taskOpts]) => {
        gulp.task(getTaskName(taskName), mapAndWrite(taskOpts.task));
    });
    gulp.task(taskSetName, series(Object.entries(taskRecord).map(([taskName]) => getTaskName(taskName))));
};
makeTasks("default", task_default());
makeTasks("minify", task_minify());
gulp.task("dist", series(["default", "minify"]));
gulp.task("dev", () => gulp.watch("src/lox.ts", gulp.task("default")));
//# sourceMappingURL=gulpfile.js.map
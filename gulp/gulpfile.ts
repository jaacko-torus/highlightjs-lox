import gulp from "gulp"
import sourcemaps from "gulp-sourcemaps"
import ts from "gulp-typescript"
import babel from "gulp-babel"
import terser from "gulp-terser"
import rename from "gulp-rename"

const tsProject = ts.createProject("tsconfig.json")

const task_default = () => {
	const tsResult = gulp
		.src(["src/**/*.ts"])
		.pipe(sourcemaps.init())
		.pipe(tsProject())
	
	const babelResult = tsResult.js
		.pipe(babel({
			presets: ["@babel/preset-env"],
			plugins: ["@babel/plugin-transform-modules-commonjs"]
		}))
	
	return babelResult
}

const task_minify = () => {
	const terserResult = task_default()
		.pipe(rename({ suffix: ".min" }))
		.pipe(terser({
			ecma: 2015,
			compress: true,
			mangle: {
				toplevel: true,
				reserved: ["lox"]
			}
		}))
	
	return terserResult
}

function series(...tasks : string[]) { return gulp.series(tasks.map(task => gulp.task(task))) }

type MapAndWrite = (task : () => NodeJS.ReadWriteStream) => () => NodeJS.ReadWriteStream
const mapAndWrite : MapAndWrite = (task) => () => task().pipe(sourcemaps.write(".")).pipe(gulp.dest("dist"))

gulp.task("default", mapAndWrite(task_default))
gulp.task("minify", mapAndWrite(task_minify))
gulp.task("dist", series("default", "minify"))
const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
var clean = require("gulp-clean");
const terser = require("gulp-terser");

async function scripts() {
  return src("app/js/*.js")
    .pipe(concat("main.min.js"))
    .pipe(terser())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/*.scss")
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function watching() {
  watch(["app/scss/*.scss"], styles);
  watch(["app/js/*.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
  });
}

function build() {
  return src(
    [
      "app/css/style.min.css",
      "app/js/main.min.js",
      "app/*.html",
      "app/fonts/**",
      "app/img/**",
    ],
    {
      base: "app",
    }
  ).pipe(dest("dist"));
}

function cleanDist() {
  return src("dist", { read: false, allowEmpty: true }).pipe(clean());
}

exports.build = series(cleanDist, build);
exports.default = parallel(styles, scripts, browsersync, watching);

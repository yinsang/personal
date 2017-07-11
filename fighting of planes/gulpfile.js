let gulp = require("gulp");
let browserSync = require("browser-sync").create();
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer-core");
let postcssSimpleVars = require("postcss-simple-vars");
let postcssMixins = require("postcss-mixins");
let postcssNested = require("postcss-nested");
let rename = require("gulp-rename")
let babel = require("gulp-babel")
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminOptipng = require('imagemin-optipng');
const imagemin = require('gulp-imagemin')
const mockServer = require('gulp-mock-server')
const spritesmith = require("gulp.spritesmith")
let gulpif = require("gulp-if")
const tinypng = require("gulp-tinypng")
// let sourcemaps = require("gulp-sourcemaps");
// let concat = require("gulp-concat")
// let md5 = require("gulp-md5")
// let uglify = require("gulp-uglify")
// let pump = require("pump")
// let del = require("del")
// Css process.
gulp.task("PC-postcss", ()=>{
    var processors = [
        postcssMixins,
        postcssSimpleVars,
        postcssNested,
        autoprefixer({
            browsers: ['last 3 version', 'safari > 4', 'ff > 31', 'opera 12.1', 'IOS 6', 'ie 6-8', 'Android 4','> 1%']
        })];
    return gulp.src(["./today-pc/src/css/*.scss"])
        .pipe(postcss(processors))
        .pipe(rename({
            extname:".css"
        }))
        .pipe(gulp.dest("./today-pc/dist/css/"))
        .pipe(browserSync.stream());
});
// Css process.
gulp.task("M-postcss", ()=>{
    var processors = [
        postcssMixins,
        postcssSimpleVars,
        postcssNested,
        autoprefixer({
            browsers: ['last 10 version']
        })];
    return gulp.src(["./src/css/index.scss"])
        .pipe(postcss(processors))
        .pipe(rename({
            extname:".css"
        }))
        .pipe( rename(function(path) {
            path.basename += "-dist";
        }) )
        .pipe(gulp.dest("./dist/css/"))
        .pipe(browserSync.stream());
});
gulp.task("textConcat", ()=>{
    gulp.src("fuck/*.js")
        .pipe(babel({
            presets:["es2015"]
        }))
        .pipe(concat("all.js"))
        .pipe(gulp.dest("dest"))
})
// Ãû×Ö²»ÄÜÓÃindex.js£¬today.js ±àÒëºó³Ætoday-concat.js
gulp.task("PC-es2015", function (){
    gulp.src("./today-pc/src/js/today.js")
        .pipe(babel({
            presets :["es2015"]
        }))
        .pipe( rename(function(path) {
            path.basename += "-dist";
        }) )
        .pipe(gulp.dest("./today-pc/src/js/"))
        .pipe(browserSync.stream());
})
gulp.task("M-es2015", function (){
    gulp.src("./src/js/index.js")
        .pipe(babel({
            presets :["es2015"]
        }))
        .pipe( rename(function(path) {
            path.basename += "-dist";
        }) )
        .pipe(gulp.dest("./dist/js/"))
        .pipe(browserSync.stream());
})
// ¸ÄÃû
gulp.task("testRename",()=>{
    gulp.src("fuck/demo.js",{base:process.cwd()})
        .pipe(rename({
            dirname:"main/text/ciao",
            basename:"aa",
            prefix:"bonjour-",
            suffix:"-hold",
            extname:".jsd"
        }
        ))
        .pipe(gulp.dest("dest"))
})
// md5µÄÎÄ¼þÃû×Ö±àÒë
gulp.task("md5",()=>{
    gulp.src("fuck/demo3.js")
        .pipe(md5({
            cwd:"dest/"
        }))
        .pipe(md5())
        .pipe(gulp.dest("dest/"))
})
// jsÑ¹Ëõ
gulp.task("uglify1",()=>{
    gulp.src("fuck/demo4.js")
        .pipe(uglify())
        .pipe(gulp.dest("dest"))
})
gulp.task("jsmin",  ()=> {
    gulp.src("src/js/index.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});
let srcImage = './images/*.*';
let distImage = './dist/images';
gulp.task("sprite",()=>{
    var spriteData = gulp.src('./images/spriter/*.png').pipe(
        spritesmith({
            imgName: './images/sprite.png',
            cssName: './dist/css/sprite.css',
        })
    )
    .pipe(gulpif("*.png", gulp.dest("./")))
    .pipe(gulpif("*.css", gulp.dest("./")))
})
gulp.task('gulpImgMin', () =>
    gulp.src(srcImage)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest('./dist/images'))
);
gulp.task("mock", ()=>{
    gulp.src(".")
        .pipe(mockServer({
            port:9090
        }))
})
gulp.task('tinypng', function () {
    gulp.src('./images/tinypng/*.{jpg,png,gif,jpeg}')
        .pipe(tinypng('gsbqKsmAKLeLDYVkAjSK5peWg1Cr6DRD'))
        .pipe(gulp.dest('./images'));
});
gulp.task("m-server",["M-postcss","M-es2015","sprite", "mock"], ()=>{
    browserSync.init({
        open: 'external',
        server:{
            baseDir: './'
        },
    });
    gulp.watch("./src/css/index.scss", ["M-postcss"]);
    gulp.watch("./src/js/index.js", ["M-es2015"]);
    gulp.watch("./index.html").on('change', browserSync.reload);
})
gulp.task("default",["m-server"])

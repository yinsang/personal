// You may need to learn somethings like" nodeJs es5 es6 gulp "to understand this file
// by love1175180338@gmail.com
let gulp = require("gulp");
let browserSync = require("browser-sync").create();
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer-core");
let postcssSimpleVars = require("postcss-simple-vars");
let postcssMixins = require("postcss-mixins");
let postcssNested = require("postcss-nested");
let sourcemaps = require("gulp-sourcemaps");
let babel = require("gulp-babel")
let concat = require("gulp-concat")
let rename = require("gulp-rename")
let md5 = require("gulp-md5")
let uglify = require("gulp-uglify")
let pump = require("pump")
let del = require("del")
// Css process.
gulp.task("postcss", ()=>{
    var processors = [
        postcssMixins,
        postcssSimpleVars,
        postcssNested,
        autoprefixer({
            browsers: ['last 2 version', 'safari > 5', 'ff > 31', 'opera 12.1', 'ios 6', 'IE > 7', 'android 4','> 10%']
        })];

    return gulp.src(["./**/*.scss"])
        // .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            extname:".css"
        }))
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./"));

});

gulp.task("textConcat", ()=>{
    gulp.src("fuck/*.js")
        .pipe(babel({
            presets:["es2015"]
        }))
        .pipe(concat("all.js"))
        .pipe(gulp.dest("dest"))
})
// this name can not use index.js,because some wars to node
gulp.task("es2015", function (){
    gulp.src("./**/private.js")
    // .pipe(sourcemaps.init())
    .pipe(babel({
        presets :["es2015"]
    }))
    // .pipe(sourcemaps.write("."))
    .pipe( rename(function(path) {
        path.basename += "-concat";
    }) )
    .pipe(gulp.dest("./"))
})
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
gulp.task("md5",()=>{
    gulp.src("fuck/demo3.js")
        .pipe(md5({
            cwd:"dest/"
        }))
        .pipe(md5())
        .pipe(gulp.dest("dest/"))
})
gulp.task("uglify1",()=>{
        gulp.src("fuck/demo4.js")
        .pipe(uglify())
        .pipe(gulp.dest("dest"))
})
gulp.task("jsmin",  ()=> {
    gulp.src("src/js/private.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});
gulp.task("browserSync", ()=>{
    browserSync.reload();
})
gulp.task("fileWatch", ["postcss","es2015"],(done)=>{
        browserSync.reload();
        done()
    })
gulp.task("jsWatch", [],(done)=>{
        browserSync.reload();
        done()
    })

gulp.task("pc-server",["postcss","es2015"], ()=>{
    browserSync.init({
        server: "today-pc/"
    });
    gulp.watch("./today-pc/**/*.scss", ["postcss"]);
    gulp.watch("./today-pc/**/private.js", ["es2015"]);
    gulp.watch(["./today-pc/**/today-concat.js","./today-pc/**/index.css","./today-pc/**/*.html"], ["browserSync"]);
})
gulp.task("m-server",["postcss","es2015"], ()=>{
    browserSync.init({
        server: "today-m/"
    });
    gulp.watch("./today-m/**/*.scss", ["postcss"]);
    gulp.watch("./today-m/**/private.js", ["es2015"]);
    gulp.watch(["./today-m/**/today-concat.js","./today-m/**/index.css","./today-m/**/*.html"], ["browserSync"]);
})
gulp.task("lunbo-pc",["postcss","es2015"], ()=>{
    browserSync.init({
        server: "pc-carousel/"
    });
    gulp.watch("./pc-carousel/**/*.scss", ["postcss"]);
    gulp.watch("./pc-carousel/**/private.js", ["es2015"]);
    gulp.watch(["./pc-carousel/**/today-concat.js","./pc-carousel/**/index.css","./pc-carousel/**/*.html"], ["browserSync"]);
})
gulp.task("default",["pc-server"])

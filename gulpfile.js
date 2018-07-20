var gulp = require("gulp");//定义任务插槽
var gulp_minfy_css = require("gulp-minify-css");//css压缩
var gulp_sass = require("gulp-sass");//sass转换压缩
var gulp_plumber = require("gulp-plumber");//取消报错终止
var gulp_tinypng = require("gulp-tinypng");//图片压缩
var gulp_uglify = require("gulp-uglify");//压缩js
var browser_sync = require("browser-sync").create();//浏览器实时监听
var gulp_autoprefixer = require("gulp-autoprefixer");//自动生成兼容前缀
var gulp_copy = require('gulp-copy');//拷贝
var gulp_babel = require("gulp-babel");

//文件复制
gulp.task('copy', function() {
    gulp.src("./src/fonts/*.*")
    .pipe(gulp_copy('./dist/fonts',{prefix:2}));
    gulp.src("./src/*.html")
    .pipe(gulp_copy('./dist',{prefix:2}));
})

//scss转换css
gulp.task("sass",function(){
	gulp.src('./src/scss/**/*.scss')
	.pipe(gulp_plumber())
	.pipe(gulp_sass())
	.pipe(gulp.dest('./src/css'));
})

//实时监听scss文件变化，转化为css
gulp.task("watchscss",function(){
	gulp.watch("./src/scss/**/*.scss",["sass"])
})

//定义自动刷新浏览器任务
gulp.task('browser-sync', function() {
    browser_sync.init({
    	port:Math.floor(Math.random()*9999)+1000,
    	//产生随机端口号
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("./src/scss/**/*.scss",["sass"]).on("change",browser_sync.reload)
    gulp.watch("./src/*.html").on("change",browser_sync.reload);
});


//dist压缩部分

//css压缩
gulp.task("mincss",function(){
	//这个任务具体要做的是事情就在这里写
	gulp.src('./src/scss/**/*.scss')
	.pipe(gulp_plumber())
	.pipe(gulp_sass())
	.pipe(gulp_minfy_css({
		keepspecialComments:'*'
		//保留所有特殊前缀，当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
	}))
	.pipe(gulp_autoprefixer({
			browsers: ['last 2 versions', 'Android >= 4.0','iOS 7','last 3 Safari versions'],
			cascade: false
		}))
	.pipe(gulp.dest('./dist/css'));
})

//img压缩
gulp.task("minimg",function(){
	gulp.src('./src/img/**/*.*')
	.pipe(gulp_plumber())
	.pipe(gulp_tinypng("dQ5okTCk1kmCe5JwxmYpZaJALFkhX2sX"
))
	.pipe(gulp.dest('./dist/img'));
})

//js压缩
gulp.task("minjs",function(){
	gulp.src('./src/js/**/*.js')
	.pipe(gulp_babel({
		presets:['es2015']
	}))
	.pipe(gulp_uglify())
	.pipe(gulp.dest('dist/js'));
})



//定义一键开发模式
gulp.task("dev",["browser-sync"]);

//定义一键生成模式
gulp.task("pro",["mincss","minjs","minimg","copy"]);
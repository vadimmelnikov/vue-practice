var gulp = require("gulp"),
	connect = require("gulp-connect"),
	opn = require("opn"),
	sass = require("gulp-sass"),
	pug = require("gulp-pug"),
	browserSync = require('browser-sync').create();

var mainBowerFiles = require('main-bower-files'),
	gulpFilter = require('gulp-filter'),
	rename = require('gulp-rename'),
	rimraf = require('rimraf'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	babel = require('gulp-babel'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch');

var dest_path = 'public';
function log(error) {
	console.log([
		'',
		"----------ERROR MESSAGE START----------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"----------ERROR MESSAGE END----------",
		''
	].join('\n'));
	this.end();
}
// Работа с pug
gulp.task('pug', function() {
	gulp.src('app/templates/*.pug')
		.pipe(pug({pretty: true}))
		.on('error', log)
		.pipe(gulp.dest(dest_path + '/'))
		.pipe(connect.reload());
});

var autoprefixerOptions = {
	browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
};
// Работа с Sass
gulp.task('sass', function() {
	gulp.src('app/sass/*.scss')
		.pipe( sass().on( 'error', function( error )
			{
				console.log( error );
			} )
		)
		.pipe(sass({
			// sourceComments: 'map'
		}))
		//        .pipe(prefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest( dest_path + '/css/'))
		.pipe(connect.reload());
});

// Работа с js
gulp.task('js', function() {
	gulp.src('./app/js/**/*.js')
		.pipe(plumber())
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest(dest_path + '/js/'))
		.pipe(connect.reload());
});

// Сборка IMG
gulp.task('image', function () {
	gulp.src('./app/images/**/*.*') //Выберем наши картинки
		.pipe(imagemin({ //Сожмем их
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(dest_path + '/images/')) //И бросим в public/images/
		.pipe(connect.reload());
});

// Сборка Fonts
gulp.task('fonts', function () {
	gulp.src('./app/fonts/**/*.*')
		.pipe(gulp.dest(dest_path + '/fonts/')) //И бросим в public/css/fonts/
		.pipe(connect.reload());
});


// Вытянуть зависимости из bower.json и сложить их public
gulp.task('libs', function() {
	var jsFilter = gulpFilter('*.js');
	var cssFilter = gulpFilter('*.css');
	var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

	// mainBowerFiles - берёт инфу о проекте из .bower.json, но не у всех либ есть параметр main, поэтому делаем хак,
	// что бы эти глюкобажные либы тоже скопировались!
	var fix_libs_paths = [
		// 'corner/jquery.corner.js',
		// 'normalize-css/normalize.css',
		// 'respond/dest/respond.min.js',
		'jquery/dist/jquery.js',
		//'bPopup/jquery.bpopup.js',
		// 'bxslider-4/dist/jquery.bxslider.css',
		// 'owlcarousel/assets/css/owl.carousel.css',
		// 'owlcarousel/assets/css/responsiv.css',
		// 'OwlCarouselSage/owl-carousel/owl.theme.css',
		// 'OwlCarouselSage/owl-carousel/owl.carousel.css',
		// 'OwlCarouselSage/owl-carousel/owl.carousel.js',
		// 'bpopup/jquery.bpopup.js',
		// 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
		// 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
		// 'jquery-zoom/jquery.zoom.js',
		// 'ionrangeslider/js/ion.rangeSlider.min.js',
		// 'ionrangeslider/css/ion.rangeSlider.skinFlat.css',
		// 'ionrangeslider/css/ion.rangeSlider.css',
		// 'tooltipster/js/jquery.tooltipster.js',
		// 'tooltipster/css/tooltipster.css',
		// 'fullpage.js/jquery.fullPage.js',
		// 'fullpage.js/jquery.fullPage.css',
		// 'pagepiling.js/jquery.pagepiling.js',
		// 'pagepiling.js/jquery.pagepiling.css',
		// 'jquery-fadethis/dist/jquery.fadethis.min.js',
		'modernizr/modernizr.js'
	];

	var paths = mainBowerFiles();
	for(var i=0; i < fix_libs_paths.length; i++){
		paths[paths.length] = './app/vendor/' + fix_libs_paths[i];
	}

	gulp.src(paths)

	// grab vendor js files from bower_components, minify and push in /public/js/vendor
		.pipe(jsFilter)
		.pipe(gulp.dest(dest_path + '/js/vendor'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(dest_path + '/js/vendor'))
		.pipe(jsFilter.restore())

		// grab vendor css files from bower_components, minify and push in /public/css
		.pipe(cssFilter)
		.pipe(gulp.dest(dest_path + '/css'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(dest_path + '/css'))
		.pipe(cssFilter.restore())

		// grab vendor font files from bower_components and push in /public/fonts
		.pipe(fontFilter)
		//.pipe(flatten())
		.pipe(gulp.dest(dest_path + '/fonts'));
});

// Такс запускает одной командой все предыдущие таски
gulp.task('build', [
	'pug',
	'sass',
	'js',
	'image',
	'fonts',
	'libs'
]);

// Если вы добавите какую-нибудь картинку, потом запустите задачу image и потом картинку удалите — она останется в папке public.
// Так что было бы удобно — периодически подчищать ее. Создадим для этого простой таск
gulp.task('clean', function (cb) {
	rimraf(dest_path, cb);
});


// Слежка

gulp.task('watch', function() {
	watch(['./app/images/**/*.*'], function(event, cb) {
		gulp.start('image');
	});
	watch(['./app/templates/**/*.pug'], function(event, cb) {
		gulp.start('pug');
	});
	watch(['./app/sass/**/*.scss'], function(event, cb) {
		gulp.start('sass');
	});
	watch(['./app/js/**/*.js'], function(event, cb) {
		gulp.start('js');
	});
	watch(['./app/sass/fonts/**/*.*'], function(event, cb) {
		gulp.start('fonts');
	});
	watch(['./bower.json'], function(event, cb) {
		gulp.start('libs');
	});
	// gulp.watch(['], ['pug']);
	// gulp.watch(['./app/sass/**/*.scss'], ['sass']);
	// gulp.watch(['./app/js/**/*.js'], ['js']);
	// gulp.watch(['./app/images/**/*.*'], ['image']);
	// gulp.watch(['./app/sass/fonts/**/*.*'], ['fonts']);
	// gulp.watch(['./bower.json'], ['libs']);
});

// Запуск сервера c лайврелоадом
gulp.task('serv_livereload', function() {
	connect.server({
		root: dest_path,
		livereload: true,
		port: 8800
	});
	opn('http://localhost:8800');
});

// Запуск сервера без лайврелоада
gulp.task('serv_no_livereload', function() {
	connect.server({
		root: dest_path,
		port: 8888
	});
	opn('http://localhost:8888');
});


// Задача по-умолчанию
gulp.task('default', ['serv_livereload', 'watch']);

// Для ie
gulp.task('serv', ['serv_no_livereload', 'watch']);
import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

/* 
 gulp.task();  //realiza la tarea
 gulp.src(); //origen de donde toma los datos
 gulp.dest(); //destino a donde deja los datos procesados
 gulp.watch(); //monitorea cambios
*/

//task transpilar a ES5
gulp.task('es6', () => {
    gulp.src('./es6/*.js')
    .pipe (babel())
    .pipe(gulp.dest('./es5'))
});

//Compilar Sass
gulp.task('sass', ()=>
    gulp.src('./sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
);

//Default watch para tareas
gulp.task('default', () => {
    gulp.watch('./es6/*.js', ['es6'])
    // gulp.watch('./sass/*.scss', ['sass'])
})
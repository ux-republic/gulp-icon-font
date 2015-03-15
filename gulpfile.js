// Appel des librairies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate');

// Tâche "iconfont"
gulp.task('iconfont', function () {
    gulp.src('icons/**/*.svg') // Localisation des fichiers SVG
        .pipe(iconfont({ // Appel du module générant la police d'icône
            fontName: 'custom', // Nom de la police
            centerHorizontally: true, // Calcule des dimensions du glyphe et centrage
            normalize: true // Normalisation des icônes par mise à l'échelle par rapport à la taille de l'icône la plus grande
        }))
        .on('codepoints', function (codepoints) { // Appel du module générant le CSS
            gulp.src('scss/templates/_icons.scss') // Localisation du template SASS
                .pipe(consolidate('lodash', { // Appel du moteur de template
                    glyphs: codepoints, // Code points présent dans la propriété CSS "content"
                    fontName: 'custom', // Nom de la police
                    fontPath: '../fonts/custom/', // Chemin des fichiers de police
                    className: 'icon' // Nom de la classe principale, commune à tous les icônes
                }))
                .pipe(gulp.dest('scss')); // Destination du fichier SASS qui sera ensuite générer en CSS
        })
        .pipe(gulp.dest('fonts/custom')); // Destination des fichiers de police
});

// Tâche "sass"
gulp.task('sass', function () {
    gulp.src('scss/**/*.scss') // Localisation des fichiers SASS
        .pipe(sass()) // Exécution de SASS pour compilation
        .pipe(gulp.dest('css')); // Destination des fichiers CSS
});

// Tâche par défaut
gulp.task('default', ['sass'], function () {
    gulp.watch('scss/**/*.scss', ['sass']); // Génération des fichiers CSS à chaque modification des fichiers SASS
});

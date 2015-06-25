'use strict';


// -----------------------------------------------------------------------------
// Dépendances
// -----------------------------------------------------------------------------

var gulp = require('gulp')
  , sass = require('gulp-sass')
  , iconfont = require('gulp-iconfont')
  , consolidate = require('gulp-consolidate');


// -----------------------------------------------------------------------------
// Iconfont
// -----------------------------------------------------------------------------

gulp.task('iconfont', function () {

  // Localisation des fichiers SVG
  gulp.src('icons/**/*.svg')

    // Appel du module générant la police d'icône
    .pipe(iconfont({

      // Nom de la police
      fontName: 'custom'

      // Calcule des dimensions du glyphe et centrage
    , centerHorizontally: true

    // Normalisation des icônes par mise à l'échelle
    // par rapport à la taille de l'icône la plus grande
    , normalize: true

    // Assigne un unicode à chaque icône pour les utiliser dans du CSS
    , appendUnicode: true
    }))

    // Appel du module générant le CSS
    .on('glyphs', function (glyphs) {

      // Localisation du template SASS
      gulp.src('scss/templates/_icons.scss')

        // Appel du moteur de template
        .pipe(consolidate('lodash', {

          // Code points présent dans la propriété CSS "content"
          glyphs: glyphs

          // Nom de la police
        , fontName: 'custom'

        // Chemin des fichiers de police
        , fontPath: '../fonts/custom/'

        // Nom de la classe principale, commune à tous les icônes
        , className: 'icon'
        }))

        // Destination du fichier SASS qui sera ensuite générer en CSS
        .pipe(gulp.dest('scss'));
    })

    // Destination des fichiers de police
    .pipe(gulp.dest('fonts/custom'));
});


// -----------------------------------------------------------------------------
// Compilation SASS
// -----------------------------------------------------------------------------

gulp.task('sass', function () {

  // Localisation des fichiers SASS
  gulp.src('scss/**/*.scss')

    // Exécution de SASS pour compilation
    .pipe(sass({
      indentWidth: 4
    , outputStyle: 'expanded'
    }))

    // Destination des fichiers CSS
    .pipe(gulp.dest('css'));
});


// -----------------------------------------------------------------------------
// Default
// -----------------------------------------------------------------------------

gulp.task('default', ['sass'], function () {

  // Génération des fichiers CSS à chaque modification des fichiers SASS
  gulp.watch('scss/**/*.scss', ['sass']);
});

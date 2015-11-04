module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'nggettext_extract': {
      pot: {
        files: {
          'po/template.pot': ['../client/templates/*.html',
                              'langkeys.js']
        }
      },
    },
        'nggettext_compile': {
            all: {
                files: {
                    '../lib/translations.js': ['po/*.po']
                }
            }
        },
    });

  grunt.loadNpmTasks('grunt-angular-gettext');

  grunt.registerTask('default', ['nggettext_extract']);
  grunt.registerTask('extract', ['nggettext_extract']);
  grunt.registerTask('compile', ['nggettext_compile']);
};

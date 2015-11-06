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
                options: {
                    module: 'Metis'
                },
                files: {
                    '../client/scripts/lib/translations.js': ['po/*.po']
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-angular-gettext');

    grunt.registerTask('default', ['nggettext_extract', 'nggettext_compile']);
    grunt.registerTask('extract', ['nggettext_extract']);
    grunt.registerTask('compile', ['nggettext_compile']);
};

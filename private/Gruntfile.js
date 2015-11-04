module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nggettext_extract: {
      pot: {
        files: {
          'po/template.pot': ['../client/templates/*.html']
        }
      },
    },
  })

  grunt.loadNpmTasks('grunt-angular-gettext');

  grunt.registerTask('default', ['nggettext_extract']);

};

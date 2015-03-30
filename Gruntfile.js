module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsbeautifier : {
    	"default": {
    		src : ["wgaPipeline_jasmine/src/*.js"],
    		options : {
    			js: {
    				indent_with_tabs: true
    			}
    		}
    	},
    	"verify": {
    		src : ["wgaPipeline_jasmine/src/*.js"],
    		options : {
    			mode: "VERIFY_ONLY",
    			js: {
    				indent_with_tabs: true
    			}
    		}

    	},
    },
    jasmine: {
      components: {
        src: [
          'wgaPipeline_jasmine/src/*.js'
        ],
        options: {
	  '--local-to-remote-url-access' : true,
          specs: [
	    'wgaPipeline_jasmine/spec/testing_loadKaryo.js',
	    'wgaPipeline_jasmine/spec/testing_karyoToCoords.js',
	    'wgaPipeline_jasmine/spec/testing_loadLinks.js',
	    'wgaPipeline_jasmine/spec/testing_LinksToCoords.js',
	    'wgaPipeline_jasmine/spec/testing_getRibbon.js',
	    'wgaPipeline_jasmine/spec/testing_svgElements.js',
	  ],
	  vendor: [
	    'wgaPipeline_jasmine/js/jquery.min.js',
	    'wgaPipeline_jasmine/js/d3.v3.min.js'
	  ],
	  template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'wgaPipeline_jasmine/coverage/coverage.json',
            report: 'wgaPipeline_jasmine/coverage',
            thresholds: {
              lines: 75,
              statements: 75,
              branches: 75,
              functions: 90
            }
          },
          //keepRunner : true
          //helpers: 'test/spec/*.js'
        }
      }
    },
    jshint: {
      options: {
	globals: {
          jQuery: true
	}
      },
      all: ['Gruntfile.js', 'wgaPipeline_jasmine/src/*.js', 'wgaPipeline_jasmine/js/wgaPipeline_circular.js']
    },
    coverage: {
      default: {
        options: {
          thresholds: {
            'statements': 90,
            'branches': 90,
            'lines': 90,
            'functions': 90
          },
          dir: 'coverage',
          root: 'wgaPipeline_jasmine'
        }
      }
    }
  });

  // Load the plugin that provides the "jasmine" task.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-istanbul-coverage');

  // Default task(s).
  grunt.registerTask('default', ['jshint','jasmine']);

  grunt.registerTask('travis', ['jshint','jasmine']);

};



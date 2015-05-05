module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		clean: {
			dev: {
				src: 'build/'
			}
		},
		copy: {
			dev: {
				expand:true,
				cwd: 'app/',
				src: ['*.html','css/*.css','views/**/*.html','images/*/*.*','assets/*.*'],
				dest: 'build/',
				filter: 'isFile'
			}
		},

		browserify: {
			dev: {
				options: {
				  transform: ['debowerify'],
				  debug: true
				},
				src: ['app/js/**/*.js'],
				dest: 'build/bundle.js'
			},
			angulartest: {
				options: {
					transform: ['debowerify'],
					debug: true
				},
			src: ['test/mocha/unit-client/*.js'],
			dest: 'test/angular-testbundle.js'
			}
		},

		//automatically restarts the app if nodemon detects changes to files
        nodemon: {
	      dev: {
	        script: 'server.js',
	        options: {
	          watch: ['server.js','routes/*.*']
	        }
	      }
	    },

		watch: {
		  	angulartest: {
				files: ['app/js/**/*.js', 'app/index.html', 'app/views/**/*.html'],
				tasks: ['browserify:angulartest'],
				options: {
			  		spawn:false
				}
		  	},
			express: {
				files: ['app/js/**/*.js', 'models/*.*', 'app/index.html', 'app/views/**/*.html', 'app/css/*.css', 'app/views/**/*.html', 'server.js', 'models/*.js'],
				tasks: ['build'],
				options: {
			  		spawn: false
				}
			  },
			servertest: {
			  	files: ['app/routes/**/*.js', 'test/mocha/server-tests/*.js'],
			  	tasks: ['mochaTest'],

			  }
			},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

    protractor: {
        options: {
            keepAlive: false,
            configFile: "protractor.conf.js"
        },
        run: {}
    },

     saucelabs: {
        options: {
          args: {
            sauceUser: process.env.SAUCE_USERNAME,
            sauceKey: process.env.SAUCE_ACCESS_KEY
          }
        }
    },

    shell: {
      protractor_update: {
        command: 'node_modules/protractor/bin/webdriver-manager update'
      }
    },

    mochaTest: {
    	test: {
    		options: {
    			reporter: 'spec',
    		},
    	src: ['test/**/*.js']
    	}
    },

		concurrent: {
	     	start: {
	        	tasks: ['nodemon:dev', 'watch:express','watch:servertest','watch:angulartest'],
        		options: {
	          		logConcurrentOutput: true
	        	}
	      	}
	    },
	});

	grunt.registerTask('test',['browserify:angulartest', 'karma:unit','protractor:run']);
    grunt.registerTask('travis',['bower:install','karma:unit','shell:protractor_update','protractor:saucelabs']);
	grunt.registerTask('build',['clean:dev','browserify:dev', 'copy:dev']);
	grunt.registerTask('default', ['build','concurrent:start']);

};

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
				configFile: "node_modules/protractor/referenceConf.js", //node_modules/protractor/referenceConf.js"
				keepAlive: true,
				noColor: false,
				args: {
					//args passed to the command if any
				}
			},
			run: {
				options: {
					configFile: 'e2e.conf.js',
					args: {}
				}
			}
		},

		protractor_webdriver: {
			options: {
				path: 'node_modules/protractor/bin/webdriver-manager',
				command: 'webdriver-manager start'
			},
			run: {},
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
	grunt.registerTask('build',['clean:dev','browserify:dev', 'copy:dev']);
	grunt.registerTask('default', ['build','concurrent:start']); 
};
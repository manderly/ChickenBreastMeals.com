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
			src: ['test/**/*.js'],
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

		karma: {
		  unit: {
				configFile: 'karma.conf.js',
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
		test: {
		  	files: ['test/**/*.js'],
		  	tasks: ['mochaTest'],
		  	
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
	        	tasks: ['nodemon:dev', 'watch:express','watch:test'],
        		options: {
	          		logConcurrentOutput: true
	        	}
	      	}
	    },
	});

	grunt.registerTask('build',['clean:dev','browserify:dev', 'copy:dev'])
	grunt.registerTask('default', ['build','concurrent:start']); 
};
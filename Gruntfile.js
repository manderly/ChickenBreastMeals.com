module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');

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
			src: ['test/**/*test.js'],
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
		  }
		},

		concurrent: {
	      dev: {
	        tasks: ['nodemon:dev', 'watch:express'],
	        options: {
	          logConcurrentOutput: true
	        }
	      }
	    },
	});

	grunt.registerTask('build',['clean:dev','browserify:dev', 'copy:dev']);
	grunt.registerTask('test', ['browserify:angulartest','karma:unit']);
	grunt.registerTask('serve', ['concurrent:dev']);
	grunt.registerTask('default',['build','serve']); //'test'
};
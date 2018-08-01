// GRUNT
module.exports = function(grunt) {

	// DIRECTORY: development
	var dev	= {
		root: './src',
		sass: '/sass',
		css: '/css',
		vendors: '/vendors'
	};

	// DIRECTORY: production
	var dist = {
		root: './dist',
		css: '/css'
	};

	// initial config
	grunt.initConfig({

		// load package
		pkg: grunt.file.readJSON('package.json'),

		// compile, convert & compress sass
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: dev.root+dev.sass,
					src: ['*.scss'],
					dest: dev.root+dev.css,
					ext: '.dev.css'
				}]
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: dev.root+dev.sass,
					src: ['*.scss'],
					dest: dist.root+dist.css,
					ext: '.min.css'
				}]
			}
		},

		// watcher
		watch: {
			css: {
				files: [dev.root+dev.sass + '/**/*.scss'],
				tasks: ['sass:dev']
			}
		}

	});

	// load plugins
	require('load-grunt-tasks')(grunt);

	// register tasks
	grunt.registerTask('default', [
		'sass:dev',
		'watch'
	]);

	// package project for distribution
	grunt.registerTask('package', [
		'sass:dist'
	]);

};
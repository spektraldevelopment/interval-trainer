module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({
        //Change path based on your requirements
        buildPath: '/boylerplate/build/',
        pkg: grunt.file.readJSON("package.json"),
        dot: true,
        copy: {
            build: {
                cwd: "src",
                src: ["**"],
                dest: "build",
                expand: true
            },
            release: {
                cwd: "build",
                src: ["**"],
                dest: "release",
                expand: true
            },
            root: {
                cwd: "",
                src: ["**"],
                dest: "../../",
                expand: true
            }
        },
        clean: {
            build: {
                src: ["build"]
            },
            scripts: {
                src: ["build/js/*.js", "!build/js/main.min.js"]
                //You can add multiple ignore files
                //"build/*.js", "!build/NodeMaker-min.js", "!build/Files.js"
            },
            sass: {
                src: ["build/css/*.scss"]
            },
            bower: {
                src: ["bower_components", "bower.json", "README.md"]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true
                },
                files: {
                    "build/js/main.min.js": ["build/js/main.js"]
                }
            }
        },
        watch: {
            build: {
                files: ["src/**"],
                tasks: ["build"],
                options: { livereload: true }
            },
            specs: {
                files: ["spec/**"],
                tasks: ["jasmine"],
                options: { livereload: true }
            }
        },
        connect: {
            //Use if you don't already have a localhost setup
            server: {
                options: {
                    port: 9001,
                    base: 'www-root'
                }
            }
        },
        jasmine: {
            pivotal: {
                src: "path-to-file",
                options: {
                    specs: "path-to-specs",
                    outfile: "SpecRunner.html",
                    keepRunner: true
                }
            }
        },
        notify: {
            reload: {
                options: {
                    title: 'Live Reload',
                    message: 'Changes made'
                }
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'build/css/main.css': 'src/css/main.scss'
                }
            }
        },
        open : {
            dev : {
                path: 'http://localhost<%= buildPath %>',
                app: 'Google Chrome'
            }
        },
        htmlbuild: {
            dist: {
                src: 'build/index.html',
                dest: 'release/',
                options: {
                    beautify: true
                }
            }
        },
        shell: {
            list: {
                command: 'ls'
            },
            runclean: {
                command: 'grunt clean-bower'
            },
            ignore: {
                command: 'touch .gitignore'
            }
        }
    });

    //EVENTS
     grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    //LOAD TASKS
    //Copies files from source folder to build folder - command: grunt copy
    grunt.loadNpmTasks("grunt-contrib-copy");
    //Wipes the build folder clean of files - command: grunt clean
    grunt.loadNpmTasks("grunt-contrib-clean");
    //Minifies files - command: grunt uglify
    grunt.loadNpmTasks("grunt-contrib-uglify");
    //Watch files for changes - command: grunt watch
    grunt.loadNpmTasks("grunt-contrib-watch");
    //Development server - command: grunt connect
    grunt.loadNpmTasks("grunt-contrib-connect");
    //Unit testing framework
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //Sass compiler
    grunt.loadNpmTasks('grunt-contrib-sass');
    //Desktop notifier
    grunt.loadNpmTasks('grunt-notify');
    //Open
    grunt.loadNpmTasks('grunt-open');
    //HTML build
    grunt.loadNpmTasks('grunt-html-build');
    //Shell
    grunt.loadNpmTasks('grunt-shell');

    //REGISTER TASKS

    //Jasmine
    grunt.registerTask("test", ["jasmine"]);

    //Scripts
    grunt.registerTask(
        "scripts", 
        "Uglifies and copies the Javascript files.", 
        ["uglify", "clean:scripts"]
    );

    //Sass
    grunt.registerTask(
        "compass",
        "Compiles sass file to css.",
        ["sass", "clean:sass"]
    );

    //Build
    grunt.registerTask(
        "build-and-test", 
        "Compiles all of the assets and copies the files to the build directory.",
        ["clean:build", "copy:build", "scripts", "compass", "jasmine"]
    );

    //Build and Test
    grunt.registerTask(
        "build",
        "Compiles all of the assets and copies the files to the build directory.",
        ["clean:build", "copy:build", "scripts", "compass"]
    );

    //Build and release
    grunt.registerTask(
        "build-release",
        "Build the project and then creates a release version.",
        ["build", "release"]
    );

    //Release
    grunt.registerTask(
        "release",
        "Copies all files from build directory and removes any development related code, to make the files ready for release.",
        ["copy:release", "htmlbuild"]
    );

    //Root
    grunt.registerTask(
        "root",
        "Moves boylerplate from bower_components directory to root directory of project.",
        ["copy:root"]
    );

    //Clean bower
    grunt.registerTask(
        "clean-bower",
        "Cleans bower_components directory.",
        ["clean:bower"]
    );

    grunt.registerTask(
        "ignore",
        "Creates gitignore file.",
        ["shell:ignore"]
    );

    //Default - command: grunt default
    grunt.registerTask(
        "default", 
        "Watches the project for changes, automatically builds them and runs a server.", 
        ["build", "open", "watch"]
    );
};
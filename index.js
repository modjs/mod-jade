var path = require('path');

exports.summary = 'Compile Jade files to HTML';

exports.usage = '<src> [options]';

exports.options = {
    "dest" : {
        alias : 'd'
        ,describe : 'output the compiled html to <dest>'
    },

    "filename": {
        describe: "filename used to resolve includes"
    },

    "pretty": {
        default: false
        ,describe: "Add pretty-indentation whitespace to output"
    },

    "locals": {
        describe: "Local variable object"
    },

    "client": {
        default: false,
        describe: "Compile to JS template functions for client-side use rather than directly to HTML."
    },

    "compileDebug": {
        default: true,
        describe: "Add Jade debug instructions to generated JS templates."
    },

    "charset" : {
        alias : 'c'
        ,default : 'utf-8'
        ,describe : 'file encoding type'
    }
};

exports.run = function (options) {
    var src = options.src;
    var dest = options.dest;

    exports.files.forEach(function(inputFile){
        var outputFile = dest;
        if(exports.file.isDirFormat(dest)){
            outputFile = path.join(dest , path.basename(inputFile) );
            // replace file extname to .html
            var extname = options.client ? ".js" : ".html";
            outputFile = outputFile.replace('.jade', extname);
        }

        exports.compileJade(inputFile, outputFile, options);
    });
};

exports.compileJade = function(inputFile, outputFile, options){
    var jade = require('jade');
    // Compile a function
    var code = exports.file.read(inputFile);
    var compiled = jade.compile(code, options);
    var output = compiled();
    exports.file.write(outputFile, output);
    exports.log(inputFile, '>', outputFile);
};

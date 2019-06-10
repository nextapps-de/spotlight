const child_process = require('child_process');
const fs = require('fs');

console.log("Start build .....");

fs.existsSync("log") || fs.mkdirSync("log");
fs.existsSync("tmp") || fs.mkdirSync("tmp");

console.log();

/*
const options = (function(argv){

    const arr = {};
    let count = 0;

    argv.forEach(function(val, index) {

        if(++count > 2){

            index = val.split('=');
            val = index[1];
            index = index[0];

            arr[index] = val;

            if(count > 3) console.log(index + ': ' + val);
        }
    });

    return arr;

})(process.argv);
*/

const bundle = process.argv[2] === "--bundle";

const parameter = (function(opt){

    let parameter = '';

    for(let index in opt){

        if(opt.hasOwnProperty(index)){

            parameter += ' --' + index + '=' + opt[index];
        }
    }

    return parameter;
})({

    compilation_level: "ADVANCED_OPTIMIZATIONS", //"WHITESPACE"
    use_types_for_optimization: true,
    //new_type_inf: true,
    jscomp_warning: "newCheckTypes",
    //jscomp_error: "strictCheckTypes",
    jscomp_error: "newCheckTypesExtraChecks",
    generate_exports: true,
    export_local_property_definitions: true,
    language_in: "ECMASCRIPT6_STRICT",
    language_out: "ECMASCRIPT5_STRICT",
    process_closure_primitives: true,
    summary_detail_level: 3,
    warning_level: "VERBOSE",
    emit_use_strict: true,

    output_manifest: "log/manifest.log",
    output_module_dependencies: "log/module_dependencies.log",
    property_renaming_report: "log/renaming_report.log",

    transform_amd_modules: true,
    process_common_js_modules: true,
    js_module_root: "node_modules/",
    module_resolution: "BROWSER",

    output_wrapper: "(function(){%output%}());"

    //formatting: "PRETTY_PRINT"
});

exec("java -jar node_modules/google-closure-compiler-java/compiler.jar" + parameter + " --js='tmp/**.js' --js='src/js/**.js' --define='DEBUG=false' --define='BUILD_BUNDLE=" + (bundle ? "true" : "false") + "' --js_output_file='" + (bundle ? "dist/spotlight.bundle.js" : "dist/js/spotlight.min.js") + "' && exit 0", function(){

    // let build = fs.readFileSync("public/js/build.js") +
    //             fs.readFileSync("src/js/lib/inferno.min.js") +
    //             fs.readFileSync("src/js/lib/inferno-dom.min.js");
    //
    // fs.writeFileSync("public/js/build.js", build);

    console.log("Build Complete.");
});

function exec(prompt, callback){

    const child = child_process.exec(prompt, function(err, stdout, stderr){

        if(err){

            console.error(err);
        }
        else{

            if(callback){

                callback();
            }
        }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}

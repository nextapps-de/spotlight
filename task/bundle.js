const { base64Sync } = require('base64-img');
const { writeFileSync, readFileSync } = require('fs');

const image = process.argv[2] === "--image";
const template = process.argv[2] === "--template";
const style = process.argv[2] === "--style";

(function(){

    if(image){

        // TODO provide custom filenames

        const compressed = {

            preloader: base64Sync('src/img/preloader.svg'),
            pixel: base64Sync('src/img/pixel.gif'),
            arrow: base64Sync('src/img/arrow.svg'),
            close: base64Sync('src/img/close.svg'),
            maximize: base64Sync('src/img/maximize.svg'),
            minimize: base64Sync('src/img/minimize.svg'),
            autofit: base64Sync('src/img/autofit.svg'),
            zoomin: base64Sync('src/img/zoom-in.svg'),
            zoomout: base64Sync('src/img/zoom-out.svg'),
            theme: base64Sync('src/img/theme.svg'),
            play: base64Sync('src/img/play.svg'),
            pause: base64Sync('src/img/pause.svg')
        };

        let tmp = "";

        for(let key in compressed){

            if(compressed.hasOwnProperty(key)){

                tmp += ("@" + key + ": \"" + compressed[key] + "\";\n");
            }
        }

        writeFileSync("tmp/images.less", tmp);
    }

    // ----------------------

    if(template){

        writeFileSync("tmp/template.js", readFileSync("src/js/template.js", "utf8").replace(/>\s+</g, "><"));
    }

    // ----------------------

    if(style){

        writeFileSync("tmp/style.js", "export default '" + readFileSync("tmp/spotlight.css", "utf8") + "'");
    }

})();

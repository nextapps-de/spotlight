const { base64Sync } = require('base64-img');
const { writeFileSync, readFileSync } = require('fs');

(function(){

    // TODO provide custom filenames

    const compressed = {

        preloader: base64Sync('src/img/preloader.svg'),
        pixel: base64Sync('src/img/pixel.gif'),
        arrow: base64Sync('src/img/arrow.svg'),
        close: base64Sync('src/img/close.svg'),
        maximize: base64Sync('src/img/maximize.svg'),
        minimize: base64Sync('src/img/minimize.svg'),
        original: base64Sync('src/img/original.svg'),
        zoomin: base64Sync('src/img/zoom-in.svg'),
        zoomout: base64Sync('src/img/zoom-out.svg'),
        contrast: base64Sync('src/img/contrast.svg')
    };

    let tmp = "";

    for(let key in compressed){

        if(compressed.hasOwnProperty(key)){

            tmp += ("    " + key + ": \"" + compressed[key] + "\",\n");
        }
    }

    writeFileSync("tmp/images.js", "export default {\n" + tmp.substring(0, tmp.length - 2) + "\n}");

    // ----------------------

    writeFileSync("tmp/template.js", readFileSync("src/js/template.js", "utf8").replace("../../tmp/images.js", "./images.js").replace(/>\s+</g, "><"));

    // ----------------------

    writeFileSync("tmp/style.js", "export default '" + readFileSync("src/css/spotlight.css", "utf8") + "'");

})();

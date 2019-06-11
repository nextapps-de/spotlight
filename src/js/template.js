import images_base64 from "../../tmp/images.js";

const image_maximize = BUILD_BUNDLE ? images_base64.maximize : "img/maximize.svg";
const image_arrow = BUILD_BUNDLE ? images_base64.arrow : "img/arrow.svg";
const image_close = BUILD_BUNDLE ? images_base64.close : "img/close.svg";
const image_zoom_in = BUILD_BUNDLE ? images_base64.zoomin : "img/zoom-in.svg";
const image_zoom_out = BUILD_BUNDLE ? images_base64.zoomout : "img/zoom-out.svg";
const image_original = BUILD_BUNDLE ? images_base64.original : "img/original.svg";
const image_contrast = BUILD_BUNDLE ? images_base64.contrast : "img/contrast.svg";

// https://kangax.github.io/html-minifier/

export default (

    `<div class=scene>
        <div class=pane>
            <img src>
        </div>
    </div>
    <table class=header>
        <tr>
            <td class=page>
            <td class=title>
            <td class=toggle-fullscreen>
                <img src='${image_maximize}'>
            <td class=toggle-zoom>
                <img src='${image_original}'>
            <td class=zoom-out>
                <img src='${image_zoom_out}'>
            <td class=zoom-in>
                <img src='${image_zoom_in}'>
            <td class=toggle-contrast>
                <img src='${image_contrast}'>
            <td class=close-gallery>
                <img src='${image_close}'>
    </table>
    <div class=arrow-left>
        <img src='${image_arrow}'>
    </div>
    <div class=arrow-right>
        <img src='${image_arrow}'>
    </div>`
);

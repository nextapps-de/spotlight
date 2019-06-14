"use strict";

import images_base64 from "../../tmp/images.js";

const filename = USE_EXTERNAL_ASSETS ? EXTERNAL_URL + "img/" : "img/";
const image_preloader = BUILD_BUNDLE ? images_base64.preloader : filename + "preloader.svg";
const image_maximize = BUILD_BUNDLE ? images_base64.maximize : filename + "maximize.svg";
const image_minimize = BUILD_BUNDLE ? images_base64.minimize : filename + "minimize.svg";
const image_arrow = BUILD_BUNDLE ? images_base64.arrow : filename + "arrow.svg";
const image_close = BUILD_BUNDLE ? images_base64.close : filename + "close.svg";
const image_zoom_in = BUILD_BUNDLE ? images_base64.zoomin : filename + "zoom-in.svg";
const image_zoom_out = BUILD_BUNDLE ? images_base64.zoomout : filename + "zoom-out.svg";
const image_autofit = BUILD_BUNDLE ? images_base64.autofit : filename + "autofit.svg";
const image_theme = BUILD_BUNDLE ? images_base64.theme : filename + "theme.svg";

// https://kangax.github.io/html-minifier/

export default (

   `<div class=preloader style="background-image:url(${image_preloader})"></div>
    <div class=scene>
        <div class=pane></div>
    </div>
    <table class=header>
        <tr>
            <td class=page>
            <td style="width:90%">
            <td class=fullscreen>
                <img src="${image_maximize}">
                <img src="${image_minimize}">
            <td class=autofit>
                <img src="${image_autofit}">
            <td class=zoom-out>
                <img src="${image_zoom_out}">
            <td class=zoom-in>
                <img src="${image_zoom_in}">
            <td class=theme>
                <img src="${image_theme}">
            <td class=close>
                <img src="${image_close}">
    </table>
    <div class="arrow arrow-left">
        <img src="${image_arrow}">
    </div>
    <div class="arrow arrow-right">
        <img src="${image_arrow}">
    </div>
    <table class=footer>
        <tr>
            <td class=title>
        <tr>
            <td class=description>
    </table>`
);

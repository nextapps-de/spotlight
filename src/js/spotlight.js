/**!
 * @preserve Spotlight.js v0.0.5
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Released under the Apache 2.0 Licence
 * https://github.com/nextapps-de/spotlight
 */

"use strict";

import "./config.js";
import { addClass, removeClass, setStyle, getByClass, getByTag } from "./dom.js";
import images_base64 from "../../tmp/images.js";
import stylesheet from "../../tmp/style.js";
import template from "../../tmp/template.js";

const transparent_pixel = BUILD_BUNDLE ? images_base64.pixel : "img/pixel.gif";
const image_maximize = BUILD_BUNDLE ? images_base64.maximize : "img/maximize.svg";
const image_minimize = BUILD_BUNDLE ? images_base64.minimize : "img/minimize.svg";

if(BUILD_BUNDLE){

    const style = document.createElement("style");
    style.innerHTML = stylesheet;
    getByTag("head")[0].appendChild(style);
}

const controls = [

    "contrast",
    "fullscreen",
    "reset",
    "minimize",
    "maximize",
    "page",
    "title",
    "description"
];

let timer = null;
let is_down = false;
let changed = false;
let toggle = false;
let swipe = false;
let dragged = false;
let bodyW;
let bodyH;
let startX;
let startY;
let imageW;
let imageH;
let x = 0;
let y = 0;
let zoom = 1;
let hide = null;
let maxHeight;
let slider;
let panel;
let panes;
let image;
let target;
let current_slide;
let slide_count;
let options;

/**
 * @this {Element}
 */

function dispatch(event){

    const self = event.target.closest('.spotlight');

    if(!self){

        return;
    }

    const context = self.closest(".spotlight-group");
    const anchors = getByClass("spotlight", context);

    apply_options(context, self);

    // determine index

    for(let i = 0; i < anchors.length; i++){

        if(anchors[i] === self){

            slide_count = anchors.length;

            if(slide_count){

                panes = getByClass("pane", target);
                const length = panes.length;

                for(let a = 0; a < slide_count; a++){

                    let image;

                    if(a < length){

                        image = panes[a].firstElementChild;
                        image.dataset.src = anchors[a].href;
                        image.loaded = false;
                    }
                    else{

                        const clone = panes[0].cloneNode(true);

                        image = clone.firstElementChild;
                        image.dataset.src = anchors[a].href;
                        image.loaded = false;
                        setStyle(clone, "left", (a * 100) + "%");
                        panes[0].parentNode.appendChild(clone);
                    }
                }

                prepare_animated_style(slider, "transform", "translateX(-" + (((i || 1) - 1) * 100) + "%)");

                init_slide(i || 1);
                paginate();
            }

            break;
        }
    }

    show_gallery();

    return clear(event);
}

function apply_options(group, anchor){

    options = {};
    group && object_assign(options, group.dataset);
    object_assign(options, anchor.dataset);

    if(options["control"]){

        const whitelist = options["control"].split(",");

        for(let i = 0; i < controls.length; i++){

            options[controls[i]] = "false";
        }

        for(let i = 0; i < whitelist.length; i++){

            options[whitelist[i].trim()] = "true";
        }
    }

    setup_controls();
}

function object_assign(target, source){

    const keys = Object.keys(source);

    for(let i = 0; i < keys.length; i++){

        const key = keys[i];

        target[key] = source[key];
    }

    return target;
}

function setup_controls(){

    for(let i = 0; i < controls.length; i++){

        const option = controls[i];

        setStyle(getByClass(option, target)[0], "display", options[option] === "false" ? "none" : "table-cell");
    }
}

function init_slide(index){

    panel = panes[index - 1];
    image = /** @type {Image} */ (panel.firstElementChild);
    current_slide = index;

    if(!image.loaded){

        addClass(target, "loading");

        (function(image){

            let buffer = new Image();

            buffer.onload = /** @this {Image} */ function(){

                //image.width = buffer.width;
                //image.height = buffer.height;
                image.src = buffer.src;

                removeClass(target, "loading");

                setStyle(image, {

                    "opacity": 1,
                    "transform": ""
                });

                buffer.onload = null;
                buffer = null;
                image = null;
            };

            buffer.onerror = /** @this {Image} */ function(){

                image.loaded = false;

                buffer.onload = null;
                buffer = null;
                image = null;
            };

            buffer.src = image.dataset["src"];

        }(image));

        image.loaded = true;
    }
    else{

        image.src = image.dataset["src"];

        setStyle(image, {

            "opacity": 1,
            "transform": ""
        });
    }
}

add_listener(document, "DOMContentLoaded", function(){

    target = document.createElement("div");
    target.id = "spotlight";
    target.innerHTML = template;

    document.body.appendChild(target);

    document["cancelFullScreen"] || (document["cancelFullScreen"] = (

        document["exitFullscreen"] ||
        document["webkitCancelFullScreen"] ||
        document["webkitExitFullscreen"] ||
        document["mozCancelFullScreen"] ||
        function(){}
    ));

    const doc = document.documentElement || document.body;

    doc["requestFullScreen"] || (doc["requestFullScreen"] = (

        doc["webkitRequestFullScreen"] ||
        doc["msRequestFullScreen"] ||
        doc["mozRequestFullScreen"] ||
        setStyle("#spotlight .fullscreen", "display", "none") ||
        function(){}
    ));

    slider = getByClass("scene", target)[0];

    add_listener(slider, "mousedown", start);
    add_listener(slider, "mouseleave", end);
    add_listener(slider, "mouseup", end);
    add_listener(slider, "mousemove", move);

    add_listener(slider, "touchstart", start, {"passive": true});
    add_listener(slider, "touchcancel", end);
    add_listener(slider, "touchend", end);
    add_listener(slider, "touchmove", move, {"passive": true});

    add_listener(getByClass("fullscreen", target)[0],"", toggle_fullscreen);
    add_listener(getByClass("reset", target)[0],"", zoom_reset);
    add_listener(getByClass("maximize", target)[0],"", zoom_in);
    add_listener(getByClass("minimize", target)[0],"", zoom_out);
    add_listener(getByClass("close", target)[0],"", close_gallery);
    add_listener(getByClass("arrow-left", target)[0], "", arrow_left);
    add_listener(getByClass("arrow-right", target)[0], "", arrow_right);
    add_listener(getByClass("contrast", target)[0], "", toggle_contrast);

    add_listener(window, "", dispatch);
});

/**
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {!AddEventListenerOptions|boolean=} mode
 */

function add_listener(node, event, fn, mode){

    node.addEventListener(event || "click", fn, typeof mode === "undefined" ? true : mode);
}

let tmp = 0;

/**
 * @param node
 * @param style
 * @param {string|number=} value
 */

function prepare_animated_style(node, style, value){

    setStyle(node, "transition", "none");
    setStyle(node, style, value);

    // force styles (quick-fix for closure compiler):
    tmp || (tmp = node.clientTop && 0);

    setStyle(node, "transition", "");
}

function autohide(){

    if(hide){

        clearTimeout(hide);
    }
    else{

        addClass(target, "menu");
    }

    if(options["autohide"] !== "false") {

        hide = setTimeout(function(){

            removeClass(target, "menu");
            hide = null;

        }, 2000);
    }
    else{

        hide = 1;
    }
}

function click(e){

    if(hide){

        hide = clearTimeout(hide);
        removeClass(target, "menu");
    }
    else{

        autohide();
    }

    return clear(e);
}

function start(e){

    const touch = pointer(e);

    bodyW = document.body.clientWidth;
    bodyH = document.body.clientHeight;
    imageW = image.width * zoom;
    imageH = image.height * zoom;
    swipe = imageW <= bodyW;
    is_down = true;
    dragged = false;
    startX = touch.x;
    startY = touch.y;

    return clear(e, true);
}

function end(e){

    is_down = false;

    if(!dragged){

        return click(e);
    }
    else if(swipe){

        const scene = getByClass("scene", target)[0];

        prepare_animated_style(scene, "transform", "translateX(" + (-((current_slide - 1) * 100 - (x / bodyW * 100))) + "%)");

        if((x < -(bodyH / 5)) && arrow_right()){


        }
        else if((x > bodyH / 5) && arrow_left()){


        }
        else{

            setStyle(scene, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
        }

        x = 0;
        swipe = false;

        setStyle(panel, "transform", "");
    }

    return clear(e);
}

function move(e){

    if(is_down){

        timer || request();

        const touch = pointer(e);
        const diff = (imageW - (imageW / zoom)) / 2;

        dragged = true;
        swipe = imageW <= bodyW;

        x -= startX - (startX = touch.x);

        if(!swipe){

            if(x > diff){

                x = diff;
            }
            else if((bodyW - x - imageW + diff) > 0){

                x = bodyW - imageW + diff;
            }
            else{

                changed = true;
            }
        }
        else{

            changed = true;
        }

        if(imageH > bodyH){

            // TODO: solve this by computation
            const diff = maxHeight === "none" ? (imageH - (imageH / zoom)) / 2 : (imageH - bodyH) / 2;

            y -= startY - (startY = touch.y);

            if(y > diff){

                y = diff;
            }
            else if((bodyH - y - imageH + diff) > 0){

                y = bodyH - imageH + diff;
            }
            else{

                changed = true;
            }
        }
    }
    else{

        autohide();
    }

    return clear(e, true);
}

function pointer(event){

    let touches = event.touches;

    if(touches){

        touches = touches[0];
    }

    return {

        x: touches ? touches["clientX"] : event["pageX"],
        y: touches ? touches["clientY"] : event["pageY"]
    };
}

function update(){

    if(changed){

        request();

        setStyle(panel, "transform", "translate(" + x + "px, " + y + "px)");
    }
    else{

        timer = null;
    }

    changed = false;
}

function request(){

    timer = requestAnimationFrame(update);
}

/** @this {Element} */

export function toggle_fullscreen(){

    if(toggle_fullscreen_mode()){

        this.firstElementChild.src = image_minimize;
    }
    else{

        this.firstElementChild.src = image_maximize;
    }
}

export function zoom_reset(){

    //const body = document.body;
    //const image = getNode("#spotlight .scene img");

    //x = (body.clientWidth - image.naturalWidth) / 2;
    //y = (body.clientHeight - image.naturalHeight) / 2;

    x = 0;
    y = 0;

    toggle = (zoom === 1) && !toggle;

    setStyle(image, {

        "maxHeight": maxHeight = (toggle ? "none" : ""),
        "maxWidth": toggle ? "none" : "",
        "transform": ""
    });

    //panel.style.transform = toggle ? "translate(" + ((x + 0.5) | 0) + "px, " + ((y + 0.5) | 0) + "px)" : "";

    zoom = 1;
}

export function zoom_in(){

    zoom_to(zoom /= 0.65);
}

export function zoom_to(factor){

    setStyle(image, "transform", "translate(-50%, -50%) scale(" + factor + ")");
    autohide();
}

export function zoom_out(){

    if(zoom > 1){

        //TODO: keep center

        zoom *= 0.65;

        if(maxHeight === "none"){

            const body = document.body;

            x = (body.clientWidth - image.naturalWidth) / 2;
            y = (body.clientHeight - image.naturalHeight) / 2;
        }
        else{

            x = 0;
            y = 0;
        }

        zoom_to(zoom);

        //getNode("#spotlight .scene div").style.transform = "translate(" + x + "px, " + y + "px)";
    }

    autohide();
}

/**
 * @param {Object=} config
 */

export function show_gallery(config){

    if(config) apply_options(null, {"dataset": config});

    addClass(target,"show");
    autohide();
}

export function close_gallery(){

    removeClass(target,"show");

    const images = getByTag("img", getByClass("scene", target)[0])[0];

    for(let i = 0; i < images.length; i++){

        images[i].src = transparent_pixel;
        images[i].loaded = false;
    }

    panel = null;
    image = null;
}

export function arrow_left(){

    autohide();

    if(current_slide > 1){

        current_slide--;
        paginate(false);

        return true;
    }
}

export function arrow_right(){

    autohide();

    if(current_slide < slide_count){

        current_slide++;
        paginate(true);

        return true;
    }
}

export function goto_slide(slide){

    if(slide !== current_slide){

        autohide();

        const dir = slide > current_slide;

        current_slide = slide;
        paginate(dir);

        return true;
    }
}

let contrast = false;

export function toggle_contrast(){

    autohide();

    if((contrast = !contrast)){

        addClass(target, "white");
    }
    else{

        removeClass(target, "white");
    }
}

/**
 * @param {boolean=} direction
 */

function paginate(direction){

    x = 0;
    y = 0;
    zoom = 1;

    const animation = {};
    const option = options["animation"];

    let animation_scale = true;
    let animation_fade = true;
    let animation_slide = true;
    let animation_rotate = false;

    if(typeof option !== "undefined"){

        animation_scale = false;
        animation_fade = false;
        animation_slide = false;
        animation_rotate = false;

        const effects = option.split(",");

        for(let i = 0; i < effects.length; i++){

            const effect = effects[i].trim();

                 if(effect === "scale") animation_scale = true;
            else if(effect === "fade") animation_fade = true;
            else if(effect === "slide") animation_slide = true;
            else if(effect === "rotate") animation_rotate = true;
        }
    }

    setStyle(slider, "transition", animation_slide ? "" : "none");
    setStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
    setStyle(panel, "transform", "");

    setStyle(image, {
        "opacity": animation_fade ? 0 : 1,
        "transform": ""
    });

    setStyle(image, animation);

    const ref = image;

    setTimeout(function(){

        if(image !== ref){

            ref.src = transparent_pixel;
        }

    }, 800);

    init_slide(current_slide);

    prepare_animated_style(image, {

        "opacity": animation_fade ? 0 : 1,
        "transform": "translate(-50%, -50%)" + (animation_scale ? " scale(0.8)" : "") + (animation_rotate && (typeof direction !== "undefined") ? " rotateY(" + (direction ? "" : "-") + "135deg)" : ""),
        "maxHeight": "",
        "maxWidth": ""
    });

    setStyle(panel, "transform", "");
    setStyle(image, {
        "opacity": 1,
        "transform": ""
    });

    setStyle(getByClass("arrow-left", target)[0], "visibility", current_slide === 1 ? "hidden" : "");
    setStyle(getByClass("arrow-right", target)[0], "visibility", current_slide === slide_count ? "hidden" : "");
    getByClass("page", target)[0].textContent = current_slide + " / " + slide_count;
}

/**
 * @param event
 * @param {boolean=} passive
 * @returns {boolean}
 */

function clear(event, passive){

    event || (event = window.event);

    if(event){

        if(!passive) event.preventDefault();
        event.stopImmediatePropagation();
        event.returnValue = false
    }

    return false;
}

/**
 * Toggle fullscreen function who work with webkit and firefox.
 * @function toggle_fullscreen
 * @param {!Object=} target
 */

function toggle_fullscreen_mode(target) {

    const doc = document.documentElement || document.body;

    const isFullscreen = (

        document["isFullScreen"] ||
        document["webkitIsFullScreen"] ||
        document["mozFullScreen"]
    );

    isFullscreen ? document["cancelFullScreen"]() : doc["requestFullScreen"]();

    return !isFullscreen;
}

window["spotlight"] = {

    "toggleContrast" : toggle_contrast,
    "toggleFullscreen": toggle_fullscreen,
    "next": arrow_right,
    "prev": arrow_left,
    "goto": goto_slide,
    "show": show_gallery,
    "hide": close_gallery,
    "zoomTo": zoom_to,
    "zoomIn": zoom_in,
    "zoomOut": zoom_out,
    "zoomReset": zoom_reset
};

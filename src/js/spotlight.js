/**!
 * @preserve Spotlight.js v0.1.0
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

if(BUILD_BUNDLE){

    const style = document.createElement("style");
    style.innerHTML = stylesheet;
    getByTag("head")[0].appendChild(style);
}

//const transparent_pixel = BUILD_BUNDLE ? images_base64.pixel : "img/pixel.gif";
const image_maximize = BUILD_BUNDLE ? images_base64.maximize : "img/maximize.svg";
const image_minimize = BUILD_BUNDLE ? images_base64.minimize : "img/minimize.svg";

const controls = [

    "theme",
    "fullscreen",
    "autofit",
    "zoom-in",
    "zoom-out",
    "page",
    "title",
    "description"
];

let x;
let y;
let startX;
let startY;
let bodyW;
let bodyH;
let imageW;
let imageH;
let maxHeight;
let zoom;

let is_down = false;
let dragged = false;
let swipe = false;
let changed = false;
let toggle = false;

let current_slide;
let slide_count;
/** @dict */
let options;

let slider;
let panel;
let panes;
let image;
let target;

let timer = null;
let hide = null;

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

            init_gallery(anchors, i + 1);
            break;
        }
    }

    show_gallery();

    return clear(event);
}

function init_gallery(anchors, index){

    if((slide_count = anchors.length)){

        panes || (panes = getByClass("pane", target));

        const length = panes.length;

        for(let i = 0; i < slide_count; i++){

            const src = anchors[i].href || anchors[i].src;

            if(i < length){

                panes[i].dataset.src = src;
            }
            else{

                const clone = panes[0].cloneNode(true);

                setStyle(clone, "left", (i * 100) + "%");
                panes[0].parentNode.appendChild(clone);
                clone.dataset.src = src;
            }
        }

        prepare_animated_style(slider, "transform", "translateX(-" + (((index || 1) - 1) * 100) + "%)");

        init_slide(index || 1);
        paginate();
    }
}

function apply_options(group, anchor){

    // merge inherited options

    options = {};
    group && object_assign(options, group.dataset);
    object_assign(options, anchor.dataset);

    // handle shorthand "zoom"

    if(typeof options["zoom"] !== "undefined"){

        options["zoom-in"] = options["zoom-out"] = options["zoom"];
        delete options["zoom"];
    }

    // determine controls

    if(typeof options["control"] !== "undefined"){

        const whitelist = options["control"].split(",");

        // prepare to false when using whitelist

        for(let i = 0; i < controls.length; i++){

            options[controls[i]] = "false";
        }

        // apply whitelist

        for(let i = 0; i < whitelist.length; i++){

            const option = whitelist[i].trim();

            // handle shorthand "zoom"

            if(option === "zoom"){

                options["zoom-in"] = options["zoom-out"] = "true";
            }
            else{

                options[option] = "true";
            }
        }
    }

    // apply controls

    for(let i = 0; i < controls.length; i++){

        const option = controls[i];

        setStyle(getByClass(option, target)[0], "display", options[option] === "false" ? "none" : "table-cell");
    }

    // apply theme

    if(options["theme"]){

        theme = (options["theme"] !== "white");
        toggle_theme();
    }
}

function object_assign(target, source){

    const keys = Object.keys(source);

    for(let i = 0; i < keys.length; i++){

        const key = keys[i];

        target[key] = "" + source[key];
    }

    return target;
}

function init_slide(index){

    panel = panes[index - 1];
    image = /** @type {Image} */ (panel.firstElementChild);
    current_slide = index;

    if(!image){

        addClass(target, "loading");

        image = new Image();

        image.onload = /** @this {Image} */ function(){

            removeClass(target, "loading");

            setStyle(image, {

                "visibility": "visible",
                "opacity": 1,
                "transform": ""
            });
        };

        image.onerror = /** @this {Image} */ function(){

            panel.removeChild(image);
        };

        image.src = panel.dataset.src;

        setStyle(image, "visibility", "hidden");

        panel.appendChild(image);
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
    add_listener(getByClass("autofit", target)[0],"", toggle_autofit);
    add_listener(getByClass("zoom-in", target)[0],"", zoom_in);
    add_listener(getByClass("zoom-out", target)[0],"", zoom_out);
    add_listener(getByClass("close", target)[0],"", close_gallery);
    add_listener(getByClass("arrow-left", target)[0], "", arrow_left);
    add_listener(getByClass("arrow-right", target)[0], "", arrow_right);
    add_listener(getByClass("theme", target)[0], "", toggle_theme);
});

add_listener(window, "", dispatch);

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

        prepare_animated_style(slider, "transform", "translateX(" + (-((current_slide - 1) * 100 - (x / bodyW * 100))) + "%)");

        if((x < -(bodyH / 5)) && arrow_right()){


        }
        else if((x > bodyH / 5) && arrow_left()){


        }
        else{

            setStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
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

export function toggle_autofit(){

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

    addClass(target,"show");
    autohide();
}

export function close_gallery(){

    removeClass(target, "show");

    image.parentNode.removeChild(image);
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

let theme = false;

export function toggle_theme(){

    autohide();

    if((theme = !theme)){

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

    const ref = image;

    setTimeout(function(){

        if(ref && (image !== ref) && ref.parentNode){

            ref.parentNode.removeChild(ref);
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

window["Spotlight"] = {

    "toggleTheme" : toggle_theme,
    "toggleFullscreen": toggle_fullscreen,
    "toggleAutofit": toggle_autofit,
    "next": arrow_right,
    "prev": arrow_left,
    "goto": goto_slide,
    "close": close_gallery,
    "zoomIn": zoom_in,
    "zoomOut": zoom_out,
    "zoomTo": zoom_to,
    "show": function(gallery, config){

        setTimeout(function(){

            if(gallery){

                if(!config){

                    config = {};
                }
                else{

                    apply_options(null, {"dataset": config});
                }

                init_gallery(gallery, config["index"]);
            }
            else{

                options = {};
            }

            show_gallery();
        });
    }
};

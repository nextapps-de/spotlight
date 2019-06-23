/**
 * Spotlight.js
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/spotlight
 */

import "./config.js";
import { addClass, removeClass, setStyle, prepareStyle, getByClass, getByTag, setText } from "./dom.js";
import { addListener, removeListener, cancelEvent } from "./event.js";
import stylesheet from "../../tmp/style.js";
import template from "../../tmp/template.js";
import template_module from "./template.js";

if(BUILD_BUNDLE){

    const style = document.createElement("style");
    style.innerHTML = stylesheet;
    getByTag("head")[0].appendChild(style);
}
else if(USE_EXTERNAL_ASSETS){

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = EXTERNAL_URL + "css/spotlight.css";
    getByTag("head")[0].appendChild(link);
}

const controls = [

    "theme",
    "fullscreen",
    "autofit",
    "zoom-in",
    "zoom-out",
    "page",
    "title",
    "description",
    "player",
    "progress"
];

let x;
let y;
let startX;
let startY;
let viewportW;
let viewportH;
let imageW;
let imageH;
let scale;

let is_down;
let dragged;
let draggable;
let changed;
let toggle;
let toggle_theme;
let current_theme;

let current_slide;
let slide_count;
/** @dict */
let options;
let options_infinite;
let options_progress;
let delay;

let slider;
let panel;
let panes;
let image;
let target;
let footer;
let title;
let description;
let arrow_left;
let arrow_right;
let maximize;
let page;
let player;
let progress;
let preloader;

let playing;
let timer;
let hide;
let doc;
let gallery;

let event_definitions;

/**
 * @param {string} src
 * @param {string=} title
 * @param {string=} description
 * @constructor
 */

function Page(src, title, description){

    this.src = src;
    this.title = title;
    this.description = description;
}

function init_gallery(anchors, index){

    if((slide_count = anchors.length)){

        panes || (panes = getByClass("pane", target));

        const length = panes.length;
        const options_title = options["title"];
        const options_description = options["description"];

        gallery = new Array(slide_count);

        // TODO initialize when sliding on the fly

        for(let i = 0; i < slide_count; i++){

            const anchor = anchors[i];
            const anchor_dataset = anchor.dataset;

            if(i >= length){

                const clone = panes[0].cloneNode(false);

                setStyle(clone, "left", (i * 100) + "%");
                panes[0].parentNode.appendChild(clone);
            }

            let tmp;

            gallery[i] = new Page(

                /* src: */ (
                    (anchor_dataset && (anchor_dataset.href || anchor_dataset.src)) ||
                    anchor.src ||
                    anchor.href
                ),

                /* title: */ (
                    (anchor_dataset && anchor_dataset.title) ||
                    anchor["title"] ||
                    ((tmp = getByTag("img", anchor)).length && tmp[0]["alt"]) ||
                    options_title ||
                    ""
                ),

                /* description: */ (
                    (anchor_dataset && anchor_dataset.description) ||
                    anchor["description"] ||
                    options_description ||
                    ""
                )
            );
        }

        current_slide = index || 1;
        prepareStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
        paginate();
    }
}

/**
 * @param anchor
 * @param group
 * @param key
 * @param {boolean=} value
 */

function inherit_global_option(anchor, group, key, value){

    if(value || anchor[key]){

        options[key] = (group && group[key]) || value;
    }
}

/**
 * @param {Object} anchor
 * @param {Object=} group
 */

function apply_options(anchor, group){

    // merge inherited options

    options = {};
    group && object_assign(options, group);
    object_assign(options, anchor);

    inherit_global_option(anchor, group, "description");
    inherit_global_option(anchor, group, "title");
    inherit_global_option(anchor, group, "prefetch", true);
    inherit_global_option(anchor, group, "preloader", true);

    options_infinite = options["infinite"];
    options_infinite = (typeof options_infinite !== "undefined") && (options_infinite !== "false");
    options_progress = options["progress"] !== "false";
    delay = (options["player"] * 1) || 7000;

    // handle shorthand "zoom"

    const zoom = options["zoom"];

    if(zoom || (zoom === "")){

        options["zoom-in"] = options["zoom-out"] = zoom;

        delete options["zoom"];
    }

    const control = options["control"];

    // determine controls

    if(control || (control === "")){

        const whitelist = (

            typeof control === "string" ?

                control.split(",")
            :
                control
        );

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

        setStyle(getByClass(option, target)[0], "display", (options[option] === "false") ? "none" : "");
    }

    // apply theme

    if((current_theme = options["theme"])){

        theme();
    }
    else{

        current_theme = "white";
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

        const show_preloader = (options["preloader"] !== "false");

        image = new Image();

        image.onload = /** @this {Image} */ function(){

            if(show_preloader){

                removeClass(preloader, "show");
            }

            if(gallery){

                imageW = this.width;
                imageH = this.height;

                setStyle(this, {

                    "visibility": "visible",
                    "opacity": 1,
                    "transform": ""
                });

                if((options["prefetch"] !== "false") && (index < slide_count)){

                    (new Image()).src = gallery[index].src;
                }
            }
        };

        image.onerror = /** @this {Image} */ function(){

            panel.removeChild(this);
        };

        panel.appendChild(image);
        image.src = gallery[index - 1].src;

        if(show_preloader){

            addClass(preloader, "show");
        }

        return !show_preloader;
    }

    return true;
}

/**
 * @enum {number}
 */

const keycodes = {

    BACKSPACE: 8,
    ESCAPE: 27,
    SPACEBAR: 32,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    NUMBLOCK_PLUS : 107,
    PLUS: 187,
    DOWN: 40,
    NUMBLOCK_MINUS: 109,
    MINUS: 189
};

addListener(document, "", dispatch);
addListener(document, "DOMContentLoaded", function(){

    // add template

    target = document.createElement("div");
    target.id = "spotlight";
    target.innerHTML = BUILD_BUNDLE ? template : template; //template_module;

    setStyle(target, "transition", "none");

    document.body.appendChild(target);

    // cache static elements

    slider = getByClass("scene", target)[0];
    footer = getByClass("footer", target)[0];
    title = getByClass("title", footer)[0];
    description = getByClass("description", footer)[0];
    arrow_left = getByClass("arrow-left", target)[0];
    arrow_right = getByClass("arrow-right", target)[0];
    maximize = getByClass("fullscreen", target)[0];
    page = getByClass("page", target)[0];
    player = getByClass("player", target)[0];
    progress = getByClass("progress", target)[0];
    preloader = getByClass("preloader", target)[0];
    doc = document.documentElement || document.body;

    // install fullscreen

    document["cancelFullScreen"] || (document["cancelFullScreen"] = (

        document["exitFullscreen"] ||
        document["webkitCancelFullScreen"] ||
        document["webkitExitFullscreen"] ||
        document["mozCancelFullScreen"] ||
        function(){}
    ));

    doc["requestFullScreen"] || (doc["requestFullScreen"] = (

        doc["webkitRequestFullScreen"] ||
        doc["msRequestFullScreen"] ||
        doc["mozRequestFullScreen"] ||
        setStyle(maximize, "display", "none") ||
        function(){}
    ));

    const drag = getByClass("drag", target)[0];

    event_definitions = [

        [window, "keydown", key_listener],
        [window, "wheel", wheel_listener],
        [window, "hashchange", history_listener],
        [window, "resize", resize_listener],

        [drag, "mousedown", start],
        [drag, "mouseleave", end],
        [drag, "mouseup", end],
        [drag, "mousemove", move],

        [drag, "touchstart", start, {"passive": false}],
        [drag, "touchcancel", end],
        [drag, "touchend", end],
        [drag, "touchmove", move, {"passive": true}],

        [maximize,"", fullscreen],
        [arrow_left, "", prev],
        [arrow_right, "", next],
        [player, "", play],

        [getByClass("autofit", target)[0],"", autofit],
        [getByClass("zoom-in", target)[0],"", zoom_in],
        [getByClass("zoom-out", target)[0],"", zoom_out],
        [getByClass("close", target)[0],"", close],
        [getByClass("theme", target)[0], "", theme]
    ];

},{ once: true });

function resize_listener(){

    viewportW = target.clientWidth;
    viewportH = target.clientHeight;

    if(image){

        imageW = image.width;
        imageH = image.height;

        update_scroll();
    }
}

function update_scroll(){

    setStyle(image, "transform", "translate(-50%, -50%) scale(" + scale + ")");
}

/**
 * @param {boolean=} install
 */

function install_listener(install){

    for(let i = 0; i < event_definitions.length; i++){

        const def = event_definitions[i];

        (install ? addListener : removeListener)(

            def[0], def[1], def[2], def[3]
        );
    }
}

/**
 * @this {Element}
 */

function dispatch(event){

    const self = closest.call(event.target, ".spotlight");

    if(!self){

        return;
    }

    const context = closest.call(self, ".spotlight-group");
    const anchors = getByClass("spotlight", context);

    apply_options(self.dataset, context && context.dataset);

    // determine index

    for(let i = 0; i < anchors.length; i++){

        if(anchors[i] === self){

            init_gallery(anchors, i + 1);
            break;
        }
    }

    show_gallery();

    return cancelEvent(event);
}

function key_listener(event){

    if(panel){

        switch(event.keyCode){

            case keycodes.BACKSPACE:
                autofit();
                break;

            case keycodes.ESCAPE:
                close();
                break;

            case keycodes.SPACEBAR:
                if(options["player"] !== "false") play();
                break;

            case keycodes.LEFT:
                prev();
                break;

            case keycodes.RIGHT:
                next();
                break;

            case keycodes.UP:
            case keycodes.NUMBLOCK_PLUS:
            case keycodes.PLUS:
                zoom_in();
                break;

            case keycodes.DOWN:
            case keycodes.NUMBLOCK_MINUS:
            case keycodes.MINUS:
                zoom_out();
                break;
        }
    }
}

function wheel_listener(event){

    if(panel){

        let delta = event["deltaY"];
        delta = (delta < 0 ? 1 : delta ? -1 : 0) * 0.5;

        if(delta < 0){

            zoom_out();
        }
        else{

            zoom_in();
        }
    }
}

function history_listener(){

    if(panel && (location.hash === "#spotlight")){

        close(true);
    }
}

/**
 * @param {boolean=} init
 */

function play(init){

    const state = (typeof init === "boolean" ? init : !playing);

    if(state){

        if(!playing){

            playing = setInterval(next, delay);
            addClass(player, "on");

            if(options_progress) {

                animate_bar();
            }
        }
    }
    else{

        if(playing){

            playing = clearInterval(playing);
            removeClass(player, "on");

            if(options_progress){

                prepareStyle(progress, "transform", "");
            }
        }
    }

    return playing;
}

function autohide(){

    if(hide){

        clearTimeout(hide);
    }
    else{

        addClass(target, "menu");
    }

    const option_autohide = options["autohide"];

    if(option_autohide !== "false") {

        hide = setTimeout(function(){

            removeClass(target, "menu");
            hide = null;

        }, (option_autohide * 1) || 3000);
    }
    else{

        hide = 1;
    }
}

export function menu(e){

    if(typeof e === "boolean"){

        hide = e ? hide : 0;
    }

    if(hide){

        hide = clearTimeout(hide);
        removeClass(target, "menu");
    }
    else{

        autohide();
    }

    return cancelEvent(e);
}

function start(e){

    is_down = true;
    dragged = false;

    const touch = pointer(e);

    draggable = (imageW * scale) <= viewportW;
    startX = touch.x;
    startY = touch.y;

    return cancelEvent(e, true);
}

function end(e){

    if(is_down && !dragged){

        is_down = false;

        return menu(e);
    }
    else if(draggable && dragged){

        prepareStyle(slider, "transform", "translateX(" + (-((current_slide - 1) * 100 - (x / viewportW * 100))) + "%)");

        if((x < -(viewportH / 10)) && next()){


        }
        else if((x > viewportH / 10) && prev()){


        }
        else{

            setStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
        }

        x = 0;
        draggable = false;

        setStyle(panel, "transform", "");
    }

    is_down = false;

    return cancelEvent(e);
}

function move(e){

    if(is_down){

        timer || request();

        const touch = pointer(e);
        const diff = (imageW * scale - viewportW) / 2;

        dragged = true;

        x -= startX - (startX = touch.x);

        if(!draggable){

            if(x > diff){

                x = diff;
            }
            else if((viewportW - x - (imageW * scale) + diff) > 0){

                x = viewportW - (imageW * scale) + diff;
            }
            else{

                changed = true;
            }
        }
        else{

            changed = true;
        }

        if((imageH * scale) > viewportH){

            // TODO: solve this by computation
            const diff = ((imageH * scale) - viewportH) / 2;

            y -= startY - (startY = touch.y);

            if(y > diff){

                y = diff;
            }
            else if((viewportH - y - (imageH * scale) + diff) > 0){

                y = viewportH - (imageH * scale) + diff;
            }
            else{

                changed = true;
            }
        }
    }
    else{

        autohide();
    }

    return cancelEvent(e, true);
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

/**
 * @param {number=} timestamp
 */

function update(timestamp){

    if(changed){

        if(timestamp){

            request();
        }

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

/**
 * @param {boolean=} init
 */

export function fullscreen(init){

    const isFullscreen = (

        typeof init === "boolean" ?

            init
        :
            document["isFullScreen"] ||
            document["webkitIsFullScreen"] ||
            document["mozFullScreen"]
    );

    if(isFullscreen){

        document["cancelFullScreen"]();
        removeClass(maximize, "on");
    }
    else{

        doc["requestFullScreen"]();
        addClass(maximize, "on");
    }
}

/**
 * @param {boolean=} init
 */

export function autofit(init){

    if(typeof init === "boolean"){

        toggle = !init;
    }

    toggle = (scale === 1) && !toggle;

    setStyle(image, {

        "maxHeight": toggle ? "none" : "",
        "maxWidth": toggle ? "none" : "",
        "transform": ""
    });

    imageW = image.width;
    imageH = image.height;
    scale = 1;
    x = 0;
    y = 0;
    changed = true;

    update();
    autohide();
}

/**
 * @param {boolean=} prevent_autohide
 */

function zoom_in(prevent_autohide){

    let value = scale / 0.65;

    if(value <= 5){

        zoom(scale = value);
    }

    prevent_autohide || autohide();
}

/**
 * @param {number=} factor
 */

export function zoom(factor){

    scale = factor || 1;

    update_scroll();
}

/**
 * @param {boolean=} prevent_autohide
 */

function zoom_out(prevent_autohide){

    let value = scale * 0.65;

    if(value >= 1){

        zoom(scale = value);

        x = 0;
        y = 0;
        changed = true;

        update();
    }

    prevent_autohide || autohide();
}

/**
 * @param {Object=} config
 */

function show_gallery(config){

    location.hash = "spotlight";
    location.hash = "show";

    setStyle(target, "transition", "");
    addClass(doc, "hide-scrollbars");
    addClass(target, "show");

    install_listener(true);
    resize_listener();
    autohide();
}

/**
 * @param {boolean=} hashchange
 */

export function close(hashchange){

    install_listener(false);

    history.go(hashchange === true ? -1 : -2);

    removeClass(doc, "hide-scrollbars");
    removeClass(target, "show");

    if(playing){

        play(false);
    }

    image.parentNode.removeChild(image);

    panel = image = gallery = null;
}

export function prev(){

    if(current_slide > 1){

        return goto(current_slide - 1);
    }
    else if(playing || options_infinite){

        return goto(slide_count);
    }
}

export function next(){

    if(current_slide < slide_count){

        return goto(current_slide + 1);
    }
    else if(playing || options_infinite){

        return goto(1);
    }
}

export function goto(slide){

    if(!playing || !is_down){

        if(slide !== current_slide){

            playing || autohide();

            if(playing && options_progress){

                animate_bar();
            }

            const dir = slide > current_slide;

            current_slide = slide;
            paginate(dir);

            return true;
        }
    }
}

function animate_bar(){

    prepareStyle(progress, {
        "transitionDuration": "",
        "transform": ""
    });

    setStyle(progress, {
        "transitionDuration": delay + "ms",
        "transform": "translateX(0)"
    });
}

/**
 * @param {boolean=} init
 */

export function theme(init){

    if(typeof init === "boolean"){

        toggle_theme = init;
    }
    else{

        toggle_theme = !toggle_theme;

        autohide();
    }

    if(toggle_theme){

        addClass(target, current_theme);
    }
    else{

        removeClass(target, current_theme);
    }
}

/**
 * @param {boolean=} direction
 */

function paginate(direction){

    x = 0;
    y = 0;
    scale = 1;

    const option = options["animation"];

    let animation_scale = true;
    let animation_fade = true;
    let animation_slide = true;
    let animation_flip;
    let animation_custom;

    if(option || (option === "")){

        animation_scale =
        animation_fade =
        animation_slide = false;

        const effects = (

            typeof option === "string" ?

                option.split(",")
            :
                option
        );

        for(let i = 0; i < effects.length; i++){

            const effect = effects[i].trim();

                 if(effect === "scale") animation_scale = true;
            else if(effect === "fade") animation_fade = true;
            else if(effect === "slide") animation_slide = true;
            else if(effect === "flip") animation_flip = true;
            else if(effect !== "false") {

                animation_scale =
                animation_fade =
                animation_slide =
                animation_flip = false;
                animation_custom = effect;

                break;
             }
        }
    }

    setStyle(slider, {
        "transition": animation_slide ? "" : "none",
        "transform": "translateX(-" + ((current_slide - 1) * 100) + "%)"
    });

    if(panel){

        setStyle(panel, "transform", "");
    }

    if(image){

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
    }

    const image_exist = init_slide(current_slide);

    if(animation_custom){

        addClass(image, animation_custom);
    }

    prepareStyle(image, {
        "opacity": animation_fade ? 0 : 1,
        "transform": "translate(-50%, -50%)" + (animation_scale ? " scale(0.8)" : "") + (animation_flip && (typeof direction !== "undefined") ? " rotateY(" + (direction ? "" : "-") + "90deg)" : ""),
        "maxHeight": "",
        "maxWidth": ""
    });

    if(image_exist) setStyle(image, {
        "visibility": "visible",
        "opacity": 1,
        "transform": ""
    });

    if(animation_custom){

        removeClass(image, animation_custom);
    }

    setStyle(panel, "transform", "");
    setStyle(arrow_left, "visibility", !options_infinite && (current_slide === 1) ? "hidden" : "");
    setStyle(arrow_right, "visibility", !options_infinite && (current_slide === slide_count) ? "hidden" : "");

    const dataset = gallery[current_slide - 1];
    const has_content = dataset.title || dataset.description;

    if(has_content){

        setText(title, dataset.title);
        setText(description, dataset.description);
    }

    setStyle(footer, "visibility", has_content ? "visible" : "hidden");
    setText(page, current_slide + " / " + slide_count);
}

export function show(payload, config){

    setTimeout(function(){

        if(payload){

            if(!config){

                config = {};
            }
            else{

                apply_options(config);
            }

            init_gallery(payload, config["index"]);
        }
        else{

            options = {};
        }

        show_gallery();
    });
}

/* Polyfill IE */

const closest = Element.prototype.closest || function(classname){

    let node = this;

    classname = classname.substring(1);

    while(node && (node.nodeType === 1)){

        if(node.classList.contains(classname)){

            return /** @type {Element|null} */ (node);
        }

        node = node.parentElement || node.parentNode;
    }
};

/* Export API */

window["Spotlight"] = {

    "theme": theme,
    "fullscreen": fullscreen,
    "autofit": autofit,
    "next": next,
    "prev": prev,
    "goto": goto,
    "close": close,
    "zoom": zoom,
    "menu": menu,
    "show": show,
    "play": play
};

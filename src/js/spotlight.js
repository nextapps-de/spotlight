/**
 * Spotlight.js
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/spotlight
 */

"use strict";

import "./config.js";
import { addClass, removeClass, setStyle, prepareStyle, getByClass, getByTag } from "./dom.js";
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
    "player"
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
let scale;

let is_down = false;
let dragged = false;
let swipe = false;
let changed = false;
let toggle = false;
let current_theme = false;

let current_slide;
let slide_count;
/** @dict */
let options;

let options_infinite;

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

let playing = null;
let timer = null;
let hide = null;
let doc;

let skip_history_event = true;

function init_gallery(anchors, index){

    if((slide_count = anchors.length)){

        panes || (panes = getByClass("pane", target));

        const length = panes.length;

        const options_title = options["title"];
        const options_description = options["description"];

        // TODO initialize when sliding on the fly

        for(let i = 0; i < slide_count; i++){

            const anchor = anchors[i];

            let dataset;

            if(i < length){

                dataset = panes[i];
            }
            else{

                const clone = panes[0].cloneNode(true);

                setStyle(clone, "left", (i * 100) + "%");
                panes[0].parentNode.appendChild(clone);
                dataset = clone;
            }

            let tmp;

            dataset = dataset.dataset;
            dataset.src = anchor.href || anchor.src;

            const anchor_dataset = anchor.dataset;

            if(options_title !== "false"){

                dataset.title = (

                    anchor["title"] ||
                    (anchor_dataset && anchor_dataset.title) ||
                    ((tmp = getByTag("img", anchor)).length && tmp[0]["alt"]) ||
                    options_title ||
                    ""
                );
            }

            if(options_description !== "false"){

                dataset.description = (

                    anchor["description"] ||
                    (anchor_dataset && anchor_dataset.description) ||
                    options_description ||
                    ""
                );
            }
        }

        prepareStyle(slider, "transform", "translateX(-" + (((index || 1) - 1) * 100) + "%)");
        init_slide(index || 1);
        paginate();
    }
}

function inherit_global_option(anchor, group, key){

    if(anchor[key]){

        options[key] = group ? group[key] : false;
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

    options_infinite = options["infinite"];

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

    if(typeof current_theme === "undefined"){

        current_theme = options["theme"];

        if(current_theme === "white"){

            theme();
        }
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

            setStyle(this, {

                "visibility": "visible",
                "opacity": 1,
                "transform": ""
            });
        };

        image.onerror = /** @this {Image} */ function(){

            panel.removeChild(image);
        };

        panel.appendChild(image);
        image.src = panel.dataset.src;

        return false;
    }

    return true;
}

/**
 * @enum {number}
 */

const keycodes = {

    "BACKSPACE": 8,
    "SPACEBAR": 32,
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "NUMBLOCK_PLUS" : 107,
    "PLUS": 187,
    "DOWN": 40,
    "NUMBLOCK_MINUS": 109,
    "MINUS": 189
};

add_listener(document, "DOMContentLoaded", function(){

    // add template

    target = document.createElement("div");
    target.id = "spotlight";
    target.innerHTML = BUILD_BUNDLE ? template : template; //template_module;

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

    // install fullscreen

    document["cancelFullScreen"] || (document["cancelFullScreen"] = (

        document["exitFullscreen"] ||
        document["webkitCancelFullScreen"] ||
        document["webkitExitFullscreen"] ||
        document["mozCancelFullScreen"] ||
        function(){}
    ));

    doc = document.documentElement || document.body;

    doc["requestFullScreen"] || (doc["requestFullScreen"] = (

        doc["webkitRequestFullScreen"] ||
        doc["msRequestFullScreen"] ||
        doc["mozRequestFullScreen"] ||
        setStyle(maximize, "display", "none") ||
        function(){}
    ));

    // apply listener

    add_listener(slider, "mousedown", start);
    add_listener(slider, "mouseleave", end);
    add_listener(slider, "mouseup", end);
    add_listener(slider, "mousemove", move);

    add_listener(slider, "touchstart", start, {"passive": true});
    add_listener(slider, "touchcancel", end);
    add_listener(slider, "touchend", end);
    add_listener(slider, "touchmove", move, {"passive": true});

    add_listener(maximize,"", fullscreen);
    add_listener(arrow_left, "", prev);
    add_listener(arrow_right, "", next);
    add_listener(player, "", play);

    add_listener(getByClass("autofit", target)[0],"", autofit);
    add_listener(getByClass("zoom-in", target)[0],"", zoom_in);
    add_listener(getByClass("zoom-out", target)[0],"", zoom_out);
    add_listener(getByClass("close", target)[0],"", close);
    add_listener(getByClass("theme", target)[0], "", theme);
});

add_listener(window, "", /** @this {Element} */ function dispatch(event){

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

    return clear(event);
});

add_listener(window, "keydown", function(event){

    if(panel){

        switch(event.keyCode){

            case keycodes.BACKSPACE:
                autofit();
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
});

add_listener(window, "wheel", function(event){

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
});

add_listener(window, "hashchange", function(){

    if(panel && !skip_history_event && (location.hash === "#spotlight")){

        close(true);
    }
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

/**
 * @param {boolean=} init
 */

function play(init){

    const state = (typeof init === "boolean" ? init : !playing);

    if(state){

        if(!playing){

            playing = setInterval(next, (options["player"] * 1) || 5000);
            addClass(player, "on");
        }
    }
    else{

        if(playing){

            playing = clearInterval(playing);
            removeClass(player, "on");
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

        }, (option_autohide * 1) || 2000);
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

    return clear(e);
}

function start(e){

    is_down = true;
    dragged = false;

    const touch = pointer(e);

    bodyW = document.body.clientWidth;
    bodyH = document.body.clientHeight;
    imageW = image.width * scale;
    imageH = image.height * scale;
    swipe = imageW <= bodyW;
    startX = touch.x;
    startY = touch.y;

    return clear(e, true);
}

function end(e){

    if(is_down && !dragged){

        return menu(e);
    }
    else if(swipe){

        prepareStyle(slider, "transform", "translateX(" + (-((current_slide - 1) * 100 - (x / bodyW * 100))) + "%)");

        if((x < -(bodyH / 5)) && next()){


        }
        else if((x > bodyH / 5) && prev()){


        }
        else{

            setStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
        }

        x = 0;
        swipe = false;

        setStyle(panel, "transform", "");
    }

    is_down = false;

    return clear(e);
}

function move(e){

    if(is_down){

        timer || request();

        const touch = pointer(e);
        const diff = (imageW - bodyW) / 2;

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
            const diff = maxHeight === "none" ? (imageH - bodyH) / 2 : (imageH - bodyH) / 2;

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

    return !isFullscreen;
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

        "maxHeight": maxHeight = (toggle ? "none" : ""),
        "maxWidth": toggle ? "none" : "",
        "transform": ""
    });

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

    zoom(scale /= 0.65);

    prevent_autohide || autohide();
}

/**
 * @param {number=} factor
 */

export function zoom(factor){

    setStyle(image, "transform", "translate(-50%, -50%) scale(" + (factor || 1) + ")");
}

/**
 * @param {boolean=} prevent_autohide
 */

function zoom_out(prevent_autohide){

    let value = scale * 0.65;

    if(value < 1){

        value = 1;
    }

    if(value !== scale){

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

    setTimeout(function(){

        skip_history_event = false;
    });

    addClass(doc, "hide-scrollbars");
    addClass(target, "show");
    autohide();
}

export function close(hashchange){

    skip_history_event = true;

    history.go(hashchange === true ? -1 : -2);

    removeClass(doc, "hide-scrollbars");
    removeClass(target, "show");

    if(playing){

        play(false);
    }

    image.parentNode.removeChild(image);
    panel = null;
    image = null;
}

export function prev(){

    playing || autohide();

    if(current_slide > 1){

        current_slide--;
        paginate(false);

        return true;
    }
    else if(playing || options_infinite){

        return goto(slide_count);
    }
}

export function next(){

    playing || autohide();

    if(current_slide < slide_count){

        current_slide++;
        paginate(true);

        return true;
    }
    else if(playing || options_infinite){

        return goto(1);
    }
}

export function goto(slide){

    if(slide !== current_slide){

        playing || autohide();

        const dir = slide > current_slide;

        current_slide = slide;
        paginate(dir);

        return true;
    }
}

/**
 * @param {boolean=} init
 */

export function theme(init){

    if(typeof init === "boolean"){

        current_theme = init;
    }
    else{

        current_theme = !current_theme;

        autohide();
    }

    if(current_theme){

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
    scale = 1;

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

    const image_exist = init_slide(current_slide);

    prepareStyle(image, {
        "opacity": animation_fade ? 0 : 1,
        "transform": "translate(-50%, -50%)" + (animation_scale ? " scale(0.8)" : "") + (animation_rotate && (typeof direction !== "undefined") ? " rotateY(" + (direction ? "" : "-") + "135deg)" : ""),
        "maxHeight": "",
        "maxWidth": ""
    });

    if(image_exist) setStyle(image, {
        "opacity": 1,
        "transform": ""
    });

    setStyle(panel, "transform", "");
    setStyle(arrow_left, "visibility", !options_infinite && (current_slide === 1) ? "hidden" : "");
    setStyle(arrow_right, "visibility", !options_infinite && (current_slide === slide_count) ? "hidden" : "");

    const dataset = panel.dataset;
    const has_content = dataset.title || dataset.description;

    if(has_content){

        title.textContent = dataset.title || "";
        description.textContent = dataset.description || "";
    }

    setStyle(footer, "visibility", has_content ? "visible" : "hidden");

    page.textContent = current_slide + " / " + slide_count;
}

/**
 * @param event
 * @param {boolean=} passive
 * @returns {boolean}
 */

function clear(event, passive){

    event || (event = window.event);

    if(event){

        passive || event.preventDefault();
        event.stopImmediatePropagation();
        event.returnValue = false
    }

    return false;
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

        node = node.parentNode;
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

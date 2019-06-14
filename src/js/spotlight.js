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
let scale;

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
let footer;
let title;
let description;
let arrow_left;
let arrow_right;
let opt_fullscreen;
let page;

let timer = null;
let hide = null;
let doc;

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
}

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

        current_theme = (options["theme"] !== "white");
        theme();
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

        panel.appendChild(image);
        image.src = panel.dataset.src;

        return false;
    }

    return true;
}

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
    opt_fullscreen = getByClass("fullscreen", target)[0];
    page = getByClass("page", target)[0];

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
        setStyle(opt_fullscreen, "display", "none") ||
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

    add_listener(opt_fullscreen,"", fullscreen);
    add_listener(arrow_left, "", prev);
    add_listener(arrow_right, "", next);

    add_listener(getByClass("autofit", target)[0],"", autofit);
    add_listener(getByClass("zoom-in", target)[0],"", zoom_in);
    add_listener(getByClass("zoom-out", target)[0],"", zoom_out);
    add_listener(getByClass("close", target)[0],"", close);
    add_listener(getByClass("theme", target)[0], "", theme);
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

    is_down = false;

    if(!dragged){

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
        removeClass(opt_fullscreen, "on");
    }
    else{

        doc["requestFullScreen"]();
        addClass(opt_fullscreen, "on");
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

    //const body = document.body;
    //const image = getNode("#spotlight .scene img");

    //x = (body.clientWidth - image.naturalWidth) / 2;
    //y = (body.clientHeight - image.naturalHeight) / 2;



    toggle = (scale === 1) && !toggle;

    setStyle(image, {

        "maxHeight": maxHeight = (toggle ? "none" : ""),
        "maxWidth": toggle ? "none" : "",
        "transform": ""
    });

    //panel.style.transform = toggle ? "translate(" + ((x + 0.5) | 0) + "px, " + ((y + 0.5) | 0) + "px)" : "";

    scale = 1;
    x = 0;
    y = 0;
    changed = true;

    update();
}

function zoom_in(){

    zoom(scale /= 0.65);
}

/**
 * @param {number=} factor
 */

export function zoom(factor){

    setStyle(image, "transform", "translate(-50%, -50%) scale(" + (factor || 1) + ")");
    autohide();
}

function zoom_out(){

    if(scale > 1){

        zoom(scale *= 0.65);

        x = 0;
        y = 0;
        changed = true;

        update();
    }

    autohide();
}

/**
 * @param {Object=} config
 */

function show_gallery(config){

    addClass(doc, "hide-scrollbars");
    addClass(target, "show");
    autohide();
}

export function close(){

    removeClass(doc, "hide-scrollbars");
    removeClass(target, "show");

    image.parentNode.removeChild(image);
    panel = null;
    image = null;
}

export function prev(){

    autohide();

    if(current_slide > 1){

        current_slide--;
        paginate(false);

        return true;
    }
}

export function next(){

    autohide();

    if(current_slide < slide_count){

        current_slide++;
        paginate(true);

        return true;
    }
}

export function goto(slide){

    if(slide !== current_slide){

        autohide();

        const dir = slide > current_slide;

        current_slide = slide;
        paginate(dir);

        return true;
    }
}

let current_theme = false;

/**
 * @param {boolean=} init
 */

export function theme(init){

    autohide();

    if(typeof init === "boolean"){

        current_theme = init;
    }
    else{

        current_theme = !current_theme;
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
    setStyle(arrow_left, "visibility", current_slide === 1 ? "hidden" : "");
    setStyle(arrow_right, "visibility", current_slide === slide_count ? "hidden" : "");

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

        if(!passive) event.preventDefault();
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
    "show": show
};

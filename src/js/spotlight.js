/**
 * Spotlight.js
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/spotlight
 */

import { addClass, removeClass, setStyle, prepareStyle, getByClass, getByTag, setText, addListener, removeListener, cancelEvent, createElement } from "./helper.js";
import widget from "./template.js";

const controls = [

    "theme",
    "download",
    "play",
    "page",
    "close",
    "autofit",
    "zoom-in",
    "zoom-out",
    "prev",
    "next",
    "fullscreen"
];

const controls_default = {

    "page": 1,
    "close": 1,
    "autofit": 1,
    "zoom-in": 1,
    "zoom-out": 1,
    "prev": 1,
    "next": 1,
    "fullscreen": 1
};

const tpl_video = /** @type {HTMLVideoElement} */ (createElement("video"));
const controls_dom = {};
const video_support = {};

let x;
let y;
let startX;
let startY;
let viewport_w;
let viewport_h;
let media_w;
let media_h;
let scale;

let is_down;
let dragged;
let slidable;
let toggle_autofit;
let toggle_theme;

let current_slide;
let slide_count;
let anchors;
let options;
let options_group;
let options_infinite;
let options_progress;
let options_onshow;
let options_onchange;
let options_onclose;
let options_fit;
let options_autohide;
let options_autoplay;
let options_theme;
let options_preload;
let options_href;
let options_click;
let delay;

let animation_scale;
let animation_fade;
let animation_slide;
let animation_custom;

let body;
let panel;
let panes;
let media;
let slider;
let header;
let footer;
let title;
let description;
let button;
let page_prev;
let page_next;
let maximize;
let page;
let player;
let progress;

let gallery;
let gallery_next;
let playing;
let hide;
let hide_cooldown;

let prefix_request, prefix_exit;

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

addListener(document, "click", dispatch);

export function init(){

    if(body){

        return;
    }

    //console.log("init");

    body = document.body;
    slider = getOneByClass("scene");
    header = getOneByClass("header");
    footer = getOneByClass("footer");
    title = getOneByClass("title");
    description = getOneByClass("description");
    button = getOneByClass("button");
    page_prev = getOneByClass("prev");
    page_next = getOneByClass("next");
    page = getOneByClass("page");
    progress = getOneByClass("progress");
    panes = [getOneByClass("pane")];

    addControl("close", close);

    body[prefix_request = "requestFullscreen"] ||
    body[prefix_request = "msRequestFullscreen"] ||
    body[prefix_request = "webkitRequestFullscreen"] ||
    body[prefix_request = "mozRequestFullscreen"] ||
    (prefix_request = "");

    if(prefix_request){

        prefix_exit = (

            prefix_request.replace("request", "exit")
                          .replace("mozRequest", "mozCancel")
                          .replace("Request", "Exit")
        );

        maximize = addControl("fullscreen", fullscreen);
    }
    else{

        controls.pop(); // => "fullscreen"
    }

    addControl("autofit", autofit);
    addControl("zoom-in", zoom_in);
    addControl("zoom-out", zoom_out);
    addControl("theme", theme);
    player = addControl("play", play);
    addControl("download", download);

    addListener(page_prev, "click", prev);
    addListener(page_next, "click", next);

    /*
     * binding the tracking listeners to the "widget" will prevent all click listeners to be fired
     * binding the tracking listeners to the "spl-scene" breaks on iOS (seems to be a bug in their visual/touchable overflow calculation)
     * binding the tracking listeners to a wrapper "track" will fix both
     * the spinner element could not be used, it is below the widget to allow user actions (pointers)
     */

    const track = getOneByClass("track");

    addListener(track, "mousedown", start);
    addListener(track, "mousemove", move);
    addListener(track, "mouseleave", end);
    addListener(track, "mouseup", end);

    addListener(track, "touchstart", start, { "passive": false });
    addListener(track, "touchmove", move, { "passive": true });
    //addListener(track, "touchcancel", end);
    addListener(track, "touchend", end);
    // click listener for the wrapper "track" is already covered
    //addListener(track, "click", menu);

    addListener(button, "click", function(){

        if(options_click){

            options_click(current_slide, options);
        }
        else if(options_href){

            location.href = options_href;
        }
    });

    /**
     * @param {string} classname
     * @returns {HTMLElement}
     */

    function getOneByClass(classname){

        //console.log("getOneByClass", class_name);

        return controls_dom[classname] = getByClass("spl-" + classname, widget)[0];
    }
}

export function addControl(classname, fn){

    const div = createElement("div");

    div.className = "spl-" + classname;
    addListener(div, "click", fn);
    header.appendChild(div);

    return controls_dom[classname] = div;
}

export function removeControl(classname){

    const div = controls_dom[classname];

    if(div){

        header.removeChild(div);
        controls_dom[classname] = null;
    }
}

function dispatch(event){

    //console.log("dispatch");

    const target = event.target.closest(".spotlight");

    if(target){

        cancelEvent(event, true);

        const group = target.closest(".spotlight-group");

        anchors = getByClass("spotlight", group);

        // determine current selected index

        for(let i = 0; i < anchors.length; i++){

            if(anchors[i] === target){

                options_group = group && group.dataset;
                init_gallery(i + 1);
                break;
            }
        }
    }
}

/**
 * @param {!HTMLCollection|Array} gallery
 * @param {Object=} group
 * @param {number=} index
 */

export function show(gallery, group, index){

    //console.log("show", gallery, config);

    anchors = gallery;

    if(group){

        options_group = group;
        options_onshow = group["onshow"];
        options_onchange = group["onchange"];
        options_onclose = group["onclose"];
        index = index || group["index"];
    }

    init_gallery(index);
}

function init_gallery(index){

    //console.log("init_gallery", index);

    slide_count = anchors.length;

    if(slide_count){

        body || init();
        options_onshow && options_onshow(index);

        const pane = panes[0];
        const parent = pane.parentNode;

        for(let i = panes.length; i < slide_count; i++){

            const clone = pane.cloneNode(false);

            setStyle(clone, "left", (i * 100) + "%");
            parent.appendChild(clone);
            panes[i] = clone;
        }

        if(!panel){

            body.appendChild(widget);
            update_widget_viewport();
            //resize_listener();
        }

        current_slide = index || 1;
        disable_animation(slider);
        setup_page(true);
        show_gallery();
    }
}

/**
 * @param {string} key
 * @param {boolean|string|number=} is_default
 */

function parse_option(key, is_default){

    let val = options[key];

    if(typeof val !== "undefined"){

        val = "" + val;

        return (val !== "false") && (val || is_default);
    }

    return is_default;
}

/**
 * @param {Object} anchor
 */

function apply_options(anchor){

    //console.log("apply_options", anchor);

    options = {};
    options_group && Object.assign(options, options_group);
    Object.assign(options, anchor.dataset || anchor);

    // apply theme before controls (including control "theme") applies to the options

    options_click = options["onclick"];
    options_theme = parse_option("theme");
    options_autohide = parse_option("autohide", true);
    options_infinite = parse_option("infinite");
    options_progress = parse_option("progress", true);
    options_autoplay = parse_option("autoplay");
    options_preload = parse_option("preload", true);
    options_href = parse_option("buttonHref");
    delay = (options_autoplay && parseFloat(options_autoplay)) || 7;
    toggle_theme || (options_theme && theme(options_theme));

    const control = options["control"];

    // determine controls

    if(control){

        const whitelist = (

            typeof control === "string" ?

                control.split(",")
            :
                control
        );

        // prepare to false when using whitelist

        for(let i = 0; i < controls.length; i++){

            options[controls[i]] = false;
        }

        // apply whitelist

        for(let i = 0; i < whitelist.length; i++){

            const option = whitelist[i].trim();

            // handle shorthand "zoom"

            if(option === "zoom"){

                options["zoom-in"] =
                options["zoom-out"] = true;
            }
            else{

                options[option] = true;
            }
        }
    }

    // determine animations

    const animation = options["animation"];

    animation_scale = animation_fade = animation_slide = !animation;
    animation_custom = false;

    if(animation){

        const whitelist = (

            typeof animation === "string" ?

                animation.split(",")
            :
                animation
        );

        // apply whitelist

        for(let i = 0; i < whitelist.length; i++){

            const option = whitelist[i].trim();

            if(option === "scale"){

                animation_scale = true;
            }
            else if(option === "fade"){

                animation_fade = true;
            }
            else if(option === "slide"){

                animation_slide = true;
            }
            else if(option){

                animation_custom = option;
            }
        }
    }

    options_fit = options["fit"];
}

/**
 * @param {boolean=} prepare
 */

function prepare_animation(prepare){

    if(prepare){

        prepareStyle(media, prepare_animation);
    }
    else{

        (animation_slide ? enable_animation : disable_animation)(slider);
        setStyle(media, "opacity", animation_fade ? 0 : 1);
        update_scroll(animation_scale && 0.8);
        animation_custom && addClass(media, animation_custom);
    }
}

function init_slide(index, direction){

    //console.log("init_slide", index);

    panel = panes[index - 1];
    media = /** @type {Image|HTMLVideoElement|HTMLElement} */ (panel.firstChild);
    current_slide = index;

    if(media){

        disable_autoresizer();

        if(options_fit){

            addClass(media, options_fit);
        }

        prepare_animation(true);

        animation_custom && removeClass(media, animation_custom);
        animation_fade && setStyle(media, "opacity", 1);
        animation_scale && setStyle(media, "transform", "");
        setStyle(media, "visibility", "visible");

        prefetch(direction);
    }
    else{

        const type = gallery.media;
        const options_spinner = parse_option("spinner", true);

        options_spinner && addClass(widget, "spinner");

        if(type === "video"){

            media = /** @type {HTMLVideoElement} */ (createElement("video"));

            media.onloadedmetadata = /** @this {HTMLVideoElement} */ function(e){

                media.width = media.videoWidth;
                media.height = media.videoHeight;
                update_media_viewport();

                options_spinner && removeClass(widget, "spinner");

                init_slide(index, direction);
            };

            media.poster = options["poster"];
            media.preload = options_preload ? "auto" : "metadata";
            media.controls = parse_option("controls", true);
            media.autoplay = options_autoplay;
            media.playsinline = parse_option("inline");
            media.muted = parse_option("muted");
            media.src = gallery.src; //files[i].src;

            // const source = createElement("source");
            // source.type = "video/" + files[i].type;
            // source.src = files[i].src;
            // media.appendChild(source);

            panel.appendChild(media);
        }
        else if(type === "node"){

            media = gallery.src;

            if(typeof media === "string"){

                media = document.querySelector(media);
            }

            media._root || (media._root = media.parentNode);
            update_media_viewport();

            options_spinner && removeClass(widget, "spinner");
            panel.appendChild(media);

            init_slide(index, direction);
        }
        else{

            media = createElement("img");

            media.onload = /** @this {Image} */ function(){

                options_spinner && removeClass(widget, "spinner");

                update_media_viewport();
                init_slide(index, direction);

            };

            media.onerror = /** @this {Image} */ function(){

                panel.removeChild(this);
            };

            //media.crossOrigin = "anonymous";
            media.src = gallery.src;

            panel.appendChild(media);
        }

        if(media){

            options_spinner || setStyle(media, "visibility", "visible");
        }
    }
}

function prefetch(direction){

    //console.log("prefetch");

    if(direction && gallery_next){

        (createElement("img")).src = gallery_next;
    }
}

function has_fullscreen(){

    //console.log("has_fullscreen");

    return (

        document["fullscreen"] ||
        document["fullscreenElement"] ||
        document["webkitFullscreenElement"] ||
        document["mozFullScreenElement"]
    );
}

function resize_listener(){

    //console.log("resize_listener");

    update_widget_viewport()
    media && update_media_viewport();

    if(prefix_request){

        if(has_fullscreen()){

            addClass(maximize, "on");
        }
        else{

            removeClass(maximize, "on");

            // handle when user toggles the fullscreen state manually
            // entering the fullscreen state manually needs to be hide the fullscreen icon, because
            // the exit fullscreen handler will not work due to a browser restriction

            display_state(maximize, (screen.availHeight - window.outerHeight) >= 0);
        }
    }

    //update_scroll();
}

function update_widget_viewport(){

    viewport_w = widget.clientWidth;
    viewport_h = widget.clientHeight;
}

function update_media_viewport(){

    media_w = media.clientWidth;
    media_h = media.clientHeight;
}

function update_media_dimension(){

    media_w = media.width;
    media_h = media.height;
}

/**
 * @param {number=} force_scale
 */

function update_scroll(force_scale){

    //console.log("update_scroll");

    setStyle(media, "transform", "translate(-50%, -50%) scale(" + (force_scale || scale) + ")");
}

/**
 * @param {number=} x
 * @param {number=} y
 */

function update_panel(x, y){

    ////console.log("update_panel", x, y);

    setStyle(panel, "transform", x || y ? "translate(" + x + "px, " + y + "px)" : "");
}

/**
 * @param {number} index
 * @param {boolean=} prepare
 * @param {number=} offset
 */

function update_slider(index, prepare, offset){

    //console.log("update_slider", prepare, value);

    if(prepare){

        prepareStyle(slider, function(){

            update_slider(index, false, offset);
        });
    }
    else{

        setStyle(slider, "transform", "translateX(" + (-index * 100 + (offset || 0)) + "%)");
    }
}

/**
 * @param {boolean=} install
 */

function toggle_listener(install){

    //console.log("toggle_listener", listener, install);

    const fn = install ? addListener : removeListener;

    fn(window, "keydown", key_listener);
    fn(window, "wheel", wheel_listener);
    fn(window, "resize", resize_listener);
    fn(window, "popstate", history_listener);
}

function history_listener(event) {

    //console.log("history_listener");

    if(panel && /*event.state &&*/ event.state["spl"]) {

        close(true);
    }
}

function key_listener(event){

    //console.log("key_listener");

    if(panel){

        switch(event.keyCode){

            case keycodes.BACKSPACE:
                autofit();
                break;

            case keycodes.ESCAPE:
                close();
                break;

            case keycodes.SPACEBAR:
                options_autoplay && play();
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

    //console.log("wheel_listener");

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

/**
 * @param {Event|boolean=} init
 */

export function play(init){

    //console.log("play", init);

    const state = (typeof init === "boolean" ? init : !playing);

    if(state){

        if(!playing){

            playing = setInterval(next, delay * 1000);
            addClass(player, "on");
            options_progress && animate_bar(true);
        }
    }
    else{

        if(playing){

            playing = clearInterval(playing);
            removeClass(player, "on");
            options_progress && animate_bar();
        }
    }
}

/**
 * @param {boolean=} start
 */

function animate_bar(start){

    //console.log("animate_bar");

    // reset bar

    prepareStyle(progress, function(){

        setStyle(progress, "transition-duration", "");
        setStyle(progress, "transform", "");
    });

    // start animation

    if(start){

        setStyle(progress, "transition-duration", delay + "s");
        setStyle(progress, "transform", "translateX(0)");
    }
}

function autohide(){

    //console.log("autohide");

    if(options_autohide) {

        hide_cooldown = Date.now() + 2950;

        if(!hide){

            addClass(widget, "menu");
            schedule(3000);
        }
    }
}

function schedule(cooldown){

    //console.log("schedule", delay);

    hide = setTimeout(function(){

        const now = Date.now();

        if(now >= hide_cooldown){

            removeClass(widget, "menu");
            hide = 0;
        }
        else{

            schedule(hide_cooldown - now);
        }

    }, cooldown);
}

/**
 * @param {boolean=} state
 */

export function menu(state){

    //console.log("menu");

    if(typeof state === "boolean"){

        hide = state ? hide : 0;
    }

    if(hide){

        hide = clearTimeout(hide);
        removeClass(widget, "menu");
    }
    else{

        autohide();
    }
}

function start(e){

    //console.log("start");

    cancelEvent(e, true);

    is_down = true;
    dragged = false;

    let touches = e.touches;

    if(touches && (touches = touches[0])){

        e = touches;
    }

    slidable = /*!toggle_autofit &&*/ (media_w * scale) <= viewport_w;
    startX = e.pageX;
    startY = e.pageY;

    disable_animation(panel);
}

function end(e){

    //console.log("end");

    cancelEvent(e);

    if(is_down){

        if(!dragged){

            menu();
        }
        else{

            if(slidable && dragged){

                const has_next = (x < -(viewport_w / 7)) && ((current_slide < slide_count) || options_infinite);
                const has_prev = has_next || (x > (viewport_w / 7)) && ((current_slide > 1) || options_infinite);

                if(has_next || has_prev){

                    update_slider(current_slide - 1, /* prepare? */ true, x / viewport_w * 100);

                    (has_next && next()) ||
                    (has_prev && prev());
                }

                x = 0;

                update_panel();
            }

            enable_animation(panel);
        }

        is_down = false;
    }
}

function move(e){

    ////console.log("move");

    cancelEvent(e);

    if(is_down){

        let touches = e.touches;

        if(touches && (touches = touches[0])){

            e = touches;
        }

        // handle x-axis in slide mode and in drag mode

        let diff = (media_w * scale - viewport_w) / 2;
        x -= startX - (startX = e.pageX);

        if(!slidable){

            if(x > diff){

                x = diff;
            }
            else if(x < -diff){

                x = -diff
            }

            // handle y-axis in drag mode

            if((media_h * scale) > viewport_h){

                diff = (media_h * scale - viewport_h) / 2;
                y -= startY - (startY = e.pageY);

                if(y > diff){

                    y = diff;
                }
                else if(y < -diff){

                    y = -diff;
                }
            }
        }

        dragged = true;

        update_panel(x, y);
    }
    else{

        autohide();
    }
}

/**
 * @param {Event|boolean=} init
 */

export function fullscreen(init){

    //console.log("fullscreen", init);

    const is_fullscreen = has_fullscreen();

    if((typeof init !== "boolean") || (init !== !!is_fullscreen)){

        if(is_fullscreen){

            document[prefix_exit]();
            //removeClass(maximize, "on");
        }
        else{

            widget[prefix_request]();
            //addClass(maximize, "on");
        }
    }
}

/**
 * @param {Event|string=} theme
 */

export function theme(theme){

    //console.log("theme", theme);

    if(typeof theme !== "string"){

        // toggle:

        theme = toggle_theme ? "" : options_theme || "white";
    }

    if(toggle_theme !== theme){

        // set:

        toggle_theme && removeClass(widget, toggle_theme);
        theme && addClass(widget, theme);
        toggle_theme = theme;
    }
}

/**
 * @param {Event|boolean=} init
 */

export function autofit(init){

    //console.log("autofit", init);

    if(typeof init === "boolean"){

        toggle_autofit = !init;
    }

    toggle_autofit = (scale === 1) && !toggle_autofit;

    if(toggle_autofit){

        addClass(media, "autofit");
    }
    else{

        removeClass(media, "autofit");
    }

    setStyle(media, "transform", "");

    scale = 1;
    x = 0;
    y = 0;

    update_media_viewport();
    disable_animation(panel);
    update_panel();
    //autohide();
}

/**
 * @param {Event=} e
 */

function zoom_in(e){

    //console.log("zoom_in", prevent_autohide);

    let value = scale / 0.65;

    if(value <= 50){

        //console.log(toggle_autofit);

        disable_autoresizer();

        // if(options_fit){
        //
        //     removeClass(media, options_fit);
        // }

        x /= 0.65;
        y /= 0.65;

        update_panel(x, y);
        zoom(value);
    }

    //e && autohide();
}

/**
 * @param {Event=} e
 */

function zoom_out(e){

    //console.log("zoom_out", prevent_autohide);

    let value = scale * 0.65;

    disable_autoresizer();

    if(value >= 1){

        if(value === 1){

            x = y = 0;

            // if(options_fit){
            //
            //     addClass(media, options_fit);
            // }
        }
        else{

            x *= 0.65;
            y *= 0.65;
        }

        update_panel(x, y);
        zoom(value);
    }

    //e && autohide();
}

/**
 * @param {number=} factor
 */

export function zoom(factor){

    //console.log("zoom", factor);

    scale = factor || 1;

    update_scroll();
}

function disable_autoresizer(){

    //update_media_dimension();

    if(toggle_autofit){

        // removeClass(media, "autofit");
        // toggle_autofit = false;

        autofit();
    }
}

function show_gallery(){

    //console.log("show_gallery");

    history.pushState({ "spl": 1 }, "");
    history.pushState({ "spl": 2 }, "");

    enable_animation(widget);
    addClass(body, "hide-scrollbars");
    addClass(widget, "show");

    toggle_listener(true);
    update_widget_viewport();
    //resize_listener();
    autohide();

    options_autoplay && play();
}

export function download(){

    const link = /** @type {HTMLAnchorElement} */ (createElement("a"));
    link.href = media.src;
    link.download = media.src.substring(media.src.lastIndexOf("/") + 1);
    body.appendChild(link);
    link.click();
    body.removeChild(link);
}

/**
 * @param {boolean=} hashchange
 */

export function close(hashchange){

    //console.log("close", hashchange);

    setTimeout(function(){

        body.removeChild(widget);
        panel = media = gallery = options = options_group = anchors = options_onshow = options_onchange = options_onclose = options_click = null;

    }, 200);

    removeClass(body, "hide-scrollbars");
    removeClass(widget, "show");

    fullscreen(false);
    toggle_listener();

    history.go(hashchange === true ? -1 : -2);

    if(playing){

        play(false);
    }

    if(media){

        checkout(media);
    }

    if(hide){

        hide = clearTimeout(hide);
    }

    options_onclose && options_onclose();
}

function checkout(media){

    //console.log("checkout");

    if(media._root){

        media._root.appendChild(media);
        media._root = null;
    }
    else{

        const parent = media.parentNode;
        parent && parent.removeChild(media);
    }
}

/**
 * @param {Event=} e
 */

export function prev(e){

    //console.log("prev");

    e && autohide();

    if(slide_count > 1){

        if(current_slide > 1){

            return goto(current_slide - 1);
        }
        else if(options_infinite){

            update_slider(slide_count, true);

            return goto(slide_count);
        }
    }
}

/**
 * @param {Event=} e
 */

export function next(e){

    //console.log("next");

    e && autohide();

    if(slide_count > 1){

        if(current_slide < slide_count){

            return goto(current_slide + 1);
        }
        else if(options_infinite){

            update_slider(-1, true);

            return goto(1);
        }
        else if(playing){

            play(false);
        }
    }
}

export function goto(slide){

    //console.log("goto", slide);

    if(slide !== current_slide){

        playing || autohide();

        if(playing){

            playing = clearInterval(playing);
            play();
        }

        const direction = slide > current_slide;

        current_slide = slide;

        setup_page(direction);

        return true;
    }
}

const connection = navigator["connection"];
const dpr = window["devicePixelRatio"] || 1;

function determine_src(anchor, size, options){

    let src, diff;

    if(options["media"] !== "node"){

        const keys = Object.keys(/** @type {!Object} */ (options));

        for(let x = 0, key; x < keys.length; x++){

            key = keys[x];

            if((key.length > 3) && (key.indexOf("src") === 0)){

                if(options["media"] === "video"){

                    const cache = video_support[key];

                    if(cache){

                        if(cache > 0){

                            src = options[key];
                            break;
                        }
                    }
                    else if(tpl_video.canPlayType("video/" + key.substring(3).toLowerCase())){

                        video_support[key] = 1;
                        src = options[key];
                        break;
                    }
                    else{

                        video_support[key] = -1;
                    }
                }
                else{

                    const res = parseInt(key.substring(4), 10);

                    if(res){

                        const abs = Math.abs(size - res);

                        if(!diff || (abs < diff)){

                            diff = abs;
                            src = options[key];
                        }
                    }
                }
            }
        }
    }

    return src || options["src"] || options["href"] || anchor["src"] || anchor["href"];
}

function prepare(){

    let anchor = anchors[current_slide - 1];

    apply_options(anchor);

    const speed = connection && connection["downlink"];
    let size = Math.max(viewport_h, viewport_w) * dpr;

    if(speed && ((speed * 1200) < size)){

        size = speed * 1200;
    }

    let tmp;

    gallery = {

        media: options["media"],
        src: determine_src(anchor, size, options),
        title: parse_option("title",
            anchor["alt"] || anchor["title"] ||
            ((tmp = getByTag("img", anchor)[0]) && (tmp["alt"] || tmp["title"]))
        )
    };

    gallery_next = "";

    if(options_preload){

        if((anchor = anchors[current_slide])){

            const options_next = anchor.dataset || anchor;
            const next_is_image = !options_next["media"] || (options_next["media"] === "image");

            if(next_is_image){

                gallery_next = determine_src(anchor, size, options_next);
            }
        }
    }

    // apply controls

    for(let i = 0; i < controls.length; i++){

        const option = controls[i];

        //console.log(option + ": ", options[option]);

        display_state(controls_dom[option], parse_option(option, controls_default[option]));
    }
}

function setup_page(direction){

    //console.log("setup_page", direction);

    x = 0;
    y = 0;
    scale = 1;

    prepare();
    update_slider(current_slide - 1);

    if(media){

        let ref = media;

        setTimeout(function(){

            if(ref && (media !== ref)){

                checkout(ref);
                ref = null;
            }

        }, 650);

        // animate out the old image

        prepare_animation();
        //disable_animation(panel);
        update_panel();
    }

    init_slide(current_slide, direction);

    //if(panel){

        disable_animation(panel);
        update_panel();
    //}

    const str_title = gallery.title;
    const str_description = parse_option("description");
    const str_button = parse_option("button");
    const has_content = str_title || str_description || str_button;

    if(has_content){

        str_title && setText(title, str_title);
        str_description && setText(description, str_description);
        str_button && setText(button, str_button);

        display_state(title, str_title);
        display_state(description, str_description);
        display_state(button, str_button);

        setStyle(footer, "transform", options_autohide === "all" ? "" : "none");
    }

    options_autohide || addClass(widget, "menu");

    visibility_state(footer, has_content);
    visibility_state(page_prev, options_infinite || (current_slide > 1));
    visibility_state(page_next, options_infinite || (current_slide < slide_count));
    setText(page, slide_count > 1 ? current_slide + " / " + slide_count : "");

    options_onchange && options_onchange(current_slide, options);
}

function display_state(node, state){

    setStyle(node, "display", state ? "" : "none");
}

function visibility_state(node, state){

    setStyle(node, "visibility", state ? "" : "hidden");
}

function disable_animation(node){

    setStyle(node, "transition", "none");
}

function enable_animation(node){

    setStyle(node, "transition", "");
}

export default {

    init: init,
    theme: theme,
    fullscreen: fullscreen,
    download: download,
    autofit: autofit,
    next: next,
    prev: prev,
    goto: goto,
    close: close,
    zoom: zoom,
    menu: menu,
    show: show,
    play: play,
    addControl: addControl,
    removeControl: removeControl
};
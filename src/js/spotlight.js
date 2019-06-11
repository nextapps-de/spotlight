/**!
 * @preserve Spotlight.js v0.0.3
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Released under the Apache 2.0 Licence
 * https://github.com/nextapps-de/spotlight
 */

import "./config.js";
import { addClass, getNode, getNodes, hasClass, removeClass, getStyle, setStyle } from "./dom.js";
import images_base64 from "../../tmp/images.js";
import stylesheet from "../../tmp/style.js";
import template from "../../tmp/template.js";

(function(){

    "use strict";

    const transparent_pixel = BUILD_BUNDLE ? images_base64.pixel : "img/pixel.gif";
    const image_preloader = BUILD_BUNDLE ? images_base64.preloader : "img/preloader.svg";
    const image_maximize = BUILD_BUNDLE ? images_base64.maximize : "img/maximize.svg";
    const image_minimize = BUILD_BUNDLE ? images_base64.minimize : "img/minimize.svg";

    if(BUILD_BUNDLE){

        const style = document.createElement("style");
        style.innerHTML = stylesheet;
        getNode("head").appendChild(style);
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
    let lastX = 0;
    let lastY = 0;
    let zoom = 1;
    let hide = null;
    let maxHeight;
    let slider;
    let panel;
    let image;
    let target;
    let current_slide;
    let slide_count;
    let options;

    window["dispatch_spotlight"] = /** @this {Element} */ function(event){

        const context = this.closest(".spotlight-group");
        const anchors = getNodes(".spotlight", context);

        apply_options(context, this);

        // determine index

        for(let i = 0; i < anchors.length; i++){

            if(anchors[i] === this){

                show_slide(context, i + 1);
                break;
            }
        }

        return clear(event);
    };

    function apply_options(group, anchor){

        options = group ? group.dataset : {};

        object_assign(options, anchor.dataset);

        if(options["controls"]){

            const whitelist = options["controls"].split(",");

            for(let i = 0; i < controls.length; i++){

                options[controls[i]] = "false";
            }

            for(let i = 0; i < whitelist.length; i++){

                options[whitelist[i]] = "true";
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

            setStyle("#spotlight ." + option, "display", options[option] === "false" ? "none" : "table-cell");
        }
    }

    function init_slide(index){

        panel = getNodes(".pane", slider)[index - 1];
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
                        "transform": "translate(-50%, -50%) scale(1)"
                    });

                    buffer.onload = null;
                    buffer = null;
                    image = null;
                };

                buffer.onerror = /** @this {Image} */ function(){

                    buffer = null;
                    image.loaded = false;
                    image = null;
                };

                buffer.src = image.dataset["src"];

            }(image));

            image.loaded = true;
        }
        else{

            setStyle(image, {

                "opacity": 1,
                "transform": "translate(-50%, -50%) scale(1)"
            });
        }
    }

    function show_slide(context, index){

        const anchors = getNodes(".spotlight", context);

        slide_count = anchors.length;

        if(slide_count){

            const refs = getNodes("#spotlight .pane");
            const length = refs.length;

            for(let i = 0; i < slide_count; i++){

                let image;

                if(i < length){

                    image = refs[i].firstElementChild;
                    image.dataset["src"] = anchors[i].href;
                    image.loaded = false;
                }
                else{

                    const clone = refs[0].cloneNode(true);

                    image = clone.firstElementChild;
                    image.dataset["src"] = anchors[i].href;
                    image.loaded = false;
                    setStyle(clone, "left", (i * 100) + "%");
                    refs[0].parentNode.appendChild(clone);
                }
            }

            prepare_animated_style(slider, "transform", "translateX(-" + (((index || 1) - 1) * 100) + "%)", function(){

                init_slide(index || 1);
                paginate();
                show_gallery();
            });
        }
    }

    add_listener(document, "DOMContentLoaded", function(){

        target = document.createElement("div");
        target.id = "spotlight";
        target.style.backgroundImage = "url(" + image_preloader + ")";
        target.innerHTML = template;

        document.body.appendChild(target);

        document["cancelFullScreen"] || (document["cancelFullScreen"] = (

            document["exitFullscreen"] ||
            document["webkitCancelFullScreen"] ||
            document["webkitExitFullscreen"] ||
            document["mozCancelFullScreen"] ||
            setStyle("#spotlight .fullscreen", "display", "none") ||
            function(){}
        ));

        slider = getNode(".scene", target);

        //add_listener(slider, "", click);
        add_listener(slider, "mousedown", start);
        add_listener(slider, "mouseleave", end);
        add_listener(slider, "mouseup", end);
        add_listener(slider, "mousemove", move);

        add_listener(slider, "touchstart", start, {"passive": true});
        add_listener(slider, "touchcancel", end);
        add_listener(slider, "touchend", end);
        add_listener(slider, "touchmove", move, {"passive": true});

        add_listener(getNode(".fullscreen", target),"", toggle_fullscreen);
        add_listener(getNode(".reset", target),"", zoom_reset);
        add_listener(getNode(".maximize", target),"", zoom_in);
        add_listener(getNode(".minimize", target),"", zoom_out);
        add_listener(getNode(".close", target),"", close_gallery);
        add_listener(getNode(".arrow-left", target), "", arrow_left);
        add_listener(getNode(".arrow-right", target), "", arrow_right);
        add_listener(getNode(".contrast", target), "", toggle_contrast);
    });

    add_listener(window, "", function(event){

        event || (event = window.event);

        const target = event.target;

        if(target && hasClass(target, "spotlight")){

            return window["dispatch_spotlight"].call(target, event);
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

    let tmp = 0;

    function prepare_animated_style(selector, style, value, callback){

        const node = getNode(selector);

        addClass(node, "no-transition");
        setStyle(node, style, value);

        // force styles (quick-fix for closure compiler):
        tmp || (tmp = node.clientTop && 0);

        removeClass(node, "no-transition");

        if(callback){

            callback();
            callback = null;
        }
    }

    function autohide(){

        if(hide){

            clearTimeout(hide);
        }
        else{

            addClass(target, "menu");
        }

        hide = setTimeout(function(){

            removeClass(target, "menu");
            hide = null;

        }, 2000);
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

        return false; //clear(e);
    }

    function end(e){

        if(!dragged){

            return click(e);
        }
        else if(swipe){

            setStyle("#spotlight .scene", "transition", "transform 1s cubic-bezier(0.1, 1, 0.1, 1)");

            prepare_animated_style("#spotlight .scene", "transform", "translateX(" + (-((current_slide - 1) * 100 - (x / bodyW * 100))) + "%)", function(){

                if((x < -(bodyH / 5)) && arrow_right()){


                }
                else if((x > bodyH / 5) && arrow_left()){


                }
                else{

                    setStyle("#spotlight .scene", "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
                }

                x = 0;
                swipe = false;
            });

            requestAnimationFrame(function(){

                setStyle(panel, "transform", "");
            });
        }

        is_down = false;

        return clear(e);
    }

    function move(e){

        if(is_down){

            dragged = true;

            const touch = pointer(e);

            swipe = imageW <= bodyW;

            const diff = (imageW - (imageW / zoom)) / 2;

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

            timer || request();
        }
        else{

            autohide();
        }

        return false; //clear(e);
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

            const curX = (x + 0.5) | 0;
            const curY = (y + 0.5) | 0;

            if((lastX !== curX) || (lastY !== curY)){

                setStyle(panel, "transform", "translate(" + (lastX = curX) + "px, " + (lastY = curY) + "px)");
            }
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

    function toggle_fullscreen(){

        if(toggle_fullscreen_mode()){

            this.firstElementChild.src = image_minimize;
        }
        else{

            this.firstElementChild.src = image_maximize;
        }
    }

    function zoom_reset(){

        //const body = document.body;
        //const image = getNode("#spotlight .scene img");

        //x = (body.clientWidth - image.naturalWidth) / 2;
        //y = (body.clientHeight - image.naturalHeight) / 2;

        x = 0;
        y = 0;

        toggle = (zoom === 1) && !toggle;

        setStyle(image, {

            "maxHeight": maxHeight = toggle ? "none" : "100%",
            "maxWidth": toggle ? "none" : "100%",
            "transform": "translate(-50%, -50%) scale(1)"
        });

        //panel.style.transform = toggle ? "translate(" + ((x + 0.5) | 0) + "px, " + ((y + 0.5) | 0) + "px)" : "";

        zoom = 1;
    }

    function zoom_in(){

        setStyle(image, "transform", "translate(-50%, -50%) scale(" + (zoom /= 0.65) + ")");

        autohide();
    }

    function zoom_out(){

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

            setStyle(image, "transform", "translate(-50%, -50%) scale(" + zoom + ")");
            //getNode("#spotlight .scene div").style.transform = "translate(" + x + "px, " + y + "px)";
        }

        autohide();
    }

    function show_gallery(){

        addClass(target,"show");

        autohide();
    }

    function close_gallery(){

        removeClass(target,"show");

        const images = getNodes("#spotlight .scene img");

        for(let i = 0; i < images.length; i++){

            images[i].src = transparent_pixel;
            images[i].loaded = false;
        }

        panel = null;
        image = null;
    }

    function arrow_left(){

        autohide();

        if(current_slide > 1){

            current_slide--;
            paginate();

            return true;
        }
    }

    function arrow_right(){

        autohide();

        if(current_slide < slide_count){

            current_slide++;
            paginate();

            return true;
        }
    }

    let contrast = false;

    function toggle_contrast(){

        autohide();

        if((contrast = !contrast)){

            addClass(target, "white");
        }
        else{

            removeClass(target, "white");
        }
    }

    function paginate(){

        x = 0;
        y = 0;
        zoom = 1;

        setStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
        setStyle(panel, "transform", "");
        setStyle(image, {
            "opacity": 0,
            "transform": "translate(-50%, -50%) scale(1)"
        });

        init_slide(current_slide);

        prepare_animated_style(image, {

            "opacity": 0,
            "transform": "translate(-50%, -50%) scale(0.8)",
            "maxHeight": "100%",
            "maxWidth": "100%"

        }, null, function(){

            setStyle(panel, "transform", "");
            setStyle(image, {
                "opacity": 1,
                "transform": "translate(-50%, -50%) scale(1)"
            });
        });

        setStyle("#spotlight .arrow-left", "visibility", current_slide === 1 ? "hidden" : "");
        setStyle("#spotlight .arrow-right", "visibility", current_slide === slide_count ? "hidden" : "");
        getNode("#spotlight .page").textContent = current_slide + " / " + slide_count;
    }

    function clear(event){

        event || (event = window.event);
        event.preventDefault();
        event.stopImmediatePropagation();
        event.returnValue = false;

        return false;
    }

    /**
     * Toggle fullscreen function who work with webkit and firefox.
     * @function toggle_fullscreen
     * @param {!Object=} target
     */

    function toggle_fullscreen_mode(target) {

        target || (target = document.documentElement || document.body);

        const isFullscreen = (

            document["isFullScreen"] ||
            document["webkitIsFullScreen"] ||
            document["mozFullScreen"] ||
            false
        );

        target["requestFullScreen"] || (target["requestFullScreen"] = (

            target["webkitRequestFullScreen"] ||
            target["msRequestFullScreen"] ||
            target["mozRequestFullScreen"] ||
            function(){}
        ));

        isFullscreen ? document["cancelFullScreen"]() : target["requestFullScreen"]();

        return !isFullscreen;
    }
}());
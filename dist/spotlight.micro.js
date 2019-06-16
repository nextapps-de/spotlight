/**!
 * @preserve Spotlight.js v0.4.0
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/spotlight
 */

(function(){

    "use strict";

    var EXTERNAL_URL = "https://rawcdn.githack.com/nextapps-de/spotlight/0.4.0/dist/";

    var kebab_cache = {};

    function createClassCache(node){

        var current_classes = node.classList;
        var cache = {};

        for(var a = 0; a < current_classes.length; a++){

            cache[current_classes[a]] = 1;
        }

        node._class = cache;
    }

    /**
     * @param selector
     * @param class_name
     */

    function addClass(selector, class_name){

        var nodes = getNodes(selector);

        if(typeof class_name === "string"){

            class_name = [class_name];
        }

        for(var a = 0; a < class_name.length; a++){

            var current_class = class_name[a];

            for(var i = 0; i < nodes.length; i++){

                var node = nodes[i];

                node._class || createClassCache(node);

                if(node._class[current_class]){

                    continue;
                }

                node._class[current_class] = 1;
                node.classList.add(current_class);
            }
        }
    }

    /**
     * @param selector
     * @param class_name
     */

    function removeClass(selector, class_name){

        var nodes = getNodes(selector);

        if(typeof class_name === "string"){

            class_name = [class_name];
        }

        for(var i = 0; i < nodes.length; i++){

            var node = nodes[i];

            for(var a = 0; a < class_name.length; a++){

                var current_class = class_name[a];

                node._class || createClassCache(node);

                if(!node._class[current_class]){

                    continue;
                }

                node._class[current_class] = 0;
                node.classList.remove(current_class);
            }
        }
    }

    /**
     * @param {string|Node|Element|Array} selector
     * @param {string|!Object} styles
     * @param {string|number=} value
     * @param {boolean=} force
     */

    function setStyle(selector, styles, value, force){

        var nodes = getNodes(selector);

        if(typeof styles === "string"){

            for(var i = 0; i < nodes.length; i++){

                var node = nodes[i];
                var node_style = node._style;

                node_style || (node._style = node_style = {});

                if(node_style[styles] === value){

                    continue;
                }

                node_style[styles] = value;
                node.style.setProperty(

                    kebab_cache[styles] || camel_to_kebab(styles),
                    value,
                    force || null
                );
            }
        }
        else{

            var keys = Object.keys(styles);

            for(var a = 0; a < keys.length; a++){

                var style = keys[a];

                value = styles[style];

                for(var i = 0; i < nodes.length; i++){

                    setStyle(nodes[i], style, value, force);
                }
            }
        }
    }

    function camel_to_kebab(style){

        return (

            kebab_cache[style] = style.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        );
    }

    var tmp = 0;

    /**
     * @param node
     * @param style
     * @param {string|number=} value
     */

    function prepareStyle(node, style, value){

        setStyle(node, "transition", "none");
        setStyle(node, style, value);

        // force styles (quick-fix for closure compiler):
        tmp || (tmp = node.clientTop && 0);

        setStyle(node, "transition", "");
    }

    /**
     * @param {string|Node|Element} selector
     * @param {string|Node|Element=} context
     */

    function getNode(selector, context){

        return (

            typeof selector === 'string' ?

                (context ?

                        getNode(context)
                    :
                        document

                ).querySelector(selector)
            :
                selector
        );
    }

    /**
     * @param {string|Node|Element|Array} selector
     * @param {string|Node|Element=} context
     */

    function getNodes(selector, context){

        if(selector.constructor === Array){

            selector = /** @type Array */ (selector);

            for(var i = 0; i < selector.length; i++){

                selector[i] = getNode(selector[i]);
            }

            return selector;
        }
        else if(typeof selector === "string"){

            return (

                context ?

                    getNode(context)
                :
                    document

            ).querySelectorAll(selector);
        }
        else{

            return [selector];
        }
    }

    /**
     * @param {string} classname
     * @param {Node|Element=} context
     * @returns {HTMLCollection}
     */

    function getByClass(classname, context){

        return (context || document).getElementsByClassName(classname);
    }

    /**
     * @param {string} tag
     * @param {Node|Element=} context
     * @returns {HTMLCollection}
     */

    function getByTag(tag, context){

        return (context || document).getElementsByTagName(tag);
    }

    /**
     * @param {!Window|Document|Element} node
     * @param {string} event
     * @param {Function} fn
     * @param {!AddEventListenerOptions|boolean=} mode
     */

    function addListener(node, event, fn, mode){

        handleListener("add", node, event, fn, mode);
    }

    /**
     * @param {!Window|Document|Element} node
     * @param {string} event
     * @param {Function} fn
     * @param {!AddEventListenerOptions|boolean=} mode
     */

    function removeListener(node, event, fn, mode){

        handleListener("remove", node, event, fn, mode);
    }

    /**
     * @param {string} type
     * @param {!Window|Document|Element} node
     * @param {string} event
     * @param {Function} fn
     * @param {!AddEventListenerOptions|boolean=} mode
     */

    function handleListener(type, node, event, fn, mode){

        node[type + "EventListener"](event || "click", fn, typeof mode === "undefined" ? true : mode);
    }

    /**
     * @param event
     * @param {boolean=} passive
     * @returns {boolean}
     */

    function clearEvent(event, passive){

        event || (event = window.event);

        if(event){

            passive || event.preventDefault();
            event.stopImmediatePropagation();
            event.returnValue = false
        }

        return false;
    }

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = EXTERNAL_URL + "css/spotlight.css";
    getByTag("head")[0].appendChild(link);

    var controls = [

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

    var x;
    var y;
    var startX;
    var startY;
    var bodyW;
    var bodyH;
    var imageW;
    var imageH;
    var maxHeight;
    var scale;

    var is_down = false;
    var dragged = false;
    var swipe = false;
    var changed = false;
    var toggle = false;
    var current_theme = false;

    var current_slide;
    var slide_count;
    /** @dict */
    var options;
    var options_infinite;

    var slider;
    var panel;
    var panes;
    var image;
    var target;
    var footer;
    var title;
    var description;
    var arrow_left;
    var arrow_right;
    var maximize;
    var page;
    var player;

    var playing = null;
    var timer = null;
    var hide = null;
    var doc;

    var event_definitions;

    function init_gallery(anchors, index){

        if((slide_count = anchors.length)){

            panes || (panes = getByClass("pane", target));

            var length = panes.length;

            var options_title = options["title"];
            var options_description = options["description"];

            // TODO initialize when sliding on the fly

            for(var i = 0; i < slide_count; i++){

                var anchor = anchors[i];

                var dataset;

                if(i < length){

                    dataset = panes[i];
                }
                else{

                    var clone = panes[0].cloneNode(true);

                    setStyle(clone, "left", (i * 100) + "%");
                    panes[0].parentNode.appendChild(clone);
                    dataset = clone;
                }

                var anchor_dataset = anchor.dataset;
                var tmp;

                dataset = dataset.dataset;
                dataset.src = anchor.href || anchor.src || anchor_dataset.src || anchor_dataset.href;

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

        // handle shorthand "zoom"

        var zoom = options["zoom"];

        if(zoom || (zoom === "")){

            options["zoom-in"] = options["zoom-out"] = zoom;

            delete options["zoom"];
        }

        var control = options["control"];

        // determine controls

        if(control || (control === "")){

            var whitelist = (

                typeof control === "string" ?

                    control.split(",")
                    :
                    control
            );

            // prepare to false when using whitelist

            for(var i = 0; i < controls.length; i++){

                options[controls[i]] = "false";
            }

            // apply whitelist

            for(var i = 0; i < whitelist.length; i++){

                var option = whitelist[i].trim();

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

        for(var i = 0; i < controls.length; i++){

            var option = controls[i];

            setStyle(getByClass(option, target)[0], "display", (options[option] === "false") ? "none" : "");
        }

        // apply theme

        if((current_theme = options["theme"]) === "white"){

            theme();
        }
    }

    function object_assign(target, source){

        var keys = Object.keys(source);

        for(var i = 0; i < keys.length; i++){

            var key = keys[i];

            target[key] = "" + source[key];
        }

        return target;
    }

    function init_slide(index){

        panel = panes[index - 1];
        image = /** @type {Image} */ (panel.firstElementChild);
        current_slide = index;

        if(!image){

            var show_preloader = (options["preloader"] !== "false");

            image = new Image();

            image.onload = /** @this {Image} */ function(){

                if(show_preloader){

                    removeClass(target, "loading");
                }

                setStyle(this, {

                    "visibility": "visible",
                    "opacity": 1,
                    "transform": ""
                });

                if((options["prefetch"] !== "false") && (index < slide_count)){

                    (new Image()).src = panes[index].dataset.src;
                }
            };

            image.onerror = /** @this {Image} */ function(){

                panel.removeChild(this);
            };

            panel.appendChild(image);
            image.src = panel.dataset.src;

            if(show_preloader){

                addClass(target, "loading");
            }

            return !show_preloader;
        }

        return true;
    }

    /**
     * @enum {number}
     */

    var keycodes = {

        "BACKSPACE": 8,
        "ESCAPE": 27,
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

    addListener(document, "DOMContentLoaded", function(){

        // add template

        target = document.createElement("div");
        target.id = "spotlight";
        target.innerHTML = '<div class=preloader></div><div class=scene><div class=pane></div></div><div class=header><div class=page></div><div class="icon fullscreen"></div><div class="icon autofit"></div><div class="icon zoom-out"></div><div class="icon zoom-in"></div><div class="icon theme"></div><div class="icon player"></div><div class="icon close"></div></div><div class="arrow arrow-left"></div><div class="arrow arrow-right"></div><div class=footer><div class=title></div><div class=description></div></div>';

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

        event_definitions = [

            [window, "keydown", key_listener],
            [window, "wheel", wheel_listener],
            [window, "hashchange", history_listener],
            [slider, "mousedown", start],
            [slider, "mouseleave", end],
            [slider, "mouseup", end],
            [slider, "mousemove", move],

            [slider, "touchstart", start, {"passive": true}],
            [slider, "touchcancel", end],
            [slider, "touchend", end],
            [slider, "touchmove", move, {"passive": true}],

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

        addListener(document, "", dispatch);

    },{ once: true });

    /**
     * @param {boolean=} install
     */

    function install_listener(install){

        for(var i = 0; i < event_definitions.length; i++){

            var def = event_definitions[i];

            (install ? addListener : removeListener)(

                def[0], def[1], def[2], def[3]
            );
        }
    }

    /**
     * @this {Element}
     */

    function dispatch(event){

        var self = closest.call(event.target, ".spotlight");

        if(!self){

            return;
        }

        var context = closest.call(self, ".spotlight-group");
        var anchors = getByClass("spotlight", context);

        apply_options(self.dataset, context && context.dataset);

        // determine index

        for(var i = 0; i < anchors.length; i++){

            if(anchors[i] === self){

                init_gallery(anchors, i + 1);
                break;
            }
        }

        show_gallery();

        return clearEvent(event);
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

            var delta = event["deltaY"];
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

        var state = (typeof init === "boolean" ? init : !playing);

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

        var option_autohide = options["autohide"];

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

    function menu(e){

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

        return clearEvent(e);
    }

    function start(e){

        is_down = true;
        dragged = false;

        var touch = pointer(e);

        bodyW = document.body.clientWidth;
        bodyH = document.body.clientHeight;
        imageW = image.width * scale;
        imageH = image.height * scale;
        swipe = imageW <= bodyW;
        startX = touch.x;
        startY = touch.y;

        return clearEvent(e, true);
    }

    function end(e){

        if(is_down && !dragged){

            is_down = false;

            return menu(e);
        }
        else if(swipe && dragged){

            prepareStyle(slider, "transform", "translateX(" + (-((current_slide - 1) * 100 - (x / bodyW * 100))) + "%)");

            if((x < -(bodyH / 10)) && next()){


            }
            else if((x > bodyH / 10) && prev()){


            }
            else{

                setStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
            }

            x = 0;
            swipe = false;

            setStyle(panel, "transform", "");
        }

        is_down = false;

        return clearEvent(e);
    }

    function move(e){

        if(is_down){

            timer || request();

            var touch = pointer(e);
            var diff = (imageW - bodyW) / 2;

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
                var diff = maxHeight === "none" ? (imageH - bodyH) / 2 : (imageH - bodyH) / 2;

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

        return clearEvent(e, true);
    }

    function pointer(event){

        var touches = event.touches;

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

    function fullscreen(init){

        var isFullscreen = (

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

    function autofit(init){

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

    function zoom(factor){

        setStyle(image, "transform", "translate(-50%, -50%) scale(" + (factor || 1) + ")");
    }

    /**
     * @param {boolean=} prevent_autohide
     */

    function zoom_out(prevent_autohide){

        var value = scale * 0.65;

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

        install_listener(true);

        setStyle(target, "transition", "");
        addClass(doc, "hide-scrollbars");
        addClass(target, "show");
        autohide();
    }

    /**
     * @param {boolean=} hashchange
     */

    function close(hashchange){

        install_listener(false);

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

    function prev(){

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

    function next(){

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

    function goto(slide){

        if(slide !== current_slide){

            playing || autohide();

            var dir = slide > current_slide;

            current_slide = slide;
            paginate(dir);

            return true;
        }
    }

    /**
     * @param {boolean=} init
     */

    function theme(init){

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

        var option = options["animation"];

        var animation_scale = true;
        var animation_fade = true;
        var animation_slide = true;
        var animation_rotate = false;

        if(option || (option === "")){

            animation_scale = false;
            animation_fade = false;
            animation_slide = false;
            animation_rotate = false;

            var effects = option.split(",");

            for(var i = 0; i < effects.length; i++){

                var effect = effects[i].trim();

                if(effect === "scale") animation_scale = true;
                else if(effect === "fade") animation_fade = true;
                else if(effect === "slide") animation_slide = true;
                else if(effect === "rotate") animation_rotate = true;
            }
        }

        setStyle(slider, "transition", animation_slide ? "" : "none");
        setStyle(slider, "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");

        if(panel){

            setStyle(panel, "transform", "");
        }

        if(image){

            setStyle(image, {
                "opacity": animation_fade ? 0 : 1,
                "transform": ""
            });

            var ref = image;

            setTimeout(function(){

                if(ref && (image !== ref) && ref.parentNode){

                    ref.parentNode.removeChild(ref);
                }

            }, 800);
        }

        var image_exist = init_slide(current_slide);

        prepareStyle(image, {
            "opacity": animation_fade ? 0 : 1,
            "transform": "translate(-50%, -50%)" + (animation_scale ? " scale(0.8)" : "") + (animation_rotate && (typeof direction !== "undefined") ? " rotateY(" + (direction ? "" : "-") + "90deg)" : ""),
            "maxHeight": "",
            "maxWidth": ""
        });

        if(image_exist) setStyle(image, {
            "visibility": "visible",
            "opacity": 1,
            "transform": ""
        });

        setStyle(panel, "transform", "");
        setStyle(arrow_left, "visibility", !options_infinite && (current_slide === 1) ? "hidden" : "");
        setStyle(arrow_right, "visibility", !options_infinite && (current_slide === slide_count) ? "hidden" : "");

        var dataset = panel.dataset;
        var has_content = dataset.title || dataset.description;

        if(has_content){

            title.textContent = dataset.title || "";
            description.textContent = dataset.description || "";
        }

        setStyle(footer, "visibility", has_content ? "visible" : "hidden");

        page.textContent = current_slide + " / " + slide_count;
    }

    function show(payload, config){

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

    var closest = Element.prototype.closest || function(classname){

        var node = this;

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
}());
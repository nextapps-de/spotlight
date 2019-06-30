/**!
 * @preserve Spotlight.js v0.6.3
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/spotlight
 */

(function(){

    "use strict";

    var kebab_cache = {};

    function createClassCache(node){

        var current_classes = node.classList;
        var cache = {};

        for(var a = 0; a < current_classes.length; a++){

            cache[current_classes[a]] = 1;
        }

        node._class = cache;
        node._classList = current_classes;
    }

    /**
     * @param selector
     * @param class_name
     */

    function addClass(selector, class_name){

        var nodes = getNodes(selector);
        var is_string = typeof class_name === "string";

        if(nodes.length){

            for(var i = 0; i < nodes.length; i++){

                (is_string ? addClassPerform : addClassNames)(nodes[i], class_name);
            }
        }
        else{

            (is_string ? addClassPerform : addClassNames)(nodes, class_name);
        }
    }

    function addClassNames(node, class_name){

        for(var i = 0; i < class_name.length; i++){

            addClassPerform(node, class_name[i]);
        }
    }

    function addClassPerform(node, current_class){

        node._class || createClassCache(node);

        if(!node._class[current_class]){

            node._class[current_class] = 1;
            node._classList.add(current_class);
        }
    }

    /**
     * @param selector
     * @param class_name
     */

    function removeClass(selector, class_name){

        var nodes = getNodes(selector);
        var is_string = typeof class_name === "string";

        if(nodes.length){

            for(var i = 0; i < nodes.length; i++){

                (is_string ? removeClassPerform : removeClassNames)(nodes[i], class_name);
            }
        }
        else{

            (is_string ? removeClassPerform : removeClassNames)(nodes, class_name);
        }
    }

    function removeClassNames(node, class_name){

        for(var i = 0; i < class_name.length; i++){

            removeClassPerform(node, class_name[i]);
        }
    }

    function removeClassPerform(node, current_class){

        node._class || createClassCache(node);

        if(node._class[current_class]){

            node._class[current_class] = 0;
            node._classList.remove(current_class);
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
        var is_string = typeof styles === "string";
        var keys = !is_string && Object.keys(/** @type {!Object} */ (styles));

        if(nodes.length){

            for(var i = 0; i < nodes.length; i++){

                (keys ? setStyleProps : setStylePerform)(nodes[i], styles, keys || value, force);
            }
        }
        else{

            (keys ? setStyleProps : setStylePerform)(nodes, styles, keys || value, force);
        }
    }

    function setStyleProps(node, styles, keys, force){

        for(var a = 0; a < keys.length; a++){

            var style = keys[a];

            setStylePerform(node, style, styles[style], force);
        }
    }

    function setStylePerform(node, styles, value, force){

        var node_style = node._style;

        node_style || (node._style = node_style = {});

        if(node_style[styles] === value){

            return;
        }

        node_style[styles] = value;

        (node._style_ref || (node._style_ref = node.style)).setProperty(

            kebab_cache[styles] || camel_to_kebab(styles),
            value,
            force ? "important" : null
        );
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

        // force applying styles (quick-fix for closure compiler):
        tmp || (tmp = node.clientTop && 0);

        setStyle(node, "transition", "");
    }

    function setText(selector, text){

        text || (text = "");

        var nodes = getNodes(selector);

        if(nodes.length){

            for(var i = 0; i < nodes.length; i++){

                setTextProcess(nodes[i], text);
            }
        }
        else{

            setTextProcess(nodes, text);
        }
    }

    function setTextProcess(node, text){

        if(node._text === text){

            return;
        }

        node._text = text;
        node.textContent = text;
    }

    /**
     * @param {string|Node|Element} selector
     * @param {string|Node|Element=} context
     */

    function getNode(selector, context){

        return getNodeProcess(selector, context, 0);
    }

    /**
     * @param {string|Node|Element|Array} selector
     * @param {string|Node|Element=} context
     */

    function getNodes(selector, context){

        return getNodeProcess(selector, context, 1);
    }

    function getNodeProcess(selector, context, all){

        return (

            typeof selector === "string" ?

                (context ?

                        getNode(context)
                    :
                        document

                )[all ? "querySelectorAll" : "querySelector"](selector)
            :
                selector
        );
    }

    function getById(id){

        return document.getElementById(id);
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

    function cancelEvent(event, passive){

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
    link.href = "https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/css/spotlight.css";
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
        "player",
        "progress"
    ];

    var x;
    var y;
    var startX;
    var startY;
    var viewportW;
    var viewportH;
    var imageW;
    var imageH;
    var scale;

    var is_down;
    var dragged;
    var draggable;
    var changed;
    var toggle;
    var toggle_theme;
    var current_theme;

    var current_slide;
    var slide_count;
    /** @dict */
    var options;
    var options_infinite;
    var options_progress;
    var options_onchange;
    var delay;

    var panel;
    var panes;
    var image;
    var slider;
    var target;
    var footer;
    var title;
    var description;
    var arrow_left;
    var arrow_right;
    var maximize;
    var page;
    var player;
    var progress;
    var preloader;

    var playing;
    var timer;
    var hide;
    var doc;
    var gallery;

    var event_definitions;

    /**
     * @param {string} class_name
     * @returns {Element}
     */

    function getOneByClass(class_name){

        return getByClass(class_name, target)[0];
    }

    function init_gallery(anchors, index){

        if((slide_count = anchors.length)){

            panes || (panes = getByClass("pane", target));

            var length = panes.length;
            var options_title = options["title"];
            var options_description = options["description"];

            gallery = new Array(slide_count);

            // TODO initialize when sliding on the fly

            for(var i = 0; i < slide_count; i++){

                var anchor = anchors[i];
                var anchor_dataset = anchor.dataset;

                if(i >= length){

                    var clone = panes[0].cloneNode(false);

                    setStyle(clone, "left", (i * 100) + "%");
                    panes[0].parentNode.appendChild(clone);
                }

                var tmp;

                gallery[i] = {

                    src: (
                        (anchor_dataset && (anchor_dataset.href || anchor_dataset.src)) ||
                        anchor.src ||
                        anchor.href
                    ),
                    title: (
                        (anchor_dataset && anchor_dataset.title) ||
                        anchor["title"] ||
                        ((tmp = getByTag("img", anchor)).length && tmp[0]["alt"]) ||
                        options_title ||
                        ""
                    ),
                    description: (
                        (anchor_dataset && anchor_dataset.description) ||
                        anchor["description"] ||
                        options_description ||
                        ""
                    )
                };
            }

            current_slide = index || 1;
            update_slider(true);
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

        options_onchange = anchor["onchange"];
        options_infinite = options["infinite"];
        options_infinite = (typeof options_infinite !== "undefined") && (options_infinite !== "false");
        options_progress = options["progress"] !== "false";
        delay = (options["player"] * 1) || 7000;

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

            setStyle(getOneByClass(option), "display", (options[option] === "false") ? "none" : "");
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

    var keycodes = {

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
        target.innerHTML = '<div class=preloader></div><div class=scene><div class=pane></div></div><div class=header><div class=page></div><div class="icon fullscreen"></div><div class="icon autofit"></div><div class="icon zoom-out"></div><div class="icon zoom-in"></div><div class="icon theme"></div><div class="icon player"></div><div class="icon close"></div></div><div class=progress></div><div class="arrow arrow-left"></div><div class="arrow arrow-right"></div><div class=footer><div class=title></div><div class=description></div></div>';

        setStyle(target, "transition", "none");

        document.body.appendChild(target);

        // cache static elements

        slider = getOneByClass("scene");
        footer = getOneByClass("footer");
        title = getOneByClass("title");
        description = getOneByClass("description");
        arrow_left = getOneByClass("arrow-left");
        arrow_right = getOneByClass("arrow-right");
        maximize = getOneByClass("fullscreen");
        page = getOneByClass("page");
        player = getOneByClass("player");
        progress = getOneByClass("progress");
        preloader = getOneByClass("preloader");
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

        //var drag = getOneByClass("drag");

        event_definitions = [

            [window, "keydown", key_listener],
            [window, "wheel", wheel_listener],
            [window, "hashchange", history_listener],
            [window, "resize", resize_listener],

            [preloader, "mousedown", start],
            [preloader, "mouseleave", end],
            [preloader, "mouseup", end],
            [preloader, "mousemove", move],

            [preloader, "touchstart", start, {"passive": false}],
            [preloader, "touchcancel", end],
            [preloader, "touchend", end],
            [preloader, "touchmove", move, {"passive": true}],

            [maximize,"", fullscreen],
            [arrow_left, "", prev],
            [arrow_right, "", next],
            [player, "", play],

            [getOneByClass("autofit"),"", autofit],
            [getOneByClass("zoom-in"),"", zoom_in],
            [getOneByClass("zoom-out"),"", zoom_out],
            [getOneByClass("close"),"", close],
            [getOneByClass("theme"), "", theme]
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
     * @param {number=} x
     * @param {number=} y
     */

    function update_panel(x, y){

        setStyle(panel, "transform", x || y ? "translate(" + x + "px, " + y + "px)" : "");
    }

    /**
     * @param {boolean=} prepare
     * @param {number=} value
     */

    function update_slider(prepare, value){

        (prepare ? prepareStyle : setStyle)(slider, "transform", "translateX(" + (-(current_slide - 1) * 100 + (value || 0)) + "%)");
    }

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

        var option_autohide = options["autohide"];

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

        return cancelEvent(e);
    }

    function start(e){

        is_down = true;
        dragged = false;

        var touch = pointer(e);

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

            update_slider(true, x / viewportW * 100);

            if((x < -(viewportH / 10)) && next()){


            }
            else if((x > viewportH / 10) && prev()){


            }
            else{

                update_slider();
            }

            x = 0;
            draggable = false;

            update_panel();
        }

        is_down = false;

        return cancelEvent(e);
    }

    function move(e){

        if(is_down){

            timer || request();

            var touch = pointer(e);
            var diff = (imageW * scale - viewportW) / 2;

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
                var diff = ((imageH * scale) - viewportH) / 2;

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

            update_panel(x, y);
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

        update_panel();
        autohide();
    }

    /**
     * @param {boolean=} prevent_autohide
     */

    function zoom_in(prevent_autohide){

        var value = scale / 0.65;

        if(value <= 5){

            zoom(scale = value);
        }

        prevent_autohide || autohide();
    }

    /**
     * @param {number=} factor
     */

    function zoom(factor){

        scale = factor || 1;

        update_scroll();
    }

    /**
     * @param {boolean=} prevent_autohide
     */

    function zoom_out(prevent_autohide){

        var value = scale * 0.65;

        if(value >= 1){

            zoom(scale = value);

            x = 0;
            y = 0;
            changed = true;

            update_panel();
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

    function close(hashchange){

        install_listener(false);

        history.go(hashchange === true ? -1 : -2);

        removeClass(doc, "hide-scrollbars");
        removeClass(target, "show");

        if(playing){

            play(false);
        }

        image.parentNode.removeChild(image);

        panel = panes = image = gallery = options = options_onchange = null;
    }

    function prev(){

        if(current_slide > 1){

            return goto(current_slide - 1);
        }
        else if(playing || options_infinite){

            return goto(slide_count);
        }
    }

    function next(){

        if(current_slide < slide_count){

            return goto(current_slide + 1);
        }
        else if(playing || options_infinite){

            return goto(1);
        }
    }

    function goto(slide){

        if(!playing || !is_down){

            if(slide !== current_slide){

                playing || autohide();

                if(playing && options_progress){

                    animate_bar();
                }

                var dir = slide > current_slide;

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

    function theme(init){

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

        var option = options["animation"];

        var animation_scale = true;
        var animation_fade = true;
        var animation_slide = true;
        var animation_flip;
        var animation_custom;

        if(option || (option === "")){

            animation_scale =
                animation_fade =
                    animation_slide = false;

            var effects = (

                typeof option === "string" ?

                    option.split(",")
                    :
                    option
            );

            for(var i = 0; i < effects.length; i++){

                var effect = effects[i].trim();

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

        setStyle(slider, "transition", animation_slide ? "" : "none");
        update_slider();

        if(panel){

            update_panel();
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

        update_panel();
        setStyle(arrow_left, "visibility", !options_infinite && (current_slide === 1) ? "hidden" : "");
        setStyle(arrow_right, "visibility", !options_infinite && (current_slide === slide_count) ? "hidden" : "");

        var dataset = gallery[current_slide - 1];
        var has_content = dataset.title || dataset.description;

        if(has_content){

            setText(title, dataset.title);
            setText(description, dataset.description);
        }

        setStyle(footer, "visibility", has_content ? "visible" : "hidden");
        setText(page, current_slide + " / " + slide_count);

        options_onchange && options_onchange(current_slide);
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
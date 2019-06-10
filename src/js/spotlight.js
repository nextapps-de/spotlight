import "./config.js";
import { addClass, getNode, getNodes, hasClass, removeClass, setStyle } from "./dom.js";
import images_base64 from "../../tmp/images.js";
import stylesheet from "../../tmp/style.js";
import template from "./template.js";

const transparent_pixel = BUILD_BUNDLE ? images_base64["pixel"] : "img/pixel.gif";
const image_preloader = BUILD_BUNDLE ? images_base64["preloader"] : "img/preloader.gif";
const image_maximize = BUILD_BUNDLE ? images_base64["maximize"] : "img/maximize.svg";
const image_minimize = BUILD_BUNDLE ? images_base64["minimize"] : "img/minimize.svg";
const image_arrow = BUILD_BUNDLE ? images_base64["arrow"] : "img/arrow.svg";
const image_close = BUILD_BUNDLE ? images_base64["close"] : "img/close.svg";
const image_zoom_in = BUILD_BUNDLE ? images_base64["zoomin"] : "img/zoom-in.svg";
const image_zoom_out = BUILD_BUNDLE ? images_base64["zoomout"] : "img/zoom-out.svg";
const image_original = BUILD_BUNDLE ? images_base64["original"] : "img/original.svg";
const image_contrast = BUILD_BUNDLE ? images_base64["contrast"] : "img/contrast.svg";

if(BUILD_BUNDLE){

    const style = document.createElement("style");
    style.innerHTML = stylesheet;
    getNode("head").appendChild(style);
}

let timer = null;
let is_down = false;
let changed = false;
let toggle = false;
let swipe = false;
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
let panel_style;
let image;
let image_style;
let target;
let current_slide;
let slide_count;

window["dispatch_spotlight"] = /** @this {Element} */ function(event){

    const context = this.closest(".spotlight-group");
    const anchors = getNodes(".spotlight", context);

    for(let i = 0; i < anchors.length; i++){

        if(anchors[i] === this){

            show_slide(context, i + 1);
            break;
        }
    }

    return clear(event);
};

function init_slide(index){

    panel = getNodes(".pane", slider)[index - 1];
    panel_style = panel.style;
    image = /** @type {Image} */ (panel.firstElementChild);
    image_style = image.style;
    current_slide = index;

    if(!image.loaded){

        addClass(target, "loading");

        const src = image.src;
        image.src = transparent_pixel;

        image.onload = /** @this {Image} */ function(){

            this.onload = null;
            this.loaded = true;

            setStyle(this, {

                "opacity": 1,
                "transform": "translate(-50%, -50%) scale(1)"
            });

            removeClass(target, "loading");
        };

        image.src = src;
    }
    else{

        image_style.opacity = 1;
        image_style.transform = "translate(-50%, -50%) scale(1)";
    }
}

export function show_slide(context, index){

    const anchors = getNodes(".spotlight", context);

    slide_count = anchors.length;

    if(slide_count){

        const refs = getNodes("#spotlight .pane");
        const length = refs.length;

        for(let i = 0; i < slide_count; i++){

            let image, image_style;

            if(i < length){

                image = refs[i].firstElementChild;
                image.src = anchors[i].href;
                image.loaded = false;
                image_style = image.style;
            }
            else{

                const clone = refs[0].cloneNode(true);

                image = clone.firstElementChild;
                image.src = anchors[i].href;
                image.loaded = false;
                clone.style.left = (i * 100) + "%";
                refs[0].parentNode.appendChild(clone);
                image_style = image.style;
            }

            image_style.transition = "none";
            image_style.opacity = 0;
            image_style.transform = "translate(-50%, -50%) scale(0.8)";
            image_style.maxHeight = "100%";
            image_style.maxWidth = "100%";

            setTimeout(function(){

                image_style.transition = "transform 1s cubic-bezier(0.1, 1, 0.1, 1), opacity 1s cubic-bezier(0.1, 1, 0.1, 1)";
            });
        }

        slider.style.transition = "none";
        slider.style.transform = "translateX(-" + (((index || 1) - 1) * 100) + "%)";

        setTimeout(function(){

            slider.style.transition = "transform 1s cubic-bezier(0.1, 1, 0.1, 1)";

            init_slide(index || 1);
            paginate();
            show_gallery();
        });
    }
}

add_listener(document, "DOMContentLoaded", function(){

    // https://kangax.github.io/html-minifier/

    target = document.createElement("div");
    target.id = "spotlight";
    target.style.backgroundImage = "url(" + image_preloader + ")";
    target.innerHTML = template.replace("{image_maximize}", image_maximize)
                               .replace("{image_original}", image_original)
                               .replace("{image_zoom_out}", image_zoom_out)
                               .replace("{image_zoom_in}", image_zoom_in)
                               .replace("{image_close}", image_close)
                               .replace("{image_arrow}", image_arrow)
                               .replace("{image_arrow}", image_arrow)
                               .replace("{image_contrast}", image_contrast);

    document.body.appendChild(target);

    slider = getNode(".scene", target);

    add_listener(slider, "mousedown", start, true);
    add_listener(slider, "mouseleave", end, true);
    add_listener(slider, "mouseup", end, true);
    add_listener(slider, "mousemove", move, true);

    add_listener(slider, "touchstart", start, true);
    add_listener(slider, "touchcancel", end, true);
    add_listener(slider, "touchend", end, true);
    add_listener(slider, "touchmove", move, true);

    add_listener(getNode(".toggle-fullscreen", target),"", toggle_fullscreen);
    add_listener(getNode(".toggle-zoom", target),"", toggle_zoom);
    add_listener(getNode(".zoom-in", target),"", zoom_in);
    add_listener(getNode(".zoom-out", target),"", zoom_out);
    add_listener(getNode(".close-gallery", target),"", close_gallery);
    add_listener(getNode(".arrow-left", target), "", arrow_left);
    add_listener(getNode(".arrow-right", target), "", arrow_right);
    add_listener(getNode(".toggle-contrast", target), "", toggle_contrast);
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
 * @param {boolean=} mode
 */

function add_listener(node, event, fn, mode){

    node.addEventListener(event || "click", fn, mode);
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

function start(e){

    if(hide){

        hide = clearTimeout(hide);
        removeClass(target, "menu");
    }
    else{

        autohide();
    }

    const touch = pointer(e);

    bodyW = document.body.clientWidth;
    bodyH = document.body.clientHeight;
    imageW = image.width * zoom;
    imageH = image.height * zoom;
    swipe = imageW <= bodyW;
    is_down = true;
    startX = touch.x;
    startY = touch.y;

    return clear(e);
}

function end(e){

    if(swipe){

        setStyle("#spotlight .scene", "transition", "none");
        setStyle("#spotlight .scene", "transform", "translateX(" + (-((current_slide - 1) * 100 - (100 / bodyW * x))) + "%)");

        setTimeout(function(){

            setStyle("#spotlight .scene", "transition", "transform 1s cubic-bezier(0.1, 1, 0.1, 1)");

            if((x < -(bodyH / 5)) && arrow_right()){


            }
            else if((x > bodyH / 5) && arrow_left()){


            }
            else{

                setStyle("#spotlight .scene", "transform", "translateX(-" + ((current_slide - 1) * 100) + "%)");
            }

            x = 0;
            swipe = false;
            panel_style.transform = "";
        });
    }

    is_down = false;

    return clear(e);
}

function move(e){

    autohide();

    if(is_down){

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

    return clear(e);
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

            panel_style.setProperty("transform", "translate(" + (lastX = curX) + "px, " + (lastY = curY) + "px)");
        }
    }
    else{

        timer = null;
    }

    changed = false;
}

function request(){

    timer = window.requestAnimationFrame(update);
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

function toggle_zoom(){

    //const body = document.body;
    //const image = getNode("#spotlight .scene img");

    //x = (body.clientWidth - image.naturalWidth) / 2;
    //y = (body.clientHeight - image.naturalHeight) / 2;

    x = 0;
    y = 0;

    toggle = (zoom === 1) && !toggle;

    image_style.maxHeight = maxHeight = toggle ? "none" : "100%";
    image_style.maxWidth = toggle ? "none" : "100%";
    image_style.transform = "translate(-50%, -50%) scale(1)";
    //panel_style.transform = toggle ? "translate(" + ((x + 0.5) | 0) + "px, " + ((y + 0.5) | 0) + "px)" : "";

    zoom = 1;
}

function zoom_in(){

    image_style.transform = "translate(-50%, -50%) scale(" + (zoom /= 0.65) + ")";

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

        image_style.transform = "translate(-50%, -50%) scale(" + zoom + ")";
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
    panel_style = null;
    image = null;
    image_style = null;
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

    panel_style.transform = "";
    image_style.opacity = 0;
    image_style.transform = "translate(-50%, -50%) scale(1)";

    init_slide(current_slide);

    panel_style.transform = "";
    image_style.opacity = 1;
    image_style.transform = "translate(-50%, -50%) scale(1)";

    if(current_slide === 1){

        setStyle("#spotlight .arrow-left", "visibility", "hidden");
    }
    else{

        setStyle("#spotlight .arrow-left", "visibility", "");
    }

    if(current_slide === slide_count){

        setStyle("#spotlight .arrow-right", "visibility", "hidden");
    }
    else{

        setStyle("#spotlight .arrow-right", "visibility", "");
    }

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

    const body = (

        target ||
        document.documentElement ||
        document.body
    );

    const isFullscreen = (

        document["isFullScreen"] ||
        document["webkitIsFullScreen"] ||
        document["mozFullScreen"] ||
        false
    );

    body["requestFullScreen"] || (body["requestFullScreen"] = (

        body["requestFullScreen"] ||
        body["webkitRequestFullScreen"] ||
        body["msRequestFullScreen"] ||
        body["mozRequestFullScreen"] ||
        function() { return false; }
    ));

    document["cancelFullScreen"] || (document["cancelFullScreen"] = (

        document["cancelFullScreen"] ||
        document["exitFullscreen"] ||
        document["webkitCancelFullScreen"] ||
        document["webkitExitFullscreen"] ||
        document["mozCancelFullScreen"] ||
        function() { return false; }
    ));

    isFullscreen ? document["cancelFullScreen"]() : body["requestFullScreen"]();

    return !isFullscreen;
}
/**
 * @param node
 * @param class_name
 */

export function addClass(node, class_name){

    toggleClass(node, class_name, true);
}

/**
 * @param node
 * @param class_name
 */

export function removeClass(node, class_name){

    toggleClass(node, class_name);
}

/**
 * @param node
 * @param class_name
 * @param {?=} state
 */

export function toggleClass(node, class_name, state){

    node.classList[state ? "add" : "remove"](class_name);
}

/**
 * @param node
 * @param class_name
 */

export function hasClass(node, class_name){

    return node.classList.contains(class_name);
}

/**
 * @param {HTMLElement} node
 * @param {string} style
 * @param {string|number} value
 */

export function setStyle(node, style, value){

    value = "" + value;

    if(node["_s_" + style] !== value){

        node.style.setProperty(style, value);
        node["_s_" + style] = value;
    }
}

let tmp = 0;

/**
 * @param node
 * @param {Function=} fn
 */

export function prepareStyle(node, fn){

    if(fn){

        setStyle(node, "transition", "none");
        fn();
    }

    // force applying styles (quick-fix for closure compiler):
    tmp || (tmp = node.clientTop && 0); // clientWidth

    fn && setStyle(node, "transition", "");
}

export function setText(node, text){

    node.firstChild.nodeValue = text;
}

/**
 * @param {string} classname
 * @param {Node|Element=} context
 * @returns {HTMLCollection}
 */

export function getByClass(classname, context){

    return (context || document).getElementsByClassName(classname);
}

/**
 * @param {string} tag
 * @param {Node|Element=} context
 * @returns {HTMLCollection}
 */

export function getByTag(tag, context){

    return (context || document).getElementsByTagName(tag);
}

/**
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {AddEventListenerOptions|boolean=} mode
 */

export function addListener(node, event, fn, mode){

    toggleListener(true, node, event, fn, mode);
}

/**
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {EventListenerOptions|boolean=} mode
 */

export function removeListener(node, event, fn, mode){

    toggleListener(false, node, event, fn, mode);
}

/**
 * @param {boolean|undefined} state
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {EventListenerOptions|boolean=} mode
 */

export function toggleListener(state, node, event, fn, mode){

    node[(state ? "add" : "remove") + "EventListener"](event, fn, mode || (mode === false) ? mode : true);
}

/**
 * @param event
 * @param {boolean=} prevent
 */

export function cancelEvent(event, prevent){

    event.stopPropagation();
    //event.stopImmediatePropagation();
    prevent && event.preventDefault();
}

export function downloadImage(body, image){

    const link = /** @type {HTMLAnchorElement} */ (createElement("a"));
    const src = image.src;
    link.href = src;
    link.download = src.substring(src.lastIndexOf("/") + 1);
    body.appendChild(link);
    link.click();
    body.removeChild(link);
}

/**
 * @param {!string} element
 * @return {Element}
 */

export function createElement(element){

    return document.createElement(element);
}

/**
 * @param node
 * @param {boolean=} state
 */

export function toggleDisplay(node, state){

    setStyle(node, "display", state ? "" : "none");
}

/**
 * @param node
 * @param {boolean=} state
 */

export function toggleVisibility(node, state){

    setStyle(node, "visibility", state ? "" : "hidden");
}

/**
 * @param node
 * @param {boolean=} state
 */

export function toggleAnimation(node, state){

    setStyle(node, "transition", state ? "" : "none");
}

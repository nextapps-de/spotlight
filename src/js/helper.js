/**
 * @param node
 * @param class_name
 */

export function addClass(node, class_name){

    node.classList.add(class_name);
}

/**
 * @param node
 * @param class_name
 */

export function removeClass(node, class_name){

    node.classList.remove(class_name);
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
 * @param fn
 */

export function prepareStyle(node, fn){

    setStyle(node, "transition", "none");

    fn();

    // force applying styles (quick-fix for closure compiler):
    tmp || (tmp = node.clientTop && 0); // clientWidth

    setStyle(node, "transition", "");
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

    node.addEventListener(event, fn, mode || (mode === false) ? mode : true);
}

/**
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {EventListenerOptions|boolean=} mode
 */

export function removeListener(node, event, fn, mode){

    node.removeEventListener(event, fn, mode || (mode === false) ? mode : true);
}

/**
 * @param event
 * @param {boolean=} prevent
 */

export function cancelEvent(event, prevent){

    //event || (event = window.event);

    //if(event){

    event.stopPropagation();
    //event.stopImmediatePropagation();
    prevent && event.preventDefault();
        //passive || (event.returnValue = false);
    //}

    //return false;
}

/**
 * @param {!string} element
 * @return {Element}
 */

export function createElement(element){

    return document.createElement(element);
}
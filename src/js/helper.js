const kebab_cache = {};

/**
 * @param selector
 * @param class_name
 */

export function addClass(selector, class_name){

    const nodes = getNodes(selector);
    const is_string = typeof class_name === "string";

    if(nodes.length){

        for(let i = 0; i < nodes.length; i++){

            (is_string ? addClassPerform : addClassNames)(nodes[i], class_name);
        }
    }
    else{

        (is_string ? addClassPerform : addClassNames)(nodes, class_name);
    }
}

function addClassNames(node, class_name){

    for(let i = 0; i < class_name.length; i++){

        addClassPerform(node, class_name[i]);
    }
}

function addClassPerform(node, current_class){

    node.classList.add(current_class);
}

/**
 * @param selector
 * @param class_name
 */

export function removeClass(selector, class_name){

    const nodes = getNodes(selector);
    const is_string = typeof class_name === "string";

    if(nodes.length){

        for(let i = 0; i < nodes.length; i++){

            (is_string ? removeClassPerform : removeClassNames)(nodes[i], class_name);
        }
    }
    else{

        (is_string ? removeClassPerform : removeClassNames)(nodes, class_name);
    }
}

function removeClassNames(node, class_name){

    for(let i = 0; i < class_name.length; i++){

        removeClassPerform(node, class_name[i]);
    }
}

function removeClassPerform(node, current_class){

    node.classList.remove(current_class);
}

/**
 * @param selector
 * @param class_name
 * @param {boolean=} toggle_state
 */

export function toggleClass(selector, class_name, toggle_state){

    if(typeof toggle_state !== "undefined"){

        if(toggle_state){

            addClass(selector, class_name);
        }
        else{

            removeClass(selector, class_name);
        }
    }
    else{

        const nodes = getNodes(selector);
        const is_string = typeof class_name === "string";

        if(nodes.length){

            for(let i = 0; i < nodes.length; i++){

                (is_string ? toggleClassPerform : toggleClassNames)(nodes[i], class_name);
            }
        }
        else{

            (is_string ? toggleClassPerform : toggleClassNames)(nodes, class_name);
        }
    }
}

function toggleClassNames(node, class_name){

    for(let i = 0; i < class_name.length; i++){

        toggleClassPerform(node, class_name[i]);
    }
}

function toggleClassPerform(node, current_class){

    node.classList.toggle(current_class);
}

/**
 * @param selector
 * @param class_name
 * @returns {boolean}
 */

export function hasClass(selector, class_name){

    const nodes = getNodes(selector);

    if(nodes.length){

        for(let i = 0; i < nodes.length; i++){

            if(hasClassPerform(nodes[i], class_name)){

                return true;
            }
        }

        return false;
    }
    else{

        return hasClassPerform(nodes, class_name);
    }
}

function hasClassPerform(node, class_name){

    return node.classList.contains(class_name);
}

/**
 * @param {string|Node|Element|Array} selector
 * @param {string|!Object} styles
 * @param {string|number=} value
 * @param {boolean=} force
 */

export function setStyle(selector, styles, value, force){

    const nodes = getNodes(selector);
    const is_string = typeof styles === "string";
    const keys = !is_string && Object.keys(/** @type {!Object} */ (styles));

    if(nodes.length){

        for(let i = 0; i < nodes.length; i++){

            (keys ? setStyleProps : setStylePerform)(nodes[i], styles, keys || value, force);
        }
    }
    else{

        (keys ? setStyleProps : setStylePerform)(nodes, styles, keys || value, force);
    }
}

function setStyleProps(node, styles, keys, force){

    for(let a = 0; a < keys.length; a++){

        const style = keys[a];

        setStylePerform(node, style, styles[style], force);
    }
}

function setStylePerform(node, styles, value, force){


    node.style.setProperty(

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

/**
 * @param {string|Node|Element} selector
 * @param {string} style
 */

export function getStyle(selector, style){

    const node = getNode(selector);

    const css = node._css || (node._css = getComputedStyle(node, null));
    const value = css[style];

    return value;
}

let tmp = 0;

/**
 * @param node
 * @param style
 * @param {string|number=} value
 */

export function prepareStyle(node, style, value){

    setStyle(node, "transition", "none");
    setStyle(node, style, value);

    // force applying styles (quick-fix for closure compiler):
    tmp || (tmp = node.clientTop && 0);

    setStyle(node, "transition", "");
}

export function setText(selector, text){

    text || (text = "");

    const nodes = getNodes(selector);

    if(nodes.length){

        for(let i = 0; i < nodes.length; i++){

            setTextProcess(nodes[i], text);
        }
    }
    else{

        setTextProcess(nodes, text);
    }
}

function setTextProcess(node, text){

    node.textContent = text;
}

/**
 * @param {string|Node|Element} selector
 * @param {string|Node|Element=} context
 */

export function getNode(selector, context){

    return getNodeProcess(selector, context, 0);
}

/**
 * @param {string|Node|Element|Array} selector
 * @param {string|Node|Element=} context
 */

export function getNodes(selector, context){

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

    node.addEventListener(event, fn, mode || void 0);
}

/**
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {EventListenerOptions|boolean=} mode
 */

export function removeListener(node, event, fn, mode){

    node.removeEventListener(event, fn, mode || void 0);
}

/**
 * @param event
 * @param {boolean=} passive
 * @returns {boolean}
 */

export function cancelEvent(event, passive){

    event || (event = window.event);

    if(event){

        event.stopPropagation();
        passive || event.preventDefault();
        passive || (event.returnValue = false);
    }

    return false;
}
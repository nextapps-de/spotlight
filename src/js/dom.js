"use strict";

import "./config.js";

const node_cache = {};
const nodes_cache = {};
const kebab_cache = {};

function createClassCache(node){

    const current_classes = node.classList;
    const cache = {};

    for(let a = 0; a < current_classes.length; a++){

        cache[current_classes[a]] = 1;
    }

    node._class = cache;
}

/**
 * @param selector
 * @param class_name
 */

export function addClass(selector, class_name){

    const nodes = getNodes(selector);

    if(typeof class_name === "string"){

        class_name = [class_name];
    }

    for(let i = 0; i < nodes.length; i++){

        const node = nodes[i];

        for(let a = 0; a < class_name.length; a++){

            const current_class = class_name[a];

            if(ENABLE_CLASS_CACHE){

                node._class || createClassCache(node);

                if(node._class[current_class]){

                    continue;
                }

                node._class[current_class] = 1;
            }

            node.classList.add(current_class);
        }
    }
}

/**
 * @param selector
 * @param class_name
 */

export function removeClass(selector, class_name){

    const nodes = getNodes(selector);

    if(typeof class_name === "string"){

        class_name = [class_name];
    }

    for(let i = 0; i < nodes.length; i++){

        const node = nodes[i];

        for(let a = 0; a < class_name.length; a++){

            const current_class = class_name[a];

            if(ENABLE_CLASS_CACHE){

                node._class || createClassCache(node);

                if(!node._class[current_class]){

                    continue;
                }

                node._class[current_class] = 0;
            }

            node.classList.remove(current_class);
        }
    }
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

        return;
    }

    const nodes = getNodes(selector);

    if(typeof class_name === "string"){

        class_name = [class_name];
    }

    for(let i = 0; i < nodes.length; i++){

        const node = nodes[i];

        for(let a = 0; a < class_name.length; a++){

            const current_class = class_name[a];

            if(ENABLE_CLASS_CACHE){

                node._class || createClassCache(node);
                node._class[current_class] = !node._class[current_class];
            }

            node.classList.toggle(current_class);
        }
    }
}

/**
 * @param selector
 * @param class_name
 * @returns {boolean}
 */

export function hasClass(selector, class_name){

    const nodes = getNodes(selector);

    if(typeof class_name === "string"){

        class_name = [class_name];
    }

    for(let i = 0; i < nodes.length; i++){

        const node = nodes[i];

        for(let a = 0; a < class_name.length; a++){

            const current_class = class_name[a];

            if(ENABLE_CLASS_CACHE){

                node._class || createClassCache(node);

                return !!node._class[current_class];
            }

            if(node.classList.contains(current_class)){

                return true;
            }
        }
    }

    return false;
}



/**
 * @param {string|Node|Element|Array} selector
 * @param {string|!Object} styles
 * @param {string|number=} value
 * @param {boolean=} force
 */

export function setStyle(selector, styles, value, force){

    const nodes = getNodes(selector);

    if(typeof styles === "string"){

        for(let i = 0; i < nodes.length; i++){

            const node = nodes[i];

            if(ENABLE_STYLE_CACHE){

                let node_style = node._style;

                node_style || (node._style = node_style = {});

                if(node_style[styles] === value){

                    continue;
                }

                node_style[styles] = value;
            }

            node.style.setProperty(

                kebab_cache[styles] || camel_to_kebab(styles),
                value,
                force || null
            );
        }
    }
    else{

        const keys = Object.keys(styles);

        for(let a = 0; a < keys.length; a++){

            const style = keys[a];

            setStyle(nodes, style, styles[style], force);
        }
    }
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

    let node_style = node._style;

    if(!ENABLE_STYLE_CACHE || !node_style || !node_style[style]){

        const css = node._css || (node._css = getComputedStyle(node, null));
        const value = css[style];

        if(ENABLE_STYLE_CACHE){

            node._style = node_style = {};
            node_style[style] = value;
        }

        return value;
    }
    else if(ENABLE_STYLE_CACHE){

        return node_style[style];
    }
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

    // force styles (quick-fix for closure compiler):
    tmp || (tmp = node.clientTop && 0);

    setStyle(node, "transition", "");
}

/**
 * @param {string|Node|Element} selector
 * @param {string|Node|Element=} context
 */

export function getNode(selector, context){

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

export function getNodes(selector, context){

    if(selector.constructor === Array){

        selector = /** @type Array */ (selector);

        for(let i = 0; i < selector.length; i++){

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

export function getById(id){

    return document.getElementById(id);
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

export function getByIdCache(id){

    const key = "$#" + id;
    let item = node_cache[key];

    if(!item){

        node_cache[key] = item = getById(id);
    }

    return item;
}

/**
 * @param {string} classname
 * @param {Node|Element=} context
 * @returns {HTMLCollection}
 */

export function getByClassCache(classname, context){

    const key = (context || "$") + "." + classname;
    let items = nodes_cache[key];

    if(!items){

        nodes_cache[key] = items = getByClass(classname, context);
    }

    return items;
}

/**
 * @param {string} tag
 * @param {Node|Element=} context
 * @returns {HTMLCollection}
 */

export function getByTagCache(tag, context){

    const key = (context || "$") + tag;
    let items = nodes_cache[key];

    if(!items){

        nodes_cache[key] = items = getByTag(tag, context);
    }

    return items;
}

/**
 * @param {string} selector
 * @param {string=} context
 */

export function getNodeCache(selector, context){

    return getCache(selector, context, /* multiple? */ false);
}

/**
 * @param {string} selector
 * @param {string=} context
 */

export function getNodesCache(selector, context){

    return getCache(selector, context, /* multiple? */ true);
}

/**
 * @param {string} selector
 * @param {string=} context
 * @param {boolean=} multiple
 */

export function getCache(selector, context, multiple){

    let key = (context || "$") + selector;
    let cache = multiple ? nodes_cache : node_cache;
    let item = cache[key];

    if(!item){

        cache[key] = item = (

            multiple ?

                getNodes
            :
                getNode

        )(selector, context);
    }

    return item;
}

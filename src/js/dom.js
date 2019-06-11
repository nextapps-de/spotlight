import "./config.js";

const node_cache = {};
const nodes_cache = {};

function createClassCache(node){

    const current_classes = node.className.split(" ");
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

    for(let a = 0; a < class_name.length; a++){

        const current_class = class_name[a];

        for(let i = 0; i < nodes.length; i++){

            const node = nodes[i];

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

    for(let a = 0; a < class_name.length; a++){

        const current_class = class_name[a];

        for(let i = 0; i < nodes.length; i++){

            const node = nodes[i];

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
 */

export function toggleClass(selector, class_name){

    const nodes = getNodes(selector);

    if(typeof class_name === "string"){

        class_name = [class_name];
    }

    for(let a = 0; a < class_name.length; a++){

        const current_class = class_name[a];

        for(let i = 0; i < nodes.length; i++){

            const node = nodes[i];

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

    for(let a = 0; a < class_name.length; a++){

        const current_class = class_name[a];

        for(let i = 0; i < nodes.length; i++){

            const node = nodes[i];

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

            node.style.setProperty(styles, value, force);
        }
    }
    else{

        const keys = Object.keys(styles);

        for(let a = 0; a < keys.length; a++){

            const style = keys[a];

            value = styles[style];

            for(let i = 0; i < nodes.length; i++){

                setStyle(nodes[i], style, value, force);
            }
        }
    }
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

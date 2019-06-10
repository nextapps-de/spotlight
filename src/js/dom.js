const node_cache = {};
const nodes_cache = {};

/**
 * @param selector
 * @param class_name
 * @param {string|Element=} context
 */

export function addClass(selector, class_name, context){

    const nodes = getNodes(selector, context);

    for(let i = 0; i < nodes.length; i++){

        nodes[i].classList.add(class_name);
    }
}

/**
 * @param selector
 * @param class_name
 * @param {string|Element=} context
 */

export function removeClass(selector, class_name, context){

    const nodes = getNodes(selector, context);

    for(let i = 0; i < nodes.length; i++){

        nodes[i].classList.remove(class_name);
    }
}

/**
 * @param selector
 * @param class_name
 * @param {string|Element=} context
 */

export function toggleClass(selector, class_name, context){

    const nodes = getNodes(selector, context);

    for(let i = 0; i < nodes.length; i++){

        nodes[i].classList.toggle(class_name);
    }
}

/**
 * @param selector
 * @param class_name
 * @param {string|Element=} context
 * @returns {boolean}
 */

export function hasClass(selector, class_name, context){

    const nodes = getNodes(selector, context);

    for(let i = 0; i < nodes.length; i++){

        if(nodes[i].classList.contains(class_name)){

            return true;
        }
    }

    return false;
}

/**
 * @param {string|Element|Array} selector
 * @param {string|Object} styles
 * @param {string|number=} value
 * @param {boolean=} force
 */

export function setStyle(selector, styles, value, force){

    const nodes = getNodes(selector);

    if(typeof styles === "string"){

        for(let i = 0; i < nodes.length; i++){

            nodes[i].style.setProperty(styles, value);
        }
    }
    else{

        for(let style in styles){

            if(styles.hasOwnProperty(style)){

                for(let i = 0; i < nodes.length; i++){

                    nodes[i].style.setProperty(style, styles[style]);
                }
            }
        }
    }
}

/**
 * @param {string|Element} selector
 * @param {string|Element=} context
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
 * @param {string|Element|Array} selector
 * @param {string|Element=} context
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

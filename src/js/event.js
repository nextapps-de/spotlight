/**
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {!AddEventListenerOptions|boolean=} mode
 */

export function addListener(node, event, fn, mode){

    handleListener("add", node, event, fn, mode);
}

/**
 * @param {!Window|Document|Element} node
 * @param {string} event
 * @param {Function} fn
 * @param {!AddEventListenerOptions|boolean=} mode
 */

export function removeListener(node, event, fn, mode){

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

export function clearEvent(event, passive){

    event || (event = window.event);

    if(event){

        passive || event.preventDefault();
        event.stopImmediatePropagation();
        event.returnValue = false
    }

    return false;
}
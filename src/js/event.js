import "./config.js";

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

    node[type + "EventListener"](event || "click", fn, typeof mode === "undefined" ? DEFAULT_EVENT_CAPTURE : mode);
}

/**
 * @param event
 * @param {boolean=} passive
 * @returns {boolean}
 */

export function cancelEvent(event, passive){

    event || (event = window.event);

    if(event){

        event.stopImmediatePropagation();
        passive || event.preventDefault();
        passive || (event.returnValue = false);
    }

    return false;
}
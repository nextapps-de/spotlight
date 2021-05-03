Object.assign || (Object.assign =

    function(target, source){

        //console.log("assign", target, source);

        const keys = Object.keys(/** @type {!Object} */(source));

        for(let i = 0, key; i < keys.length; i++){

            key = keys[i];
            target[key] = /*"" +*/ source[key];
        }

        return target;
    }
);

Element.prototype.closest || (Element.prototype.closest = function(classname){

    //console.log("closest", classname);

    classname = classname.substring(1);

    let node = this;

    while(node && (node.nodeType === 1)){

        if(node.classList.contains(classname)){

            return /** @type {Element|null} */ (node);
        }

        node = node.parentElement /* || node.parentNode */;
    }

    return null;
});
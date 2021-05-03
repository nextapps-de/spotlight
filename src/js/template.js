import { createElement } from "./helper.js";

const template = createElement("div");
template.id = "spotlight";
template.innerHTML = (

    // the spinner needs to be a separated element to apply animation
    '<div class=spl-spinner></div>' +

    // the wrapper "spl-track" is required to forward pointer events
    '<div class=spl-track>' +
        '<div class=spl-scene>' +
            '<div class=spl-pane></div>' +
        '</div>' +
    '</div>' +
    '<div class=spl-header>' +
        '<div class=spl-page> </div>' +
        // added via addControl()
        /*
        '<div class=spl-close></div>' +
        '<div class=spl-fullscreen></div>' +
        '<div class=spl-autofit></div>' +
        '<div class=spl-zoom-in></div>' +
        '<div class=spl-zoom-out></div>' +
        '<div class=spl-theme></div>' +
        '<div class=spl-play></div>' +
        '<div class=spl-download></div>' +
         */
    '</div>' +
    '<div class=spl-progress></div>' +
    '<div class=spl-footer>' +
        '<div class=spl-title> </div>' +
        '<div class=spl-description> </div>' +
        '<div class=spl-button> </div>' +
    '</div>' +
    '<div class=spl-prev></div>' +
    '<div class=spl-next></div>'
);

export default template;

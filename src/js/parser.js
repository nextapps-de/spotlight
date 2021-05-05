import { createElement } from "./helper.js";

const video_support = {};
const tpl_video = /** @type {HTMLVideoElement} */ (createElement("video"));

export default function(anchor, size, options, media){

    let src, diff;

    if(media !== "node"){

        const keys = Object.keys(/** @type {!Object} */ (options));

        for(let x = 0, key; x < keys.length; x++){

            key = keys[x];

            if((key.length > 3) && (key.indexOf("src") === 0)){

                if(media === "video"){

                    const cache = video_support[key];

                    if(cache){

                        if(cache > 0){

                            src = options[key];
                            break;
                        }
                    }
                    else if(tpl_video.canPlayType("video/" + key.substring(3).toLowerCase())){

                        video_support[key] = 1;
                        src = options[key];
                        break;
                    }
                    else{

                        video_support[key] = -1;
                    }
                }
                else{

                    const res = parseInt(key.substring(4), 10);

                    if(res){

                        const abs = Math.abs(size - res);

                        if(!diff || (abs < diff)){

                            diff = abs;
                            src = options[key];
                        }
                    }
                }
            }
        }
    }

    return src || options["src"] || options["href"] || anchor["src"] || anchor["href"];
}

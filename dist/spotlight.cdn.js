/**
 * Spotlight.js v0.5.8 (CDN)
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/spotlight
 */
(function(){'use strict';var aa={};function ba(a){for(var b=a.classList,c={},d=0;d<b.length;d++)c[b[d]]=1;a.a=c;a.b=b}function e(a,b){a=h(a);"string"===typeof b&&(b=[b]);for(var c=0;c<a.length;c++)for(var d=a[c],f=0;f<b.length;f++){var g=b[f];d.a||ba(d);d.a[g]||(d.a[g]=1,d.b.add(g))}}function k(a,b){a=h(a);"string"===typeof b&&(b=[b]);for(var c=0;c<a.length;c++)for(var d=a[c],f=0;f<b.length;f++){var g=b[f];d.a||ba(d);d.a[g]&&(d.a[g]=0,d.b.remove(g))}}
function l(a,b,c,d){a=h(a);if("string"===typeof b)for(var f=0;f<a.length;f++){var g=a[f],n=g.c;n||(g.c=n={});n[b]!==c&&(n[b]=c,(g.f||(g.f=g.style)).setProperty(aa[b]||(aa[b]=b.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()),c,d?"important":null))}else for(c=Object.keys(b),f=0;f<c.length;f++)g=c[f],l(a,g,b[g],d)}var ca=0;function m(a,b,c){l(a,"transition","none");l(a,b,c);ca||(ca=a.clientTop&&0);l(a,"transition","")}
function da(a,b){b||(b="");a=h(a);for(var c=0;c<a.length;c++){var d=a[c];d.g!==b&&(d.g=b,d.textContent=b)}}function h(a){if(a.constructor===Array){for(var b=0;b<a.length;b++){var c=a[b];a[b]="string"===typeof c?document.querySelector(c):c}return a}return"string"===typeof a?document.querySelectorAll(a):[a]}function p(a,b){return(b||document).getElementsByClassName(a)};function ea(a,b,c,d){fa("add",a,b,c,d)}function ha(a,b,c,d){fa("remove",a,b,c,d)}function fa(a,b,c,d,f){b[a+"EventListener"](c||"click",d,"undefined"===typeof f?!0:f)}function q(a,b){a||(a=window.event);a&&(b||a.preventDefault(),a.stopImmediatePropagation(),a.returnValue=!1);return!1};var ia=document.createElement("link");ia.rel="stylesheet";ia.href="https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/css/spotlight.css";document.getElementsByTagName("head")[0].appendChild(ia);var r="theme fullscreen autofit zoom-in zoom-out page title description player progress".split(" "),t,u,ja,ka,v,y,z,A,B,C,D,E,F,G,la,ma,H,I,J,K,na,oa,L,M,N,O,P,pa,qa,ra,sa,ta,Q,ua,va,wa,R,S,xa,T,U,W,ya;function za(a,b,c){this.src=a;this.title=b;this.description=c}
function Aa(a,b){if(I=a.length){N||(N=p("pane",P));var c=N.length,d=J.title,f=J.description;W=Array(I);for(var g=0;g<I;g++){var n=a[g],w=n.dataset;if(g>=c){var x=N[0].cloneNode(!1);l(x,"left",100*g+"%");N[0].parentNode.appendChild(x)}x=void 0;W[g]=new za(w&&(w.href||w.src)||n.src||n.href,w&&w.title||n.title||(x=(n||document).getElementsByTagName("img")).length&&x[0].alt||d||"",w&&w.description||n.description||f||"")}H=b||1;m(L,"transform","translateX(-"+100*(H-1)+"%)");Ba()}}
function Ca(a,b,c,d){if(d||a[c])J[c]=b&&b[c]||d}
function Da(a,b){J={};b&&Ea(b);Ea(a);Ca(a,b,"description");Ca(a,b,"title");Ca(a,b,"prefetch",!0);Ca(a,b,"preloader",!0);K=J.infinite;K="undefined"!==typeof K&&"false"!==K;na="false"!==J.progress;oa=1*J.player||7E3;if((a=J.zoom)||""===a)J["zoom-in"]=J["zoom-out"]=a,delete J.zoom;if((a=J.control)||""===a){a="string"===typeof a?a.split(","):a;for(b=0;b<r.length;b++)J[r[b]]="false";for(b=0;b<a.length;b++){var c=a[b].trim();"zoom"===c?J["zoom-in"]=J["zoom-out"]="true":J[c]="true"}}for(a=0;a<r.length;a++)b=
r[a],l(p(b,P)[0],"display","false"===J[b]?"none":"");(ma=J.theme)?Fa():ma="white"}function Ea(a){for(var b=J,c=Object.keys(a),d=0;d<c.length;d++){var f=c[d];b[f]=""+a[f]}}
function Ga(){var a=H;M=N[a-1];O=M.firstElementChild;H=a;if(!O){var b="false"!==J.preloader;O=new Image;O.onload=function(){b&&k(R,"loading");z=this.width;A=this.height;l(this,{visibility:"visible",opacity:1,transform:""});"false"!==J.prefetch&&a<I&&((new Image).src=W[a].src)};O.onerror=function(){M.removeChild(this)};M.appendChild(O);O.src=W[a-1].src;b&&e(R,"loading");return!b}return!0}ea(document,"",Ha);
ea(document,"DOMContentLoaded",function(){P=document.createElement("div");P.id="spotlight";P.innerHTML='<div class=preloader></div><div class=scene><div class=pane></div></div><div class=header><div class=page></div><div class="icon fullscreen"></div><div class="icon autofit"></div><div class="icon zoom-out"></div><div class="icon zoom-in"></div><div class="icon theme"></div><div class="icon player"></div><div class="icon close"></div></div><div class=progress></div><div class="arrow arrow-left"></div><div class="arrow arrow-right"></div><div class=footer><div class=title></div><div class=description></div></div>';
l(P,"transition","none");document.body.appendChild(P);L=p("scene",P)[0];pa=p("footer",P)[0];qa=p("title",pa)[0];ra=p("description",pa)[0];sa=p("arrow-left",P)[0];ta=p("arrow-right",P)[0];Q=p("fullscreen",P)[0];ua=p("page",P)[0];va=p("player",P)[0];wa=p("progress",P)[0];R=p("preloader",P)[0];U=document.documentElement||document.body;document.cancelFullScreen||(document.cancelFullScreen=document.exitFullscreen||document.webkitCancelFullScreen||document.webkitExitFullscreen||document.mozCancelFullScreen||
function(){});U.requestFullScreen||(U.requestFullScreen=U.webkitRequestFullScreen||U.msRequestFullScreen||U.mozRequestFullScreen||l(Q,"display","none")||function(){});ya=[[window,"keydown",Ia],[window,"wheel",Ja],[window,"hashchange",Ka],[window,"resize",La],[R,"mousedown",Ma],[R,"mouseleave",Na],[R,"mouseup",Na],[R,"mousemove",Oa],[R,"touchstart",Ma,{passive:!1}],[R,"touchcancel",Na],[R,"touchend",Na],[R,"touchmove",Oa,{passive:!0}],[Q,"",Pa],[sa,"",Qa],[ta,"",X],[va,"",Ra],[p("autofit",P)[0],"",
Sa],[p("zoom-in",P)[0],"",Ta],[p("zoom-out",P)[0],"",Ua],[p("close",P)[0],"",Va],[p("theme",P)[0],"",Fa]]},{once:!0});function La(){v=P.clientWidth;y=P.clientHeight;O&&(z=O.width,A=O.height,Wa())}function Wa(){l(O,"transform","translate(-50%, -50%) scale("+B+")")}function Xa(a){for(var b=0;b<ya.length;b++){var c=ya[b];(a?ea:ha)(c[0],c[1],c[2],c[3])}}
function Ha(a){var b=Ya.call(a.target,".spotlight");if(b){var c=Ya.call(b,".spotlight-group"),d=p("spotlight",c);Da(b.dataset,c&&c.dataset);for(c=0;c<d.length;c++)if(d[c]===b){Aa(d,c+1);break}Za();return q(a)}}function Ia(a){if(M)switch(a.keyCode){case 8:Sa();break;case 27:Va();break;case 32:"false"!==J.player&&Ra();break;case 37:Qa();break;case 39:X();break;case 38:case 107:case 187:Ta();break;case 40:case 109:case 189:Ua()}}function Ja(a){M&&(a=a.deltaY,0>.5*(0>a?1:a?-1:0)?Ua():Ta())}
function Ka(){M&&"#spotlight"===location.hash&&Va(!0)}function Ra(a){("boolean"===typeof a?a:!S)?S||(S=setInterval(X,oa),e(va,"on"),na&&$a()):S&&(S=clearInterval(S),k(va,"on"),na&&m(wa,"transform",""));return S}function Y(){T?clearTimeout(T):e(P,"menu");var a=J.autohide;T="false"!==a?setTimeout(function(){k(P,"menu");T=null},1*a||3E3):1}function ab(a){"boolean"===typeof a&&(T=a?T:0);T?(T=clearTimeout(T),k(P,"menu")):Y();return q(a)}
function Ma(a){C=!0;D=!1;var b=bb(a);E=z*B<=v;ja=b.x;ka=b.y;return q(a,!0)}function Na(a){if(C&&!D)return C=!1,ab(a);E&&D&&(m(L,"transform","translateX("+-(100*(H-1)-t/v*100)+"%)"),t<-(y/10)&&X()||t>y/10&&Qa()||l(L,"transform","translateX(-"+100*(H-1)+"%)"),t=0,E=!1,l(M,"transform",""));C=!1;return q(a)}
function Oa(a){if(C){xa||(xa=requestAnimationFrame(cb));var b=bb(a),c=(z*B-v)/2;D=!0;t-=ja-(ja=b.x);E?F=!0:t>c?t=c:0<v-t-z*B+c?t=v-z*B+c:F=!0;A*B>y&&(c=(A*B-y)/2,u-=ka-(ka=b.y),u>c?u=c:0<y-u-A*B+c?u=y-A*B+c:F=!0)}else Y();return q(a,!0)}function bb(a){var b=a.touches;b&&(b=b[0]);return{x:b?b.clientX:a.pageX,y:b?b.clientY:a.pageY}}function cb(a){F?(a&&(xa=requestAnimationFrame(cb)),l(M,"transform","translate("+t+"px, "+u+"px)")):xa=null;F=!1}
function Pa(a){("boolean"===typeof a?a:document.isFullScreen||document.webkitIsFullScreen||document.mozFullScreen)?(document.cancelFullScreen(),k(Q,"on")):(U.requestFullScreen(),e(Q,"on"))}function Sa(a){"boolean"===typeof a&&(G=!a);G=1===B&&!G;l(O,{maxHeight:G?"none":"",maxWidth:G?"none":"",transform:""});z=O.width;A=O.height;B=1;u=t=0;F=!0;cb();Y()}function Ta(a){var b=B/.65;5>=b&&db(B=b);a||Y()}function db(a){B=a||1;Wa()}function Ua(a){var b=.65*B;1<=b&&(db(B=b),u=t=0,F=!0,cb());a||Y()}
function Za(){location.hash="spotlight";location.hash="show";l(P,"transition","");e(U,"hide-scrollbars");e(P,"show");Xa(!0);La();Y()}function Va(a){Xa(!1);history.go(!0===a?-1:-2);k(U,"hide-scrollbars");k(P,"show");S&&Ra(!1);O.parentNode.removeChild(O);M=O=W=null}function Qa(){if(1<H)return Z(H-1);if(S||K)return Z(I)}function X(){if(H<I)return Z(H+1);if(S||K)return Z(1)}function Z(a){if(!(S&&C||a===H)){S||Y();S&&na&&$a();var b=a>H;H=a;Ba(b);return!0}}
function $a(){m(wa,{transitionDuration:"",transform:""});l(wa,{transitionDuration:oa+"ms",transform:"translateX(0)"})}function Fa(a){"boolean"===typeof a?la=a:(la=!la,Y());la?e(P,ma):k(P,ma)}
function Ba(a){u=t=0;B=1;var b=J.animation,c=!0,d=!0,f=!0;if(b||""===b){c=d=f=!1;b="string"===typeof b?b.split(","):b;for(var g=0;g<b.length;g++){var n=b[g].trim();if("scale"===n)c=!0;else if("fade"===n)d=!0;else if("slide"===n)f=!0;else if("flip"===n)var w=!0;else if("false"!==n){c=d=f=w=!1;var x=n;break}}}l(L,{transition:f?"":"none",transform:"translateX(-"+100*(H-1)+"%)"});M&&l(M,"transform","");if(O){l(O,{opacity:d?0:1,transform:""});var V=O;setTimeout(function(){V&&O!==V&&V.parentNode&&V.parentNode.removeChild(V)},
800)}f=Ga();x&&e(O,x);m(O,{opacity:d?0:1,transform:"translate(-50%, -50%)"+(c?" scale(0.8)":"")+(w&&"undefined"!==typeof a?" rotateY("+(a?"":"-")+"90deg)":""),maxHeight:"",maxWidth:""});f&&l(O,{visibility:"visible",opacity:1,transform:""});x&&k(O,x);l(M,"transform","");l(sa,"visibility",K||1!==H?"":"hidden");l(ta,"visibility",K||H!==I?"":"hidden");a=W[H-1];if(c=a.title||a.description)da(qa,a.title),da(ra,a.description);l(pa,"visibility",c?"visible":"hidden");da(ua,H+" / "+I)}
var Ya=Element.prototype.closest||function(a){var b=this;for(a=a.substring(1);b&&1===b.nodeType;){if(b.classList.contains(a))return b;b=b.parentElement||b.parentNode}};window.Spotlight={theme:Fa,fullscreen:Pa,autofit:Sa,next:X,prev:Qa,"goto":Z,close:Va,zoom:db,menu:ab,show:function(a,b){setTimeout(function(){a?(b?Da(b):b={},Aa(a,b.index)):J={};Za()})},play:Ra};}).call(this);

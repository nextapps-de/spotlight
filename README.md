<p align="center">
    <br>
    <img src="https://cdn.jsdelivr.net/gh/nextapps-de/spotlight@master/doc/spotlight.svg" alt="Spotlight.js" width="50%">
    <br><br>
</p>

<h1></h1>
<h3>Web's most easy to integrate gallery library. No dependencies.</h3>

<a target="_blank" href="https://www.npmjs.com/package/spotlight.js"><img src="https://img.shields.io/npm/v/spotlight.js.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/spotlight/issues"><img src="https://img.shields.io/github/issues/nextapps-de/spotlight.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/spotlight/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/spotlight.js.svg"></a>

<a href="#started">Getting Started</a> &ensp;&bull;&ensp; <a href="#groups">Gallery Groups</a> &ensp;&bull;&ensp; <a href="#controls">Controls</a> &ensp;&bull;&ensp; <a href="#styling">Styling</a> &ensp;&bull;&ensp; <a href="#api">API</a> &ensp;&bull;&ensp; <a href="#builds">Custom Builds</a>

Spotlight runs out of the box:

- No additional Javascript coding
- No additional HTML snippets
- No additional CSS resources
- No additional images/assets
- No additional handling of dynamic content and event listener

__Demo:__ https://nextapps-de.github.io/spotlight/

Alternatively you can use the non-bundled version of this library (classically contains css files, image files, js files) and also the source files for the ES6 module system as described below.

<a name="features" id="features"></a>
## Features

- Gallery groups (group images to specific galleries)
- Gallery Tools:
  - Fullscreen
  - Zoom in/out
  - Toggle resize
  - Switch theme
  - Autoplay
  - Page
  - Title (inherits from image "alt"-attribute)
  - Description
- Preloader
- Simply customize via markup (data-attributes)
- Customizable animations
- Controls:
  - Keyboard
  - Touch
  - Mousemove
  - Mousewheel
- Browser history detection
- Back-Button (Android)
- Global API for programmatic usage

__Technical properties:__

- Maximum performance
- Maximum memory optimizations, no leaks, tiny footprint, full cleanup
- Event capturing (just one single global event listener)
- Bind event listener for components dynamically:
  - install when gallery opens
  - fully cleanup when gallery was closed
- No dependencies, no jQuery
- Responsive
- Super-lightweight, all in all just 6kb gzip (js + css + html + images)
- Support for ES6 module system

<a name="started" id="started"></a>
## Getting Started

__Version Explanation__

<table>
    <tr></tr>
    <tr>
        <td>Version</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>
            <b>Bundle Standalone</b>
        </td>
        <td>
            All assets bundled into one single file (js + css + html + images).
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <b>Bundle CDN</b>
        </td>
        <td>
            Also a bundled file (js + html), but images and css will load from extern CDN.
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>
            <b>Non-Bundled</b>
        </td>
        <td>
            Each asset file exists separately. Recommended when extended customization is needed.
        </td>
    </tr>
</table>

__Get Latest:__

<table>
    <tr></tr>
    <tr>
        <td>Build</td>
        <td>File</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td colspan=3">
            <b><u>Bundle Standalone (6kb gzip):</u></b>
        </td>
    </tr>
    <tr>
        <td>spotlight.bundle.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/master/dist/spotlight.bundle.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/spotlight.bundle.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/spotlight.bundle.js</a></td>
    </tr>
    <tr>
        <td colspan=3">
            <b><u>Bundle CDN (6kb gzip):</u></b>
        </td>
    </tr>
    <tr>
        <td>spotlight.cdn.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/master/dist/spotlight.cdn.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/spotlight.cdn.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/spotlight.cdn.js</a></td>
    </tr>
    <tr>
        <td colspan=3">
            <b><u>Non-Bundled (6kb gzip):</u></b>
        </td>
    </tr>
    <tr>
        <td>spotlight.min.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/master/dist/js/spotlight.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/js/spotlight.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/js/spotlight.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>spotlight.css</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/master/dist/css/spotlight.css" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/css/spotlight.css" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/css/spotlight.css</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>img.zip</td>
        <td><a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nextapps-de/spotlight/tree/master/dist/img" target="_blank">Download</a></td>
        <td></td>
    </tr>
    <tr>
        <td colspan=3">
            <b><u>ES6 Modules:</u></b>
        </td>
    </tr>
    <tr>
        <td>src.zip</td>
        <td><a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nextapps-de/spotlight/tree/master/src" target="_blank">Download</a></td>
        <td>The folder <i>"src"</i> of this Github repository.</td>
    </tr>
</table>

Alternatively when using non-bundled version you can download images from: 

https://github.com/nextapps-de/spotlight/tree/master/dist/img/

__Get Latest (NPM):__

```cmd
npm install spotlight.js
```

__Get Latest (ES6 Modules):__

https://github.com/nextapps-de/spotlight/tree/master/src

Example:

```js
import Spotlight from "./spotlight.js";

Spotlight.show(
    [ /* Gallery */ ], 
    { /* Options */ }
);
```

### Setup Spotlight

__1. Just insert the script resource tag somewhere in your document:__

> It is very common to load the library right before the closing body tag of your document. In rare situations it might produce a short flashing/reflow after page load, depending on your stack. Moving the script tag into the head section will solve this issue.

```html
<html>
<head>
    <title></title>
</head>
<body>
    <!-- 
    
    CONTENT 
    
    -->
    <script src="spotlight.bundle.js"></script>
</body>
</html>
```

__2. and add the class ___spotlight___ to an anchor element accordingly, e.g.:__

> This also works with dynamically loaded content. There is no need to inject listeners on new elements. Instead Spotlight make use of global event capturing.

```html
<a class="spotlight" href="img1.jpg">
    <img src="thumb1.jpg">
</a>
<a class="spotlight" href="img2.jpg">
    <img src="thumb2.jpg">
</a>
<a class="spotlight" href="img3.jpg">
    <img src="thumb3.jpg">
</a>
```

Alternatively you can also use the <a href="#api">Spotlight API</a> for programmatically use.

<a name="groups" id="groups"></a>
## Gallery-Groups

Give one of the outer wrapping element the class ___spotlight-group___, e.g.:

```html
<div class="spotlight-group">
    <a class="spotlight" href="dog1.jpg">
        <img src="dog1-thumb.jpg">
    </a>
    <a class="spotlight" href="dog2.jpg">
        <img src="dog2-thumb.jpg">
    </a>
    <a class="spotlight" href="dog3.jpg">
        <img src="dog3-thumb.jpg">
    </a>
</div>
<div class="spotlight-group">
    <a class="spotlight" href="cat1.jpg">
        <img src="cat1-thumb.jpg">
    </a>
    <a class="spotlight" href="cat2.jpg">
        <img src="cat2-thumb.jpg">
    </a>
    <a class="spotlight" href="cat3.jpg">
        <img src="cat3-thumb.jpg">
    </a>
</div>
```

<a name="controls" id="controls"></a>
## Controls

You can either apply the following data-attributes to the ___spotlight-group___ wrapper element or apply them separately to each ___spotlight___ anchor element (also overrides group definitions).

<table>
    <tr></tr>
    <tr>
        <td>Data&nbsp;Atttribute&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>data-animation</td>
        <td>
            "fade"<br>
            "slide"<br>
            "scale"<br>
            "rotate"
        </td>
        <td>
            Change animation (use built-ins<!-- or custom keyframe name-->)<br><br>
            <b>Note:</b> could also combined as comma-separated list, e.g: <code>data-animation="slide,fade,scale"</code> (this is the default animation). 
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-controls</td>
        <td>
            string
        </td>
        <td>
            Show/hide control elements as "whitelisted" through a comma-separated list, e.g. <code>data-controls="reset,page,fullscreen"</code>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-autohide</td>
        <td>true / false / number</td>
        <td>Enable/disable automatically hide controls when inactive, also set cooldown time</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-fullscreen</td>
        <td>true / false</td>
        <td>Show/hide fullscreen button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-zoom</td>
        <td>true / false</td>
        <td>Show/hide both zoom buttons</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-zoomin</td>
        <td>true / false</td>
        <td>Show/hide zoom-in button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-zoomout</td>
        <td>true / false</td>
        <td>Show/hide zoom-out button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-reset</td>
        <td>true / false</td>
        <td>Show/hide reset button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-theme</td>
        <td>true / false</td>
        <td>Show/hide theme button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-player</td>
        <td>true / false / number</td>
        <td>Show/hide player button, also set delay between each tick</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-infinite</td>
        <td>true / false</td>
        <td>Restart from beginning when no slides left</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-theme</td>
        <td>"white"<br>"dark"</td>
        <td>Change the default theme</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-page</td>
        <td>true / false</td>
        <td>Show/hide page</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-title</td>
        <td>string / false</td>
        <td>Set image title or hide it<br><br><b>Note:</b> When using image elements, this attribute will also inherit automatically from <code>&lt;img alt=&quot;...&quot;&gt;</code>. To prevent this behavior you can set <code>data-title="false"</code>. This will hide the title regardless of any image alt-attributes.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-description</td>
        <td>string / false</td>
        <td>Set image description or hide it</td>
    </tr>
</table>

<a name="example" id="example"></a>
##### Example:

```html
<div class="spotlight-group" data-title="Untitled" data-animation="fade"
     data-fullscreen="false" data-maximize="false" data-minimize="false">
    <a class="spotlight" href="cat1.jpg" data-title="This is a title.">
        <img src="cat1-thumb.jpg">
    </a>
    <a class="spotlight" href="cat2.jpg" data-description="This is a description.">
        <img src="cat2-thumb.jpg">
    </a>
    <a class="spotlight" href="cat3.jpg">
        <img src="cat3-thumb.jpg" alt="This is a title.">
    </a>
</div>
```

__Hint:__ The 2nd image gets the title "Untitled" from the group attributes.

Control elements could also __whitelisted__ as a comma-separated list, e.g.:

```html
<div class="spotlight-group" data-controls="fullscreen,autofit,theme">
```

> Use a whitelist to enable controls gets priority over other ambiguous options.

The same from above as __explicitly__:

```html
<div class="spotlight-group" data-fullscreen="true" data-contrast="true"
     data-zoomin="false" data-zoomout="false" data-reset="true">
```

> When control attributes are not specified they are automatically enabled by default.

Therefore the example above could be shortened to:

```html
<div class="spotlight-group" data-zoomin="false" data-zoomout="false">
```

Since "zoom" is a shorthand for both zoom buttons, this is the same:

```html
<div class="spotlight-group" data-zoom="false">
```

<a name="api" id="api"></a>
## Spotlight API

Also you can programmatically use Spotlight via the library API. This way does not require any dependant HTML elements (e.g. the classname "spotlight").

Define a gallery group as follows:

```js
var gallery = [{
    title: "Image 1",
    description: "This is a description.",
    src: "gallery/london-1758181.jpg"
},{
    title: "Image 2",
    description: "This is a description.",
    src: "gallery/sea-1975403.jpg"
},{
    title: "Image 3",
    description: "This is a description.",
    src: "gallery/newport-beach-2089906.jpg"
}];
```

Show gallery with default options:

```js
Spotlight.show(gallery);
```

Show gallery with custom options:

```js
Spotlight.show(gallery, {
    index: 2,
    theme: "white",
    autohide: false,
    control: "autofit,zoom"
});
```

Close gallery:

```js
Spotlight.close();
```

Next slide:

```js
Spotlight.next();
```

Previous slide:

```js
Spotlight.prev();
```

Goto slide:

```js
Spotlight.goto(3);
```

Zoom to:

```js
Spotlight.zoom(1.5);
```

Toggle theme:

```js
Spotlight.theme();
```

Set theme:

```js
Spotlight.theme("white");
```
```js
Spotlight.theme("dark");
```

Toggle fullscreen:

```js
Spotlight.fullscreen();
```

Set fullscreen:

```js
Spotlight.fullscreen(true);
```
```js
Spotlight.fullscreen(false);
```

Toggle autofit:

```js
Spotlight.autofit();
```

Set autofit:

```js
Spotlight.autofit(true);
```
```js
Spotlight.autofit(false);
```

Toggle menu:

```js
Spotlight.menu();
```

Set menu:

```js
Spotlight.menu(true);
```
```js
Spotlight.menu(false);
```

<a name="styling" id="styling"></a>
## Custom Styling

To add custom styling just override CSS classes accordingly: 

```css
#spotlight {
    /* font styles, background */
}

#spotlight .title{
    /* image title */
}

#spotlight .page{
    /* page */
}

#spotlight .toggle-fullscreen{
    /* button fullscreen */
}

#spotlight .autofit{
    /* button autofit */
}

#spotlight .zoom-out{
    /* button zoom out */
}

#spotlight .zoom-in{
    /* button zoom in */
}

#spotlight .toggle-theme{
    /* button theme */
}

#spotlight .close-gallery{
    /* button close */
}

#spotlight .arrow-left{
    /* button arrow left */
}

#spotlight .arrow-right{
    /* button arrow right */
}
```

<a name="builds" id="builds"></a>
## Custom Builds

> __Note:__ You can modify all source files e.g. stylesheets, template and also the images files located in _/src/img/_. Providing a more handy way to pass custom images is coming soon.

Perform a full build:
```bash
npm run build
```

The destination folder of the build is: _/dist/_

---

Copyright 2019 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

<p align="center">
    <br>
    <img src="https://cdn.jsdelivr.net/gh/nextapps-de/spotlight@master/doc/spotlight.svg" alt="Spotlight.js" width="50%">
    <br>
</p>

<h1></h1>
<h3>Web's most easy to integrate lightbox gallery library. Super-lightweight, outstanding performance, no dependencies.</h3>

<a target="_blank" href="https://www.npmjs.com/package/spotlight.js"><img src="https://img.shields.io/npm/v/spotlight.js.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/spotlight/issues"><img src="https://img.shields.io/github/issues/nextapps-de/spotlight.svg"></a>
<a target="_blank" href="https://github.com/nextapps-de/spotlight/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/spotlight.js.svg"></a>

<a href="https://nextapps-de.github.io/spotlight/">Demo</a> &ensp;&bull;&ensp; <a href="#started">Getting Started</a> &ensp;&bull;&ensp; <a href="#groups">Gallery Groups</a> &ensp;&bull;&ensp; <a href="#options">Options</a> &ensp;&bull;&ensp; <a href="#styling">Styling</a> &ensp;&bull;&ensp; <a href="#api">API</a> &ensp;&bull;&ensp; <a href="#builds">Custom Builds</a>

Spotlight runs out of the box:

- No additional Javascript coding
- No additional HTML snippets
- No additional CSS resources
- No additional icons/assets
- No additional handling of dynamic content and event listener

<a href="https://nextapps-de.github.io/spotlight/"><b>Show Demo</b></a>

Alternatively you can:

1. use the non-bundled version of this library (classically contains css files, image files, js files)
2. use the source files (compatible for the ES6 module system)

<a name="features" id="features"></a>
## Features

- Gallery groups (group images to specific galleries)
- Gallery Tools:
  - Fullscreen
  - Zoom in/out
  - Toggle resize
  - Switch theme
  - Autoplay
  - Progress Bar
  - Page
  - Title (inherits from image "alt"-attribute)
  - Description
- Preloader
- Prefetch next image (background task)
- Custom options
- Simply customize via markup (data-attributes)
- Arrange built-in animations
- Custom themes
- Custom animations
- Controls:
  - Keyboard
  - Touch
  - Mousemove
  - Mousewheel
- Browser history detection
- Back-Button (Android)
- Global API for programmatic usage

__Technical properties:__

- Outstanding performance
- Memory optimized, tiny footprint, fully cleans up
- Event capturing (just one single global event listener)
- Bind event listener for components dynamically:
  - install when gallery opens
  - fully cleanup when gallery was closed
- No dependencies, no jQuery
- Responsive
- Super-lightweight, all in all just 7kb gzip (js + css + html + icons)
- Support for ES6 module system

<a name="started" id="started"></a>
## Getting Started

__Version Explanation__

<table>
    <tr>
        <td>Bundle Standalone</td>
        <td>
            All assets bundled into one single file (js + css + html + icons).
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>Bundle CDN</td>
        <td>
            Also a bundled file (js + html), but icons and css will load from extern CDN.
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>Non-Bundled</td>
        <td>
            Each asset file exists separately. Recommended when extended customization is needed.
        </td>
    </tr>
</table>

__Get Latest Build (Stable):__

<table>
    <tr>
        <td colspan=3">
            <b><u>Bundle Standalone:</u></b>
        </td>
    </tr>
    <tr>
        <td>spotlight.bundle.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.6.3/dist/spotlight.bundle.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/spotlight.bundle.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/spotlight.bundle.js</a></td>
    </tr>
    <tr>
        <td colspan=3">
            <br><b><u>Bundle CDN:</u></b>
        </td>
    </tr>
    <tr>
        <td>spotlight.cdn.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.6.3/dist/spotlight.cdn.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/spotlight.cdn.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/spotlight.cdn.js</a></td>
    </tr>
    <tr>
        <td colspan=3">
            <br><b><u>Non-Bundled:</u></b>
        </td>
    </tr>
    <tr>
        <td>spotlight.min.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.6.3/dist/js/spotlight.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/js/spotlight.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/js/spotlight.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>spotlight.css</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.6.3/dist/css/spotlight.css" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/css/spotlight.css" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.6.3/dist/css/spotlight.css</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>img.zip</td>
        <td><a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nextapps-de/spotlight/tree/0.6.3/dist/img" target="_blank">Download</a></td>
        <td>Alternatively when using non-bundled version you can download icons from <i>/dist/img/</i>.</td>
    </tr>
    <tr>
        <td colspan=3">
            <br><b><u>ES6 Modules:</u></b>
        </td>
    </tr>
    <tr>
        <td>src.zip</td>
        <td><a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nextapps-de/spotlight/tree/0.6.3/src" target="_blank">Download</a></td>
        <td>The folder <i>"src"</i> of this Github repository.</td>
    </tr>
</table>

__Get Latest Build (Nightly):__

Just exchange the version number from the URLs above with "master", e.g.: "/spotlight/0.6.3/dist/" into "/spotlight/__master__/dist".

__Get Latest (NPM):__

```cmd
npm install spotlight.js
```

__Get Latest (ES6 Modules):__

https://github.com/nextapps-de/spotlight/tree/master/src

### Basic Setup

__1. Just insert the script resource tag right after the documents head:__

> When you need to add custom styling through css class modifications it is recommended to load the library before you load the css which contains the modifications. Otherwise you have to add an _"!important"_ flag to override existing styles.

```html
<html>
<head>
    <script src="spotlight.bundle.js"></script>
    <title></title>
</head>
<body>
    <!-- CONTENT -->
</body>
</html>
```

__2. Add the class ___spotlight___ to an anchor element accordingly, e.g.:__

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

This also works with dynamically loaded content. There is no need to inject listeners on new elements. Instead Spotlight make use of global event capturing.

Alternatively you can also use the <a href="#api">Spotlight API</a> for programmatically use.

__Usage with non-anchor elements:__

```html
<div class="spotlight" data-src="img1.jpg">
    <div><!-- ... --></div>
</a>
```

Pretty much the same like anchors but use ___data-src___ instead of ___href___.

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

<a name="options" id="options"></a>
## Options

Pass options as declarative via data-attributes in the HTML markup or use the <a href="#api">Spotlight API</a>.

> When using markup follow these style: `data-option="value"` (change _option_ and _value_ accordingly), e.g.: `<a class="spotlight" data-preftech="false"></a>`.

You can either apply the following data-attributes to the ___spotlight-group___ wrapper element or apply them separately to each ___spotlight___ anchor element (that also overrides group definitions).

<table>
    <tr></tr>
    <tr>
        <td>Option&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>index</td>
        <td>
            number
        </td>
        <td>
            Sets the starting index when showing the gallery by using the <a href="#api">Spotlight API</a>. The index starts from 1.
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>onchange</td>
        <td>
            function(index)
        </td>
        <td>
            Pass a callback function which is get fired every time when a page has changed (the first parameter is equal to the new index).<br>
            <b>Note:</b> The image may not have been fully loaded when the event is fired (preloading phase). The index starts from 1.
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>animation</td>
        <td>
            "fade"<br>
            "slide"<br>
            "scale"<br>
            "flip"
        </td>
        <td>
            Change animation (use built-ins<!-- or custom keyframe name-->)<br><br>
            <b>Note:</b> Could also combined as comma-separated list, e.g: <code>data-animation="slide,fade,scale"</code> (this is the default animation). 
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>control</td>
        <td>
            string
        </td>
        <td>
            Show/hide control elements as "whitelisted" through a comma-separated list, e.g. <code>data-control="autofit,page,fullscreen"</code>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>autohide</td>
        <td>true / false / number</td>
        <td>Enable/disable automatically hide controls when inactive, also set cooldown time</td>
    </tr>
    <tr></tr>
    <tr>
        <td>fullscreen</td>
        <td>true / false</td>
        <td>Show/hide fullscreen button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>zoom</td>
        <td>true / false</td>
        <td>Show/hide both zoom buttons</td>
    </tr>
    <tr></tr>
    <tr>
        <td>zoomin</td>
        <td>true / false</td>
        <td>Show/hide zoom-in button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>zoomout</td>
        <td>true / false</td>
        <td>Show/hide zoom-out button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>autofit</td>
        <td>true / false</td>
        <td>Show/hide autofit button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>theme</td>
        <td>true / false</td>
        <td>Show/hide theme button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>player</td>
        <td>true / false / number</td>
        <td>Show/hide player button, also set delay between each tick</td>
    </tr>
    <tr></tr>
    <tr>
        <td>progress</td>
        <td>true / false</td>
        <td>Show/hide autoplay progress bar</td>
    </tr>
    <tr></tr>
    <tr>
        <td>infinite</td>
        <td>true / false</td>
        <td>Restart from beginning when no slides left</td>
    </tr>
    <tr></tr>
    <tr>
        <td>theme</td>
        <td>"white"<br>"dark"</td>
        <td>Change the default theme</td>
    </tr>
    <tr></tr>
    <tr>
        <td>page</td>
        <td>true / false</td>
        <td>Show/hide page</td>
    </tr>
    <tr></tr>
    <tr>
        <td>title</td>
        <td>string / false</td>
        <td>Set image title or hide it<br><br><b>Note:</b> When using image elements, this attribute will also inherit automatically from <code>&lt;img alt=&quot;...&quot;&gt;</code>. To prevent this behavior you can set <code>data-title="false"</code>. This will hide the title regardless of any image alt-attributes.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>description</td>
        <td>string / false</td>
        <td>Set image description or hide it</td>
    </tr>
    <tr></tr>
    <tr>
        <td>preloader</td>
        <td>true / false</td>
        <td>Enable/disable preloading of the current image (also hides spinner)</td>
    </tr>
    <tr></tr>
    <tr>
        <td>prefetch</td>
        <td>true / false</td>
        <td>Enable/disable preloading of the next image</td>
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
<div class="spotlight-group" data-control="fullscreen,autofit,theme">
```

> Use a whitelist to enable controls gets priority over other ambiguous options.

The same from above as __explicitly__:

```html
<div class="spotlight-group" data-fullscreen="true" data-contrast="true"
     data-zoomin="false" data-zoomout="false" data-autofit="true">
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
    control: ["autofit", "zoom"]
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

__Example ES6:__

```js
import Spotlight from "./spotlight.js";

Spotlight.show(
    [ /* Gallery */ ], 
    { /* Options */ }
);
```

> __Note:__ You may need to perform `npm run build` initially to make pre-compiled files available.

<a name="styling" id="styling"></a>
## Custom Styling

To add custom styling just override CSS classes accordingly: 

```css
#spotlight {
    /* font styles, background */
}
```
```css
#spotlight .title{
    /* image title */
}
```
```css
#spotlight .description{
    /* image description */
}
```
```css
#spotlight .page{
    /* current page */
}
```
```css
#spotlight .fullscreen{
    /* button fullscreen */
}
```
```css
#spotlight .autofit{
    /* button autofit */
}
```
```css
#spotlight .zoom-out{
    /* button zoom out */
}
```
```css
#spotlight .zoom-in{
    /* button zoom in */
}
```
```css
#spotlight .theme{
    /* button theme */
}
```
```css
#spotlight .player{
    /* button autoplay */
}
```
```css
#spotlight .close{
    /* button close */
}
```
```css
#spotlight .arrow-left{
    /* button arrow left */
}
```
```css
#spotlight .arrow-right{
    /* button arrow right */
}
```

<a name="themes" id="themes"></a>
## Themes

__Customize builtin themes__

Use the same classes as above:

```css
#spotlight.white .title{
    /* image title in white theme */
}
```

```css
#spotlight.dark{
    /* main background in dark theme */
}
```

__Create New Themes__

Define styles, e.g. for the custom theme name "my-theme":

```css
#spotlight.my-theme .title{
    /* image title in custom theme */
}
#spotlight.my-theme{
    /* main background in custom theme */
}
```

Apply custom theme via markdown:

```html
<a class="spotlight" href="img.jpg" data-theme="my-theme">
    <img src="thumb.jpg">
</a>
```

Or apply custom theme via API:

```js
Spotlight.show([ /* Gallery */ ],{
    theme: "my-theme"
});
```

<a name="animation" id="animation"></a>
## Custom Animations

> When you pass a custom animation, all other ambiguous animation settings will be overridden (also when mixed with built-ins).

> The style class for a custom animation describes the __hidden state__ of an image.

You can define your own custom animation by:

<b>1.</b> Extending the default styles (when image is shown) and corresponding transitions as follows:

```css
#spotlight .scene img{
    filter: grayscale(0);
    transition: filter 1s ease-out,
                opacity 0.5s ease-out;
}
```

<b>2.</b> Providing styles for the __hidden state__ of the transition by adding a custom animation name as a class:

```css
#spotlight .scene img.my-animation{
    opacity: 0 !important;
    filter: grayscale(1);
}
```

Apply custom animation via markdown:

```html
<a class="spotlight" href="img.jpg" data-animation="my-animation">
    <img src="thumb.jpg">
</a>
```

Or apply custom animation via API:

```js
Spotlight.show([ /* Gallery */ ],{
    animation: "my-animation"
});
```

<a name="notes" id="notes"></a>
## Preload Library / Async Load

> If you like to override css classes for custom styling you may need to add ___!important___ flag to the css property value.

```html
<html>
<head>
    <title></title>
    <link rel="preload" href="spotlight.bundle.js" as="script">
</head>
<body>
    <!-- 
    CONTENT 
    -->
    <script src="spotlight.bundle.js" async></script>
</body>
</html>
```

Initialize library manually (once):

```js
Spotlight.init();
```

When using Spotlight exclusively through the API it is recommended to follow this practice. But there are some important facts you might need to know:

1. When loading the library before loading other stylesheets (which modifies the Spotlight default theme) you do not have to add a "!important" flag to the styles.
2. When using Spotlight with anchors it is recommended to load the library in the head section of the document to prevent executing the default anchor behavior when the user has clicked during page load. 
3. In rare situations it also might produce a short flashing/reflow after page load, depending on your stack. Moving the script tag into the head section will solve this issue.

<a name="builds" id="builds"></a>
## Custom Builds

> __Note:__ You can modify all source files e.g. stylesheets, template and also the icon files located in _/src/img/_. Providing a more handy way to pass custom icons is coming soon.

Perform a full build:
```bash
npm run build
```

The destination folder of the build is: _/dist/_

---

Copyright 2019 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

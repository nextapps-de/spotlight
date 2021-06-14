<p></p>
<h1 align="center"><img src="https://cdn.jsdelivr.net/gh/nextapps-de/spotlight@master/demo/spotlight.svg" alt="Spotlight.js: Modern HTML5 Gallery for Images, Videos and Media" width="500px"><p></p></h1>
<h3>Web's most easy to integrate lightbox gallery library. Super-lightweight, outstanding performance, no dependencies.</h3>

<a target="_blank" href="https://www.npmjs.com/package/spotlight.js"><img src="https://img.shields.io/npm/v/spotlight.js.svg"></a><!--<a target="_blank" href="https://github.com/nextapps-de/spotlight/issues"><img src="https://img.shields.io/github/issues/nextapps-de/spotlight.svg"></a>-->
<a target="_blank" href="https://github.com/nextapps-de/spotlight/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/spotlight.js.svg"></a>

<a href="https://nextapps-de.github.io/spotlight/">Demo</a> &ensp;&bull;&ensp; <a href="#started">Getting Started</a> &ensp;&bull;&ensp; <a href="#groups">Gallery Groups</a> &ensp;&bull;&ensp; <a href="#options">Options</a> &ensp;&bull;&ensp; <a href="#styling">Styling</a> &ensp;&bull;&ensp; <a href="#api">API</a> &ensp;&bull;&ensp; <a href="CHANGELOG.md">Changelog</a>

## Whats new in 0.7.0?

The new version includes tons of fixes, new features and improvements which was collected over the last two years. Read the <a href="CHANGELOG.md">Changelog</a> to get all new features.

<h3>Live Demo:<p></p><a href="https://nextapps-de.github.io/spotlight/">https://nextapps-de.github.io/spotlight/ </a></h3>

Spotlight runs out of the box:

- No additional Javascript coding
- No additional HTML snippets
- No additional CSS resources
- No additional icons/assets
- No additional handling of dynamic content and event listener

<a name="features" id="features"></a>
## Features

- Video Support
- Mounting HTML node fragments as slides (you can add just everything as a slide!)
- Gallery groups:
  - group images to specific galleries
  - group options inheritance
- Toolbar & Gallery tools:
  - Fullscreen
  - Zoom in/out
  - Toggle resize
  - Switch theme
  - Autoslide
  - Download
  - Progress Bar
  - Page
  - Title (also inherits from image "alt"-attribute)
  - Description
  - Customizable button
- Adaptive responsive images (by viewport size, pixel ratio and available internet bandwidth)
- Auto-fit images and videos (as "contain" or as "cover")
- Custom Controls
- Fully configurable via markup
- Loading Spinner
- Smart Preloading (prefetch next image including cancellation)
- Customize via standard options
- Simply customize via markup (data-attributes)
- Built-in animations
- Custom themes
- Custom animations
- Supported controls:
  - Keyboard
  - Touch
  - Mouse (Move + Wheel)
- Back-Button (Android)
- Callbacks (onclick, onshow, onclose, onchange)
- Global API for programmatic usage

__Technical properties:__

- Outstanding performance
- Memory optimized, tiny footprint, fully cleans up
- Event capturing (just one single global event listener)
- Bind additional global event listener dynamically:
  - install when gallery opens
  - cleanup when gallery was closed
- No dependencies, no jQuery
- Fully Responsive
- Touch-friendly mobile support
- Super-lightweight, all in all just 9kb gzip (js + css + html + icons)
- Support for ES6 module system

#### Pending Feature Suggestions:

- Inline Gallery
- Pinch Zoom Support
- 2-Panel-Paging Strategy
- Swipe down to close

<a name="started"></a>
## Getting Started

__Get Latest Stable Build (Recommended):__

<table>
    <tr>
        <td colspan=3">
            <b><u>Bundle:</u></b> (all assets bundled into one single file: js + css + html + icons)
        </td>
    </tr>
    <tr>
        <td>spotlight.bundle.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.7.8/dist/spotlight.bundle.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/spotlight.bundle.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/spotlight.bundle.js</a></td>
    </tr>
    <tr>
        <td colspan=3">
            <br><b><u>Non-Bundled:</u></b> (js and css are separated, css includes icons as base64)
        </td>
    </tr>
    <tr>
        <td>spotlight.min.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.7.8/dist/js/spotlight.min.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/js/spotlight.min.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/js/spotlight.min.js</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>spotlight.min.css</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.7.8/dist/css/spotlight.min.css" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/css/spotlight.min.css" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/css/spotlight.min.css</a></td>
    </tr>
    <tr>
        <td colspan=3">
            <br><b><u>Sources:</u></b> (not bundled at all, images as url to original resources)
        </td>
    </tr>
    <tr>
        <td>ES6 Modules</td>
        <td><a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nextapps-de/spotlight/tree/0.7.8/src/js" target="_blank">Download</a></td>
        <td>The <i>/src/js</i> folder of this Github repository</td>
    </tr>
    <tr></tr>
    <tr>
        <td>LESS Files (source)</td>
        <td><a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nextapps-de/spotlight/tree/0.7.8/src/css" target="_blank">Download</a></td>
        <td>The <i>/src/css</i> folder of this Github repository</td>
    </tr>
    <tr></tr>
    <tr>
        <td>spotlight.css (compiled)</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/0.7.8/src/css/spotlight.css" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/src/css/spotlight.css" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/src/css/spotlight.css</a></td>
    </tr>
    <tr></tr>
    <tr>
        <td>src.zip</td>
        <td><a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nextapps-de/spotlight/tree/0.7.8/dist" target="_blank">Download</a></td>
        <td>Download all source files including image original resources.</td>
    </tr>
</table>

__Get Latest (NPM):__

```cmd
npm install spotlight.js
```

__Get Latest Nightly (Do not use for production!):__

Just exchange the version number from the URLs above with "master", e.g.: "/spotlight/__0.7.8__/dist/" into "/spotlight/__master__/dist".

> If you are using markup on anchor elements to inject the library, then it is recommended to load the lib inside your head section of the document. Because that will better prevent the original behavior of the anchor tag (e.g. when library wasn't fully loaded on page start).

### Use Bundled Version

The bundled version includes all assets like js, css, html and icon images as base64.

```html
<html>
<head>
    <script src="spotlight.bundle.js"></script>
</head>
<body></body>
</html>
```

### Use Non-Bundled Version

The non-bundled version needs to load js and css separately (css also includes icons as base64).

```html
<html>
<head>
    <link rel="stylesheet" href="spotlight.min.css">
    <script src="spotlight.min.js"></script>
</head>
<body></body>
</html>
```

### Preload Library / Async Load

> If you are using markup on anchor elements to inject the library, then it is recommended to load the lib inside your head section of the document. Read example above.

Just add a link tag to the header sections which indicated to preload the script. Right before the body is closing add your site scripts. Depending on your code you may need to load them in the right order.

```html
<html>
<head>
    <title></title>
    <link rel="preload" href="spotlight.bundle.js" as="script">
</head>
<body>
    <!--
    
    HTML CONTENT
    
    -->
    <!-- BOTTOM OF BODY -->
    <script src="spotlight.bundle.js" defer></script>
    <!-- YOUR SCRIPT -->
    <script src="my-script.js" defer></script>
</body>
</html>
```

You can also load the non-bundled version in the same way.

> In rare situations it might produce a short flashing/reflow after page load, depending on your stack. Moving the script tag into the head section will solve this issue. Also try to use the non-bundled version.

### ES6 Modules

The ES6 modules are located in `src/js/`. You need to load the stylesheet file explicitly (includes icons as base64).

```html
<head>
    <link rel="stylesheet" href="dist/css/spotlight.min.css">
</head>
```

```html
<script type="module">
  import Spotlight from "./src/js/spotlight.js";
</script>
```

You can also load modules via CDN, e.g.:

```html
<script type="module">
  import Spotlight from "https://unpkg.com/spotlight@0.7.8/src/js/spotlight.js";
</script>
```

The ES6 modules are not minified. Please use your favored bundler or build tool for this purpose.

## Basic Usage (Markup)

#### Anchor + Images

The most simple way is the combination of img tags as preview images (thumbs) wrapped in an anchor element which points to the fully sized image. The advantage of this workaround is it fully falls back to a classical behavior. It is the universal markup language which all web tools already understand. Therefore, it may have some advantages for SEO also.

Just add the class ___spotlight___ to an anchor element accordingly, e.g.:

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

This also works with dynamically loaded content. There is no need to inject listeners on new elements. Instead, Spotlight make use of global event capturing.

<!--Alternatively you can also use the <a href="#api">Spotlight API</a> for programmatically use.-->

#### Non-Anchor Elements

Alternatively you can use non-anchor elements also:

```html
<div class="spotlight" data-src="img1.jpg">
    <!-- image or any other elements -->
</a>
```

Pretty much the same like anchors but uses ___data-src___ instead of ___href___.

<a name="groups" id="groups"></a>
### Gallery-Groups

Grouping galleries is useful when you have multiple images on your page which should be separated into groups, instead of adding all images to one single gallery when opened.

Give one of the outer wrapping element the class ___spotlight-group___, e.g.:

```html
<!-- Group 1 -->
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
<!-- Group 2 -->
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

Each of these groups now opens in its own gallery.

Gallery-Groups are also useful to declare global configuration as markup just once (group options inheritance).

## Basic Usage (API)

Also you can programmatically use Spotlight via the library API. This way does not require any dependant HTML elements (e.g. the classname "spotlight").

Define a gallery group as follows:

```js
var gallery = [
    { src: "cat1.jpg" },
    { src: "cat2.jpg" },
    { src: "cat3.jpg" }
];
```

Show gallery with default options:

```js
Spotlight.show(gallery /*, options */);
```

<a name="options"></a>
## Options

Pass options declarative via data-attributes in the HTML markup or use the <a href="#api">Spotlight API</a>.

> When using markup follow these style: `data-option="value"` (change _option_ and _value_ accordingly), e.g.: `<a class="spotlight" data-preload="false"></a>`.

> When using API follow thse style `{ option: value }` (change _option_ and _value_ accordingly), e.g.: `{ preload: false }`.

You can either apply the following data-attributes to the ___spotlight-group___ wrapper element or apply them separately to each ___spotlight___ anchor element (that also overrides inherited group definitions).

When using API the ___spotlight-group___ is represented by the options payload, also you can assign attributes separately to each gallery entry (that also overrides inherited group definitions).

<table>
    <tr></tr>
    <tr>
        <td>Option&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
        <td>Default</td>
    </tr>
    <tr>
        <td>class</td>
        <td>
            string
        </td>
        <td>
            Set a classname to this gallery instance to apply custom styles besides themes independently.
        </td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>media</td>
        <td>
            "image"<br>
            "video"<br>
            "node"
        </td>
        <td>
            Sets the the type of the media which should be added to the page.
        </td>
        <td>image</td>
    </tr>
    <tr></tr>
    <tr>
        <td>animation</td>
        <td>
            string<br>
            Array&lt;string><br>
            "fade"<br>
            "slide"<br>
            "scale"<br>
        </td>
        <td>
            Change animation (use built-ins or custom classname)<br>
            <b>Note:</b> Markup as comma-separated list, e.g: <code>data-animation="slide,fade,scale"</code>. 
        </td>
        <td>slide, fade, scale</td>
    </tr>
    <tr></tr>
    <tr>
        <td>control</td>
        <td>
            string<br>
            Array&lt;string>
        </td>
        <td>
            Show/hide control elements as "whitelisted" through a comma-separated list, e.g. <code>data-control="autofit,page,fullscreen"</code>
        </td>
        <td>page, zoom, autofit, fullscreen, close</td>
    </tr>
    <tr></tr>
    <tr>
        <td>page</td>
        <td>true / false</td>
        <td>Show/hide page in the toolbar</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>fullscreen</td>
        <td>true / false</td>
        <td>Show/hide fullscreen button (automatically hides when not supported by the browser)</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>zoom</td>
        <td>true / false</td>
        <td>Show/hide both zoom buttons in the toolbar</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>zoom-in</td>
        <td>true / false</td>
        <td>Show/hide zoom-in button in the toolbar</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>zoom-out</td>
        <td>true / false</td>
        <td>Show/hide zoom-out button in the toolbar</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>autofit</td>
        <td>true / false</td>
        <td>Show/hide autofit button in the toolbar</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>close</td>
        <td>true / false</td>
        <td>Show/hide the close icon in the toolbar</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>theme</td>
        <td>true / false</td>
        <td>Show/hide theme button</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>play</td>
        <td>true / false / number</td>
        <td>Show/hide play button. When passing a numeric value it will be used as a delay in seconds between each tick.</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>autoslide</td>
        <td>true / false</td>
        <td>Autoslide when opening gallery.</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>progress</td>
        <td>true / false</td>
        <td>Show/hide the animated autoslide progress bar</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>infinite</td>
        <td>true / false</td>
        <td>Restart from beginning when no slides left</td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>autohide</td>
        <td>true / false / number</td>
        <td>Enable/disable automatically hide controls when inactive, also set cooldown time in seconds.</td>
        <td>7</td>
    </tr>
    <tr></tr>
    <tr>
        <td>theme</td>
        <td>string<br>"white"</td>
        <td>The classname of your custom theme. The theme "white" is a built-in theme.</td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>title</td>
        <td>string / false</td>
        <td>Set image title or hide it<br><b>Note:</b> When using image elements, this attribute will also inherit automatically from <code>&lt;img alt=&quot;...&quot;&gt;</code> as well as from <code>&lt;img title=&quot;...&quot;&gt;</code>. To prevent this behavior you can set <code>data-title="false"</code> explicitly. This will hide the title regardless of any image alt-attributes.</td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>description</td>
        <td>string / false</td>
        <td>Set image description or hide it</td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>spinner</td>
        <td>true / false</td>
        <td>Enable/disable the spinner. When disabled the image will not hide until it is fully loaded, that could be useful for progressive jpeg.</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>button</td>
        <td>str</td>
        <td>Enable/disable a button in the footer section, also set button text.<br><b>Note:</b> When using as markup you have to provide a click target for the button or you can assign an <code>onclick</code> callback via options when used programmatically.</td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>button-href</td>
        <td>str</td>
        <td>When using a button as markup you can provide a click target for the button, e.g. <code>&lt;a button=&quot;click me&quot; button-href="https://domain.com"&gt;</code>.</td>
        <td>null</td>
    </tr>
</table>

### Additional Image Options

<table>
    <tr></tr>
    <tr>
        <td>Option&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
        <td>Default</td>
    </tr>
    <tr>
        <td>src-{size}</td>
        <td>
            src-1200<br>
            src-2400<br>
            src-3800<br>
            ...
        </td>
        <td>
            The tag/key represents the size of the image <b>longest</b> side. The content contains the path or url to the image (e.g. <code>data-src-800="image_800x400.jpg"</code>).
        </td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>preload</td>
        <td>true / false</td>
        <td>Enable/disable preloading of the next image</td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>fit</td>
        <td>"contain"<br>"cover"</td>
        <td>Auto-fit the media either as "contain" or as "cover"</td>
        <td>contain</td>
    </tr>
    <tr></tr>
    <tr>
        <td>download</td>
        <td>true / false</td>
        <td>Show/hide the download icon in the toolbar</td>
        <td>false</td>
    </tr>
</table>

### Additional Video Options

Most of these options for a video are inherited by the attributes of a standard video element.

<table>
    <tr></tr>
    <tr>
        <td>Option&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
        <td>Default</td>
    </tr>
    <tr>
        <td>src-{format}</td>
        <td>
            src-webm<br>
            src-ogg<br>
            src-mp4<br>
            ...
        </td>
        <td>
            The tag/key represents the format of the video. The content contains the path or url to the video (e.g. <code>data-src-webm="video.webm"</code>).
        </td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>fit</td>
        <td>"contain"<br>"cover"</td>
        <td>Auto-fit the media either as "contain" or as "cover"</td>
        <td>contain</td>
    </tr>
    <tr></tr>
    <tr>
        <td>autoplay</td>
        <td>
            true<br>
            false
        </td>
        <td>
            Start the video immediately. 
        </td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>muted</td>
        <td>
            true<br>
            false
        </td>
        <td>
            Start playing as muted. 
        </td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>preload</td>
        <td>
            true<br>
            false
        </td>
        <td>
            Preload the video. 
        </td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>controls</td>
        <td>
            true<br>
            false
        </td>
        <td>
            Show/hide the video controls. 
        </td>
        <td>true</td>
    </tr>
    <tr></tr>
    <tr>
        <td>inline</td>
        <td>
            true<br>
            false
        </td>
        <td>
            Make the video player inline (equal to "playsinline"). 
        </td>
        <td>false</td>
    </tr>
    <tr></tr>
    <tr>
        <td>poster</td>
        <td>
            string
        </td>
        <td>
            The path or URL to the preview image. 
        </td>
        <td>null</td>
    </tr>
</table>

### API-only Options

<table>
    <tr></tr>
    <tr>
        <td>Option&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
        <td>Default</td>
    </tr>
    <tr>
        <td>index</td>
        <td>
            number
        </td>
        <td>
            Sets the starting index when showing the gallery by using the <a href="#api">Spotlight API</a>. The index starts from 1.
        </td>
        <td>1</td>
    </tr>
    <tr></tr>
    <tr>
        <td>onchange</td>
        <td>
            function(index, options)
        </td>
        <td>
            Pass a callback function which is get fired every time when a page/slide has changed. The first parameter holds the new page index, the second parameter provides the inherited option payload for this page.<br>
            <b>Note:</b> The image may not have been fully loaded when the event is fired (preloading phase). The index starts from 1.
        </td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>onshow<br>onclose</td>
        <td>
            function(index)
        </td>
        <td>
            These callback functions are called when opening or closing the gallery (the first parameter holds the current page index).
        </td>
        <td>null</td>
    </tr>
    <tr></tr>
    <tr>
        <td>onclick</td>
        <td>
            function(index, options)
        </td>
        <td>
            A callback function which is getting fired when the optional button in the footer sections was clicked. The first parameter holds the current page index, the second parameter provides the inherited option payload for this page.
        </td>
        <td>null</td>
    </tr>
</table>

### Example: Options & Group Inheritance (Markup)

```html
<div class="spotlight-group" data-title="Group title" data-animation="fade" data-control="autofit,close">
    <a class="spotlight" href="cat1.jpg" data-title="This is a title" data-theme="white">
        <img src="cat1-thumb.jpg">
    </a>
    <a class="spotlight" href="cat2.jpg" data-description="This is a description">
        <img src="cat2-thumb.jpg">
    </a>
    <a class="spotlight" href="cat3.jpg" data-button="Click me" data-button-href="javascript:alert('clicked')">
        <img src="cat3-thumb.jpg" alt="This is also a title">
    </a>
    <a class="spotlight" href="cat4.jpg" data-title="false" data-fit="cover">
      <img src="cat4-thumb.jpg" alt="This title is hidden">
    </a>
</div>
```

__Note:__ The 2nd image gets the title "Group title" from the group attributes, on the last image the title is explicitly set to be hidden.

> Control elements and animations has to be __whitelisted__ as a comma-separated list when specified. Do not forget to add the "close" control, otherwise you need to provide another way to close the gallery, e.g. via the button in the footer (see the demo page bottom example).

### Example: Options & Group Inheritance (API)

Same result as above but as code:

```js
Spotlight.show([{
    src: "cat1.jpg",
    title: "This is a title",
    theme: "white"
},{
    src: "cat2.jpg",
    description: "This is a description",
},{
    src: "cat3.jpg",
    button: "Click me",
    onclick: function(){ alert("clicked"); },
    title: "This is also a title"
},{
    src: "cat4.jpg",
    title: false,
    fit: "cover"
}],{
    // Group Definitions:
    title: "Group title",
    animation: "fade",
    control: "autofit,close"
});
```

## Adaptive Responsive Images

> This feature will improve overall performance of your page/application a lot, especially for mobile devices and bad internet connections.

You can declare a set of the same image in multiple dimensions and quality. Spotlight will pick the optimal version by taking into account:

1. The browsers max resolution
2. The device screen pixel ratio
3. The available internet connection bandwidth

### Example: Markup

Save your images in several sizes and resolutions and assign the __longest__ dimension of both sides (width, height) like this:
```html
<a class="spotlight" href="cat1.jpg" 
                     data-src-800="cat1_800.jpg" 
                     data-src-1200="cat1_1200.jpg" 
                     data-src-2400="cat1_2400.jpg" 
                     data-src-3800="cat1_3800.jpg">
    <img src="cat1-thumb.jpg">
</a>
```

When clicked on it Spotlight will pick the optimum choice.

This markup completely falls back to standard browser behavior when something goes wrong, also it is SEO friendly.

### Example: API

Same result as above but as code:

```js
Spotlight.show([{
    // the default "href" version as fallback isn't required here
    "src-800": "cat1_800.jpg",
    "src-1200": "cat1_1200.jpg",
    "src-2400": "cat1_2400.jpg",
    "src-3800": "cat1_3800.jpg"
}]);
```

## Support Video

> All data-attributes for markup a video is inherited by the attributes of a standard video element.

Considering you want to add a standard video element like this as a slide:

```html
<video poster="preview.jpg" muted preload controls autoplay playsinline="false">
    <source src="video.mp4" type="video/mp4">
    <source src="video.ogv" type="video/ogg">
    <source src="video.webm" type="video/webm">
</video>
```

### Example: Markup

You need a markup like this to represent the video from above:

```html
<a class="spotlight" data-media="video"
                     data-src-webm="video.webm"
                     data-src-ogg="video.ogv"
                     data-src-mp4="video.mp4"
                     data-poster="preview.jpg"
                     data-autoplay="true"
                     data-muted="true"
                     data-preload="true"
                     data-controls="true"
                     data-inline="false">
  <img src="preview.jpg">
</a>
```

### Example: API

Same result as above but as code:

```js
Spotlight.show([{
  
  "media": "video",
  "src-webm": "video.webm",
  "src-ogg": "video.ogv",
  "src-mp4": "video.mp4",
  "poster": "preview.jpg",
  "autoplay": true,
  "muted": true,
  "preload": true,
  "controls": true,
  "inline": false
}]);
```

## Custom Controls

> You can add custom controls to the header toolbar by API usage only.

The basic concept is very straight forward. You just need to assign a unique classname along with an event listener. Basically you have to follow these steps.

1. Initialize the Spotlight gallery manually __once__ to make the template available for extensions:
```js
Spotlight.init();
```

The gallery automatically initialize when first time open, so you can also add custom control inside the "onshow" callback.

2. Add the custom control and pass a click handler (returns the button element):
```js
var button = Spotlight.addControl("my-control", function(event){
    // handle click event
    console.log("button clicked");
});
```

3. Define a CSS class to style your button:
```css
/* your control name will be prefixed by "spl-" automatically */
.spl-my-control{
    background-image: url(icon.svg);
    background-size: 22px;
}
```

> Important: custom control classes gets always css-prefixed by "spl-" automatically to prevent classname collision!

Removing an added control:

```js
Spotlight.removeControl("my-control");
```

### Advanced Example (Like Button)

Let's take a useful example of dynamically adding a "like button" in the toolbar. You can see a live demo of this example on the demo page (bottom section).

Providing a gallery as normal and add a custom attribute "like", which stores the current like state of each image.
```js
const gallery = [{

    src: "image1.jpg",
    like: false
},{
    src: "image2.jpg",
    like: false,
},{
    src: "image3.jpg",
    like: false
}];
```

Define a CSS class to style your button, e.g.:
```css
/* custom classes are always prefixed by "spl-" automatically */
.spl-like{
    background-image: url(heart-outline.svg);
    background-size: 22px;
}
/* optionally, additional state to toggle the button: */
.spl-like.on{
    background-image: url(heart.svg);
}
```

> Please keep in mind, when your custom control has the name "like" the corresponding classname always gets prefixed by "spl-" and becomes "spl-like" to prevent classname collision. Do not name your control in prefixed style like "spl-like", because that will prefix this also (and becomes "spl-spl-like").

We need some variables to store some state which is used in the callback handler later:
```js
// store the button element to apply dom changes to it
let like;
// store the current index
let slide = 0;
```

Implement a click event handler of the like button, e.g.:
```js
function handler(event){
  
    // get the current like state
    // at this point we use the stored last index from the variable "slide"
    const current_like_state = !gallery[slide].like;
  
    // toggles the current like state
    gallery[slide].like = current_like_state;
  
    // assign the state as class to visually represent the current like state
    this.classList.toggle("on");
  
    if(current_like_state){
  
      // do something if liked ...
    }
    else{
  
      // do something if unliked ...
    }
}
```

> The keyword `this` corresponds to the current clicked element (the like icon in this example).

Finally, create the gallery and provide some callbacks to insert the custom control dynamically:
```js
Spotlight.show(gallery, {

    // fires when gallery opens
    onshow: function(index){

        // the method "addControl" returns the new created control element
        like = Spotlight.addControl("like", handler);
    },
    // fires when gallery change to another page
    onchange: function(index, options){

        // store the current index for the button listener
        // the slide index start from 1 (as "page 1")
        slide = index - 1;

        // initially apply the stored like state when slide is openened
        // at this point we use the stored like element
        like.classList.toggle("on", gallery[slide].like);
    },
    // fires when gallery is requested to close
    onclose: function(index){

        // remove the custom button, so you are able
        // to open next gallery without this custom control
        Spotlight.removeControl("like");
    }
});
```

You did not need to remove the custom control everytime. When all your galleries have this custom control, then simply add the control after you call `Spotlight.init()` once.

Initialize the Spotlight gallery once:
```js
Spotlight.init();
```

Add the custom control once:
```js
like = Spotlight.addControl("like", handler);
```

Open the gallery and just provide an "onchange" handler:
```js
Spotlight.show(gallery, {
    onchange: function(index, options){
        slide = index - 1;
        like.classList.toggle("on", gallery[slide].like);
    }
});
```

That is the same custom like button from above example, just shorter but also non-dynamically added for all gallery instances.

## Embedding Node Fragments

> With node fragments you can simply add everything as a slide. This way you can create your own full customized slides with its own interactions inside them.

You can use this feature completely by markup by providing a query selector as "src" which points to a node in your document.

### Using Auto-Mount / Auto-Unmount

> This workaround is also compatible if you are using server-side rendering.

You can use a hidden backstore optionally which holds the fragments to be inserted as a slide, e.g.:

```html
<div style="display: none">
    <div id="fragment" style="width: 100%">
        <h1>Embedded Node Fragment</h1>
        <p>Any HTML Content...</p>
    </div>
</div>
```

Provide a __dom query selector__ as "src" which points to a node in your document:
```html
<a class="spotlight" data-media="node" data-src="#fragment">
    Click here to open
</a>
```

When closing the gallery or change the page to another slide, the fragment will automatically move back to its original position (the hidden backstore in this example).

### Custom Slides (API)

You can add nodes as slide which are not part of the document via the API (e.g. fragments, templates, offscreen nodes). Also, you can create an iframe to load extern contents.

#### Example: Youtube Video

You can create your own fragments/templates and add the root node directly as "src":

```js
Spotlight.show([{
    media: "node",
    src: (function(){
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube.com/embed/tgbNymZ7vqY";
        return iframe;
    }())
}]);
```

#### Example: Templating Engine

Or use your preferred templating engine and add the root node as "src":

```js
Mikado(template).mount(root).render(data);

Spotlight.show([{
    media: "node",
    src: root
}]);
```

<a name="api" id="api"></a>
## Spotlight API

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
    control: ["autofit", "zoom", "close"]
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

Download current image:

```js
Spotlight.download();
```

#### Example ES6:

```js
import Spotlight from "./spotlight.js";

Spotlight.show(
    [ /* Gallery */ ], 
    { /* Options */ }
);
```

You can also import any of the Spotlight methods just as you need:

```js
import { show, close, goto } from "./spotlight.js";

show([/* Gallery */], {/* Options */});
// ....
goto(5);
// ....
close();
```

> Modern build tools will apply dead code elimination when just importing methods your application needs.

<a name="styling" id="styling"></a>
## Custom Styling

To add custom styling just override CSS classes accordingly: 

```css
#spotlight { /* main font styles, background */ }
.spl-page { /* current page (toolbar) */ }
.spl-fullscreen { /* button fullscreen (toolbar) */ }
.spl-autofit { /* button autofit (toolbar) */ }
.spl-zoom-out { /* button zoom out (toolbar) */ }
.spl-zoom-in { /* button zoom in (toolbar) */ }
.spl-theme { /* button theme (toolbar) */ }
.spl-play { /* button autoplay (toolbar) */ }
.spl-download { /* button download (toolbar) */ }
.spl-close { /* button close (toolbar) */ }
.spl-prev { /* button page prev */ }
.spl-next { /* button page next */ }
.spl-spinner { /* preloading spinner */ }
.spl-spinner.spin { /* show spinner */ }
.spl-spinner.error { /* show loading error */ }
.spl-title { /* image title */ }
.spl-description { /* image description */ }
.spl-button { /* button footer */ }
.spl-header { /* the header wrapping element */ }
.spl-footer { /* the footer wrapping element */ }
```

<a name="themes" id="themes"></a>
## Themes

__Customize builtin themes__

Use the same classes as above:

```css
#spotlight.white .spl-title{
    /* image title in white theme */
}
```

```css
#spotlight{
    /* main background in dark theme */
}
```

__Create New Themes__

Define styles, e.g. for the custom theme name "my-theme":

```css
.my-theme .spl-title{
    /* image title in custom theme */
}
.my-theme{
    /* main background in custom theme */
}
```

Apply custom theme via markdown:

```html
<a class="spotlight" href="cat.jpg" data-theme="my-theme">
    <img src="cat_thumb.jpg">
</a>
```

Or apply custom theme via API:

```js
Spotlight.show([ /* Gallery */ ],{
    theme: "my-theme"
});
```

You could also set themes per image separately:

```js
Spotlight.show([
    { src: "cat1.jpg" }, // default theme
    { src: "cat2.jpg", theme: "my-theme" },
    { src: "cat3.jpg", theme: "white" }
]);
```

#### CSS Class

If you like to apply styles independently besides themes you can simply do that by adding a class during initialization:
```js
Spotlight.show([
    { src: "cat1.jpg" }, // default theme
    { src: "cat2.jpg", theme: "my-theme" },
    { src: "cat3.jpg", theme: "white" }
],{
    class: "custom"
});
```

In your stylesheet you can apply you custom styles, .e.g.:

```css
#spotlight.custom .spl-title{
    font-size: 15px;
}
```

<a name="animation" id="animation"></a>
## Custom Animations

> Important: The style class for a custom animation describes the __<u>hidden state</u>__ of an image.

You can define your own custom animation by:

<b>1.</b> Define the styles in default state (when image is shown), e.g.:

```css
.spl-pane > *{
    filter: grayscale(0);
    transition: filter 1s ease-out,
                opacity 0.5s ease-out;
}
```

<b>2.</b> Define styles for the __<u>hidden state</u>__ of the transition by adding a custom classname:

```css
.spl-pane .my-animation{
    filter: grayscale(1);
    opacity: 0;
}
```

Apply custom animation via markdown:

```html
<a class="spotlight" href="cat.jpg" data-animation="my-animation">
    <img src="cat_thumb.jpg">
</a>
```

Or apply custom animation via API:

```js
Spotlight.show([ /* Gallery */ ],{
    animation: "my-animation"
});
```

You could also set animations per image separately:

```js
Spotlight.show([
    { src: "cat1.jpg" }, // default animation
    { src: "cat2.jpg", animation: "my-animation" },
    { src: "cat3.jpg", animation: "slide,fade" }
]);
```

#### Use different animations for galleries

The example above will apply the animation to all instances of your gallery. When you want to add specific animation to each gallery you need to add a `class` in your options:
```js
Spotlight.show([
    { src: "cat1.jpg" },
    { src: "cat2.jpg" },
    { src: "cat3.jpg" }
],{
  animation: "my-animation",
  class: "custom"
});
```

Then, add your classname (context selector) to your CSS for the ___visible___ state of the animation:

```css
.custom .spl-pane > *{
    filter: grayscale(0);
    transition: filter 1s ease-out,
                opacity 0.5s ease-out;
}
```

Now you can assign different animations to each gallery.

<a name="builds" id="builds"></a>
## Custom Builds

Go to the root directory of Spotlight and run:
```cmd
npm install
```

Perform a build:
```cmd
npm run build
```

The final build is located in the `dist/` folder.

---

Copyright 2019-2021 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

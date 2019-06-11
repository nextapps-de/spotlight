# Spotlight.js

<a href="#started">Getting Started</a> &ensp;&bull;&ensp; <a href="#groups">Gallery Groups</a> &ensp;&bull;&ensp; <a href="#controls">Controls</a> &ensp;&bull;&ensp; <a href="#styling">Styling</a> &ensp;&bull;&ensp; <a href="#builds">Custom Builds</a>

Super-lightweight image gallery library without dependencies. Bundled into one Javascript file:

- No additional Javascript coding
- No additional HTML snippets
- No additional CSS resources
- No additional images/assets
- No additional handling of event listener
- All in all just 5kb gzip

__Demo:__ https://nextapps-de.github.io/spotlight/

Alternatively you can use the non-bundled version of this library (classically contains css files, image files, js files) and also the source files for the ES6 module system as described below.

<a name="started" id="started"></a>
## Getting Started

__Get Latest (Bundle, 5kb gzip):__

<table>
    <tr></tr>
    <tr>
        <td>Build</td>
        <td>File</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td>spotlight.bundle.js</td>
        <td><a href="https://github.com/nextapps-de/spotlight/raw/master/dist/spotlight.bundle.js" target="_blank">Download</a></td>
        <td><a href="https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/spotlight.bundle.js" target="_blank">https://rawcdn.githack.com/nextapps-de/spotlight/master/dist/spotlight.bundle.js</a></td>
    </tr>
</table>

__Get Latest (NPM):__

```cmd
npm install spotlight.js
```

__Get Latest (Non-Bundle, Github):__

https://github.com/nextapps-de/spotlight/tree/master/dist

__Get Latest (ES6 Modules, Github):__

https://github.com/nextapps-de/spotlight/tree/master/src

__1. Just insert the script resource tag somewhere in your document:__

```html
<head>
    <script src="spotlight.bundle.js"></script>
</head>
```

__2. and add the class ___spotlight___ to an anchor element properly, e.g.:__

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

> This also works with dynamically loaded content. There is no need to inject listeners on new elements. Instead Spotlight make use of global event capturing.

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

#spotlight .toggle-zoom{
    /* button zoom goggle */
}

#spotlight .zoom-out{
    /* button zoom out */
}

#spotlight .zoom-in{
    /* button zoom in */
}

#spotlight .toggle-contrast{
    /* button contrast */
}

#spotlight .close-gallery{
    /* button close gallery */
}

#spotlight .arrow-left{
    /* button arrow left */
}

#spotlight .arrow-right{
    /* button arrow right */
}
```

<a name="controls" id="controls"></a>
## Controls

You can either apply the following data-attributes to the ___spotlight-group___ wrapper element or apply them separately to each ___spotlight___ anchor element (also overrides group definitions).

<table>
    <tr></tr>
    <tr>
        <td>Data&nbsp;Atttribute&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>data-animation</td>
        <td>
            "fade"<br>
            "slide"<br>
            "scale"
        </td>
        <td>
            define animation (use built-ins or custom keyframe name).<br><br>
            <b>Note:</b> could also combined as comma-separated list, e.g: <code>data-animation="slide,fade"</code> (this is the default animation). 
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-controls</td>
        <td>
            string
        </td>
        <td>
            show/hide control elements as "whitelisted" through a comma-separated list, e.g. <code>data-controls="reset,page,fullscreen"</code>
        </td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-fullscreen</td>
        <td>true / false</td>
        <td>show/hide fullscreen button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-maximize</td>
        <td>true / false</td>
        <td>show/hide maximize button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-minimize</td>
        <td>true / false</td>
        <td>show/hide minimize button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-reset</td>
        <td>true / false</td>
        <td>show/hide reset button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-contrast</td>
        <td>true / false</td>
        <td>show/hide contrast button</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-page</td>
        <td>true / false</td>
        <td>show/hide page</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-title</td>
        <td>string / false</td>
        <td>set image title or hide it<br><br><b>Note:</b> When using image elements, this attribute will also inherit automatically from <code>&lt;img alt=&quot;...&quot;&gt;</code> as well as from <code>&lt;img title=&quot;...&quot;&gt;</code>. To prevent this behavior you can set <code>data-title=""</code>. This will hide the title regardless of any image attributes.</td>
    </tr>
    <tr></tr>
    <tr>
        <td>data-description</td>
        <td>string / false</td>
        <td>set image description or hide it</td>
    </tr>
</table>

<a name="example" id="example"></a>
##### Full Example:

```html
<div class="spotlight-group" data-title="Untitled" data-animation="fade"
     data-fullscreen="false" data-maximize="false" data-minimize="false">
    <a class="spotlight" href="cat1.jpg" data-title="This is a title.">
        <img src="cat1-thumb.jpg">
    </a>
    <a class="spotlight" href="cat2.jpg" data-description="This is a description.">
        <img src="cat2-thumb.jpg" alt="This is a title.">
    </a>
    <a class="spotlight" href="cat3.jpg" data-description="This is a description.">
        <img src="cat3-thumb.jpg">
    </a>
</div>
```

__Hint:__ The last image gets the title "Untitled" from the group attributes.

Control elements could also __whitelisted__ as a comma-separated list, e.g.:

```html
<div class="spotlight-group" data-controls="fullscreen,reset,contrast">
```

> Use a whitelist to enable controls gets priority over other ambiguous options.

The same from above as __explicitly__:

```html
<div class="spotlight-group" data-fullscreen="true" data-contrast="true"
     data-maximize="false"data-minimize="false" data-reset="true">
```

> When control attributes are not specified they are automatically enabled by default.

Therefore the example above could be shortened to:

```html
<div class="spotlight-group" data-maximize="false" data-minimize="false">
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

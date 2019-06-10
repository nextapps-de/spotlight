# Spotlight.js

Super-lightweight image gallery plugin, without dependencies, bundled into one Javascript file:

- No additional Javascript coding needed
- No additional HTML snippets needed
- No additional CSS resources needed
- No additional images/assets needed
- No additional handling of event listener needed

__Demo:__ https://nextapps-de.github.io/spotlight/

## Getting Started

__Get Latest (Bundle):__

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

__2. and add the class ___spotlight___ properly to an anchor element, e.g.:__

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

## Customize Gallery

You can either apply the following data-attributes to the ___spotlight-group___ wrapper element or apply them separately to each ___spotlight___ anchor element (also overrides group definitions).

<table>
    <tr></tr>
    <tr>
        <td>Data&nbsp;Atttribute&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>Values</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>data-controls</td>
        <td>string</td>
        <td>show/hide control elements explicitly through a comma-separated list</td>
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

##### Example:

```html
<div class="spotlight-group" data-title="Untitled" data-fullscreen="false" data-maximize="false" data-minimize="false" data-reset="false">
    <a class="spotlight" href="cat1.jpg" data-title="This is a title." data-description="This is a description.">
        <img src="cat1-thumb.jpg">
    </a>
    <a class="spotlight" href="cat2.jpg" data-description="This is a description.">
        <img src="cat2-thumb.jpg" alt="This is a title.">
    </a>
    <a class="spotlight" href="cat3.jpg">
        <img src="cat3-thumb.jpg">
    </a>
</div>
```

__Hint:__ The last image gets the title "Untitled" from the group attributes.

The control elements could also be set __explicitly__ as a comma-separated list, e.g.:

```html
<div class="spotlight-group" data-controls="fullscreen,reset">
```

would be the same as:

```html
<div class="spotlight-group" data-fullscreen="true" data-maximize="false" data-minimize="false" data-reset="true">
```

---

Copyright 2019 Nextapps GmbH<br>
Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0 License</a><br>

# Changelog

> The changelog just includes breaking changes along with its migration instructions.

## v0.7.0

<!--This version includes tons of fixes, new features and improvements which was collected over the last two years.-->

List of new features:

- Added video support
- Added support for mounting HTML node fragments as slides (now you can add everything as a slide)
- Added download feature
- Added support for adaptive responsive images (by viewport size, pixel ratio and available internet bandwidth)
- Added support for a customizable button in the footer section of a slide
- Added support for additional callbacks `onclick` (for the footer button), `onshow` and `onclose`
- Added new feature `fit` which can autofit the image as "cover" or as "contain"
- Added support for adding and removing custom controls via `addControl` and `removeControl`

List of improvements:

- Greatly improves performance, this lib is definitely the web's most performant gallery library.
- Improve rendering, style recalculations and layout reflow
- Improve memory usage and listener bindings
- Improve event flow
- Improve event delegation for touchable pointers
- Improve animation handler
- Improve options and group options inheritance
- Improve prevention of css class collision
- Improve customization capabilities
- Improve initialization and build-up (parse successively)
- Improve markup declaration and parsing
- Improve the history handler to catch the "back" button
- Improve scheduling of the menu auto-hide
- Improve handling of custom themes
- Improve the local build system (config file was removed)
- Improve packaging of bundles (cdn bundle was removed)
- Improve ES6 module usage (does not need temporary generated js files)
- Improve code structure
- Fixed a lot of bugs

## v0.0.1

- Initial Release

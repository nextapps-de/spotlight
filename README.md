# Original repository
<h3><a href="https://github.com/nextapps-de/spotlight">https://github.com/nextapps-de/spotlight </a></h3>

# Fork improvements

- Fix build package scripts
- Remove auto initialize lightbox gallery by classname
- Fix missed info.svg icon
- Fix warning during build process
- Remove polyfill.js

## Custom Builds

Go to the root directory of Spotlight and run:
```cmd
npm install
```

Install JAVA SDK (https://java.com)

Install JS build tool (https://github.com/google/closure-compiler):
```cmd
yarn global add google-closure-compiler
```

Perform a build:
```cmd
npm run build
```

The final build is located in the `dist/` folder.

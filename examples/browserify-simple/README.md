# Example - Browserify Simple

This is a basic example of how to use `vue-color-picker`. It's scaffolded with `vue-cli` and [browserify-simple](https://github.com/vuejs-templates/browserify-simple) template and loads the CSS with `node-sass`.

## How to use
Download the example [or clone the whole project](https://github.com/radial-color-picker/vue-color-picker.git):

```bash
curl https://codeload.github.com/radial-color-picker/vue-color-picker/tar.gz/master | tar -xz --strip=2 vue-color-picker-master/examples/browserify-simple
cd browserify-simple
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## With Less

Alternatively, if you prefer you can use the `less` pre-processor too:
1. Install Less
    ```bash
    npm install less --save-dev
    ```
2. Add the correct lang attribute and [import](http://lesscss.org/features/#import-atrules-feature-inline) the component styles
    ```vue
    <style lang="less">
        @import (inline) "node_modules/@radial-color-picker/vue-color-picker/dist/vue-color-picker.css";
    </style>
    ```

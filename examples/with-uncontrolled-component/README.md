# Example - With Uncontrolled Component

Example shows how to only listen for changes of the color and skip `hue` and `@input`. Useful only for simple cases and the recommended usage is still
```vue
<color-picker :hue="hue" @input="onInput" />
```

## How to use
Download the example [or clone the whole project](https://github.com/radial-color-picker/vue-color-picker.git):

```bash
curl https://codeload.github.com/radial-color-picker/vue-color-picker/tar.gz/master | tar -xz --strip=2 vue-color-picker-master/examples/with-uncontrolled-component
cd with-uncontrolled-component
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

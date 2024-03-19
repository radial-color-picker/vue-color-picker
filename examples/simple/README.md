# Example - UMD build (simple)

This is a basic example of how to use `vue-color-picker` with the UMD build (useful for quick prototyping in the browser for example).

## How to use

Download the example [or clone the whole project](https://github.com/radial-color-picker/vue-color-picker.git):

```bash
curl https://codeload.github.com/radial-color-picker/vue-color-picker/tar.gz/main | tar -xz --strip=2 vue-color-picker-main/examples/simple
cd simple
```

## Running the example

Start an HTTP server with [`http-server`](https://www.npmjs.com/package/http-server), [`superstatic`](https://www.npmjs.com/package/superstatic) or if you prefer using Python follow [these instructions](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) at MDN.

```bash
# with http-server (starts the server on port 8000 and opens the default browser with the page)
http-server -o

# with superstatic (starts the server on port 3474)
superstatic
```
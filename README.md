mod-jade
===

Compile Jade files to HTML


## Usage

```js
module.exports = {
    plugins: {
        "jade": "mod-jade"
    },
    tasks: {
        "jade": {
            src: "test.jade",
            dest: "test.html"
        }
    }
};
```
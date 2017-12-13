# Modules

A module is a reusable piece of code that encapsulates implementation details and exposes a public API so it can be easily loaded and used by other code.

## Why do we need modules?

* abstract code: to delegate functionality
* encapsulate code: to hide code inside the module that we don't want to be changed
* reuse code: DRY
* manage dependencies

## In the past ... a look at ES5

ES5 and earlier editions were not designed with modules in mind. So people started to get around that by using:

* IIFEs
* Revealing module pattern similar to closure example

## Time went on .. module formats were invented

* YUI module pattern

```html
<script src="https://yui-s.yahooapis.com/3.18.1/build/yui/yui-min.js"></script>
<script>
    YUI().use('node-base', 'node-event-delegate', function (Y) {

        // Your application code goes here...
    });
</script>
```

* Asynchronous Module Definition (AMD) which uses a define function to define mods; not in popular use anymore

```js
define(["dep1", "dep2"], function(dep1, dep2) {
  //Define the module value by returning a value.
  return function() {};
});
```

* CommonJS is used in node.js and uses require and module.exports

```js
var dep1 = require("./dep1");
var dep2 = require("./dep2");

module.exports = function() {
  // ...
};
```

* Universal Module Definition (UMD) - not in popular use anymore

```js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["b"], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("b"));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.b);
  }
})(this, function(b) {
  //use b in some fashion.

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
});
```

* System.register - was designed to support the ES6 module syntax in ES5

```js
import { p as q } from "./dep";

var s = "local";

export function func() {
  return q;
}

export class C {}
```

* ES6 module format supports a native module format

```js
// lib.js

// Export the function
export function sayHello() {
  console.log("Hello");
}

// Do not export the function
function somePrivateFunction() {
  // ...
}
```

```js
import { sayHello } from "./lib";

sayHello();
// => Hello
```

# Not yet supported by all browsers

* Unfortunately at this time, ES6 is not yet supported by all browsers.
* We need a transpiler like Babel to transpile our code to an ES5 format (such as commonJS) before we can actually run our code in the browser

# Module Loaders - runs at runtime

* RequireJS - not in popular use anymore
* SystemJS

```html
<script src="https://jspm.io/system@0.19.js"></script>
<script>
    System.config({ transpiler: 'babel'});
    System.import('./index.js');
</script>
<script src="index.js"></script>
```

```js
// if getting an npm module for example, can say `...from "npm:name-of-module";`
import { AllHtmlEntities } from "npm:html-entities";
const entities = new AllHtmlEntities();
```

# Module Loaders - runs at buildtime

* Webpack
* Browserify - not in popular use anymore

(see https://jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/)

## Exercise

* If you try to open a .js file that uses 'import', currently at this time, the browser will complain.
  Use the module loader SystemJS to get the following to work:

```html
    <script src="https://jspm.io/system@0.19.js"></script>
    <script>
        System.config({ transpiler: 'babel' });
        System.import('./index.js');
    </script>
    <script src="index.js"></script>
```

```js
// index.js
import { number, inc } from "./module-1.js";

console.log(number); // 1
inc();
console.log(number); // 2
```

```js
// module-1.js
// module-1.js
let number = 1;

function inc() {
  number++;
}

export { number, inc };
```

## Challenge get your madlibs to work via SystemJS.

```html
    <script src="https://jspm.io/system@0.19.js"></script>
    <script>
        System.config({ transpiler: 'babel' });
        System.import('./index.js');
    </script>
    <script src="./index.js"></script>
```

```js
import myWords from "npm:pub2npm";

console.log(myWords.all);
console.log(myWords.random());
console.log(myWords.next());
console.log(myWords.nextul());

// const app = document.getElementById("app");
// app.innerHTML = `
// <p>Pizza was invented by a ${myWords.nextul()} ${myWords.nextul()} chef named ${myWords.nextul()}.
// To make pizza, you need to take a lump of ${myWords.nextul()}, and make a thin, round ${myWords.nextul()} ${myWords.nextul()}.
// Then you cover it with ${myWords.nextul()} sauce, ${myWords.nextul()} cheese, and fresh chopped ${myWords.nextul()}.
// Next you have to bake it in a very hot ${myWords.nextul()}.
// When it is done, cut it into ${myWords.nextul()} ${myWords.nextul()}.
// Some kids like ${myWords.nextul()} pizza the best, but my favourite is the ${myWords.nextul()} pizza.
// If I could, I would eat pizza ${myWords.nextul()} times a day!</p>
// `;
```

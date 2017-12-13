# Publishing to npm (see ../pub2npm/)

1. Create a github repo for our library/module
1. Copy your array of words (ensure double quotes used and no semicolon) from madlibs and paste just the array of words into words.json. Upload words.json to github.
1. Ensure node is installed
1. We are going to config our npm publishing workflow via terminal type:

```
npm set init-author-name avcoder
npm set init-author-email whatever@gmail.com
npm set init-author-url http://whatever.com
npm set init-license MIT
cat ~/.npmrc
```

1. Displaying the .npmrc file will show your configuration.
   If you don't see save-exact=true, then add it
   `npm set save-exact true`

1. Signup/login to your npm account on www.npmjs.com

1. Back to terminal type:

```
npm adduser
```

* the above will prompt you for your npm username/password and email. This will create a token in your .npmrc file, and logs you in to npm

1. In terminal type:

```
npm init -y
```

* the above line creates a package.json file; look at it.
* With our package.json ready and npm configured, we are now ready to start writing this library

1. create an index.js which is where the main export will live

```js
// index.js
const words = require("./words.json");

function* nextWord() {
  while (true) {
    yield* words;
  }
}
let word = nextWord();

function newWord() {
  return `<span style="text-decoration:underline">${word.next().value}</span>`
}

function getWord() {
  return word.next().value;
}

module.exports = {
  all: words,
  next: getWord,
  nextul: newWord,
  random:
};
```

1. For random, in terminal type: `npm install unique-random-array`
   This will install that package into your node_modules folder and is added into your package.json. Then prepend at the top of index.js
   ```js
   // index.js
   const uniqueRandomArray = require("unique-random-array");
   .
   .
   .
   module.exports = {
    all: words,
    next: getWord,
    nextul: newWord,
    random: uniqueRandomArray(words)
   };
   ```

* To test the above, go into node REPL (which is like the console but for the server, not the browser). in terminal type `node`

```
const lib = require('./index.js');
lib.all
lib.random
lib.next
lib.nextul
```

1. Push it back to github to save. Ensure .gitignore is made with node_modules listed.

1. Finally publish it to npm by typing `npm publish` in the terminal.
   You'll notice it outputted your module name.

1. Try running `npm info insert-mod-name-here`
1. Try seeing your npm package in the browser and notice the prepopulated fields https://www.npmjs.com/package/insert-name-here
1. In terminal, change directory to the Desktop and then type: `npm install insert-name-here`

1. Now we can create a new javascript file that uses our module! Create a new index.js file on your desktop then code:

```js
// new index.js on desktop
const myWords = require("insert-mod-name-here");

console.log(myWords.all);
console.log(myWords.random);
console.log(myWords.next);
```

Then in terminal type:

```
node index.js
```

* And you should see the results of all, random, and next printed

1. So it works in node, but how about the browser? Try adding the index.js you just created into a new webpage and see what happens?
   (see './desktop/pub2npm/01 - try this in the browser - require not defined' )

1.

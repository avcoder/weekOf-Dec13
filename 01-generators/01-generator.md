# ES6 Generators

Currently with functions it runs top down

```js
function listPeople() {
  console.log("Al");
  console.log("Bob");
  console.log("Char");
}

listPeople();
```

But with a Generator function, we can start/stop or pause for an indefinite
amount of time as well as passing additional information to at a later point in
time.

The keyword `yield` is like "return for now" until function is called again.

```js
function* listPeople() {
  yield "Al";
  yield "Bob";
  yield "Char";
}
// Q. How many times does this fn need to be called to get all 3 names?
// Notice we have an asterisk `function* listPeople() {`
// Notice we use yield keyword
const people = listPeople();
```

* If you run the above code in the console and log out people you will see a
  generator. Where's the data? You have to call `people.next()`
* Note that it doesn't return "Al", but returns an object with keys value and
  done.

# Example using an array

```js
const inventors = [
  { first: "Albert", last: "Einstein", year: 1879 },
  { first: "Isaac", last: "Newton", year: 1643 },
  { first: "Galileo", last: "Galilei", year: 1564 },
  { first: "Marie", last: "Curie", year: 1867 },
  { first: "Johannes", last: "Kepler", year: 1571 },
  { first: "Nicolaus", last: "Copernicus", year: 1473 },
  { first: "Max", last: "Planck", year: 1858 }
];

function* loop(arr) {
  // when do we expect to see the below console.log(inventors) run?
  console.log(inventors);
  for (const item of arr) {
    yield item;
  }
}

const inventor = loop(inventors);
```

# Example using ajax

```js
function* steps() {
  const rf = yield fetch("https://api.github.com/users/ifotn");
  const tt = yield fetch("https://api.github.com/users/tsiliopoulos");
  const ac = yield fetch("https://api.github.com/users/anjuchawla");
}
```

---

# Deeper look into Generators (Credit - KyleSimpson on FrontEndMasters: Async JS)

* Generators allow you to make state machines
* yield is like "Pause button" on a VCR
* Thus, a generator is like a pausable function
* While it's paused, it's not blocking the whole program, just blocking the
  localized generator only
* Generator functions theoretically don't ever have to finish

```js
function* gen() {
  console.log("hello");
  yield; // assumes yielding undefined
  console.log("world");
}

// it looks like we're executing the whole
// function, but actually none of the
// function runs.  Instead it produces an
// iterator.  It waits until .next() is called

var it = gen();
it.next(); // hello
it.next(); // world
```

## Messages can be passed out

```js
function* main() {
  yield 1;
  yield 2;
  yield 3;
}

let it = main();

it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }

it.next(); // { value: undefined, done: true }
// if the last line in main said return 3
// then the final value will be 3, not undefined
```

## Messages can also be passed in

* every pause/yield is asking a question
* every resume/next is answering that question

```js
function* main() {
  let x = 1 + (yield); // try no parenthesis
  let y = 1 + (yield);
  yield x + y; // try return (x + y)
}

let it = main();
it.next(); // { value: undefined, done: false }
it.next(10); // { value: undefined, done: false }
console.log(`hello world ${it.next(30).value}`); // hello world 42   // because { value: 42, done: false }
```

## Example using fetch

```js
function* main() {
  let av = fetch("https://api.github.com/users/avcoder");
  let rf = fetch("https://api.github.com/users/ifotn");
  let tt = fetch("https://api.github.com/users/tsiliopoulos");

  yield av.then(res => res.json()).then(data => console.log(data));
  yield rf.then(res => res.json()).then(data => console.log(data));
  yield tt.then(res => res.json()).then(data => console.log(data));
  console.log("Done");
}
```

# Challenge

Create a madlibs game based off of pizza.jpg
(refer to https://i.pinimg.com/736x/41/a6/c0/41a6c07c0984682b69a98749edb65c3b--funny-mad-libs-pizza-pizza.jpg )
(see codepen for template: https://codepen.io/avcoder/pen/ZvYzNy )

```js
// Step 1 - insert random words according to the comment beside each array element
const words = [
  "", // adjective
  "", // nationality
  "", // name
  "", // noun
  "", // adjective
  "", // noun
  "", // adjective
  "", // adjective
  "", // plural nouns
  "", // noun
  "", // number
  "", // shapes
  "", // food
  "", // food
  "" // number
];

// Step 2 - declare a generator function called nextWord that will iterate over each of the above words
function_ ________________  {


}
// Step 3 - Create an expression that calls nextWord()
let word = nextWord();

// Here is the text
/*
  <p>Pizza was invented by a __________ _____________ chef named __________.
  To make pizza, you need to take a lump of __________, and make a thin, round __________ __________.
  Then you cover it with __________ sauce, __________ cheese, and fresh chopped __________.
  Next you have to bake it in a very hot __________.
  When it is done, cut it into __________ __________.
  Some kids like __________ pizza the best, but my favourite is the __________ pizza.
  If I could, I would eat pizza __________ times a day!</p>
*/

// instead of just using ${word.next().value} everytime inside app.innerHTML
// wrap it inside this newWord function that will additionally underline it
function newWord() {
  return `<span class="madlib">${word.next().value}</span>`;
}

// Step 4 - display it
const app = document.getElementById("app");
app.innerHTML = `
  <p>Pizza was invented by a ${newWord()} ${newWord()} chef named ${newWord()}.
  To make pizza, you need to take a lump of ${newWord()}, and make a thin, round ${newWord()} ${newWord()}.
  Then you cover it with ${newWord()} sauce, ${newWord()} cheese, and fresh chopped ${newWord()}.
  Next you have to bake it in a very hot ${newWord()}.
  When it is done, cut it into ${newWord()} ${newWord()}.
  Some kids like ${newWord()} pizza the best, but my favourite is the ${newWord()} pizza.
  If I could, I would eat pizza ${newWord()} times a day!</p>
  `;

// Challenge : use a dictionary API to insert random words for you
// Challenge : moidfy above to be in a Vue framework
// (see answer demo: https://codepen.io/avcoder/pen/opgvBp )
```

## Application: yield ajax calls

* Example of "synchronous looking" asynchronous code
* Thus, asynchronicity is factored out

```js
// our fake ajax call using setTimeout
function getData(data) {
  setTimeout(function() {
    console.log(`inside getdata about to call it.next(${data})`);
    it.next(data);
  }, 1000);
}

function* main() {
  let x = 1 + (yield getData(10));
  console.log(`inside main. x = ${x}`);
  let y = 1 + (yield getData(30));
  console.log(`inside main. y = ${y}`);
  let answer = yield getData(`answer: ${x + y}`);
  console.log(answer);
}

let it = main();
it.next();
```

* Generators + Promises = async/await

```js
async function foo() {
    await ajax(..);
}
foo().then(..);
```

## Questions

1. What is callback hell?
   1. Why do callbacks suffer from inversion of control and unreasonability?
1. What is a Promise? (placeholder for future value)
   1. How does it solve inversion of control issues
   1. It's like an event listener that we get back and we can listen for a
      completion event in this case it's called .then event
   1. It's a callback manager. We pass our callbacks to the promises system we
      know we can trust, so it uninverts inversion of control problem
1. How do you pause a generator? // yield
1. How do you resume it? // next
1. How do we combine generators and promises for flow control? // yielding a
   Promise, then the Promise resumes the generator

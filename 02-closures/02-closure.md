# Closures

* Closures are a powerful programming technique and forms the basis for modules

## Step 1 - regular function

```js
let myfn1 = function(y) {
  return y + 1;
};
myfn(10); // 11
```

## Step 2 - return a function inside another function

```js
function outerFn() {
  function innerFn(y) {
    return y + 1;
  }

  return innerFn;
}

const a = outerFn();
a(10); // 11
a(20); // 21
```

```js
// outer function takes a single parameter
// outer function returns a function itself (innerFn)
function outerFn(x) {
  // parameter x is an inner variable

  // inner function uses x so
  // it has closure over it
  function innerFn(y) {
    return y + x;
  }

  return innerFn;
}

const myFn = outerFn(1);
myFn(2); // 3
myFn(7); // 8
```

* The reference to the inner function that gets returned with each call
  to the outer function, is able to remember whatever x value was passed

# Modules Design is based on closures

Let's pass an object instead of a function

```js
function outerFn(x) {
  function innerFn(y) {
    return y + x;
  }

  return {
    add2: innerFn // try changing key to a better name, like add2
  };
}
let obj = outerFn(2);
obj.add2(2);
obj.add2(7);
```

* So returning an object instead of a function is like creating a public API
* Why return an object? So you can have multiple APIs

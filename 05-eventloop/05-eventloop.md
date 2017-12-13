# Call Stack

* If we go into a function, V8 pushes it on top of the stack.
* If we return from a function, V8 takes it off the stack

https://www.youtube.com/watch?v=8aGhZQkoFbQ#t=5m30s

# You've seen the call stack when console errors

https://www.youtube.com/watch?v=8aGhZQkoFbQ#t=6m20s

# Blocking

Things that are slow include network calls (fetch) for example.
Let's assume javascript was synchronous (not asynchronous).
The following code would block like this:

https://www.youtube.com/watch?v=8aGhZQkoFbQ#t=8m11s

But this is a problem in browsers because it would hang if js was synchronous.
The solution to the blocking problem is asynchronous callbacks

# Asynchronous callbacks

Basic example using setTimeout.
Here the setTimeout 'magically' disappears from the stack, then reappears 5 seconds later to console.log

https://www.youtube.com/watch?v=8aGhZQkoFbQ#t=11m18s

## Fuller picture of what's under the hood

V8-stack, browser webAPIs, event loop, task queue.
Here setTimeout moves from the stack to the webAPIs which the browser handles (not V8).
After 5 seconds are over, browser webAPI doesn't move back into stack, but rather, once callback is done, it pushes it into task queue.
Event loop has one job: if stack is empty, takes the first thing in the task queue and pushes it onto the stack (14m:40s)

https://www.youtube.com/watch?v=8aGhZQkoFbQ#t=12m55s

Another example using a custom built visual tool
https://www.youtube.com/watch?v=8aGhZQkoFbQ#t=18m25s

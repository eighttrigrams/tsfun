# tsfun

**Lodash FP inspired functional array processing tools for typescript**

https://www.npmjs.com/package/tsfun

https://github.com/danielmarreirosdeoliveira/tsfun

## Using tsfun

with **npm** and **node**:

```bash
npm install --save tsfun
```

Hello, tsfun! (hello.ts)

```
import {take} from 'tsfun'
console.log(take(2)([1,2,3]))
```

Transpile to js and run with 

```bash
$ node hello.js
[ 1, 2 ]
```

## Development

Install, build, and test with `npm install; npm run build; npm test`.

## Features

Let's start with an example, which combines the different sorts of features `tsfun`
offers:

```
flow(
    [1, 2, 3, 1],
    takeWhile(isNot(includedIn([3, 4]))),
    dropRight(1)))
    .includes(1)
    
-> true
```

First of all we have the (combined) predicate `isNot(includedIn(x))`.
More on predicates can be found 
[here](https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/doc/predicates.md). 

Then we have
array manipulating functions like `takeWhile` and `dropRight`. More on these
and others can be found 
[here](https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/doc/coll.md).

Last but not least, we have `flow`, which is discussed in the next paragraph.

### Flow

A flow is a series of transformations of some object of type `A` to another object 
of type `A`.

The original design goal of a flow was to provide a way to mix javascript functional style
methods like `map` and `filter`, with other functional style methods like `takeWhile` 
in a way which feels as natural as possible, given that we do not want to mix in new methods
into the Array prototype.

```
1. flow(
2.    [1, 2, 3, 5, 7],
3.    takeWhile(smallerThan(3)),
4.    dropRight(1))
5.    .map((x: number) => x * 2)
6.    .includes(2)

-> true
```

In this example we feed the flow with an array, and then transform this array step
by step, first within the flow, using `takeWhile` and `drop`. The result is an array,
which then is beeing transformed again with the native `map` function. Finally `includes`
is called on it to obtain a `boolean` result. As we see, it lets us seemingly 'pipe'
things across the borders of the flow.

Just as a reminder, a flow has not necessarily to be of type `Array`, it works on any
type `A`. It is just that `tsfun` itself provides many array manipulating functions which
are designed with flow in mind. 

[more](https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/doc/flow.md)





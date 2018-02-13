# tsfun

**Lodash inspired functional array processing tools for a seamless typescript experience**

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

### Take, Drop etc.

Currently the implementations for the following methods are provided

```
take(5)([1, 2])
-> [1]
takeWhile(smaller(3))([1, 2, 3, 1])
-> [1, 2]
takeRightWhile(smaller(3))([1, 2, 3, 1])
-> [1]
takeUntil(bigger(2))([1, 2, 3, 1])
-> [1, 2, 3]
drop(1)([1, 3])
-> [3]
dropRight(1)([1, 3])
-> [1]
dropWhile(smaller(2))([1, 2, 3, 1])
-> [2, 3, 1]
dropRightWhile(bigger(2))([1, 2, 3])
-> [1, 2]
```

### Predicates

```
includedIn([1, 2])(1)
-> true
differentFrom(3)(2)
-> true
smaller(4)(2)
-> true
bigger(4)(5)
-> true
isNot(bigger(4))(5)
-> false
```

These are meant to be used as predicates of the library methods, as for example `takeWhile`,

```
takeWhile(smaller(4))([1, 2, 4, 5])
-> [1, 2]
```

as well as in the native javascript functions.

```
[1, 2, 4, 2]
    .filter(smaller(4))
-> [1, 2, 2]
```

### Flow

A flow is a series of transformations of Array of A to Array of A.
The design goal of a flow is to provide a way to mix javascript functional style
methods like `map` and `filter`, with other functional style methods like takeWhile` 
in a way which feels as natural as possible, given that we do not want to mix in new methods
into the Array prototype.

```
flow(
    [1, 2, 3, 5, 7],
    takeWhile(smaller(3)))
    .map((x: number) => x * 2)
    .includes(2)

-> true
```

Some of the array methods have corresponding flow compatible implementations.

```
flow(
    [1, 2, 3, 4],
    filter((x: number) => x < 3),
    map(x => x * 2),
    reduce((acc, val) => acc.concat([val * 2])),
    reverse(),
    take(1))

-> [8]
```

This allows us to stay in the flow in between calls to methods we don't have native javascript
version for, like for example `take`.

**Note** that, as stated earlier, a flow consists of only transformations from Array of A to Array of A,
thus constraining our versions of the methods somewhat in comparison to the native methods (
consider for example `map`, which typically maps from A to B, not necessarily from A to A).

Nevertheless, with flow you have the possibility to combine a mapping from A to B with 
for example `take` like this

```
flow(
    [true, false, true]
    .map((x: boolean) => x ? 1 : 0),
    take(2))

-> [1, 0]
```

#### Nesting

There is also `flowP`, which is a partially applied flow. 
It allows a composition of flows.


```
const evenAndSmaller6 = flowP(
    filter(smaller(6)),
    filter((x: number) => x % 2 == 0))

  
flow(
    [1, 2, 3, 4, 6, 7, 8],
    evenAndSmaller6,
    take(1))
    .includes(2)

-> true
```

### Set methods

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

These methods are designed to be part of a flow:

```
intersect(3, 4, 5])([1, 2, 3])
-> [3]
subtract([3, 4, 5])([1, 2, 3])
-> [1, 2]
remove(3)([1, 2, 3])
-> [1, 2]
unite([3, 4, 5])([1, 2, 3])
-> [3, 4, 5, 1, 2]
unique()([1, 1, 7, 8, 7, 1])
-> [1, 7, 8]
```

These methods are designed to be used at the beginning of a flow:

```
union([[3, 4, 5], [1, 2, 3]])
-> [3, 4, 5, 1, 2]
intersection([[3, 4, 5], [1, 2, 3]])
-> [3]
```

Remember, that a flow has to maintain the array type,
which in the following example is Array of number. In such a case
you can combine `union` for example with `takeWhile` like this:

```
flow(
    union([1, 2], [2, 4]),
    takeWhile(smaller(2)))
    
-> [1, 2]
```

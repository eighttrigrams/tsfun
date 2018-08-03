# Utilities for Collections

## general

### maps and arrays

#### copy

Creates a shallow copy of an object or an array

```
copy([1, 2])
-> [1, 2]
copy({a: 1, 2: 5})
-> {a: 1, 2: 5}
```

### maps

```
import {map, filter} from 'tsfun/objects'
```

#### map

```
map((x: number) => x * 2)({a: 1, b: 2})
-> {a: 2, b: 4}
```

#### filter

```
filter((x: number) => x > 1)({a: 1, b: 2})
-> {b: 2}
```

## ordered-list-like

These methods treat arrays as ordered lists

### general

#### flatMap

```
flatMap((x: string) => x.split(' '))(['a b', 'c d'])
-> ['a', 'b', 'c', 'd']
```

#### reverse

```
reverse([4, 1])
-> [1, 4]
```

### take

Currently the implementations for the following **take** methods are provided

#### take

```
take(5)([1, 2])
-> [1]
```

#### takeWhile

```
takeWhile(smallerThan(3))([1, 2, 3, 1])
-> [1, 2]
```

#### takeRightWhile

```
takeRightWhile(smallerThan(3))([1, 2, 3, 1])
-> [1]
```

#### takeUntil

```
takeUntil(biggerThan(2))([1, 2, 3, 1])
-> [1, 2, 3]
```

#### takeNth

```
takeNth(2)([1, 2, 3, 7])
-> [1, 3]
```

### drop

Currently the implementations for the following **drop** methods are provided


#### drop

```
drop(1)([1, 3])
-> [3]
```

#### dropRight

```
dropRight(1)([1, 3])
-> [1]
```

#### dropWhile

```
dropWhile(smallerThan(2))([1, 2, 3, 1])
-> [2, 3, 1]
```

#### dropRightWhile

```
dropRightWhile(biggerThan(2))([1, 2, 3])
-> [1, 2]
```

## set-like

Set methods come in two flavours, array set methods and object set methods.
Both of these have in common that the respective data structures are treated 
as if they were sets, hence we also call them set-like methods.

### arrays

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

`intersect`, `subtract`, `unite` and `uniqe` are partials, which can be inserted
into the body of a `flow`. `intersection` and `union` take a `NestedArray<A>` as
their argument, so they can be used to begin a `flow` with.


#### intersection

```
intersection([[3, 4, 5], [1, 2, 3]])
-> [3]
```

#### intersectionBy

```
intersectionBy(equalTo)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]
-> [{c: 'c'}]
```

#### intersect

```
intersect([3, 4, 5])([1, 2, 3])
-> [3]
intersect([3])([4])
-> []
intersect([3, 4, 5], [2])([1, 2, 3])        // multiple args
-> [3, 2]
```

#### intersectBy

```
intersectBy(equalTo)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}])
-> [{c: 'c'}]
```

#### union

```
union([[3, 4, 5], [1, 2, 3]])
-> [3, 4, 5, 1, 2]
```

### unionBy

```
unionBy(equalTo)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]])
-> [{a: 'a'}, {c: 'c'}, {d: 'd'}]
```

#### unite

```
unite([3, 4, 5])([1, 2, 3])
-> [3, 4, 5, 1, 2]
unite([3], [4, 5])([1, 2, 3])               // multiple args
-> [3, 4, 5, 1, 2]
```

### uniteBy

```
uniteBy(equalTo)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}])
-> [{a: 'a'}, {c: 'c'}, {d: 'd'}]
```

#### unique

```
unique([1, 1, 7, 8, 7, 1])
-> [1, 7, 8]
```

#### uniqueBy

```
uniqueBy(equalTo)([{a: 'c'}, {a: 'c'}])
-> [{a: 'c'}]
```

#### subtract

```
subtract([3, 4, 5])([1, 2, 3])
-> [1, 2]
subtract([3, 4, 5])([1, 2, 3, 3, 1])        // make result a 'set'
-> [1, 2]
subtract([3, 4, 5], [2])([1, 2, 3, 3, 1])   // multiple args
-> [1]
```

### subtractBy

```
subtractBy(equalTo)<any>([{a: 'a'}])([{a: 'a'}, {c: 'c'}])
-> [{c: 'c'}]
```

### objects

```
import {intersect, unite, subtract} from 'tsfun/objects'
```

#### intersect

```
intersect({1: 4})({1: 3, 2: 4})
-> {1: 4}
```

#### unite

```
unite({1: 4})({2: 4})
-> {1: 4, 2: 4}
unite({5: 6}, {1: 4})({2: 4})
-> {1: 4, 2: 4, 5: 6}
```

#### subtract

```
subtract({1: 7})({1: 3, 2: 4})
-> {2: 4}
```

#### union

```
union([{1: 4}, {2: 4}])
-> {1: 4, 2: 4}
```



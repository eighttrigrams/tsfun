# Comparators

## Overview

A comparator take two arguments of Type A and returns a boolean value: 
`<A>(_: A) => (_: A) => boolean`.

It is implemented as 

```
export type Comparator = <A>(_: A) => Predicate<A>;
```

which makes total sense, given that the typical usage we aim for with
comparators looks something like

```
[3, 2, 1, 0].filter(biggerThan(1))
```

Here we apply biggerThan partially with its first argument `1`, which effectively
gives us a predicate, which then gets applied in the filter loop. 

#### Comparator Producers

All functions ending with -By, like for example `differentFromBy` are producers of
Comparators. They get applied partially, taking another comparator, to give as
a comparator.

If for instance we would want to compare

```
differentFrom({a: 1})({a: 1})
-> true
```

it gives true due to the default default via `===`.

If we wanted to make a value comparison we could instead do like that

```
differentFromBy(jsonEqual)({a: 1})({a: 1})
-> false
```

### arrayEqual


Note that `objectEqual` standard Array Comparator is `arrayEqual`. So

```
arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [1, 2]}])
-> true
```

but

```
arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [2, 1]}])
-> false
```

On any level, order of keys and order in Arrays matters.
This behaviour, as usual, can be changed using `arrayEqualBy`.


### arrayEquivalentBy

```
arrayEquivalentBy(jsonEqual)([{a: 9}, {c: 7}, {b: 4}])([{b: 4}, {a: 9}, {c: 7}])
-> true
```

The standard Object Comparator is `objectEqualBy(arrayEquivalent)` such that

```
arrayEquivalent
  ([{c: 7}, {c: 5, b: 4}])
  ([{b: 4, c: 5}, {c: 7}])
-> true
```

but also 

```
arrayEquivalent
    ([{c: 7}, {c: [{g: [9, 8], d: 5}, 3], b: 4}])
    ([{b: 4, c: [3, {d: 5, g: [8, 9]}]}, {c: 7}])
-> true
```

meaning that the order of Array does not matter on any level.

### objectEqual

As stated in [structures](structures.md), when we talk about Objects in tsfun, 
we care about nested structures. 

```
objectEqual({e: 0, a: {d: 2, c: 1}})({a: {c: 1, d: 2}, e: 0})
-> true
```

So we can nest structures and on any level, if the value is again an Object, 
the order of the keys does not matter.

On any level, if the value is either a `string` or a `number`, the values
of the corresponding keys are compared via `===`, provided they are both of 
the same type.

If the type of a certain key on both Objects is of a descendant of `Object`,
for instance `Date` or `Map`, the comparison is done via `jsonEqual`. Thus

```
objectEqual<any>({a: new Date(2018, 11, 24)})
                     ({a: new Date(2018, 11, 24)})
-> true
```

and 

```
objectEqual<any>({a: new Date(2018, 11, 24)})
                     ({a: new Date(2018, 11, 25)})
-> false
```

If the value of a certain key on both Objects is of type `Array`, the default
comparison is done with `arrayEqual`, which in turn uses `objectEqual`, such that 

```
objectEqual({a: [2, {a: 3, b: 4}]})({a: [2, {a: 3, b: 4}]})
-> true
```

Also, the order of arrays matters by default, so

```
objectEqual({a: [2, 1]})({a: [1, 2]})
-> false
```

###### advanced combinations

TODO review section

More advanced combinations can be used to achieve even more control

```
objectEquivalentBy(arrayEqualBy(objectEqual))
   ({a: [{e: 5, c: 4}, 2], b: 0})
   ({b: 0, a: [{c: 4, e: 5}, 2]})
-> true
```

In this example the key order does not matter, but the order of Arrays does.
Furthermore, the arrays get inspected and compared with `arrayEqualBy(objectEquivalent)`,
which makes them order insensitive.

Note that the mutual nesting between `objectEquivalent(By)` and
`arrayEqual(By)` or `arrayEquivalent(By)` reflects at which hierarchical level
which elements are treated how. It could be viewed as some kind of dimensionality
where on each level (of change between Array and Object) the rules for comparison
can be redefined explicitely. After that level the defaults kick in, which should
be sufficient for most situations.

This is useful in situations where the overall structure of your Objects is
known, in which case you would build your own standard Comparator by composing
what you need, for example

```
export class T { ... }
const myTComparator = objectEquivalentBy(arrayEqualBy(objectEquivalent));
```


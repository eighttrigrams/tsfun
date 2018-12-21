# Comparators


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


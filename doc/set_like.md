# Set-like collection methods

Set methods come in two flavours, array set methods and object set methods.
Both of these have in common that the respective data structures are treated 
as if they were sets, hence we also call them set-like methods.

## For Arrays

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

`intersect`, `subtract`, `unite` and `uniqe` are partials, which can be inserted
into the body of a `flow`. `intersection` and `union` take a `NestedArray<A>` as
their argument, so they can be used to begin a `flow` with.

### intersection

```
intersection([[3, 4, 5], [1, 2, 3]])
-> [3]
```

### intersectionBy

```
intersectionBy(equalTo)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]
-> [{c: 'c'}]
```

### intersect

```
intersect([3, 4, 5])([1, 2, 3])
-> [3]
intersect([3])([4])
-> []
intersect([3, 4, 5], [2])([1, 2, 3])        // multiple args
-> [3, 2]
```

### intersectBy

```
intersectBy(equalTo)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}])
-> [{c: 'c'}]
```

### union

```
union([[3, 4, 5], [1, 2, 3]])
-> [3, 4, 5, 1, 2]
```

### unionBy

```
unionBy(equalTo)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]])
-> [{a: 'a'}, {c: 'c'}, {d: 'd'}]
```

### unite

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

### unique

```
unique([1, 1, 7, 8, 7, 1])
-> [1, 7, 8]
```

### uniqueBy

```
uniqueBy(equalTo)([{a: 'c'}, {a: 'c'}])
-> [{a: 'c'}]
```

`uniqueBy` can also be combined with `on` to allow for constructions like

```
uniqueBy(on('a'))([{a: 1}, {a: 2}, {a: 1}])
-> [{a: 1}, {a: 2}]
```

### duplicates

...

### subtract

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

## For Maps

### intersectMap

```
intersectMap({1: 4})({1: 3, 2: 4})
-> {1: 4}
```

### uniteMap

```
uniteMap({1: 4})({2: 4})
-> {1: 4, 2: 4}
uniteMap({5: 6}, {1: 4})({2: 4})
-> {1: 4, 2: 4, 5: 6}
```

### subtractMap

```
subtractMap({1: 7})({1: 3, 2: 4})
-> {2: 4}
```

### unionMap

```
unionMap([{1: 4}, {2: 4}])
-> {1: 4, 2: 4}
```

### mapMap

```
map((x: number) => x * 2)({a: 1, b: 2})
-> {a: 2, b: 4}
```

### filterMap

```
filterMap((x: number) => x > 1)({a: 1, b: 2})
-> {b: 2}
```
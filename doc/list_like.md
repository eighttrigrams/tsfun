# Ordered-list-like collection methods

These methods treat arrays as ordered lists

## Arrays

### getAtIndex

```
getAtIndex([1, 3, 7])(2)
-> 7
```

```
getAtIndex([1, 3, 7])(8)
-> undefined
```

used with map

```
[0, 2].map(getAtIndex([1, 3, 7]))
-> [1, 7]
```

### getAtIndexOr

providing a fallback value

```
getAtIndexOr([1, 3, 7], 10)(8)
-> 10
```

### map

Returns a transformation that
maps from Array\<A> to Array\<A>

```
flow([{a: 1}, {a: 3}],
    map(to('a'))))
-> [1, 3]       
```

See also [flow](./flow.md) and [to](objects.md).

### filter

Takes a Predicate<A> and returns a transformation that
maps from Array\<A> to Array\<A>

```
flow([2, 4, 3],
    filter(smallerThan(4)))
-> [2, 3]
```

### mapTo

A standalone combination of map and to which also filters 
all undefined elements out of the resulting array.

```
mapTo('a.c')([{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}])
-> [{d: 'e'}]
```

### flatMap

Returns a transformation that
maps from Array\<A> to Array\<A>

```
flatMap((x: string) => x.split(' '))(['a b', 'c d'])
-> ['a', 'b', 'c', 'd']
```

### reverse

Transformation from Array\<A> to Array\<A>
where the order is reversed.

```
reverse([4, 1])
-> [1, 4]
```

## Maps

### mapMap

```
mapMap((x: number) => x * 2)({a: 1, b: 2})
-> {a: 2, b: 4}
```

### filterMap

```
filterMap((x: number) => x > 1)({a: 1, b: 2})
-> {b: 2}
```

## Arrays - Picking methods

See [Picking methods](./list_like_pick.md)



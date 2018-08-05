# Ordered-list-like collection methods

These methods treat arrays as ordered lists

## Arrays

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

## Picking methods

Currently the implementations for the following **take** and **drop** methods are provided

### take

```
take(5)([1, 2])
-> [1]
```

### takeWhile

```
takeWhile(smallerThan(3))([1, 2, 3, 1])
-> [1, 2]
```

### takeRightWhile

```
takeRightWhile(smallerThan(3))([1, 2, 3, 1])
-> [1]
```

### takeUntil

```
takeUntil(biggerThan(2))([1, 2, 3, 1])
-> [1, 2, 3]
```

### takeNth

```
takeNth(2)([1, 2, 3, 7])
-> [1, 3]
```

### drop

```
drop(1)([1, 3])
-> [3]
```

### dropRight

```
dropRight(1)([1, 3])
-> [1]
```

### dropWhile

```
dropWhile(smallerThan(2))([1, 2, 3, 1])
-> [2, 3, 1]
```

### dropRightWhile

```
dropRightWhile(biggerThan(2))([1, 2, 3])
-> [1, 2]
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


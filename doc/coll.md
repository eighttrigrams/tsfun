# Utilities for Collections

## For Maps and Arrays

### copy

Creates a shallow copy of an object or an array

```
copy([1, 2])
-> [1, 2]
copy({a: 1, 2: 5})
-> {a: 1, 2: 5}
```

### isEmpty



## Maps as collections

### map

```
map((x: number) => x * 2)({a: 1, b: 2})
-> {a: 2, b: 4}
```

### filter

```
filter((x: number) => x > 1)({a: 1, b: 2})
-> {b: 2}
```

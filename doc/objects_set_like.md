# Set-like collection methods for Maps

* See [Sources](../src/collections/objects_set_like.ts)
* See [Tests](../test/collections/objects_set_like.spec.ts)

## Reference

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
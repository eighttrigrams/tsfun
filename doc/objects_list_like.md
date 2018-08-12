# Ordered-list-like collection methods for Maps

* See [Sources](../src/collections/objects_list_like.ts)
* See [Tests](../test/collections/objects_list_like.spec.ts)

## Reference

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



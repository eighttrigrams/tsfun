# Set-like collection methods for Objects

* See [Sources](../src/collections/objects_set_like.ts)
* See [Tests](../test/collections/objects_set_like.spec.ts)

## Reference

### intersectObject

```
intersectObject({1: 4})({1: 3, 2: 4})
-> {1: 4}
```

### uniteObject

```
uniteObject({1: 4})({2: 4})
-> {1: 4, 2: 4}
uniteObject({5: 6}, {1: 4})({2: 4})
-> {1: 4, 2: 4, 5: 6}
```

### subtractObject

```
subtractObject({1: 7})({1: 3, 2: 4})
-> {2: 4}
```

### unionObject

```
unionMap([{1: 4}, {2: 4}])
-> {1: 4, 2: 4}
```
# Utilities for Collections

* See [Sources](../src/collections/coll.ts)
* See [Tests](../test/collections/coll.spec.ts)

## Overview

Note that all collection functions return shallow copies.
In the same spirit, all collection functions compare in their basic versions
with `tripleEqual` a.k.a. `===`. For the most functions there is a -By suffixed 
version where one can choose the Comparator however. See `wrap` [here](./core.md) 
for seeing how to return clones. 

## Reference

### copy

Creates a shallow copy of an object or an array

```
copy([1, 2])
-> [1, 2]
copy({a: 1, 2: 5})
-> {a: 1, 2: 5}
```




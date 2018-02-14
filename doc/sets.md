## Set methods

### Set-like methods for arrays, usable with flow

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

These methods are designed to be part of a flow:

```
intersect(3, 4, 5])([1, 2, 3])
-> [3]
subtract([3, 4, 5])([1, 2, 3])
-> [1, 2]
subtract([3, 4, 5])([1, 2, 3, 3, 1]) // make result a 'set'
-> [1, 2]
unite([3, 4, 5])([1, 2, 3])
-> [3, 4, 5, 1, 2]
unique()([1, 1, 7, 8, 7, 1])
-> [1, 7, 8]
```

### General set like methods for arrays

These methods are designed to be used at the beginning of a flow:

```
union([[3, 4, 5], [1, 2, 3]])
-> [3, 4, 5, 1, 2]
intersection([[3, 4, 5], [1, 2, 3]])
-> [3]
```

Remember, that a flow has to maintain the array type,
which in the following example is Array of number. In such a case
you can combine `union` for example with `takeWhile` like this:

```
flow(
    union([1, 2], [2, 4]),
    takeWhile(smallerThan(2)))
    
-> [1, 2]
```

### Set-like methods for objects

```
intersectO({1: 4})({1: 3, 2: 4})
-> {1: 4}
uniteO({1: 4})({2: 4})
-> {1: 4, 2: 4}
subtractO({1: 7})({1: 3, 2: 4})
-> {2: 4}
```


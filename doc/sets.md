## Set methods

Set methods come in two flavours, array set methods and object set methods.
Both of these have in common that the respective data structures are treated 
as if they were sets, hence we also call them set-like methods.

### Set-like methods for arrays

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

`intersect`, `subtract`, `unite` and `uniqe` are partials, which can be inserted
into the body of a `flow`. `intersection` and `union` take a `NestedArray<A>` as
their argument, so they can be used to begin a `flow` with.

#### intersect

```
intersect([3, 4, 5])([1, 2, 3])
-> [3]
intersect([3])([4])
-> []
intersect([3, 4, 5], [2])([1, 2, 3])        // multiple args
-> [3, 2]
```

#### subtract

```
subtract([3, 4, 5])([1, 2, 3])
-> [1, 2]
subtract([3, 4, 5])([1, 2, 3, 3, 1])        // make result a 'set'
-> [1, 2]
subtract([3, 4, 5], [2])([1, 2, 3, 3, 1])   // multiple args
-> [1]
```

#### unite

```
unite([3, 4, 5])([1, 2, 3])
-> [3, 4, 5, 1, 2]
unite([3], [4, 5])([1, 2, 3])               // multiple args
-> [3, 4, 5, 1, 2]
```

#### unique

```
unique()([1, 1, 7, 8, 7, 1])
-> [1, 7, 8]
```

#### union

```
union([[3, 4, 5], [1, 2, 3]])
-> [3, 4, 5, 1, 2]
```

#### intersection

```
intersection([[3, 4, 5], [1, 2, 3]])
-> [3]
```

### Set-like methods for objects

#### intersectO

```
intersectO({1: 4})({1: 3, 2: 4})
-> {1: 4}
```

#### uniteO

```
uniteO({1: 4})({2: 4})
-> {1: 4, 2: 4}
```

#### subtractO

```
subtractO({1: 7})({1: 3, 2: 4})
-> {2: 4}
```


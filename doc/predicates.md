## Predicates

```
sameAs(3)(3)
-> true
isNot(sameAs(3))(2)
-> true
differentFrom(3)(2)
-> true
includedIn([1, 2])(1)
-> true
smallerThan(4)(2)
-> true
biggerThan(4)(5)
-> true
isNot(biggerThan(4))(5)
-> false
```

These are meant to be used as predicates of the library 
methods, as for example `takeWhile`,

```
takeWhile(smallerThan(4))([1, 2, 4, 5])
-> [1, 2]
```

as well as in the native javascript functions.

```
[1, 2, 4, 2]
    .filter(smallerThan(4))
-> [1, 2, 2]
```

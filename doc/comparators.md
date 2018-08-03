## Comparators

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

### General purpose

General purpose, working with `==` comparisons

```
sameAs(3)(3)
-> true
differentFrom(3)(2)
-> true
includedIn([1, 2])(1)
-> true
```

### Special purpose

A special combinator is `isNot`, which can flip the results boolean value

```
isNot(sameAs(3))(2) // same as differentFrom(3)(2)
-> true
```

### Number predicates

To be used with numbers, working with `<`, `>`, `%`

```
smallerThan(4)(2)
-> true
biggerThan(4)(5)
-> true
even()(2)
-> true
odd()(3)
-> true
```

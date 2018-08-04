# Predicates and Comparators

## Predicates

### isDefined

```
isDefined(1)
-> true
```

### isUndefined

```
isUndefined(undefined)
-> true
```

### isNot 

A special combinator is `isNot`, which can flip the results boolean value

```
isNot(isUndefined)(3) 
-> true

isNot(sameAs(3))(2) // same as differentFrom(3)(2)
-> true
```

### even

```
even()(2)
-> true
```

### odd

```
odd()(3)
-> true
```

## Comparators

There is a special class of comparators, the `on`-Comparators,
which are discussed in [objects](./objects.md)


### smallerThan

```
smallerThan(4)(2)
-> true
```

combined with takeWhile

```
takeWhile(smallerThan(4))([1, 2, 4, 5])
-> [1, 2]
```

### biggerThan

```
biggerThan(4)(5)
-> true
```

in combination with .filter

```
[3, 2, 1, 0]
    .filter(biggerThan(1))
-> [3, 2]
```

### sameAs

sameAs uses comparison via `===`.

```
sameAs(3)(3)
-> true

[1, 2, 3]
    .filter(sameAs(3))
-> [3]    
```

### equalTo

equalTo compares to objects by comparing their string representations
via JSON.parse(Json.stringify(item))

```
equalTo({a: {b: 'c'})({a: {b: 'c'})
-> true
```

### differentFrom

```
differentFrom(3)(2)
-> true
```

### differentFromBy


### includedIn

```
includedIn([1, 2])(1)
-> true
```

### includedInBy

# Predicates

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
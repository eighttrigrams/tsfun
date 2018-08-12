# Predicates

* See [Sources](../src/predicates.ts)
* See [Tests](../test/predicates.spec.ts)

##### Overview

## Reference

### isNot 

A special combinator is `isNot`, which can flip the results boolean value

```
isNot(isUndefined)(3) 
-> true

isNot(sameAs(3))(2) // same as differentFrom(3)(2)
-> true
```

### not

Alias for `isNot`

### isDefined

```
isDefined(1)
-> true
```

### defined

Alias for `isDefined`

### isUndefined

```
isUndefined(undefined)
-> true
```

### isUndefinedOrEmpty

### undefinedOrEmpty

Alias for `isUndefinedOrEmpty`


### isEmpty

### empty

Alias for `isEmpty`

### isTrue

### isFalse

### isArray

### isObject
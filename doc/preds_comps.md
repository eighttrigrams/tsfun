# Predicates and Comparators

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

To be used with numbers, working with `<`, `>`, `%`

### smallerThan

```
smallerThan(4)(2)
-> true
```

### biggerThan

```
biggerThan(4)(5)
-> true
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


### on

compares elements on path directly with a certain value

```
[{a: {b: 'c'}}, {a: {b: 'd'}}]
    .filter(on('a.b:')('c')))
-> [{a: {b: 'c'}}]                              
```

compares on the samePath

```

[{a: {b: 'c'}}, {a: {b: 'd'}}]
    .filter(on('a.b')({a: {b: 'c'}})))          
-> [{a: {b: 'c'}}]
```

compares elements on different paths 

```

[{a: {b: '1'}}, {c: {d: '1'}}]                  
    .filter(on('a.b', 'c.d')({c: {d: '1'}})
-> [{a: {b: 1}}]
```

usage with find

```
{a: {b: {d: '1'}}}, {a: {b: {d: '2'}}}]
    .find(on('a.b.d:')('1'))
-> {a: {b: {d: '1'}}}
```

combined with isNot

```
[{a: {b: {d: '1'}}}, {a: {b: {d: '2'}}}]
    .find(isNot(on('a.b.d:')('1')))
-> {a: {b: {d: '2'}}}
```

### onBy

```
[{a: {b: {d: '1'}}}, {a: {b: {d: '2'}}}]
    .filter(onBy(equalTo)('a.b:')({d: '1'}))
-> {a: {b: {d: '1'}}}
```
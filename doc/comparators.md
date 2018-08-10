# Comparators

A comparator take two arguments of Type A and returns a boolean value: 
`<A>(_: A) => (_: A) => boolean`.

It is implemented as 

```
export type Comparator = <A>(_: A) => Predicate<A>;
```

which makes total sense, given that the typical usage we aim for with
comparators looks something like

```
[3, 2, 1, 0].filter(biggerThan(1))
```

Here we apply biggerThan partially with its first argument `1`, which effectively
gives us a predicate, which then gets applied in the filter loop. 

#### Comparator Producers

All functions ending with -By, like for example `differentFromBy` are producers of
Comparators. They get applied partially, taking another comparator, to give as
a comparator.

If for instance we would want to compare

```
differentFrom({a: 1})({a: 1})
-> true
```

it gives true due to the default default via `===`.

If we wanted to make a value comparison we could instead do like that

```
differentFromBy(jsonEqual)({a: 1})({a: 1})
-> false
```

Following that kind of logic we could also say Comparators are Predicate Producers

## Reference

### tripleEqual

tripleEqual unsurprisingly uses comparison via `===`.

```
tripleEqual(3)(3)
-> true
```

and can for example be used with filter

```
[1, 2, 3].filter(tripleEqual(3))
-> [3]    
```

### jsonEqual

equalTo compares to objects by comparing their string representations
via JSON.parse(JSON.stringify(item))

```
jsonEqual({a: {b: 'c'})({a: {b: 'c'})
-> true
```

### biggerThan

```
biggerThan(4)(5)
-> true
```

in combination with `filter`

```
[3, 2, 1, 0].filter(biggerThan(1))
-> [3, 2]
```

### smallerThan

```
smallerThan(4)(2)
-> true
```

combined with `takeWhile`

```
takeWhile(smallerThan(4))([1, 2, 4, 5])
-> [1, 2]
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

Meta-Comparator


### arrayEquivalent

arrayEquivalent compares two Arrays in a way that the order of the Arrays
does not matter. 

```
arrayEquivalent([1, 4, 7])([7, 4, 1])
-> true
```

### arrayEquivalentBy

```
arrayEquivalentBy(jsonEqual)([{a: 9}, {c: 7}, {b: 4}])([{b: 4}, {a: 9}, {c: 7}])
-> true
```

### objectEquivalent

If we compare Objects with objectEquivalent, we do not care for the order
of their keys. Thus

```
objectEquivalent({a: 1, b: 2})({b: 2, a: 1})
->
```

As stated in [structures](structures.md), when we talk about Objects in tsfun, 
we care about nested structures. 

```
objectEquivalent<any>({e: 0, a: {d: 2, c: 1}})({a: {c: 1, d: 2}, e: 0})
-> true
```

So we can nest structures and on any level, if the value is again an Object, 
the order of the keys does not matter.

On any level, if the value is either a `string` or a `number`, the values
of the corresponding keys are compared via `===`, provided they are both of 
the same type.

If the type of a certain key on both Objects is of a descendant of `Object`,
for instance `Date` or `Map`, the comparison is done via jsonEquals. Thus

```
objectEquivalent<any>({a: new Date(2018, 11, 24)})
                     ({a: new Date(2018, 11, 24)})
-> true
```

and 

```
objectEquivalent<any>({a: new Date(2018, 11, 24)})
                     ({a: new Date(2018, 11, 25)})
-> false
```

If the value of a certain key on both Objects is of type `Array`, the default
comparison is done with `jsonEqual`. See `objectEquivalentBy` to change that.

### objectEquivalentBy

...


### on

compares elements on path directly with a certain value

```
[{a: {b: 'c'}}, {a: {b: 'd'}}]
    .filter(on('a.b:')('c')))
-> [{a: {b: 'c'}}]                              
```

compares both items on the same path

```

[{a: {b: 'c'}}, {a: {b: 'd'}}]
    .filter(on('a.b')({a: {b: 'c'}})))          
-> [{a: {b: 'c'}}]
```

usage with find

```
[{a: {b: {d: '1'}}}, {a: {b: {d: '2'}}}]
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

```
{a: 2}, {b: 4}, {b: 1}, {a: 1}, {c: 5}]
    .find(onBy(smallerThan)('a:')(2))
-> {a: 1}
```
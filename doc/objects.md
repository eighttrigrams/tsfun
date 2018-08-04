# Objects

### takeOrMake

makes

```
const obj: any = { }
takeOrMake(obj, 'a.b.c', [])
obj['a']['b']['c'] === []
-> true
```

takes

```
takeOrMake({a:{ b: { c: 'a'}}}, 'a.b.c', [])
-> 'a'
```

### clone

```
const b = clone(a)
```

### to

```
[{a: {b: {c: 'd'}}}].map(to('a.b'))
-> {c: 'd'}
```

combined with map and filter

```
[{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]
    .map(to('a.c'))
    .filter(isDefined)
-> [{d: 'e'}]
```

### getElForPathIn

...


### Comparators


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

```
{a: 2}, {b: 4}, {b: 1}, {a: 1}, {c: 5}]
    .find(onBy(smallerThan)('a:')(2))
-> {a: 1}
```

### sameOn

a standalone version of `on`

```
sameOn('a.b', {a: {b: 5}}, {a: {b: 5}})
-> true
```

```
sameOn('a.b', {a: {b: 5}}, {a: {c: 5}}, 'a.c')
-> true
```

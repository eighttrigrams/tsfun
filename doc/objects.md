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

# Object functions

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

Clones an object via `JSON.parse(JSON.stringify(object)`.

```
const b = clone(a)
```

A postprocessing function can given as an optional param

```
const b = clone(a, function convertDates<O>(original: any, plain: any) {

        if (original) {
            for (let key of Object.keys(original)) {

                if (original[key] instanceof Date) {
                    plain[key] = new Date(original[key]);
                } else if (typeof original[key] === 'object') {
                    convertDates(original[key], plain[key])
                }

            }
        }
        return plain;
    });
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

### option

...

### mapOption

### Comparators

See section [comparators](comparators.md)

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

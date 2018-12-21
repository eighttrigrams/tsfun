# Object functions

* See [Sources](../src/objects.ts)

## Reference

* [getElForPathin](../test/objects/get_el_for_path_in.spec.ts)
* [takeOrMake](../test/objects/take_or_make.spec.ts)
* [option](../test/objects/option.spec.ts)
* [mapOption](../test/objects/map_option.spec.ts)
* [to](../test/objects/to.spec.ts)
* [intoObject](../test/objects/into_object.spec.ts)

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

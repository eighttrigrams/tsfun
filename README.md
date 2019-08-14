![alt](README_splash.png)                                            

**tsfun - functional combinator library for TypeScript**

## Run

Get started with `npm install; npm run build; npm test`.

Use the library in a project via **npm** and **node**:

```bash
npm install --save tsfun
```

```
import {take} from 'tsfun'
console.log(take(2)([1,2,3]))
```

## Function reference

### Predicate

[Source](src/predicate.ts)

* [has / hasNot](test/predicate/has.spec.ts) 
* [empty / isEmpty](test/predicate/is_empty.spec.ts)
* [undefinedOrEmpty / isUndefinedOrEmpty](test/predicate/is_undefined_or_empty.spec.ts)
* [isDefined / defined / isUndefined](test/predicate/is_defined.spec.ts)
* [isArray](test/predicate/is_array.spec.ts)
* [isObject](test/predicate/is_object.spec.ts)
* [isNot / not](test/predicate/is_not.spec.ts)

### Comparator

[Source](src/comparator.ts)

* [tripleEqual / is / isnt](test/comparator/triple_equal.spec.ts)
* [jsonEqual](test/comparator/json_equal.spec.ts)
* [differentFrom / differentFromBy](test/comparator/different_from.spec.ts)
* [includedIn / includedInBy](test/comparator/included_in.spec.ts)
* [containedIn / containedInBy](test/comparator/contained_in.spec.ts)
* [arrayEqual / arrayEqualBy](test/comparator/array_equal.spec.ts)
* [arrayEquivalent / arrayEquivalentBy](test/comparator/array_equivalent.spec.ts)
* [objectEqual / objectEqualBy](test/comparator/object_equal.spec.ts)
* [equal / equalBy](test/comparator/equal.spec.ts)
* [equivalent](test/comparator/equivalent.spec.ts)
* [on (by)](test/comparator/on.spec.ts)
* [without (by)](test/comparator/without.spec.ts)

### Composition

[Source](src/composition.ts)

* [flow](test/composition/flow.spec.ts)
* [compose](test/composition/compose.spec.ts)
* [cond](test/composition/cond.spec.ts)
* identity
* val

### ArrayList

[Source](src/arraylist.ts)

* [copy](test/arraylist/copy.spec.ts) / arrayList / range
* [append / prepend](test/arraylist/append.spec.ts) 
* [map / asyncMap](test/arraylist/map.spec.ts)
* [filter / remove / asyncFilter](test/arraylist/filter.spec.ts) 
* [forEach / forEachRight / asyncForEach](test/arraylist/for_each.spec.ts) 
* [reduce / asyncReduce](test/arraylist/reduce.spec.ts)
* [flatMap / flatten](test/arraylist/flat_map.spec.ts)
* [take / takeRight](test/arraylist/take.spec.ts)
* [takeNth](test/arraylist/take_nth.spec.ts)
* [takeWhile / takeRightWhile](test/arraylist/take_while.spec.ts)
* [drop / dropRight](test/arraylist/drop.spec.ts)
* [dropWhile / dropRightWhile](test/arraylist/drop_while.spec.ts)
* [apply](test/arraylist/apply.spec.ts) 
* [separate](test/arraylist/separate.spec.ts) 
* [nth / nthOr](test/arraylist/nth.spec.ts)
* [indices](test/arraylist/indices.spec.ts)

[Lazy list functions](test/arraylist/lazyness.spec.ts)

### ArraySet

[Source](src/arrayset.ts)

* [intersection / intersect / intersectBy](test/arrayset/intersect.spec.ts)
* [subtract / subtractBy](test/arrayset/subtract.spec.ts)
* [union / unite / uniteBy](test/arrayset/union.spec.ts)
* [unique / uniqueBy](test/arrayset/unique.spec.ts)
* [duplicates](test/arrayset/duplicates.spec.ts)

### ObjectStruct

[Source](src/objectstruct.ts)  

* [to](test/objectstruct/to.spec.ts)
* [setOn](test/objectstruct/set_on.spec.ts)
* [clone / jsonClone](test/objectstruct/clone.spec.ts)
* [getOn / getOnOr](test/objectstruct/get_on.spec.ts)
* [assoc / update](test/objectstruct/assoc_update.spec.ts)

### ObjectCollection

[Source](src/objectcoll.ts)

* [copyObj](test/objectcoll/copy_obj.spec.ts)
* [intoObj](test/objectcoll/into_obj.spec.ts)
* [mapObj](test/objectcoll/map_obj.spec.ts)
* [filterObj](test/objectcoll/filter_obj.spec.ts)

### ObjectMap

* [lookup](test/objectmap/lookup.spec.ts)

### ObjectSet

[Source](src/objectset.ts)

* [intersectObj](test/objectset/intersect_obj.spec.ts)
* [uniteObj / unionObj](test/objectset/unite_obj.spec.ts)
* [subtractObj](test/objectset/subtract_obj.spec.ts)


## Concepts

* [concepts](README_concepts.md)

## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










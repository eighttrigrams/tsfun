![alt](README_splash.png)                                            

**tsfun - functional combinator library for TypeScript**

see also: [tsfun-extra](https://github.com/danielmarreirosdeoliveira/tsfun-extra), [tsfun-core](https://github.com/danielmarreirosdeoliveira/tsfun-core)

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

* [has](test/predicate/has.spec.ts) 
* [hasNot](test/predicate/has_not.spec.ts) 
* [isEmpty](test/predicate/is_empty.spec.ts)
* [empty](test/predicate/empty.spec.ts)
* [isUndefinedOrEmpty](test/predicate/is_undefined_or_empty.spec.ts)
* [undefinedOrEmpty](test/predicate/undefined_or_empty.spec.ts)
* [isDefined](test/predicate/is_defined.spec.ts)
* [defined](test/predicate/defined.spec.ts)
* [isUndefined](test/predicate/is_undefined.spec.ts)
* [isArray](test/predicate/is_array.spec.ts)
* [isObject](test/predicate/is_object.spec.ts)
* [isNot](test/predicate/is_not.spec.ts)
* [not](test/predicate/not.spec.ts)

### Comparator

[Source](src/comparator.ts)

* [tripleEqual](test/comparator/triple_equal.spec.ts)
* [is](test/comparator/is.spec.ts)
* [isnt](test/comparator/isnt.spec.ts)
* [jsonEqual](test/comparator/json_equal.spec.ts)
* [differentFrom](test/comparator/different_from.spec.ts)
* [includedIn](test/comparator/included_in.spec.ts)
* [containedIn](test/comparator/contained_in.spec.ts)
* [arrayEqual](test/comparator/array_equal.spec.ts)
* [arrayEquivalent](test/comparator/array_equivalent.spec.ts)
* [objectEqual](test/comparator/object_equal.spec.ts)
* [equal](test/comparator/equal.spec.ts)
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

* [copy](test/arraylist/copy.spec.ts)
* arrayList
* [range](test/arraylist/range.spec.ts)
* [append](test/arraylist/append.spec.ts) 
* [prepend](test/arraylist/prepend.spec.ts) 
* [map](test/arraylist/map.spec.ts)
* [filter](test/arraylist/filter.spec.ts) 
* [remove](test/arraylist/remove.spec.ts)
* [forEach](test/arraylist/for_each.spec.ts)
* [forEachRight](test/arraylist/for_each_right.spec.ts) 
* [reduce](test/arraylist/reduce.spec.ts)
* [flatMap](test/arraylist/flat_map.spec.ts)
* [flatten](test/arraylist/flatten.spec.ts)
* [take](test/arraylist/take.spec.ts)
* [takeRight](test/arraylist/take_right.spec.ts)
* [takeNth](test/arraylist/take_nth.spec.ts)
* [takeWhile](test/arraylist/take_while.spec.ts)
* [takeRightWhile](test/arraylist/take_right_while.spec.ts)
* [drop](test/arraylist/drop.spec.ts)
* [dropRight](test/arraylist/drop_right.spec.ts)
* [dropWhile](test/arraylist/drop_while.spec.ts)
* [dropRightWhile](test/arraylist/drop_right_while.spec.ts)
* [apply](test/arraylist/apply.spec.ts) 
* [separate](test/arraylist/separate.spec.ts) 
* [nth](test/arraylist/nth.spec.ts)
* [nthOr](test/arraylist/nth_or.spec.ts)
* [indices](test/arraylist/indices.spec.ts)
* [zip](test/arraylist/zip.spec.ts)
* [zipWith](test/arraylist/zip_with.spec.ts)

### ArraySet

[Source](src/arrayset.ts)

* [intersection](test/arrayset/intersect.spec.ts)
* [intersect](test/arrayset/intersect.spec.ts)
* [subtract](test/arrayset/subtract.spec.ts)
* [union](test/arrayset/union.spec.ts)
* [unite](test/arrayset/unite.spec.ts)
* [unique](test/arrayset/unique.spec.ts)
* [duplicates](test/arrayset/duplicates.spec.ts)

### ObjectStruct

[Source](src/objectstruct.ts)  

* [to](test/objectstruct/to.spec.ts)
* [setOn](test/objectstruct/set_on.spec.ts)
* [clone](test/objectstruct/clone.spec.ts)
* [jsonClone](test/objectstruct/json_clone.spec.ts)
* [getOn](test/objectstruct/get_on.spec.ts)
* [getOnOr](test/objectstruct/get_on_or.spec.ts)
* [assoc](test/objectstruct/assoc.spec.ts)
* [dissoc](test/objectstruct/dissoc.spec.ts)
* [update](test/objectstruct/update.spec.ts)

### ObjectMap

[Source](src/objectmap.ts)

* keysAndValues (list of pairs)
* keys
* values
* [lookup](test/objectmap/lookup.spec.ts)

### ArrayList (lazy)

[Source](src/arraylist_lazy.ts)

* [Lazy list functions](test/arraylist/lazyness.spec.ts)
* [materialize](test/arraylist/materialize.spec.ts)
* [lZip](test/arraylist/l_zip.spec.ts)
* [lZipWith](test/arraylist/l_zip_with.spec.ts)
* [lRange](test/arraylist/l_range.spec.ts)

## Concepts

* [concepts](README_concepts.md)

## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










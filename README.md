![alt](README_splash.png)                                            

**tsfun - functional combinator library for TypeScript**

---

## Function reference

Example:

```typescript
import {equal} from 'tsfun';
```

### Predicate

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
* [isAssociative](test/predicate/is_associative.spec.ts)
* [isNot](test/predicate/is_not.spec.ts)
* [not](test/predicate/not.spec.ts)
* [and](test/predicate/and.spec.ts)
* [or](test/predicate/or.spec.ts)
* [xor](test/predicate/xor.spec.ts)

### Comparator

* [tripleEqual](test/comparator/triple_equal.spec.ts)
* [jsonEqual](test/comparator/json_equal.spec.ts)
* [is](test/comparator/is.spec.ts)
* [isnt](test/comparator/isnt.spec.ts)
* [differentFrom](test/comparator/different_from.spec.ts)
* [includedIn](test/comparator/included_in.spec.ts)
* [subsetOf](test/comparator/subset_of.spec.ts)
* [supersetOf](test/comparator/superset_of.spec.ts)
* [sameset](test/comparator/sameset.spec.ts)
* [arrayEqual](test/comparator/array_equal.spec.ts)
* [objectEqual](test/comparator/object_equal.spec.ts)
* [equal](test/comparator/equal.spec.ts)
* [equalTo](test/comparator/equal_to.spec.ts)
* [on](test/comparator/on.spec.ts)

### Composition

* [flow](test/composition/flow.spec.ts)
* [compose](test/composition/compose.spec.ts)
* [cond](test/composition/cond.spec.ts)
* [identity](test/composition/identity.spec.ts)
* [val](test/composition/val.spec.ts)
* [nop](test/composition/nop.spec.ts)
* [tuplify](test/composition/tuplify.spec.ts)
* [pairWith](test/composition/pair-with.spec.ts)
* [left](test/composition/left.spec.ts)
* [right](test/composition/right.spec.ts)

### List

* [range](test/arraylist/range.spec.ts)
* [append](test/arraylist/append.spec.ts) 
* [prepend](test/arraylist/prepend.spec.ts) 
* [sort](test/arraylist/sort.spec.ts)
* [forEachRight](test/arraylist/for_each_right.spec.ts) 
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
* [first](test/arraylist/first.spec.ts)
* [last](test/arraylist/last.spec.ts)
* [indices](test/arraylist/indices.spec.ts)
* [zip](test/arraylist/zip.spec.ts)
* [zipWith](test/arraylist/zip_with.spec.ts)

### Set

* [set](test/arrayset/set.spec.ts)
* [intersection](test/arrayset/intersection.spec.ts)
* [intersect](test/arrayset/intersect.spec.ts)
* [subtract](test/arrayset/subtract.spec.ts)
* [union](test/arrayset/union.spec.ts)
* [unite](test/arrayset/unite.spec.ts)
* [duplicates](test/arrayset/duplicates.spec.ts)

### Associative

* [keys](test/associative/keys.spec.ts)
* [values](test/associative/values.spec.ts)
* [size](test/associative/size.spec.ts)
* [count](test/associative/count.spec.ts)
* [map](test/associative/map.spec.ts)
* [filter](test/associative/filter.spec.ts) 
* [remove](test/associative/remove.spec.ts)
* [separate](test/associative/separate.spec.ts) 
* [reduce](test/associative/reduce.spec.ts)
* [lookup](test/associative/lookup.spec.ts)
* [get](test/associative/get.spec.ts)
* [assoc](test/associative/assoc.spec.ts)
* [update](test/associative/update.spec.ts)
* [dissoc](test/associative/dissoc.spec.ts)
* [copy](test/associative/copy.spec.ts)
* [forEach](test/associative/for_each.spec.ts)
* [keysAndValues](test/associative/keys_and_values.spec.ts)

### Struct

* [to](test/struct/to.spec.ts)
* [lookupOn](test/struct/lookup_on.spec.ts)
* [getOn](test/struct/get_on.spec.ts)
* [assocOn](test/struct/assoc_on.spec.ts)
* [dissocOn](test/struct/dissoc_on.spec.ts)
* [updateOn](test/struct/update_on.spec.ts)
* [clone](test/struct/clone.spec.ts)
* [jsonClone](test/struct/json_clone.spec.ts)

## Async functions

Example:

```typescript
import {map as asyncMap} from 'tsfun/async';
```

* [map](test/async/map.spec.ts)
* [filter](test/async/filter.spec.ts)
* [forEach](test/async/for_each.spec.ts)
* [reduce](test/async/reduce.spec.ts)
* [flow](test/async/flow.spec.ts)

## Lazy functions

Example:

```typescript
import {zip as lZip} from 'tsfun/lazy';
```

* [zip](test/lazy/zip.spec.ts)
* [zipWith](test/lazy/zip_with.spec.ts)
* [range](test/lazy/range.spec.ts)
* [materialize](test/lazy/materialize.spec.ts)
* filter
* take
* map

## By functions

Example:

```typescript
import {samesetBy} from 'tsfun/by';
```

### Comparator

* [differentFromBy](test/comparator/different_from_by.spec.ts)
* [includedInBy](test/comparator/included_in_by.spec.ts)
* [subsetOfBy](test/comparator/subset_of_by.spec.ts)
* [supersetOfBy](test/comparator/superset_of_by.spec.ts)
* [samesetBy](test/comparator/sameset_by.spec.ts)
* [arrayEqualBy](test/comparator/array_equal_by.spec.ts)
* [objectEqualBy](test/comparator/object_equal_by.spec.ts)
* [equalBy](test/comparator/equal_by.spec.ts)

### Set

* [intersectionBy](test/arrayset/intersection_by.spec.ts)
* [intersectBy](test/arrayset/intersect_by.spec.ts)
* [subtractBy](test/arrayset/subtract_by.spec.ts)
* [unionBy](test/arrayset/union_by.spec.ts)
* [uniteBy](test/arrayset/unite_by.spec.ts)
* [setBy](test/arrayset/set_by.spec.ts)

## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










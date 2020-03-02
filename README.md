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
* [isString](test/predicate/is_string.spec.ts)
* [isAssociative](test/predicate/is_associative.spec.ts)
* [isCollection](test/predicate/is_collection.spec.ts)
* [isList](test/predicate/is_list.spec.ts)
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
* [greaterThan](test/comparator/greater_than.spec.ts)
* [lessThan](test/comparator/less_than.spec.ts)
* [greaterOrEqualThan](test/comparator/greater_or_equal_than.spec.ts)
* [lessOrEqualThan](test/comparator/less_or_equal_than.spec.ts)
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

### List

###### array & string

* [take](test/list/take.spec.ts)
* [drop](test/list/drop.spec.ts)
* [takeRight](test/list/take_right.spec.ts)
* [dropRight](test/list/drop_right.spec.ts)
* [first](test/list/first.spec.ts)
* [rest](test/list/rest.spec.ts)
* [last](test/list/last.spec.ts)
* [reverse](test/list/reverse.spec.ts)
* [append](test/list/append.spec.ts) 
* [prepend](test/list/prepend.spec.ts) 
* [zip](test/list/zip.spec.ts)
* [sort](test/list/sort.spec.ts)
* [takeNth](test/list/take_nth.spec.ts)
* [takeWhile](test/list/take_while.spec.ts)
* [takeRightWhile](test/list/take_right_while.spec.ts)
* [dropWhile](test/list/drop_while.spec.ts)
* [dropRightWhile](test/list/drop_right_while.spec.ts)

###### array

* [range](test/list/range.spec.ts)
* [forEachRight](test/list/for_each_right.spec.ts) 
* [flatMap](test/list/flat_map.spec.ts)
* [flatten](test/list/flatten.spec.ts)
* [zipWith](test/list/zip_with.spec.ts)

### Associative

###### array & object

* [keys](test/associative/keys.spec.ts)
* [values](test/associative/values.spec.ts)
* [map](test/associative/map.spec.ts)  
* [reduce](test/associative/reduce.spec.ts)
* [lookup](test/associative/lookup.spec.ts)
* [get](test/associative/get.spec.ts)
* [assoc](test/associative/assoc.spec.ts)
* [update](test/associative/update.spec.ts)
* [dissoc](test/associative/dissoc.spec.ts)
* [forEach](test/associative/for_each.spec.ts)
* [keysAndValues](test/associative/keys_and_values.spec.ts)

### Collection

###### array & object & string

* [copy](test/collection/copy.spec.ts)
* [filter](test/collection/filter.spec.ts)
* [remove](test/collection/remove.spec.ts)
* [separate](test/collection/separate.spec.ts)
* [count](test/collection/count.spec.ts)
* [prune](test/collection/prune.spec.ts)
* [size](test/collection/size.spec.ts)
* [indices](test/collection/indices.spec.ts)

### Set

###### array & string

* [set](test/set/set.spec.ts)
* [intersection](test/set/intersection.spec.ts)
* [intersect](test/set/intersect.spec.ts)
* [subtract](test/set/subtract.spec.ts)
* [union](test/set/union.spec.ts)
* [unite](test/set/unite.spec.ts)
* [duplicates](test/set/duplicates.spec.ts)

### Struct

###### array & object

* [to](test/struct/to.spec.ts)
* [lookupOn](test/struct/lookup_on.spec.ts)
* [getOn](test/struct/get_on.spec.ts)
* [assocOn](test/struct/assoc_on.spec.ts)
* [dissocOn](test/struct/dissoc_on.spec.ts)
* [updateOn](test/struct/update_on.spec.ts)
* [clone](test/struct/clone.spec.ts)
* [jsonClone](test/struct/json_clone.spec.ts)

### Tuple

###### array

* [tuplify](test/tuple/tuplify.spec.ts)
* [pairWith](test/tuple/pair-with.spec.ts)
* [left](test/tuple/left.spec.ts)
* [right](test/tuple/right.spec.ts)
* [swap](test/tuple/swap.spec.ts)

## Special functions reference

### Async functions

Example:

```typescript
import {map as asyncMap} from 'tsfun/async';
```

* [map](test/async/map.spec.ts)
* [filter](test/async/filter.spec.ts)
* [remove](test/async/remove.spec.ts)
* [forEach](test/async/for_each.spec.ts)
* [reduce](test/async/reduce.spec.ts)
* [flow](test/async/flow.spec.ts)
* [separate](test/async/separate.spec.ts)

### Lazy functions

Example:__

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

### By functions

Example:

```typescript
import {samesetBy} from 'tsfun/by';
```

##### Comparator

* [differentFromBy](test/comparator/different_from_by.spec.ts)
* [includedInBy](test/comparator/included_in_by.spec.ts)
* [subsetOfBy](test/comparator/subset_of_by.spec.ts)
* [supersetOfBy](test/comparator/superset_of_by.spec.ts)
* [samesetBy](test/comparator/sameset_by.spec.ts)
* [arrayEqualBy](test/comparator/array_equal_by.spec.ts)
* [objectEqualBy](test/comparator/object_equal_by.spec.ts)
* [equalBy](test/comparator/equal_by.spec.ts)

##### Set

* [intersectionBy](test/set/intersection_by.spec.ts)
* [intersectBy](test/set/intersect_by.spec.ts)
* [subtractBy](test/set/subtract_by.spec.ts)
* [unionBy](test/set/union_by.spec.ts)
* [uniteBy](test/set/unite_by.spec.ts)
* [setBy](test/set/set_by.spec.ts)

## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










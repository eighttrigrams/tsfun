![alt](README_splash.png)                                            

**tsfun - functional combinator library for TypeScript**

see also: [tsfun-extra](https://github.com/danielmarreirosdeoliveira/tsfun-extra)

---

## Function reference

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

### List

* arrayList
* [len](test/arraylist/len.spec.ts)
* [range](test/arraylist/range.spec.ts)
* [append](test/arraylist/append.spec.ts) 
* [prepend](test/arraylist/prepend.spec.ts) 
* [map](test/arraylist/map.spec.ts)
* [filter](test/arraylist/filter.spec.ts) 
* [remove](test/arraylist/remove.spec.ts)
* [count](test/arraylist/count.spec.ts)
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
* [first](test/arraylist/first.spec.ts)
* [second](test/arraylist/second.spec.ts)
* [last](test/arraylist/last.spec.ts)
* [indices](test/arraylist/indices.spec.ts)
* [zip](test/arraylist/zip.spec.ts)
* [zipWith](test/arraylist/zip_with.spec.ts)

### Set

* [intersection](test/arrayset/intersection.spec.ts)
* [intersect](test/arrayset/intersect.spec.ts)
* [subtract](test/arrayset/subtract.spec.ts)
* [union](test/arrayset/union.spec.ts)
* [unite](test/arrayset/unite.spec.ts)
* [unique](test/arrayset/unique.spec.ts)
* [duplicates](test/arrayset/duplicates.spec.ts)

### Associative

* [keysAndValues](test/associative/keys_and_values.spec.ts)
* [keys](test/associative/keys.spec.ts)
* [values](test/associative/values.spec.ts)
* [lookup](test/associative/lookup.spec.ts)
* [get](test/associative/get.spec.ts)
* [assoc](test/associative/assoc.spec.ts)
* [update](test/associative/update.spec.ts)
* [dissoc](test/associative/dissoc.spec.ts)
* [copy](test/associative/copy.spec.ts)

### Struct

* [to](test/struct/to.spec.ts)
* [lookupOn](test/struct/lookup_on.spec.ts)
* [getOn](test/struct/get_on.spec.ts)
* [assocOn](test/struct/assoc_on.spec.ts)
* [dissocOn](test/struct/dissoc_on.spec.ts)
* [updateOn](test/struct/update_on.spec.ts)
* [clone](test/struct/clone.spec.ts)
* [jsonClone](test/struct/json_clone.spec.ts)

## Base functions

### Comparator

* [differentFromBy](test/comparator/different_from_by.spec.ts)
* [includedInBy](test/comparator/included_in_by.spec.ts)
* [subsetOfBy](test/comparator/subset_of_by.spec.ts)
* [supersetOfBy](test/comparator/superset_of_by.spec.ts)
* [samesetBy](test/comparator/sameset_by.spec.ts)
* [arrayEqualBy](test/comparator/array_equal_by.spec.ts)
* [objectEqualBy](test/comparator/object_equal_by.spec.ts)
* [equalBy](test/comparator/equal_by.spec.ts)

### ArraySet

* [intersectionBy](test/arrayset/intersection_by.spec.ts)
* [intersectBy](test/arrayset/intersect_by.spec.ts)
* [subtractBy](test/arrayset/subtract_by.spec.ts)
* [unionBy](test/arrayset/union_by.spec.ts)
* [uniteBy](test/arrayset/unite_by.spec.ts)
* [uniqueBy](test/arrayset/unique_by.spec.ts)

## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










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
* [differentFromBy](test/comparator/different_from_by.spec.ts)
* [includedIn](test/comparator/included_in.spec.ts)
* [includedInBy](test/comparator/included_in_by.spec.ts)
* [containedIn](test/comparator/contained_in.spec.ts)
* [containedInBy](test/comparator/contained_in_by.spec.ts)
* [arrayEqual](test/comparator/array_equal.spec.ts)
* [arrayEqualBy](test/comparator/array_equal_by.spec.ts)
* [arrayEquivalent](test/comparator/array_equivalent.spec.ts)
* [arrayEquivalentBy](test/comparator/array_equivalent_by.spec.ts)
* [objectEqual](test/comparator/object_equal.spec.ts)
* [objectEqualBy](test/comparator/object_equal_by.spec.ts)
* [equal](test/comparator/equal.spec.ts)
* [equalBy](test/comparator/equal_by.spec.ts)
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

#### lazy

[Source](src/arraylist_lazy.ts)

* [Lazy list functions](test/arraylist/lazyness.spec.ts)
* [materialize](test/arraylist/materialize.spec.ts)
* [lZip](test/arraylist/l_zip.spec.ts)
* [lZipWith](test/arraylist/l_zip_with.spec.ts)
* [lRange](test/arraylist/l_range.spec.ts)

#### async 

[Source](src/arraylist_async.ts)

* [asyncMap](test/arraylist/async_map.spec.ts)
* [asyncFilter](test/arraylist/async_filter.spec.ts)
* [asyncForEach](test/arraylist/async_for_each.spec.ts)
* [asyncReduce](test/arraylist/async_reduce.spec.ts)

### ArraySet

[Source](src/arrayset.ts)

* [intersection](test/arrayset/intersect.spec.ts)
* [intersectionBy](test/arrayset/intersection_by.spec.ts)
* [intersect](test/arrayset/intersect.spec.ts)
* [intersectBy](test/arrayset/intersect_by.spec.ts)
* [subtract](test/arrayset/subtract.spec.ts)
* [subtractBy](test/arrayset/subtract_by.spec.ts)
* [union](test/arrayset/union.spec.ts)
* [unionBy](test/arrayset/union_by.spec.ts)
* [unite](test/arrayset/unite.spec.ts)
* [uniteBy](test/arrayset/unite_by.spec.ts)
* [unique](test/arrayset/unique.spec.ts)
* [uniqueBy](test/arrayset/unique_by.spec.ts)
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
* [pdate](test/objectstruct/update.spec.ts)

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
* [uniteObj](test/objectset/unite_obj.spec.ts)
* [unionObj](test/objectset/union_obj.spec.ts)
* [subtractObj](test/objectset/subtract_obj.spec.ts)


## Concepts

* [concepts](README_concepts.md)

## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










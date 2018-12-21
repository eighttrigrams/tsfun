# Function reference

## Object functions

[Sources](../src/objects.ts)  
* [getElForPathin](../test/objects/get_el_for_path_in.spec.ts)
* [takeOrMake](../test/objects/take_or_make.spec.ts)
* [option](../test/objects/option.spec.ts)
* [mapOption](../test/objects/map_option.spec.ts)
* [to](../test/objects/to.spec.ts)
* [intoObject](../test/objects/into_object.spec.ts)
* [clone](../test/objects/clone.spec.ts)

## Predicates

[Sources](../test/predicates.spec.ts)

* [has](../test/predicates/has.spec.ts)
* [empty/isEmpty](../test/predicates/is_empty.spec.ts)
* [undefinedOrEmpty/isUndefinedOrEmpty](../test/predicates/is_undefined_or_empty.spec.ts)
* isNot
* not
* isDefined
* defined
* isUndefined
* isTrue
* isFalse
* isArray
* isObject
* isString

## Comparators

[Sources](../src/comparators.ts)

* tripleEqual
* jsonEqual
* smallerThan
* biggerThan
* [differentFrom/differentFromBy](../test/comparators/different_from.spec.ts)
* [includedIn/includedInBy](../test/comparators/included_in.spec.ts)
* [containedIn/containedInBy](../test/comparators/contained_in.spec.ts)
* [arrayEqual/arrayEqualBy](../test/comparators/array_equal.spec.ts)
* [arrayEquivalent/arrayEquivalentBy](../test/comparators/array_equivalent.spec.ts)
* [objectEqual/objectEqualBy](../test/comparators/object_equal.spec.ts)
* [equal/equalBy](../test/comparators/equal.spec.ts)
* [equivalent](../test/comparators/equivalent.spec.ts)
* [on/by](../test/comparators/on.spec.ts)
* [without](../test/comparators/without.spec.ts)
* [sameOn](../test/comparators/same_on.spec.ts)

## Compositions

[Sources](../src/core.ts) Core<br>
[Sources](../src/flow.ts) Flow

* [flow](../test/core/flow.spec.ts)
* [compose](../test/core/compose.spec.ts)
* [wrap](../test/core/wrap.spec.ts)

## Misc

* [get](../test/core/wrap.spec.ts)




# Utilities for Collections

Note that all collection functions return shallow copies.
In the same spirit, all collection functions compare in their basic versions
with `tripleEqual` a.k.a. `===`. For the most functions there is a -By suffixed 
version where one can choose the Comparator however. See `wrap` [here](./core.md) 
for seeing how to return clones. 

## General collection functions

[Sources](../src/collections/coll.ts)

* [copy](../test/collections/copy.spec.ts)

## Ordered-list-like collection functions for Arrays

[Sources](../src/collections/arrays_list_like.ts)

* [prepend](../test/collections/arrays_list_like/prepend.spec.ts)
* [append](../test/collections/arrays_list_like/append.spec.ts)
* [getIth/getIthOr](../test/collections/arrays_list_like/get_ith.spec.ts)
* [flatMap](../test/collections/arrays_list_like/flat_map.spec.ts)
* [filter](../test/collections/arrays_list_like/filter.spec.ts)
* [map](../test/collections/arrays_list_like/map.spec.ts)
* [separate](../test/collections/arrays_list_like/separate.spec.ts)


## Ordered-list-like collection functions - Picking methods for Arrays

[Sources](../src/collections/arrays_list_like_pick.ts)

* [take](../test/collections/arrays_list_like/take.spec.ts)
* [takeNth](../test/collections/arrays_list_like/take_nth.spec.ts)
* [takeWhile/takeRightWhile](../test/collections/arrays_list_like/take_while.spec.ts)
* [drop/dropRight](../test/collections/arrays_list_like/drop.spec.ts)
* [dropWhile/dropRightWhile](../test/collections/arrays_list_like/drop_while.spec.ts)


## Set-like collection functions for Arrays

[Sources](../src/collections/arrays_set_like.ts)

Set methods come in two flavours, array set methods and object set methods.
Both of these have in common that the respective data structures are treated 
as if they were sets, hence we also call them set-like methods.

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

`intersect`, `subtract`, `unite` and `uniqe` are partials, which can be inserted
into the body of a `flow`. `intersection` and `union` take a `NestedArray<A>` as
their argument, so they can be used to begin a `flow` with.

* [intersection/intersect/intersectBy](../test/collections/arrays_set_like/intersect.spec.ts)
* [subtract/subtractBy](../test/collections/arrays_set_like/subtract.spec.ts)
* [union/unite/uniteBy](../test/collections/arrays_set_like/union.spec.ts)
* [unique/uniqueBy](../test/collections/arrays_set_like/unique.spec.ts)


## Set-like collection functions for Object-Maps

[Sources](../src/collections/objects_set_like.ts)

* [intersectObject](../test/collections/objects_set_like/intersect_object.spec.ts)
* [uniteObject/unionObject](../test/collections/objects_set_like/unite_object.spec.ts)
* [subtractObject](../test/collections/objects_set_like/subtract_object.spec.ts)


## Ordered-list-like collection functions for Object-Maps

[Sources](../src/collections/objects_list_like.ts)

* [mapObject](../test/collections/objects_list_like/map_object.spec.ts)
* [filterObject](../test/collections/objects_list_like/filter_object.spec.ts)











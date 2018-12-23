![alt](splash.png)                                            

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

**tsfun** functions are mainly designed to 
work with ***Arrays*** and ***Objects***, specified by
[isArray](test/predicates/is_array.spec.ts) and
[isObject](test/predicates/is_object.spec.ts).
These two basic data structures can be found nested arbitrarily. 
Depending on the context and intended treatment, 
tsfun provides sets of functions which treat

* Arrays as list-like collections, which we call *ArrayList*

`type ArrayList<T> = Array<T>`

* Arrays as set-like collections, which we call *ArraySet*

`type ArraySet<T> = Array<T>`

* Objects as collections, which we call *(Unt|T)ypedMap*

`interface UntypedMap {[prop: string]: any|undefined}`

`interface TypedMap<T> {[prop: string]: T}`

* Objects as list-like collections, which we call *ObjectList*

`type ObjectList<T> = TypedMap<T>`

* Objects as structured entites, which we call *Struct*

`export type Struct = Object`

* Objects as set-like collections, *ObjectSet*

In addition to that there are Predicates, Comparators and Compositional
functions to make these yet more powerful.

### Basic functionality

#### Predicates

[Sources](test/predicates.spec.ts)

* [has / hasNot](test/predicates/has.spec.ts) 
* [empty / isEmpty](test/predicates/is_empty.spec.ts)
* [undefinedOrEmpty / isUndefinedOrEmpty](test/predicates/is_undefined_or_empty.spec.ts)
* [isTrue / isFalse](test/predicates/is_true.spec.ts)
* [isDefined / defined / isUndefined](test/predicates/is_defined.spec.ts)
* [isArray](test/predicates/is_array.spec.ts)
* [isObject](test/predicates/is_object.spec.ts)
* [isString / isBoolean](test/predicates/is_string.spec.ts)
* [isNot / not](test/predicates/is_not.spec.ts)

`type Predicate<A> = (_: A) => boolean`

#### Comparators

[Sources](src/comparators.ts)

* [tripleEqual](test/comparators/triple_equal.spec.ts)
* [jsonEqual](test/comparators/json_equal.spec.ts)
* [smallerThan / biggerThan](test/comparators/smaller_than.spec.ts)
* [differentFrom / differentFromBy](test/comparators/different_from.spec.ts)
* [includedIn / includedInBy](test/comparators/included_in.spec.ts)
* [containedIn / containedInBy](test/comparators/contained_in.spec.ts)
* [arrayEqual / arrayEqualBy](test/comparators/array_equal.spec.ts)
* [arrayEquivalent / arrayEquivalentBy](test/comparators/array_equivalent.spec.ts)
* [objectEqual / objectEqualBy](test/comparators/object_equal.spec.ts)
* [equal / equalBy](test/comparators/equal.spec.ts)
* [equivalent](test/comparators/equivalent.spec.ts)
* [on / by](test/comparators/on.spec.ts)
* [without](test/comparators/without.spec.ts)
* [sameOn](test/comparators/same_on.spec.ts)

`type Comparator = <A, B>(_: A) => Predicate<B>`.

A comparator can be understood as comparing two values to produce a boolean. 
Applying one partially gives a predicate again, which can then be used to filter,
for example, like in `[3, 2, 1, 0].filter(biggerThan(1))`.

`type ComparatorProducer = (_: Comparator) => <A>(_: A) => Predicate<A>`

Functions ending with -By, like for example `differentFromBy` are producers of
Comparators. They get applied partially, taking one comparator, 
giving another comparator.

Due to the standard comparison with `===`, 
`differentFrom({a: 1})({a: 1})` gives us `true`. We can change that
behaviour easily.
`differentFromBy(jsonEqual)({a: 1})({a: 1})` gives `false`.

#### Composition

[Sources](src/core.ts) Core<br>
[Sources](src/flow.ts) Flow

* [flow](test/core/flow.spec.ts)
* [compose](test/core/compose.spec.ts)
* [wrap](test/core/wrap.spec.ts)

#### Structures and Collections

[Sources](src/colls_struct.ts)

* [get](test/core/get.spec.ts)

#### Struct functions

[Sources](src/struct.ts)  

* [getElForPathIn](test/struct/get_el_for_path_in.spec.ts)
* [takeOrMake](test/struct/take_or_make.spec.ts)
* [option](test/struct/option.spec.ts)
* [mapOption](test/struct/map_option.spec.ts)
* [to](test/struct/to.spec.ts)
* [clone](test/struct/clone.spec.ts)

We talk about about tsfun Structs in contexts where we 
care about a composed data structure, like
for example `{a: {b: [1, 2, 4], c: 'e'}`, whereas the list- 
and set-like data structures are concerned with the top level of the data structure.

TODO define Struct as type

TODO talk about equal, arrayEquivalent, objectEquivalent, copies (copy vs clone) etc.
Arrays can be seen as deep nested structures as well.

TODO -Object suffixed collection functions 
TODO mention typescript index signatures and -Map suffix

#### Collection functions for Arrays and Objects

[Sources](src/collections/coll.ts)

* [copy](test/colls/copy.spec.ts)

Like copy, all of the following collections methods always return
new Arrays or Objects, but their elements are pointers to the old
elements. So there is no automatic cloning.

#### Collection Functions for Objects

[Sources](src/collections/coll.ts)

* [intoObject](test/colls/into_object.spec.ts)

If object collections are not treated as structs, 
we use the following definitions:

#### Ordered-list-like collection functions for Arrays

[Sources](src/collections/arrays_list_like.ts)

* [prepend](test/arrays_list_like/prepend.spec.ts)  
* [append](test/arrays_list_like/append.spec.ts) 
* [getIth / getIthOr](test/arrays_list_like/get_ith.spec.ts) 
* [filter](test/arrays_list_like/filter.spec.ts) 
* [map](test/arrays_list_like/map.spec.ts) 
* [flatMap](test/arrays_list_like/flat_map.spec.ts)
* [separate](test/arrays_list_like/separate.spec.ts) 

If we say list-like data structure, we mean that if a 
function operates on an array or object, we retain order
and allow duplicates. The operation is linear an vector like.

#### Ordered-list-like collection functions for Arrays - Picking methods

[Sources](src/collections/arrays_list_like_pick.ts)

* [take](test/arrays_list_like/take.spec.ts)
* [takeNth](test/arrays_list_like/take_nth.spec.ts)
* [takeWhile / takeRightWhile](test/arrays_list_like/take_while.spec.ts)
* [drop / dropRight](test/arrays_list_like/drop.spec.ts)
* [dropWhile / dropRightWhile](test/arrays_list_like/drop_while.spec.ts)

#### Set-like collection functions for Arrays

[Sources](src/collections/arrays_set_like.ts)

* [intersection / intersect / intersectBy](test/arrays_set_like/intersect.spec.ts)
* [subtract / subtractBy](test/arrays_set_like/subtract.spec.ts)
* [union / unite / uniteBy](test/arrays_set_like/union.spec.ts)
* [unique / uniqueBy](test/arrays_set_like/unique.spec.ts)

If we say set-like data structure, we mean that if a 
function operates on an array or object, we assume that 
or explicitely take care that the data structure has
no duplicates.

Set methods come in two flavours, array set methods and object set methods.
Both of these have in common that the respective data structures are treated 
as if they were sets, hence we also call them set-like methods.

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

`intersect`, `subtract`, `unite` and `uniqe` are partials, which can be inserted
into the body of a `flow`. `intersection` and `union` take a `NestedArray<A>` as
their argument, so they can be used to begin a `flow` with.

#### Set-like collection functions for Object-Maps

[Sources](src/collections/objects_set_like.ts)

* [intersectObject](test/objects_set_like/intersect_object.spec.ts)
* [uniteObject / unionObject](test/objects_set_like/unite_object.spec.ts)
* [subtractObject](test/objects_set_like/subtract_object.spec.ts)

#### Ordered-list-like collection functions for Object-Maps

[Sources](src/collections/objects_list_like.ts)

* [mapObject](test/objects_list_like/map_object.spec.ts)
* [filterObject](test/objects_list_like/filter_object.spec.ts)

## Docs

* [Design rationale](doc/design.md) 
 
## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










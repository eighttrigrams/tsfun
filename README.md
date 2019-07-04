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
* identity

### ArrayList

[Source](src/arraylist.ts)

* [copy](test/arraylist/copy.spec.ts)
* [append / prepend](test/arraylist/append.spec.ts) 
* [filter / remove / asyncFilter](test/arraylist/filter.spec.ts) 
* [map / asyncMap](test/arraylist/map.spec.ts)
* [forEach / forEachRight / asyncForEach](test/arraylist/for_each.spec.ts) 
* [flatMap](test/arraylist/flat_map.spec.ts)
* [take / takeRight](test/arraylist/take.spec.ts)
* [takeNth](test/arraylist/take_nth.spec.ts)
* [takeWhile / takeRightWhile](test/arraylist/take_while.spec.ts)
* [drop / dropRight](test/arraylist/drop.spec.ts)
* [dropWhile / dropRightWhile](test/arraylist/drop_while.spec.ts)
* [apply](test/arraylist/apply.spec.ts) 
* [separate](test/arraylist/separate.spec.ts) 
* [nth / nthOr](test/arraylist/nth.spec.ts)
* [reduce / asyncReduce](test/arraylist/reduce.spec.ts)
* [indices](test/arraylist/indices.spec.ts)

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

### ObjectCollection

[Source](src/objectcoll.ts)

* [copyObj](test/objectcoll/copy_obj.spec.ts)
* [intoObj](test/objectcoll/into_obj.spec.ts)
* [mapObj](test/objectcoll/map_obj.spec.ts)
* [filterObj](test/objectcoll/filter_obj.spec.ts)

### ObjectSet

[Source](src/objectset.ts)

* [intersectObj](test/objectset/intersect_obj.spec.ts)
* [uniteObj / unionObj](test/objectset/unite_obj.spec.ts)
* [subtractObj](test/objectset/subtract_obj.spec.ts)

## Concepts

**tsfun** functions are mainly designed to 
work with ***Arrays*** and ***Objects***, specified by
[isArray](test/predicate/is_array.spec.ts) and
[isObject](test/predicate/is_object.spec.ts).
These two basic data structures can be found 
nested arbitrarily deep and mutually. 
For different treatments in different contexts, 
tsfun provides different sets of functions.

In addition to that there are Predicates, Comparators and Compositional
functions to make these yet more powerful. 

### Predicates and Generators

`type Predicate<A> = (_: A) => boolean`

`type Comparator = <A, B>(_: A) => Predicate<B>`.

A comparator can be understood as comparing two values to produce a boolean. 
Applying one partially gives a predicate again, which can then be used to filter,
for example, like in `[3, 2, 1, 0].filter(isnt(2))`.

`type ComparatorProducer = (_: Comparator) => <A>(_: A) => Predicate<A>`

Functions ending with -By, like for example `differentFromBy` are producers of
Comparators. They get applied partially, taking one comparator, 
giving another comparator.

Due to the standard comparison with `===`, 
`differentFrom({a: 1})({a: 1})` gives us `true`. We can change that
behaviour easily.
`differentFromBy(jsonEqual)({a: 1})({a: 1})` gives `false`.

### Collection and Struct Functions

Depending on the context and intended treatment, 
tsfun provides sets of functions which treat

* Arrays as ordered list-like collections, which we call *ArrayList*

`type ArrayList<T> = Array<T>`

* Arrays as set-like collections, which we call *ArraySet*

`type ArraySet<T> = Array<T>`

* Objects as collections, which we call *(Untyped)ObjectCollection*

`interface UntypedObjectCollection {[prop: string]: any|undefined}`

`interface ObjectCollection<T> {[prop: string]: T}`

* Objects as structured entites, which we call *ObjectStruct*

`export type ObjectStruct = Object`

* Objects as set-like collections, *ObjectSet*

`type ObjectSet = UntypedObjectCollection`

If we call something a *Collection*, functions operating 
on it are concerned with the top level a structure, though
its elements can be structered in any way. Comparators
help to exploit this structure in the context of collection
functions. For example `filter` can be extended with ´on´, which can be extended,
with `arrayEquivalent`. *Sets* and *Lists* are 
descendants of *Collection*.

If we call something *List*, functions retain order
of items (or keys) and do not remove duplicates.

If we call something *Set*, we assume that 
or explicitely take care that the data structure has
no duplicates after function application. For example, every Arrays 
set method's result is not only `Array<A>` but also consists 
of unique items (compared with `===` in the basic case). 
Usually the order of the arguments is kept, but this is not guaranteed.

All of the collections methods always return
new Arrays or Objects, but their elements are pointers to the old
elements. So there is no automatic cloning.

Many collection methods are designed to work within a composition.
`intersect`, `subtract`, `unite` and `uniqe` are partials, which can be inserted
into the body of a `flow`. Sometimes though there are standalone version of 
them, like `intersection` and `union` take a `NestedArray<A>`,

We talk about about *tsfun* *ObjectStructs* in contexts where we 
care about a composed data structure, like
for example `{a: {b: [1, 2, 4], c: 'e'}`, as opposed
to *Collections*.

At least, here is some background on tsfun's [design rationale](README_design.md). 
 
## Credits 
 
Ascii Art generated with http://www.patorjk.com/software/taag










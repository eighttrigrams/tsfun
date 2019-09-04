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
 
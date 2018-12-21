# tsfun - Data Structures and Functions

In general, **tsfun** functions are mainly designed to 
work with ***Array***s and ***Object***s. Whether a data 
structure is an Array or an Object in our sense is 
determined by
[isArray](../test/predicates/is_array.spec.ts) and
[isObject](../test/predicates/is_object.spec.ts).

Arrays are treated as list-like data structures or 
as set-like data structures.

Objects are treated as list-like data structures or 
as set-like data structures or as structured objects. 

If we say list-like data structure, we mean that if a 
function operates on an array or object, we retain order
and allow duplicates.

If we say set-like data structure, we mean that if a 
function operates on an array or object, we assume that 
or explicitely take care that the data structure has
no duplicates.

We talk about about tsfun Objects in contexts where we 
care about a composed data structure, like
for example `{a: {b: [1, 2, 4], c: 'e'}`, whereas the list- 
and set-like data structures are concerned with the top level of the data structure.

TODO talk about equal, arrayEquivalent, objectEquivalent, copies (copy vs clone) etc.
Arrays can be seen as deep nested structures as well.


### Collections

Furthermore, there are two general contexts in which we use these data structure.
The first is when we use them as **collections**, the second is when we use them
as structured entities.

##### Arrays

We have different sets of functions to treat Arrays as either 
linear vector or list like collections or as set like collections.

## Utilities for Collections

Note that all collection functions return shallow copies.
In the same spirit, all collection functions compare in their basic versions
with `tripleEqual` a.k.a. `===`. For the most functions there is a -By suffixed 
version where one can choose the Comparator however. See `wrap` [here](./core.md) 
for seeing how to return clones. 

## Set Methods

Set methods come in two flavours, array set methods and object set methods.
Both of these have in common that the respective data structures are treated 
as if they were sets, hence we also call them set-like methods.

Every set method's result is not only `Array<A>` but also consists 
of unique items (compared with `==`). Where possible, the order of 
the arguments is kept.

`intersect`, `subtract`, `unite` and `uniqe` are partials, which can be inserted
into the body of a `flow`. `intersection` and `union` take a `NestedArray<A>` as
their argument, so they can be used to begin a `flow` with.


TODO -Object suffixed collection functions 
TODO mention typescript index signatures and -Map suffix
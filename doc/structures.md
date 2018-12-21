# tsfun - Data Structures and Functions

## tsfun data structures

In general, **tsfun** knows and works with only two data structures, namely
***Array*** and ***Object***, corresponding to the respective javascript data structures.
Whenever we talk about javascript entities, we highlight the terms as code, like
for instance, `object`, `{}`, `Object`, and `Array`. 

If an entity is an Array is determined
by checking

```
as instanceof Array
```

Wether an entity is an Object ist checked by

```
o instanceof Object && o.constructor === Object
``` 

which accounts for `Object` and `{}`, but not Descendants of `Object`, like for example
`Date`, which is what we want in the context of ***tsfun's*** functionality.


## tsfun functions

### Collections

Furthermore, there are two general contexts in which we use these data structure.
The first is when we use them as **collections**, the second is when we use them
as structured entities.

##### Arrays

We have different sets of functions to treat Arrays as either 
linear vector or list like collections or as set like collections.

##### Objects

TODO mention typescript index signatures and -Map suffix

### Structures

We talk about about tsfun Objects in contexts where we 
care about a composed data structure, like
for example `{a: {b: [1, 2, 4], c: 'e'}`.

Arrays can be seen as deep nested structures as well.

TODO talk about equal, arrayEquivalent, objectEquivalent, copies (copy vs clone) etc. 

### -Object suffixed collection functions 

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



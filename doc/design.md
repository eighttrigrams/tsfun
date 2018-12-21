# tsfun - Design rationale

Designed first and foremost to make compact, readable, functional style code

### Readable 

I wanted to write something like

```
.filter(on(...
```

and not 

```
.filter(_.on(
```

Since typescript (behind the scenes, i.e. just look at the javascript) 
imports bind the requires to local variables instead of them beeing in the global namespace,
this was possible.  

Furthermore the function names should be readable in the sense of `fluent interfaces`.

### Functional

Combinators

### Data Structures

Provide reusable components which help work on nested, but plain, data structures,
as such ones gained by parsing JSON.

### Not optimized

Speed was not considered, since most functional HOFs are looping over 
the input more often than necessary anyway (compared to languages where we would work on collections lazily).
If you have pieces of code that needs to be fast, better do it with plain js.

### Typing  

With a somewhat lower priority, supporting proper typing

## Tradeoffs

### Non immutable collection functions

* Comparison via tripleEqual
* Returning shallow copies

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
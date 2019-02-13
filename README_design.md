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

We have 2 literals in javascript for structured entities, Array ([]) and Object ({}).
Note that I call the latter Object rather than Map here. Calling it Map would be helpful
in cases where I see it as a collection, but not when I see it as struct. When I talk about
Object in tsfun, I mean {} and not for example an instance of Date. There are isArray and
isObject functions which determine the meaning exactly.

A couple of collection "views" are available on top of these structures. We call these
ArrayList, ArraySet, ObjectStruct, ObjectCollection, ObjectSet. The first part refers to 
the aforementioned types and the later part to the data structure which is modelled.

### Not optimized

Speed was not considered, since most functional HOFs are looping over 
the input more often than necessary anyway (compared to languages where we would work on collections lazily).
If you have pieces of code that needs to be fast, better do it with plain js.

### Composability

The ArrayList functions have been designed to work within a flow composition such that
the typing as Array still retains and functions like .includes can be used at the end of the composition.
That one reason why we did not make filter and map taking both ObjectCollection and ArrayList like copy, but
instead created mapObject and filterObject.

### Typing  

With a somewhat lower priority, supporting proper typing

## Tradeoffs

### Non immutable collection functions

* Comparison via tripleEqual
* Returning shallow copies

## Collections mutability

Note that all collection functions return shallow copies.
In the same spirit, all collection functions compare in their basic versions
with `tripleEqual` a.k.a. `===`. For the most functions there is a -By suffixed 
version where one can choose the Comparator however. See `wrap` [here](./core.md) 
for seeing how to return clones. 
# tsfun - Design rationale

Designed first and foremost to make compact, readable, functional style code

## Readable 

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

## Functional

Combinators

## Data Structures

Provide reusable components which help work on nested, but plain, data structures,
as such ones gained by parsing JSON.

## Not optimized

Speed was not considered, since most functional HOFs are looping over 
the input more often than necessary anyway (compared to languages where we would work on collections lazily).
If you have pieces of code that needs to be fast, better do it with plain js.

## Typing  

With a somewhat lower priority, supporting proper typing
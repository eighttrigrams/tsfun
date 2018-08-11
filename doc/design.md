# tsfun - Design rationale

* Designed first and foremost to make compact, readable, functional style code
* Provide reusable components which help work on nested, but plain, data structures,
  as such ones gained by parsing JSON.
* Speed was not considered, since most functional HOFs are looping over 
  the input more often than necessary anyway (compared to languages where we would work on collections lazily).
  If you have pieces of code that needs to be fast, better do it with plain js.
* Using Typescript imports to make short readable forms when using for example `filter(on())` 
  (without for example underscore notation like `filter(_.on()))`
* With a somewhat lower priority, supporting proper typing
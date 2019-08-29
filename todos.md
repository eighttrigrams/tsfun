# TODOs

## Add transpose function

## fix typing of lookup, which may also return undefined

## review if lookup should be moved to arraylist

## Add use cases to range function

* also add repeat function
* range function should have start and end
* should not have stepwidth, because can be made with filter(divisibleBy)
* lRange with open ends

## Introduce splitwith function to simplify insert function in csv-export in idai-field

## Add predicate typing to indices function

* review for comparison function
* rename to positions?
* implement in terms of zip?

## Add count function

* count occurences in list
* with predicate and by comparison

## Document Naming schema of data structures in design doc

## Implement predicates for sets

* isSuperset
* isSubset

## Improve typing, asyncMap should map from A to B

## Review impls of zip, zipWith functions

* new "package" with flatMap and flatten?

## Review possibilities to implement typesafe variadic compose

* maybe see haskell book

## Review cond typing

* maybe unsion of A|B

## Implement groupBy, juxt, partition-by, separate

* see clojure

## Typesafe id function 

* see clojure book 85
* also see polymorphic error function

## Add splitAt function

## Review: can getOnOr work with array paths (or should it?) 

* like arfield.0.anotherfield

## Make without or exclude function

* who does a comparison under exclusion of a list of paths

## Implement drop recursively

## Review subtract

* make it work so that single (non-array) items can get subtracted (+ prepend and append)

## Implement duplicates

## Compare unique with rmdups from haskell book p.86

## Implement interleave



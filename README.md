![alt](README_splash.png)

**tsfun - functional combinator library for TypeScript**

---

**tsfun** aims at providing simple functional programming idioms in a way
which fit well with the literal based data structures `[]` and `{}` of *JavaScript* while
at the same time providing accurate *TypeScript*-typings.

## Getting started

```
$ npm i tsfun
```

Pick your functions:

```typescript
import {on, equal, take, update, flow} from 'tsfun'
```

## Intro

*JavaScript* has two collection data structures which can be
created using literals. Those are **Arrays** (`[]`) and **Objects** (`{}`). We assume Arrays to be non-sparse.
Objects, at least from the perspective taken in **tsfun**, do not include class instances
(anything else created with `new`, apart from Object,
so Array and `Date` would not count as an Object here).

Those data structures provide the ground for a couple of abstractions.

First, Arrays and Objects
can be seen as **Associatives**, meaning they both have keys (indexes, i.e. numbers, in the Array case) as well as
(homogeneous, i.e. same-typed) values. For Arrays we have **Array\<T>** in *TypeScript*. To encode a view on Object
as an associative collection, *tsfun* provides **Map\<T>**, analogously. Order in **Maps** does not matter, while
in **Arrays** it does. **Arrays** seen this way are taken as `Lists` or `Vectors` (based on their *JavaScript* properties).
There is however another view on Arrays, which is the **Set**-view, where order does not matter.

Second, Array and Objects can be seen as **Records**, meaning there are a couple of properties, which have
distinctive meanings and types. Think of a Person with the name and age properties for example. Analogously,
there exists a view on Arrays, which is the **Tuple**-view, where the position in the (small) Array has a meaning.
Both variants are supported by the *TypeScript* type system.

Third, there is **Struct**, which is a mutually nested structure of **Tuples** and **Records**.

*tsfun* revolves around dealing with these data structures and views on them and provide various
functions which operate on these abstractions.

Leafs in any of these structures can be of types `number`, `string`, `boolean`, `null`, `undefined`, which is denoted
by the type **Primitive**. Class instances
of anything other than Array or Object (which are assumed to be created via literals) are treated as illegal arguments generally.

Note: We ignore the *JavaScript* `Map` collection and the *TypeScript* `Record` type.

## Functions

### Array

* [first](test/array/first.spec.ts)
* [rest](test/array/rest.spec.ts)
* [last](test/array/last.spec.ts)
* [reverse](test/array/reverse.spec.ts)
* [separate](test/array/separate.spec.ts)
* [distribute](test/array/distribute.spec.ts)
* [flatten](test/array/flatten.spec.ts)
* [flatMap](test/array/flat_map.spec.ts)
* [take](test/array/take.spec.ts)
* [takeWhile](test/array/take_while.spec.ts)
* [takeRight](test/array/take_right.spec.ts)
* [takeRightWhile](test/array/take_right_while.spec.ts)
* [drop](test/array/drop.spec.ts)
* [dropWhile](test/array/drop_while.spec.ts)
* [dropRight](test/array/drop_right.spec.ts)
* [dropRightWhile](test/array/drop_right_while.spec.ts)
* [takeNth](test/array/take_nth.spec.ts)
* [takeUntil](test/array/take_until.spec.ts)
* [append](test/array/append.spec.ts)
* [prepend](test/array/prepend.spec.ts)
* [zip](test/array/zip.spec.ts)
* [range](test/array/range.spec.ts)
* [dense](test/array/dense.spec.ts)
* [sort](test/array/sort.spec.ts)

### Associative

Associatives are homogeneous (i.e. all values of the same type)
Arrays and homogeneous
Maps (JavaScript-Objects).

* [keys](test/associative/keys.spec.ts)
* [values](test/associative/values.spec.ts)
* [keysValues](test/associative/keys_values.spec.ts)
* [copy](test/associative/copy.spec.ts)
* [count](test/associative/count.spec.ts)
* [prune](test/associative/prune.spec.ts)
* [size](test/associative/size.spec.ts)
* [indices](test/associative/indices.spec.ts)
* [all](test/associative/all.spec.ts)
* [any](test/associative/any.spec.ts)
* [lookup](test/associative/lookup.spec.ts)
* [map](test/associative/map.spec.ts)
* [reduce](test/associative/reduce.spec.ts)
* [filter](test/associative/filter.spec.ts)
* [remove](test/associative/remove.spec.ts)
* [forEach](test/associative/for_each.spec.ts)
* [assoc](test/associative/assoc.spec.ts)

### Composition

Tools for combining curried versions of *tsfun* functions into
larger units.

* [flow](test/composition/flow.spec.ts)
* [compose](test/composition/compose.spec.ts)
* [curry](test/composition/curry.spec.ts)
* [cond](test/composition/cond.spec.ts)
* [conds](test/composition/conds.spec.ts)
* [identity](test/composition/identity.spec.ts)
* [apply](test/composition/apply.spec.ts)
* [collect](test/composition/collect.spec.ts)
* [val](test/composition/val.spec.ts)
* [nop](test/composition/nop.spec.ts)
* [throws](test/composition/throws.spec.ts)

### Struct

Structs are TypeScript-Tuples (which are JavaScript-Arrays),
and JavaScript Objects, typed via TypeScript-Interfaces, as well
as combinations, i.e. mutual nestings, thereof. Leafs can be of types
`number`, `string`, `undefined`, `null`, `boolean`.

* [to](test/struct/to.spec.ts)
* [update](test/struct/update.spec.ts)
* [clone](test/struct/clone.spec.ts)
* [detach](test/struct/detach.spec.ts)

### Set

*JavaScript*-Arrays, viewed as sets. Obviously
because of the choice of these should be seen as convenience
functions for smaller sets.

* [set](test/set/set.spec.ts)
* [intersection](test/set/intersection.spec.ts)
* [intersect](test/set/intersect.spec.ts)
* [subtract](test/set/subtract.spec.ts)
* [union](test/set/union.spec.ts)
* [unite](test/set/unite.spec.ts)
* [duplicates](test/set/duplicates.spec.ts)

### Tuple

*JavaScript*-Arrays, typed as *TypeScript*-Tuples.

* [singleton](test/tuple/singleton.spec.ts)
* [value](test/tuple/value.spec.ts)
* [pair](test/tuple/pair.spec.ts)
* [left](test/tuple/left.spec.ts)
* [right](test/tuple/right.spec.ts)
* [swap](test/tuple/swap.spec.ts)
* [pairWith](test/tuple/pair-with.spec.ts)
* [tuplify](test/tuple/tuplify.spec.ts)
* [just](test/tuple/just.spec.ts)
* [nothing](test/tuple/nothing.spec.ts)
* [success](test/tuple/success.spec.ts)
* [failure](test/tuple/failure.spec.ts)
* [ok](test/tuple/ok.spec.ts)
* [err](test/tuple/err.spec.ts)

### Predicate

Predicates generally are functions of type `(t: T) => boolean`, which
can be passed to higher order functions like `filter`, for example.

###### Composition

* [isNot](test/predicate/is_not.spec.ts)
* [not](test/predicate/is_not.spec.ts)
* [and](test/predicate/and.spec.ts)
* [or](test/predicate/or.spec.ts)
* [xor](test/predicate/xor.spec.ts)

###### Defined & Empty

* [isEmpty](test/predicate/is_empty.spec.ts)
* [isUndefinedOrEmpty](test/predicate/is_undefined_or_empty.spec.ts)
* [isDefined](test/predicate/is_defined.spec.ts)
* [isUndefined](test/predicate/is_undefined.spec.ts)

###### Types

* [isArray](test/predicate/is_array.spec.ts)
* [isObject](test/predicate/is_object.spec.ts)
* [isString](test/predicate/is_string.spec.ts)
* [isNumber](test/predicate/is_number.spec.ts)
* [isBoolean](test/predicate/is_boolean.spec.ts)
* [isFunction](test/predicate/is_function.spec.ts)
* [isPrimitive](test/predicate/is_primitive.spec.ts)
* [isAssociative](test/predicate/is_associative.spec.ts)

###### Tuple

* [isOk](test/predicate/is_ok.spec.ts)
* [isErr](test/predicate/is_err.spec.ts)
* [isSingleton](test/predicate/is_singleton.spec.ts)
* [isPair](test/predicate/is_pair.spec.ts)
* [isEither](test/predicate/is_either.spec.ts)
* [isMaybe](test/predicate/is_maybe.spec.ts)

### Comparator

Comparators generally are functions of type `(l: T1) => (t: T2) => boolean`.

###### Reference

* [is](test/comparator/reference/is.spec.ts)
* [tripleEqual](test/comparator/reference/triple_equal.spec.ts)
* [isnt](test/comparator/reference/isnt.spec.ts)
* [differentFrom](test/comparator/reference/different_from.spec.ts)

###### Array

* [subsetOf](test/comparator/array/subset_of.spec.ts)
* [supersetOf](test/comparator/array/superset_of.spec.ts)
* [sameset](test/comparator/array/sameset.spec.ts)
* [includes](test/comparator/array/includes.spec.ts)
* [includedIn](test/comparator/array/included_in.spec.ts)
* [startsWith](test/comparator/array/starts_with.spec.ts)
* [endsWith](test/comparator/array/ends_with.spec.ts)

###### Struct

* [arrayEqual](test/comparator/struct/array_equal.spec.ts)
* [objectEqual](test/comparator/struct/object_equal.spec.ts)
* [equal](test/comparator/struct/equal.spec.ts)
* [on](test/comparator/struct/on.spec.ts)

###### Number

* [gt](test/comparator/number/gt.spec.ts)
* [lt](test/comparator/number/lt.spec.ts)
* [gte](test/comparator/number/gte.spec.ts)
* [lte](test/comparator/number/lte.spec.ts)

## Types

###### Data

* [Map](test/type/map.spec.ts)
* [Associative](test/type/associative.spec.ts)

###### Functions

* [Predicate](test/type/predicate.spec.ts)
* [Mapping](test/type/mapping.spec.ts)
* [Filter](test/associative/filter.type.spec.ts)
* [Effect](test/type/effect.spec.ts)

###### Tuple

* [Singleton](test/type/singleton.spec.ts)
* [Pair](test/type/pair.spec.ts)
* [Maybe](test/type/maybe.spec.ts)
* [Just](test/type/maybe.spec.ts)
* [Nothing](test/type/maybe.spec.ts)
* [Either](test/type/either.spec.ts)
* [Success](test/type/either.spec.ts)
* [Failure](test/type/either.spec.ts)
* [Ok](test/type/either.spec.ts)
* [Err](test/type/either.spec.ts)

## Constants

###### Tuple

* [L](test/tuple/l.constant.spec.ts)
* [R](test/tuple/r.constant.spec.ts)

## Extra functions

### Async

* [aMap](test/async/a_map.spec.ts)
* [aFilter](test/async/a_filter.spec.ts)
* [aReduce](test/async/a_reduce.spec.ts)
* [aFlow](test/async/a_flow.spec.ts)
* [aCompose](test/async/a_compose.spec.ts)

### Lazy

(experimental)

* [lZip](test/lazy/l_zip.spec.ts)
* [lRange](test/lazy/l_range.spec.ts)
* [lFilter](test/lazy/l_filter.spec.ts)
* [lTake](test/lazy/l_take.spec.ts)
* [lMap](test/lazy/l_map.spec.ts)
* [materialize](test/lazy/materialize.spec.ts)

### The Fallible Monad

(experimental)

Allows for monadic computation with Either and Maybe.

* [mcompose](test/composition/mcompose.spec.ts)
* [liftM](test/tuple/lift_m.spec.ts)
* [liftE](test/tuple/lift_e.spec.ts)
* [mmatch](test/tuple/mmatch.spec.ts)
* [aMcompose](test/async/a_mcompose.spec.ts)

See also: [The Monad Tutorial](https://github.com/danielmarreirosdeoliveira/the-monad-tutorial)

## Build & Test

    $ npm run build && npm t

or

    1$ npm run build:watch
    2$ npm t

## Credits

The way of thinking about datastructures I owe mostly to working with `Clojure`. I tried to mimic
some principles but without sacrificing any convenience with regards to the use of the existing collection
literals. The writing of library functions like this and the thinking about typing I encountered first and thus
attribute mostly to `Functional Programming in Scala` (the red book).

Ascii Art generated with http://www.patorjk.com/software/taag

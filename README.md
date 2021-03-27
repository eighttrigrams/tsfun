![alt](README_splash.png)

**tsfun - functional combinator library for TypeScript**

---

**tsfun** aims at providing simple functional programming idioms in a way
which fit well with the literal based data structures `[]` and `{}` while
at the same time providing accurate typings.

## Getting started

```
npm -i tsfun
```

Pick your functions:

```typescript
import {on, equal, take, update, flow} from 'tsfun'
```

## Function reference

### Array

* [range](test/array/range.spec.ts)
* [dense](test/array/dense.spec.ts)
* [sort](test/array/sort.spec.ts)
* [first](test/array/first.spec.ts)
* [rest](test/array/rest.spec.ts)
* [last](test/array/last.spec.ts)
* [reverse](test/array/reverse.spec.ts)
* [separate](test/array/separate.spec.ts)
* [distribute](test/array/distribute.spec.ts)
* [reduce](test/array/reduce.spec.ts)
* [reduce0](test/array/reduce0.spec.ts)
* [flatten](test/array/flatten.spec.ts)
* [flatMap](test/array/flat_map.spec.ts)
* [drop](test/array/drop.spec.ts)
* [takeRight](test/array/take_right.spec.ts)
* [dropRight](test/array/drop_right.spec.ts)
* [dropRightWhile](array/list/drop_right_while.spec.ts)
* [takeWhile](test/array/take_while.spec.ts)
* [takeRightWhile](test/array/take_right_while.spec.ts)
* [dropWhile](test/array/drop_while.spec.ts)
* [takeUntil](test/array/take_until.spec.ts)
* [append](test/array/append.spec.ts)
* [prepend](test/array/prepend.spec.ts)
* [zip](test/array/zip.spec.ts)
* [takeNth](test/array/take_nth.spec.ts)
* [take](test/array/take.spec.ts)

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
* [filter](test/associative/filter.spec.ts)
* [remove](test/array/remove.spec.ts)
* [forEach](test/associative/for_each.spec.ts)
* [update_a](test/associative/update_a.spec.ts)

### Composition

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
* [mcompose](test/composition/mcompose.spec.ts)
* [mmatch](test/tuple/mmatch.spec.ts)

### Struct

Structs are TypeScript-Tuples (which are JavaScript-Arrays),
and JavaScript Objects, typed via TypeScript-Interfaces, as well
as combinations, i.e. mutual nestings, thereof.

* [to](test/struct/to.spec.ts)
* [update](test/struct/update.spec.ts)
* [clone](test/struct/clone.spec.ts)
* [jsonClone](test/struct/json_clone.spec.ts)
* [dissoc](test/struct/dissoc.spec.ts)

### Set

JavaScript-Arrays, viewed as sets. Obviously
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

JavaScript-Arrays, typed as TypeScript-Tuples.

* [tuplify](test/tuple/tuplify.spec.ts)
* [pairWith](test/tuple/pair-with.spec.ts)
* [swap](test/tuple/swap.spec.ts)
* [singleton](test/tuple/singleton.spec.ts)
* [pair](test/tuple/pair.spec.ts)
* [just](test/tuple/just.spec.ts)
* [nothing](test/tuple/nothing.spec.ts)
* [success](test/tuple/success.spec.ts)
* [failure](test/tuple/failure.spec.ts)
* [liftM](test/tuple/lift_m.spec.ts)
* [liftE](test/tuple/lift_e.spec.ts)
* [left](test/tuple/left.spec.ts)
* [right](test/tuple/right.spec.ts)
* [value](test/tuple/value.spec.ts)
* [getSuccess](test/tuple/get_success.spec.ts)

### Predicate

###### Composition

* [isNot](test/predicate/is_not.spec.ts)
* [not](test/predicate/not.spec.ts)
* [and](test/predicate/and.spec.ts)
* [or](test/predicate/or.spec.ts)
* [xor](test/predicate/xor.spec.ts)

###### Defined & Empty

* [isEmpty](test/predicate/is_empty.spec.ts)
* [empty](test/predicate/empty.spec.ts)
* [isUndefinedOrEmpty](test/predicate/is_undefined_or_empty.spec.ts)
* [undefinedOrEmpty](test/predicate/undefined_or_empty.spec.ts)
* [isDefined](test/predicate/is_defined.spec.ts)
* [defined](test/predicate/defined.spec.ts)
* [isUndefined](test/predicate/is_undefined.spec.ts)

###### Types

* [isArray](test/predicate/is_array.spec.ts)
* [isObject](test/predicate/is_object.spec.ts)
* [isString](test/predicate/is_string.spec.ts)
* [isNumber](test/predicate/is_number.spec.ts)
* [isBoolean](test/predicate/is_boolean.spec.ts)
* [isFunction](test/predicate/is_function.spec.ts)
* [isAssociative](test/predicate/is_associative.spec.ts)

###### Tuple

* [isSuccess](test/predicate/is_success.spec.ts)
* [isFailure](test/predicate/is_failure.spec.ts)
* [isSingleton](test/predicate/is_singleton.spec.ts)
* [isPair](test/predicate/is_pair.spec.ts)
* [isEither](test/predicate/is_either.spec.ts)
* [isMaybe](test/predicate/is_maybe.spec.ts)

###### Struct & Associative

* [has](test/predicate/has.spec.ts)
* [hasnt](test/predicate/hasnt.spec.ts)

### Comparator

###### Reference

* [is](test/comparator/reference/is.spec.ts)
* [tripleEqual](test/comparator/reference/triple_equal.spec.ts)
* [isnt](test/comparator/reference/isnt.spec.ts)
* [differentFrom](test/comparator/reference/different_from.spec.ts)

###### Number

* [gt](test/comparator/ordered/gt.spec.ts)
* [lt](test/comparator/ordered/lt.spec.ts)
* [greaterOrEqualThan](test/comparator/ordered/gte.spec.ts)
* [lessOrEqualThan](test/comparator/ordered/lte.spec.ts)

###### Array

* [subsetOf](test/comparator/array/subset_of.spec.ts)
* [supersetOf](test/comparator/array/superset_of.spec.ts)
* [sameset](test/comparator/array/sameset.spec.ts)
* [includes](test/comparator/array/includes.spec.ts)
* [includedIn](test/comparator/array/included_in.spec.ts)
* [startsWith](test/comparator/array/starts_with.spec.ts)
* [endsWith](test/comparator/array/ends_with.spec.ts)

###### Struct

* [jsonEqual](test/comparator/struct/json_equal.spec.ts)
* [arrayEqual](test/comparator/struct/array_equal.spec.ts)
* [objectEqual](test/comparator/struct/object_equal.spec.ts)
* [equal](test/comparator/struct/equal.spec.ts)
* [on](test/comparator/struct/on.spec.ts)

## Types reference

* [Singleton](test/type/singleton.spec.ts)
* [Pair](test/type/pair.spec.ts)
* [Maybe](test/type/maybe.spec.ts)
* [Just](test/type/maybe.spec.ts)
* [Nothing](test/type/maybe.spec.ts)
* [Either](test/type/either.spec.ts)
* [Success](test/type/either.spec.ts)
* [Failure](test/type/either.spec.ts)
* [Map](test/type/map.spec.ts)
* [Associative](test/type/associative.spec.ts)
* [Mapping](test/type/predicate.spec.ts)
* [Predicate](test/type/predicate.spec.ts)
* [Effect](test/type/effect.spec.ts)
* [Filter](test/associative/filter.type.spec.ts)

## Constants reference

###### List

* [FIRST](test/tuple/first.constant.spec.ts)

###### Tuple

* [LEFT](test/tuple/left.constant.spec.ts)
* [RIGHT](test/tuple/right.constant.spec.ts)

## Extra functions reference

### Async

* [aMap](test/async/a_map.spec.ts)
* [aFilter](test/async/a_filter.spec.ts)
* [aReduce](test/async/a_reduce.spec.ts)
* [aFlow](test/async/a_flow.spec.ts)
* [aCompose](test/async/a_compose.spec.ts)
* [aMcompose](test/async/a_mcompose.spec.ts)

### Lazy

(experimental)

* [lZip](test/lazy/l_zip.spec.ts)
* [lRange](test/lazy/l_range.spec.ts)
* [lFilter](test/lazy/l_filter.spec.ts)
* [lTake](test/lazy/l_take.spec.ts)
* [lMap](test/lazy/l_map.spec.ts)
* [materialize](test/lazy/materialize.spec.ts)

## Build & Test

    $ npm run build && npm t

or

    1$ npm run build:watch
    2$ npm t

## Credits

Ascii Art generated with http://www.patorjk.com/software/taag

![alt](README_splash.png)

**tsfun - functional combinator library for TypeScript**

---

## Function reference

Example:

```typescript
import {on, equal, take, update, flow} from 'tsfun'
```

### Array

* [range](test/array/range.spec.ts)
* [dense](test/array/dense.spec.ts)
* [remove](test/array/remove.spec.ts)
* [separate](test/array/separate.spec.ts)
* [distribute](test/array/distribute.spec.ts)
* [forEach](test/array/for_each.spec.ts)
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
* [first](test/array/first.spec.ts)
* [rest](test/array/rest.spec.ts)
* [last](test/array/last.spec.ts)
* [reverse](test/array/reverse.spec.ts)
* [takeNth](test/array/take_nth.spec.ts)
* [sort](test/array/sort.spec.ts)
* [join](test/array/join.spec.ts)
* [split](test/array/split.spec.ts)
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
* [mmatch](test/composition/mmatch.spec.ts)

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

JavaScript-Arrays, viewed as sets.

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
* [isCollection](test/predicate/is_collection.spec.ts)
* [isList](test/predicate/is_list.spec.ts)

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

###### Ordered

* [greaterThan](test/comparator/ordered/greater_than.spec.ts)
* [lessThan](test/comparator/ordered/less_than.spec.ts)
* [greaterOrEqualThan](test/comparator/ordered/greater_or_equal_than.spec.ts)
* [lessOrEqualThan](test/comparator/ordered/less_or_equal_than.spec.ts)

###### Set

* [subsetOf](test/comparator/set/subset_of.spec.ts)
* [supersetOf](test/comparator/set/superset_of.spec.ts)
* [sameset](test/comparator/set/sameset.spec.ts)
* [includes](test/comparator/set/includes.spec.ts)
* [includedIn](test/comparator/set/included_in.spec.ts)

###### List

* [startsWith](test/comparator/list/starts_with.spec.ts)
* [endsWith](test/comparator/list/ends_with.spec.ts)
* [shorterThan](test/comparator/list/shorter_than.spec.ts)
* [longerThan](test/comparator/list/longer_than.spec.ts)
* [sameLength](test/comparator/list/same_length.spec.ts)

###### Struct

* [jsonEqual](test/comparator/struct/json_equal.spec.ts)
* [arrayEqual](test/comparator/struct/array_equal.spec.ts)
* [objectEqual](test/comparator/struct/object_equal.spec.ts)
* [equal](test/comparator/struct/equal.spec.ts)
* [equalTo](test/comparator/struct/equal_to.spec.ts)
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
* [List](test/type/list.spec.ts)
* [Associative](test/type/associative.spec.ts)
* [Collection](test/type/collection.spec.ts)
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

## Extra packages reference

### Async

```typescript
import {map as asyncMap} from 'tsfun/async'
```

* [map](test/async/async/map.spec.ts)
* [filter](test/async/async/filter.spec.ts)
* [remove](test/async/async/remove.spec.ts)
* [forEach](test/async/async/for_each.spec.ts)
* [reduce](test/async/async/reduce.spec.ts)
* [flow](test/async/async/flow.spec.ts)
* [compose](test/async/async/compose.spec.ts)
* [separate](test/async/async/separate.spec.ts)
* [mcompose](test/async/async/mcompose.spec.ts)

###### Types

* AsyncMapping

### Lazy

```typescript
import {zip as lZip} from 'tsfun/lazy'
```

* [zip](test/lazy/lazy/zip.spec.ts)
* [range](test/lazy/lazy/range.spec.ts)
* [materialize](test/lazy/lazy/materialize.spec.ts)
* [filter](test/lazy/lazy/filter.spec.ts)
* [take](test/lazy/lazy/take.spec.ts)
* [map](test/lazy/lazy/map.spec.ts)

## Build & Test

    $ npm run build && npm t

## Credits

Ascii Art generated with http://www.patorjk.com/software/taag

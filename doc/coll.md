# Utilities for Collections

* See [Sources](../src/collections/coll.ts)

## Overview

Note that all collection functions return shallow copies.
In the same spirit, all collection functions compare in their basic versions
with `tripleEqual` a.k.a. `===`. For the most functions there is a -By suffixed 
version where one can choose the Comparator however. See `wrap` [here](./core.md) 
for seeing how to return clones. 

### Reference

* [copy](../test/collections/coll.spec.ts)

## Ordered-list-like collection methods for Arrays

* [Sources](../src/collections/arrays_list_like.ts)

### Reference

* [prepend](../test/collections/arrays_list_like/prepend.spec.ts)
* [append](../test/collections/arrays_list_like/append.spec.ts)
* [getIth/getIthOr](../test/collections/arrays_list_like/getIth.spec.ts)
* [flatMap](../test/collections/arrays_list_like/flat_map.spec.ts)
* [filter](../test/collections/arrays_list_like/filter.spec.ts)
* [map](../test/collections/arrays_list_like/map.spec.ts)


## Ordered-list-like collection methods - Picking methods for Arrays

* [Sources](../src/collections/arrays_list_like_pick.ts)

### Reference

* [take](../test/collections/arrays_list_like/take.spec.ts)
* [take_nth](../test/collections/arrays_list_like/take_nth.spec.ts)
* [takeWhile/takeRightWhile](../test/collections/arrays_list_like/take_while.spec.ts)
* [drop/dropRight](../test/collections/arrays_list_like/drop.spec.ts)
* [dropWhile/dropRightWhile](../test/collections/arrays_list_like/drop_while.spec.ts)





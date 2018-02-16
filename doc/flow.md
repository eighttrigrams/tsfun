# More on flows

Some of the array methods have corresponding flow compatible implementations.

```
flow(
    [1, 2, 3, 4],
    filter((x: number) => x < 3),
    map(x => x * 2),
    reduce((acc, val) => acc.concat([val * 2])),
    reverse(),
    take(1))

-> [8]
```

This allows us to stay in the flow in between calls to methods we don't have native javascript
version for, like for example `take`.

**Note** that, as stated earlier, a flow consists of only transformations from Array of A to Array of A,
thus constraining our versions of the methods somewhat in comparison to the native methods (
consider for example `map`, which typically maps from A to B, not necessarily from A to A).

Nevertheless, with flow you have the possibility to combine a mapping from A to B with 
for example `take` like this

```
flow(
    [true, false, true]
    .map((x: boolean) => x ? 1 : 0),
    take(2))

-> [1, 0]
```

#### Nesting

There is also `flowP`, which is a partially applied flow. 
It allows a composition of flows.


```
const evenAndSmallerThan6 = flowP(
    filter(smallerThan(6)),
    filter(even())

  
flow(
    [1, 2, 3, 4, 6, 7, 8],
    evenAndSmallerThan6,
    take(1))
    .includes(2)

-> true
```

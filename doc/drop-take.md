## Take, Drop etc.

Currently the implementations for the following **take** methods are provided

```
take(5)([1, 2])
-> [1]
takeWhile(smallerThan(3))([1, 2, 3, 1])
-> [1, 2]
takeRightWhile(smallerThan(3))([1, 2, 3, 1])
-> [1]
takeUntil(biggerThan(2))([1, 2, 3, 1])
-> [1, 2, 3]
takeNth(2)([1, 2, 3, 7])
-> [1, 3]
```

Currently the implementations for the following **drop** methods are provided

```
drop(1)([1, 3])
-> [3]
dropRight(1)([1, 3])
-> [1]
dropWhile(smallerThan(2))([1, 2, 3, 1])
-> [2, 3, 1]
dropRightWhile(biggerThan(2))([1, 2, 3])
-> [1, 2]
```
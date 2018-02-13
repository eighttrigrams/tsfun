## Take, Drop etc.

Currently the implementations for the following methods are provided

```
take(5)([1, 2])
-> [1]
takeWhile(smallerThan(3))([1, 2, 3, 1])
-> [1, 2]
takeRightWhile(smallerThan(3))([1, 2, 3, 1])
-> [1]
takeUntil(biggerThan(2))([1, 2, 3, 1])
-> [1, 2, 3]
drop(1)([1, 3])
-> [3]
dropRight(1)([1, 3])
-> [1]
dropWhile(smallerThan(2))([1, 2, 3, 1])
-> [2, 3, 1]
dropRightWhile(biggerThan(2))([1, 2, 3])
-> [1, 2]
```
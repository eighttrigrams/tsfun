# Ordered-list-like collection methods - Picking methods for Arrays

Currently the implementations for the following **take** and **drop** methods are provided

### take

```
take(5)([1, 2])
-> [1]
```

### takeWhile

```
takeWhile(smallerThan(3))([1, 2, 3, 1])
-> [1, 2]
```

### takeRightWhile

```
takeRightWhile(smallerThan(3))([1, 2, 3, 1])
-> [1]
```

### takeUntil

```
takeUntil(biggerThan(2))([1, 2, 3, 1])
-> [1, 2, 3]
```

### takeNth

```
takeNth(2)([1, 2, 3, 7])
-> [1, 3]
```

### drop

```
drop(1)([1, 3])
-> [3]
```

### dropRight

```
dropRight(1)([1, 3])
-> [1]
```

### dropWhile

```
dropWhile(smallerThan(2))([1, 2, 3, 1])
-> [2, 3, 1]
```

### dropRightWhile

```
dropRightWhile(biggerThan(2))([1, 2, 3])
-> [1, 2]
```
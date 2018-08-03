# tsfun

**Combinator Library for TypeScript**

[tsfun on npmjs](https://www.npmjs.com/package/tsfun)

[tsfun on GitHub](https://github.com/danielmarreirosdeoliveira/tsfun)

Get started with `npm install; npm run build; npm test`.

Use the library in a project via **npm** and **node**:

```bash
npm install --save tsfun
```

```
import {take} from 'tsfun'
console.log(take(2)([1,2,3]))
```

## Features

Let's start with an example, which combines the different sorts of features `tsfun`
offers:

```
flow(
   [1, 2, 3, 1],
   takeWhile(isNot(includedIn([3, 4]))),
   dropRight(1))
   .map((x: number) => x * 2)
   .includes(2)
    
-> true
```

First of all we have the (combined) 
[predicate](https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/doc/combs_preds.md) 
`isNot(includedIn(x))`. Then we have
[collection manipulating functions](https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/doc/coll.md) 
like `takeWhile` and `dropRight`. 
Last but not least, we have [flow](https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/doc/flow.md),





